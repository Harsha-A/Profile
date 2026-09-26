/* Node test harness for the uploader's pure logic + mocked GitHub API flow. */
const assert = require("assert");
const path = require("path");
const U = require(path.join(__dirname, "..", "assets", "js", "uploader.js"));

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log("  ok  " + name);
  } catch (err) {
    console.error("  FAIL  " + name + "\n        " + err.message);
    process.exitCode = 1;
  }
}

console.log("\nslugify");
test("normalizes messy names", () => {
  assert.strictEqual(U.slugify("  My Cool Project!.zip "), "my-cool-project");
});
test("handles empty input", () => {
  assert.strictEqual(U.slugify(""), "");
});

console.log("\nsanitizeEntryPath (zip-slip guard)");
test("rejects parent traversal", () => {
  assert.strictEqual(U.sanitizeEntryPath("../../etc/passwd"), null);
});
test("rejects nested traversal", () => {
  assert.strictEqual(U.sanitizeEntryPath("a/b/../../../evil.txt"), null);
});
test("rejects absolute paths", () => {
  assert.strictEqual(U.sanitizeEntryPath("/etc/passwd"), null);
});
test("rejects windows drive paths", () => {
  assert.strictEqual(U.sanitizeEntryPath("C:/Windows/system32"), null);
});
test("rejects backslash traversal", () => {
  assert.strictEqual(U.sanitizeEntryPath("..\\..\\evil.txt"), null);
});
test("rejects null bytes", () => {
  assert.strictEqual(U.sanitizeEntryPath("good/\0bad.txt"), null);
});
test("normalizes backslashes and dot segments", () => {
  assert.strictEqual(U.sanitizeEntryPath("src\\./app//index.js"), "src/app/index.js");
});
test("accepts a normal path", () => {
  assert.strictEqual(U.sanitizeEntryPath("src/index.js"), "src/index.js");
});

console.log("\nisIgnoredPath");
test("ignores macOS metadata", () => {
  assert.ok(U.isIgnoredPath("__MACOSX/._thing"));
  assert.ok(U.isIgnoredPath("folder/.DS_Store"));
});
test("ignores nested .git internals", () => {
  assert.ok(U.isIgnoredPath("proj/.git/config"));
});
test("keeps real files", () => {
  assert.strictEqual(U.isIgnoredPath("src/index.js"), false);
});

console.log("\ndetectCommonRoot");
test("detects a single wrapper folder", () => {
  assert.strictEqual(U.detectCommonRoot(["app/src/a.js", "app/README.md"]), "app");
});
test("returns empty when roots differ", () => {
  assert.strictEqual(U.detectCommonRoot(["app/a.js", "docs/b.md"]), "");
});
test("returns empty for top level files", () => {
  assert.strictEqual(U.detectCommonRoot(["a.js", "app/b.js"]), "");
});

console.log("\njoinRepoPath");
test("joins and collapses slashes", () => {
  assert.strictEqual(U.joinRepoPath("projects/", "/my-app", "src/a.js"), "projects/my-app/src/a.js");
});
test("skips empty segments", () => {
  assert.strictEqual(U.joinRepoPath("", "src/a.js"), "src/a.js");
});

console.log("\nbytesToBase64");
test("round-trips binary data", () => {
  const bytes = new Uint8Array([0, 1, 2, 250, 251, 255, 65, 66]);
  const b64 = U.bytesToBase64(bytes);
  assert.deepStrictEqual(Array.from(Buffer.from(b64, "base64")), Array.from(bytes));
});
test("handles data larger than one chunk", () => {
  const bytes = new Uint8Array(100000).map((_, i) => i % 256);
  const b64 = U.bytesToBase64(bytes);
  assert.strictEqual(Buffer.from(b64, "base64").length, 100000);
});

