/* =========================================================
   Admin upload console
   Wires the hidden upload panel to GhUploader. Visible only when the
   page is opened with #admin (or Ctrl/Cmd + Shift + U).
   ========================================================= */

(() => {
  "use strict";

  const U = window.GhUploader;
  if (!U) return;

  const CONFIG_KEY = "ha-upload-config";
  const TOKEN_KEY = "ha-upload-token";

  const el = {
    launch: document.getElementById("admin-launch"),
    modal: document.getElementById("upload-modal"),
    repoTarget: document.getElementById("repo-target"),
    repoTargetName: document.getElementById("repo-target-name"),
    repoTargetNote: document.getElementById("repo-target-note"),
    changeRepo: document.getElementById("btn-change-repo"),
    repoManual: document.getElementById("repo-manual"),
    owner: document.getElementById("cfg-owner"),
    repo: document.getElementById("cfg-repo"),
    branch: document.getElementById("cfg-branch"),
    folder: document.getElementById("cfg-folder"),
    token: document.getElementById("cfg-token"),
    remember: document.getElementById("cfg-remember"),
    message: document.getElementById("cfg-message"),
    verify: document.getElementById("btn-verify"),
    forget: document.getElementById("btn-forget"),
    verifyResult: document.getElementById("verify-result"),
    dropzone: document.getElementById("dropzone"),
    fileInput: document.getElementById("file-input"),
    dropzoneFile: document.getElementById("dropzone-file"),
    upload: document.getElementById("btn-upload"),
    status: document.getElementById("upload-status"),
    log: document.getElementById("upload-log"),
  };

  if (!el.modal || !el.launch) return;

  let selectedFile = null;
  let busy = false;
  let manualMode = false;

  /* ---------------- Destination repository ----------------
     Uploads target the repository hosting this page, so nothing has to be
     typed in. Detection only works on github.io; anywhere else (local dev or
     a custom domain) falls back to the manual fields. */

  const detected = U.detectRepoFromLocation(window.location);

  function applyDetectedRepo() {
    if (detected) {
      el.owner.value = detected.owner;
      el.repo.value = detected.repo;
      el.repoTargetName.textContent = detected.owner + "/" + detected.repo;
      el.repoTargetNote.textContent =
        "This site's own repository — detected automatically. Branch: " +
        (el.branch.value.trim() || "main") + ".";
      el.changeRepo.hidden = false;
      el.repoManual.hidden = true;
      manualMode = false;
    } else {
      el.repoTargetName.textContent = "Repository not detected";
      el.repoTargetNote.textContent =
        "This page isn't served from github.io, so enter the target repository below.";
      el.repoTarget.classList.add("unknown");
      el.changeRepo.hidden = true;
      el.repoManual.hidden = false;
      manualMode = true;
    }
  }

  applyDetectedRepo();

  el.changeRepo.addEventListener("click", () => {
    manualMode = true;
    el.repoManual.hidden = false;
    el.changeRepo.hidden = true;
    el.repoTargetNote.textContent = "Using the values below instead of the detected repository.";
    el.owner.focus();
  });

  /* ---------------- Admin visibility ---------------- */

  function isAdminRequested() {
    return window.location.hash.toLowerCase() === "#admin" ||
      new URLSearchParams(window.location.search).get("admin") === "1";
  }

  function enableAdmin() {
    el.launch.hidden = false;
  }

  if (isAdminRequested()) enableAdmin();
  window.addEventListener("hashchange", () => {
    if (isAdminRequested()) enableAdmin();
  });

  document.addEventListener("keydown", (event) => {
    const combo = (event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "u";
    if (combo) {
      event.preventDefault();
      enableAdmin();
      openModal();
    }
    if (event.key === "Escape" && !el.modal.hidden) closeModal();
  });

  /* ---------------- Modal open/close ---------------- */

  function openModal() {
    el.modal.hidden = false;
    document.body.style.overflow = "hidden";
    el.owner.focus();
  }

  function closeModal() {
    if (busy) return;
    el.modal.hidden = true;
    document.body.style.overflow = "";
  }

  el.launch.addEventListener("click", openModal);
  el.modal.querySelectorAll("[data-close-upload]").forEach((node) => {
    node.addEventListener("click", closeModal);
  });

  /* ---------------- Persisted settings ---------------- */

  function loadConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");
      // Detected repositories win; saved values only fill the manual fallback.
      if (!detected) {
        if (saved.owner) el.owner.value = saved.owner;
        if (saved.repo) el.repo.value = saved.repo;
      }
      if (saved.branch) el.branch.value = saved.branch;
    } catch (_) {
      /* ignore malformed storage */
    }
    const storedToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      el.token.value = storedToken;
      el.remember.checked = !!localStorage.getItem(TOKEN_KEY);
    }
  }

  function saveConfig() {
    // The destination folder is intentionally not persisted: it belongs to a
    // single archive and is re-suggested from each new file name.
    try {
      localStorage.setItem(
        CONFIG_KEY,
        JSON.stringify({
          owner: el.owner.value.trim(),
          repo: el.repo.value.trim(),
          branch: el.branch.value.trim(),
        })
      );
    } catch (_) {
      /* storage may be unavailable in private mode */
    }
  }

  function persistToken() {
    const token = el.token.value.trim();
    if (!token) return;
    try {
      if (el.remember.checked) {
        localStorage.setItem(TOKEN_KEY, token);
        sessionStorage.removeItem(TOKEN_KEY);
      } else {
        sessionStorage.setItem(TOKEN_KEY, token);
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (_) {
      /* ignore */
    }
  }

  [el.owner, el.repo, el.branch, el.folder].forEach((input) => {
    input.addEventListener("change", saveConfig);
  });
  el.token.addEventListener("change", persistToken);
  el.remember.addEventListener("change", persistToken);

  el.forget.addEventListener("click", () => {
    el.token.value = "";
    el.remember.checked = false;
    try {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (_) {
      /* ignore */
    }
    setVerifyResult("Token cleared from this browser.", "ok");
  });

  loadConfig();

  /* ---------------- Logging helpers ---------------- */

  function resetLog() {
    el.log.hidden = false;
    el.log.textContent = "";
  }

  function log(message, kind) {
    const line = document.createElement("div");
    line.className = "log-line" + (kind ? " log-" + kind : "");
    line.textContent = message;
    el.log.appendChild(line);
    el.log.scrollTop = el.log.scrollHeight;
  }

  function setStatus(message, kind) {
    el.status.textContent = message || "";
    el.status.className = "upload-status" + (kind ? " status-" + kind : "");
  }

  function setVerifyResult(message, kind) {
    el.verifyResult.textContent = message || "";
    el.verifyResult.className = "verify-result" + (kind ? " status-" + kind : "");
  }

  /* ---------------- Form reading ---------------- */

  function readForm() {
    const owner = el.owner.value.trim();
    const repo = el.repo.value.trim();
    const branch = el.branch.value.trim() || "main";
    const token = el.token.value.trim();
    const rawFolder = el.folder.value.trim();
    const folder = U.sanitizeTargetFolder(rawFolder);
    const mode = document.querySelector('input[name="upload-mode"]:checked').value;
    return { owner, repo, branch, token, folder, rawFolder, mode };
  }

  /**
   * When the repository was detected we never asked for a branch, so resolve
   * the repository's real default branch rather than assuming "main".
   */
  let resolvedDefaultBranch = null;

  async function resolveBranch(form) {
    if (manualMode) return form.branch;
    if (resolvedDefaultBranch) return resolvedDefaultBranch;
    try {
      const info = await U.verifyAccess({ owner: form.owner, repo: form.repo, token: form.token });
      resolvedDefaultBranch = info.defaultBranch || form.branch;
    } catch (_) {
      resolvedDefaultBranch = form.branch;
    }
    return resolvedDefaultBranch;
  }

  function validate(form, requireFile) {
    if (!form.owner) return "Enter the repository owner.";
    if (!form.repo) return "Enter the repository name.";
    if (!form.token) return "Enter a GitHub personal access token.";
    if (form.folder === null) return 'Folder path is invalid — ".." segments are not allowed.';
    if (requireFile && !selectedFile) return "Choose a .zip file first.";
    return null;
  }

  function refreshUploadButton() {
    const form = readForm();
    el.upload.disabled = busy || !!validate(form, true);
  }

  [el.owner, el.repo, el.branch, el.folder, el.token].forEach((input) => {
    input.addEventListener("input", refreshUploadButton);
  });

  // A stale verification result must not linger once the target changes.
  [el.owner, el.repo, el.token].forEach((input) => {
    input.addEventListener("input", () => {
      setVerifyResult("");
      resolvedDefaultBranch = null;
    });
  });

  /* ---------------- File selection ---------------- */

  function acceptFile(file) {
    if (!file) return;
    if (!/\.zip$/i.test(file.name)) {
      setStatus("Only .zip archives are supported.", "error");
      return;
    }
    selectedFile = file;
    el.dropzoneFile.textContent = file.name + " · " + U.formatBytes(file.size);
    el.dropzone.classList.add("has-file");
    if (!el.message.value.trim()) {
      el.message.value = "Add " + U.slugify(file.name) + " via upload console";
    }
    if (!el.folder.value.trim()) {
      el.folder.value = "projects/" + U.slugify(file.name);
    }
    setStatus("");
    refreshUploadButton();
  }

  el.dropzone.addEventListener("click", () => el.fileInput.click());
  el.dropzone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      el.fileInput.click();
    }
  });
  el.fileInput.addEventListener("change", (event) => acceptFile(event.target.files[0]));

  ["dragenter", "dragover"].forEach((type) => {
    el.dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      el.dropzone.classList.add("dragging");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    el.dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      el.dropzone.classList.remove("dragging");
    });
  });
  el.dropzone.addEventListener("drop", (event) => {
    const file = event.dataTransfer && event.dataTransfer.files[0];
    acceptFile(file);
  });

  /* ---------------- Verify access ---------------- */

  el.verify.addEventListener("click", async () => {
    const form = readForm();
    const problem = validate(form, false);
    if (problem) {
      setVerifyResult(problem, "error");
      return;
    }
    persistToken();
    saveConfig();
    el.verify.disabled = true;
    setVerifyResult("Checking…", "");
    try {
      const info = await U.verifyAccess({ owner: form.owner, repo: form.repo, token: form.token });
      if (!info.canPush) {
        setVerifyResult(
          "Connected, but this token cannot write to " + form.owner + "/" + form.repo +
            ". Grant Contents: Read and write.",
          "error"
        );
      } else {
        resolvedDefaultBranch = info.defaultBranch;
        if (!manualMode) {
          el.repoTargetNote.textContent =
            "This site's own repository — detected automatically. Branch: " +
            info.defaultBranch + ".";
        }
        setVerifyResult(
          "✓ Write access confirmed for " + form.owner + "/" + form.repo +
            " (branch: " + info.defaultBranch + ").",
          "ok"
        );
      }
    } catch (error) {
      setVerifyResult(error.message, "error");
    } finally {
      el.verify.disabled = false;
    }
  });

  /* ---------------- Upload ---------------- */

  async function buildFileList(form) {
    if (form.mode === "raw") {
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const path = U.joinRepoPath(form.folder || "", selectedFile.name);
      log("Committing archive as " + path);
      return { files: [{ path: path, bytes: bytes }], skipped: [], warnings: [] };
    }

    log("Reading archive…");
    const entries = await U.readZip(selectedFile, window.JSZip);
    log("Found " + entries.length + " file(s) inside the archive.");

    const plan = U.planCommitFiles(entries, { targetFolder: form.folder || "" });
    if (plan.strippedRoot) {
      log('Removed wrapper folder "' + plan.strippedRoot + '" from paths.');
    } else {
      log("Archive has multiple top-level entries — paths kept as they are.");
    }
    plan.skipped.forEach((item) => log("Skipped " + item.path + " — " + item.reason, "warn"));
    plan.warnings.forEach((warning) => log(warning, "warn"));
    if (plan.files.length) {
      log("Destination example: " + plan.files[0].path);
    }
    return plan;
  }

  el.upload.addEventListener("click", async () => {
    const form = readForm();
    const problem = validate(form, true);
    if (problem) {
      setStatus(problem, "error");
      return;
    }

    busy = true;
    el.upload.disabled = true;
    persistToken();
    saveConfig();
    resetLog();
    setStatus("Working…", "busy");

    try {
      const plan = await buildFileList(form);
      if (!plan.files.length) {
        throw new Error("Nothing to commit — every entry in the archive was skipped.");
      }

      const total = plan.files.reduce((sum, file) => sum + (file.size || file.bytes.length), 0);
      log("Committing " + plan.files.length + " file(s), " + U.formatBytes(total) + " total.");

      const branch = await resolveBranch(form);

      const result = await U.commitFiles({
        owner: form.owner,
        repo: form.repo,
        branch: branch,
        token: form.token,
        message: el.message.value.trim() || "Upload files via upload console",
        files: plan.files,
        onProgress: (update) => {
          if (update.stage === "blob") {
            setStatus("Uploading " + update.current + " / " + update.total + "…", "busy");
            log(update.message);
          } else {
            setStatus(update.message, "busy");
            log(update.message);
          }
        },
      });

      setStatus("✓ Committed " + result.fileCount + " file(s).", "ok");
      const link = document.createElement("a");
      link.href = result.htmlUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View commit " + result.sha.slice(0, 7) + " on GitHub →";
      link.className = "log-link";
      el.log.appendChild(link);
      el.log.scrollTop = el.log.scrollHeight;
    } catch (error) {
      setStatus("Upload failed.", "error");
      log(error.message, "error");
    } finally {
      busy = false;
      refreshUploadButton();
    }
  });

  refreshUploadButton();
})();
