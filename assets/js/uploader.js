/* =========================================================
   GitHub Zip Uploader
   Extracts a .zip in the browser and commits its contents to a
   GitHub repository as a single atomic commit via the Git Data API.

   No backend required. The token is supplied by the user at runtime
   and is never stored in this repository.
   ========================================================= */

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.GhUploader = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const API_ROOT = "https://api.github.com";
  const MAX_BLOB_BYTES = 100 * 1024 * 1024; // GitHub hard limit per blob
  const WARN_BLOB_BYTES = 25 * 1024 * 1024;
  const MAX_FILES = 500;

  /* ---------------- Pure helpers (unit tested) ---------------- */

  /** Turn arbitrary text into a safe, lowercase, url/path friendly slug. */
  function slugify(input) {
    return String(input || "")
      .trim()
      .toLowerCase()
      .replace(/\.zip$/i, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  }

  /** Files inside an archive that should never be committed. */
  function isIgnoredPath(path) {
    if (!path) return true;
    const segments = path.split("/");
    if (segments.some((s) => s === "__MACOSX" || s === ".git")) return true;
    const name = segments[segments.length - 1];
    return name === ".DS_Store" || name === "Thumbs.db" || name === "";
  }

  /**
   * Guard against zip-slip: reject absolute paths, drive letters, backslash
   * separators and any `..` traversal. Returns a normalized relative path,
   * or null when the entry must be rejected.
   */
  function sanitizeEntryPath(rawPath) {
    if (typeof rawPath !== "string" || rawPath.length === 0) return null;
    // Normalize Windows separators before inspecting the segments.
    let path = rawPath.replace(/\\/g, "/");
    if (path.startsWith("/") || /^[a-zA-Z]:\//.test(path)) return null;
    const segments = [];
    for (const segment of path.split("/")) {
      if (segment === "" || segment === ".") continue;
      if (segment === "..") return null;
      if (segment.includes("\0")) return null;
      segments.push(segment);
    }
    if (segments.length === 0) return null;
    return segments.join("/");
  }

  /**
   * Archives usually wrap everything in a single top level directory.
   * Detect that wrapper so `my-app/src/index.js` commits as `src/index.js`.
   */
  function detectCommonRoot(paths) {
    if (!paths.length) return "";
    const first = paths[0].split("/");
    if (first.length < 2) return "";
    const candidate = first[0];
    const allShare = paths.every((p) => p.split("/")[0] === candidate && p.split("/").length > 1);
    return allShare ? candidate : "";
  }

  /** Join repo path segments, collapsing slashes and stripping edges. */
  function joinRepoPath() {
    return Array.from(arguments)
      .filter((part) => part !== null && part !== undefined && part !== "")
      .join("/")
      .replace(/\/{2,}/g, "/")
      .replace(/^\/+|\/+$/g, "");
  }

  /** Validate the destination folder the user typed into the form. */
  function sanitizeTargetFolder(folder) {
    if (!folder) return "";
    const cleaned = sanitizeEntryPath(folder);
    return cleaned === null ? null : cleaned;
  }

  /** Convert an ArrayBuffer/Uint8Array into base64 without blowing the stack. */
  function bytesToBase64(bytes) {
    const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    const CHUNK = 0x8000;
    let binary = "";
    for (let i = 0; i < view.length; i += CHUNK) {
      binary += String.fromCharCode.apply(null, view.subarray(i, i + CHUNK));
    }
    if (typeof btoa === "function") return btoa(binary);
    return Buffer.from(view).toString("base64");
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  /**
   * Build the list of files to commit from raw archive entries.
   * Entries: [{ path, bytes }]. Returns { files, skipped, warnings }.
   */
  function planCommitFiles(entries, options) {
    const opts = options || {};
    const targetFolder = opts.targetFolder || "";
    const stripRoot = opts.stripRoot !== false;

    const skipped = [];
    const warnings = [];
    const accepted = [];

    for (const entry of entries) {
      if (isIgnoredPath(entry.path)) {
        skipped.push({ path: entry.path, reason: "ignored system file" });
        continue;
      }
      const safe = sanitizeEntryPath(entry.path);
      if (safe === null) {
        skipped.push({ path: entry.path, reason: "unsafe path rejected" });
        continue;
      }
      if (isIgnoredPath(safe)) {
        skipped.push({ path: entry.path, reason: "ignored system file" });
        continue;
      }
      const size = entry.bytes ? entry.bytes.length || entry.bytes.byteLength || 0 : 0;
      if (size > MAX_BLOB_BYTES) {
        skipped.push({ path: safe, reason: "exceeds GitHub 100 MB file limit" });
        continue;
      }
      if (size > WARN_BLOB_BYTES) {
        warnings.push(safe + " is large (" + formatBytes(size) + ")");
      }
      accepted.push({ path: safe, bytes: entry.bytes, size: size });
    }

    const root = stripRoot ? detectCommonRoot(accepted.map((f) => f.path)) : "";
    const files = accepted.map((file) => {
      const relative = root ? file.path.slice(root.length + 1) : file.path;
      return {
        path: joinRepoPath(targetFolder, relative),
        bytes: file.bytes,
        size: file.size,
        originalPath: file.path,
      };
    });

    // A duplicate destination path would silently drop a file from the tree.
    const seen = new Set();
    const deduped = [];
    for (const file of files) {
      if (seen.has(file.path)) {
        skipped.push({ path: file.originalPath, reason: "duplicate destination path" });
        continue;
      }
      seen.add(file.path);
      deduped.push(file);
    }

    if (deduped.length > MAX_FILES) {
      warnings.push(
        "Archive contains " + deduped.length + " files; commits this large may be slow."
      );
    }

    return { files: deduped, skipped: skipped, warnings: warnings, strippedRoot: root };
  }

  /**
   * Work out which repository is hosting this page, so uploads default to the
   * profile site's own repo instead of being typed in by hand.
   *
   * Handles the two GitHub Pages shapes:
   *   user.github.io            -> user/user.github.io       (root site)
   *   user.github.io/repo/...   -> user/repo                 (project site)
   * Custom domains and local development cannot be detected and return null.
   */
  function detectRepoFromLocation(loc) {
    if (!loc) return null;
    const host = String(loc.hostname || "").toLowerCase();
    const match = host.match(/^([a-z0-9-]+)\.github\.io$/);
    if (!match) return null;

    const owner = match[1];
    const segments = String(loc.pathname || "/")
      .split("/")
      .filter(Boolean);

    // The last segment is a file (index.html) rather than the project name.
    const first = segments.length && !segments[0].includes(".") ? segments[0] : null;

    return {
      owner: owner,
      repo: first || owner + ".github.io",
      isProjectSite: !!first,
    };
  }

  /* ---------------- GitHub API layer ---------------- */

  function apiError(message, status, body) {
    const err = new Error(message);
    err.status = status;
    err.body = body;
    return err;
  }

  function describeFailure(status, body) {
    const detail = body && body.message ? body.message : "";
    switch (status) {
      case 401:
        return "Authentication failed — the token is invalid or expired.";
      case 403:
        if (detail.toLowerCase().includes("rate limit")) {
          return "GitHub rate limit reached. Wait a few minutes and try again.";
        }
        return "Permission denied — the token needs Read and write access to repository contents. " + detail;
      case 404:
        return "Repository or branch not found. Check the owner/repo/branch values, and that the token can see this repository.";
      case 409:
        return "The branch moved while uploading. Try again.";
      case 422:
        return "GitHub rejected the commit (branch protection or invalid content). " + detail;
      default:
        return detail || "GitHub request failed with status " + status + ".";
    }
  }

  function createClient(config) {
    const token = config.token;
    const fetchImpl = config.fetchImpl || (typeof fetch !== "undefined" ? fetch.bind(globalThis) : null);
    if (!fetchImpl) throw new Error("No fetch implementation available.");

    async function request(method, path, body) {
      const response = await fetchImpl(API_ROOT + path, {
        method: method,
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      let payload = null;
      const text = await response.text();
      if (text) {
        try {
          payload = JSON.parse(text);
        } catch (_) {
          payload = { message: text };
        }
      }

      if (!response.ok) {
        throw apiError(describeFailure(response.status, payload), response.status, payload);
      }
      return payload;
    }

    return { request: request };
  }

  /**
   * Commit a set of files to a branch as one commit.
   * files: [{ path, bytes }]
   */
  async function commitFiles(options) {
    const owner = options.owner;
    const repo = options.repo;
    const branch = options.branch;
    const files = options.files;
    const message = options.message;
    const onProgress = options.onProgress || function () {};
    const client = options.client || createClient({ token: options.token, fetchImpl: options.fetchImpl });

    if (!owner || !repo || !branch) throw new Error("Owner, repository and branch are required.");
    if (!files || files.length === 0) throw new Error("No files to commit.");

    const base = "/repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(repo);

    onProgress({ stage: "ref", message: "Reading branch " + branch + "…" });
    const ref = await client.request("GET", base + "/git/ref/heads/" + encodeURIComponent(branch));
    const headSha = ref.object.sha;

    onProgress({ stage: "commit-base", message: "Reading current tree…" });
    const headCommit = await client.request("GET", base + "/git/commits/" + headSha);
    const baseTreeSha = headCommit.tree.sha;

    const treeEntries = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      onProgress({
        stage: "blob",
        message: "Uploading " + file.path,
        current: i + 1,
        total: files.length,
      });
      const blob = await client.request("POST", base + "/git/blobs", {
        content: bytesToBase64(file.bytes),
        encoding: "base64",
      });
      treeEntries.push({ path: file.path, mode: "100644", type: "blob", sha: blob.sha });
    }

    onProgress({ stage: "tree", message: "Building commit tree…" });
    const tree = await client.request("POST", base + "/git/trees", {
      base_tree: baseTreeSha,
      tree: treeEntries,
    });

    onProgress({ stage: "commit", message: "Creating commit…" });
    const commit = await client.request("POST", base + "/git/commits", {
      message: message || "Upload files",
      tree: tree.sha,
      parents: [headSha],
    });

    onProgress({ stage: "ref-update", message: "Pointing " + branch + " at the new commit…" });
    await client.request("PATCH", base + "/git/refs/heads/" + encodeURIComponent(branch), {
      sha: commit.sha,
    });

    onProgress({ stage: "done", message: "Commit created." });
    return {
      sha: commit.sha,
      htmlUrl: commit.html_url || "https://github.com/" + owner + "/" + repo + "/commit/" + commit.sha,
      fileCount: files.length,
    };
  }

  /** Confirm the token can actually write to the repository before uploading. */
  async function verifyAccess(options) {
    const client = options.client || createClient({ token: options.token, fetchImpl: options.fetchImpl });
    const repo = await client.request(
      "GET",
      "/repos/" + encodeURIComponent(options.owner) + "/" + encodeURIComponent(options.repo)
    );
    const canPush = !!(repo.permissions && repo.permissions.push);
    return { repo: repo, canPush: canPush, defaultBranch: repo.default_branch };
  }

  /** Read a .zip File/Blob into raw entries using JSZip. */
  async function readZip(file, JSZipRef) {
    const Zip = JSZipRef || (typeof JSZip !== "undefined" ? JSZip : null);
    if (!Zip) throw new Error("JSZip failed to load.");
    const archive = await Zip.loadAsync(file);
    const entries = [];
    const names = Object.keys(archive.files);
    for (const name of names) {
      const entry = archive.files[name];
      if (entry.dir) continue;
      const bytes = await entry.async("uint8array");
      entries.push({ path: name, bytes: bytes });
    }
    return entries;
  }

  return {
    slugify: slugify,
    isIgnoredPath: isIgnoredPath,
    sanitizeEntryPath: sanitizeEntryPath,
    sanitizeTargetFolder: sanitizeTargetFolder,
    detectCommonRoot: detectCommonRoot,
    joinRepoPath: joinRepoPath,
    bytesToBase64: bytesToBase64,
    formatBytes: formatBytes,
    planCommitFiles: planCommitFiles,
    detectRepoFromLocation: detectRepoFromLocation,
    describeFailure: describeFailure,
    createClient: createClient,
    commitFiles: commitFiles,
    verifyAccess: verifyAccess,
    readZip: readZip,
    MAX_BLOB_BYTES: MAX_BLOB_BYTES,
  };
});