console.log("\nplanCommitFiles");
test("strips wrapper folder and applies target folder", () => {
  const result = U.planCommitFiles(
    [
      { path: "my-app/src/index.js", bytes: new Uint8Array([1]) },
      { path: "my-app/README.md", bytes: new Uint8Array([2]) },
    ],
    { targetFolder: "projects/my-app" }
  );
  assert.strictEqual(result.strippedRoot, "my-app");
  assert.deepStrictEqual(
    result.files.map((f) => f.path).sort(),
    ["projects/my-app/README.md", "projects/my-app/src/index.js"]
  );
});
test("drops unsafe and ignored entries", () => {
  const result = U.planCommitFiles(
    [
      { path: "app/ok.js", bytes: new Uint8Array([1]) },
      { path: "../../evil.sh", bytes: new Uint8Array([2]) },
      { path: "__MACOSX/._junk", bytes: new Uint8Array([3]) },
      { path: "app/.DS_Store", bytes: new Uint8Array([4]) },
    ],
    { targetFolder: "" }
  );
  assert.deepStrictEqual(result.files.map((f) => f.path), ["ok.js"]);
  assert.strictEqual(result.skipped.length, 3);
});
test("keeps structure when stripRoot disabled", () => {
  const result = U.planCommitFiles([{ path: "app/a.js", bytes: new Uint8Array([1]) }], {
    targetFolder: "uploads",
    stripRoot: false,
  });
  assert.deepStrictEqual(result.files.map((f) => f.path), ["uploads/app/a.js"]);
});
test("rejects duplicate destination paths", () => {
  const result = U.planCommitFiles(
    [
      { path: "a/x.js", bytes: new Uint8Array([1]) },
      { path: "a/./x.js", bytes: new Uint8Array([2]) },
    ],
    { targetFolder: "" }
  );
  assert.strictEqual(result.files.length, 1);
  assert.ok(result.skipped.some((s) => s.reason === "duplicate destination path"));
});

console.log("\nsanitizeTargetFolder");
test("rejects traversal in user-supplied folder", () => {
  assert.strictEqual(U.sanitizeTargetFolder("../secrets"), null);
});
test("accepts a normal folder", () => {
  assert.strictEqual(U.sanitizeTargetFolder("projects/app/"), "projects/app");
});

console.log("\ndetectRepoFromLocation");
test("detects a project site", () => {
  assert.deepStrictEqual(
    U.detectRepoFromLocation({ hostname: "harsha-a.github.io", pathname: "/profile-page/" }),
    { owner: "harsha-a", repo: "profile-page", isProjectSite: true }
  );
});
test("detects a project site with a file path", () => {
  assert.deepStrictEqual(
    U.detectRepoFromLocation({ hostname: "harsha-a.github.io", pathname: "/profile-page/index.html" }),
    { owner: "harsha-a", repo: "profile-page", isProjectSite: true }
  );
});
test("detects a user root site", () => {
  assert.deepStrictEqual(
    U.detectRepoFromLocation({ hostname: "harsha-a.github.io", pathname: "/" }),
    { owner: "harsha-a", repo: "harsha-a.github.io", isProjectSite: false }
  );
});
test("treats a root index.html as the user site, not a repo", () => {
  assert.deepStrictEqual(
    U.detectRepoFromLocation({ hostname: "harsha-a.github.io", pathname: "/index.html" }),
    { owner: "harsha-a", repo: "harsha-a.github.io", isProjectSite: false }
  );
});
test("returns null for localhost and custom domains", () => {
  assert.strictEqual(U.detectRepoFromLocation({ hostname: "localhost", pathname: "/" }), null);
  assert.strictEqual(U.detectRepoFromLocation({ hostname: "example.com", pathname: "/" }), null);
  assert.strictEqual(U.detectRepoFromLocation(null), null);
});

console.log("\ndescribeFailure");
test("explains 401 and 403 clearly", () => {
  assert.ok(U.describeFailure(401, {}).includes("token is invalid"));
  assert.ok(U.describeFailure(403, { message: "API rate limit exceeded" }).includes("rate limit"));
  assert.ok(U.describeFailure(403, { message: "" }).includes("Permission denied"));
});

/* ---------- Mocked end-to-end commit flow ---------- */
function makeMockClient(recorder) {
  return {
    request: async (method, url, body) => {
      recorder.push({ method, url, body });
      if (method === "GET" && url.includes("/git/ref/heads/")) {
        return { object: { sha: "HEADSHA" } };
      }
      if (method === "GET" && url.includes("/git/commits/")) {
        return { tree: { sha: "BASETREE" } };
      }
      if (method === "POST" && url.endsWith("/git/blobs")) {
        return { sha: "blob-" + recorder.filter((r) => r.url.endsWith("/git/blobs")).length };
      }
      if (method === "POST" && url.endsWith("/git/trees")) {
        return { sha: "NEWTREE" };
      }
      if (method === "POST" && url.endsWith("/git/commits")) {
        return { sha: "NEWCOMMIT", html_url: "https://github.com/o/r/commit/NEWCOMMIT" };
      }
      if (method === "PATCH" && url.includes("/git/refs/heads/")) {
        return { object: { sha: "NEWCOMMIT" } };
      }
      throw new Error("Unexpected request: " + method + " " + url);
    },
  };
}

(async () => {
  console.log("\ncommitFiles (mocked GitHub API)");
  const calls = [];
  const result = await U.commitFiles({
    owner: "Harsha-A",
    repo: "profile-page",
    branch: "main",
    message: "Add project",
    client: makeMockClient(calls),
    files: [
      { path: "projects/app/index.js", bytes: new Uint8Array([104, 105]) },
      { path: "projects/app/style.css", bytes: new Uint8Array([98, 99]) },
    ],
  });

  test("returns the new commit", () => {
    assert.strictEqual(result.sha, "NEWCOMMIT");
    assert.strictEqual(result.fileCount, 2);
    assert.ok(result.htmlUrl.includes("NEWCOMMIT"));
  });

  test("performs the correct API sequence", () => {
    const seq = calls.map((c) => c.method + " " + c.url.replace(/^\/repos\/[^/]+\/[^/]+/, ""));
    assert.deepStrictEqual(seq, [
      "GET /git/ref/heads/main",
      "GET /git/commits/HEADSHA",
      "POST /git/blobs",
      "POST /git/blobs",
      "POST /git/trees",
      "POST /git/commits",
      "PATCH /git/refs/heads/main",
    ]);
  });

  test("sends base64-encoded blob content", () => {
    const blob = calls.find((c) => c.url.endsWith("/git/blobs"));
    assert.strictEqual(blob.body.encoding, "base64");
    assert.strictEqual(Buffer.from(blob.body.content, "base64").toString(), "hi");
  });

  test("builds tree on top of the base tree with one parent", () => {
    const tree = calls.find((c) => c.url.endsWith("/git/trees"));
    assert.strictEqual(tree.body.base_tree, "BASETREE");
    assert.strictEqual(tree.body.tree.length, 2);
    assert.strictEqual(tree.body.tree[0].mode, "100644");
    const commit = calls.find((c) => c.url.endsWith("/git/commits") && c.method === "POST");
    assert.deepStrictEqual(commit.body.parents, ["HEADSHA"]);
    assert.strictEqual(commit.body.tree, "NEWTREE");
  });

  await U.commitFiles({
    owner: "o",
    repo: "r",
    branch: "main",
    files: [],
    client: makeMockClient([]),
  }).then(
    () => {
      console.error("  FAIL  empty file list should reject");
      process.exitCode = 1;
    },
    () => {
      passed += 1;
      console.log("  ok  empty file list rejects");
    }
  );

  console.log("\nHTTP error mapping");
  const failingClient = U.createClient({
    token: "x",
    fetchImpl: async () =>
      new Response(JSON.stringify({ message: "Resource not accessible by personal access token" }), {
        status: 403,
      }),
  });
  let caught = null;
  try {
    await failingClient.request("GET", "/repos/o/r");
  } catch (e) {
    caught = e;
  }
  test("maps a 403 response to a helpful message", () => {
    assert.ok(caught, "expected the request to throw");
    assert.strictEqual(caught.status, 403);
    assert.ok(caught.message.includes("Permission denied"));
  });

  console.log("\n" + passed + " checks passed" + (process.exitCode ? " (with failures)" : ""));
})();
