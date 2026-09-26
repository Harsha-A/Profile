# Harsha Anantharamu — Profile Page 🚀

A dark, space-themed single-page personal profile site — animated starfield,
drifting rocket, orbiting planets, and a hidden dinosaur easter-egg. Built
with plain HTML, CSS, and JavaScript (no build tools required), ready to
deploy directly on GitHub Pages.

It also ships a private **upload console** that commits `.zip` files straight
to a GitHub repository from the browser — see
[Upload console](#-upload-console-commit-a-zip-to-github-from-the-browser).

## Sections

- **Hero** — name, role, and tech tagline
- **About** — avatar, current role, location, skill badges, social links
- **Experience** — animated timeline (Nike, ITC Infotech, Mphasis)
- **Education** — SDM Institute of Technology (SDMIT), Ujire
- **Projects** — placeholder cards ready for real project content
- **Contact / Footer** — social links

## Local preview

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

This is a plain static site — no build step, no framework, all asset paths are
relative — so it works from a project site (`user.github.io/repo/`) or a user
site (`user.github.io/`) without changes.

### 1. Create the repository

Create an **empty public repository** on GitHub (no README, no .gitignore —
this folder already has them).

> The upload console commits into **this same repository**, and it needs an
> existing branch to commit onto, so push at least once before using it.

### 2. Push this folder

```bash
git init
git add .
git commit -m "Initial commit: space-themed profile page"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 3. Turn on Pages

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

That's it. The included workflow (`.github/workflows/deploy.yml`) runs the unit
tests and then publishes the site on every push to `main`. Watch it under the
**Actions** tab; the first run takes a minute or two.

<details>
<summary>Prefer not to use Actions?</summary>

Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
The included `.nojekyll` file is what makes this safe — see below.
</details>

### 4. Update the canonical URLs

Social previews and `robots.txt` need absolute URLs, which can't be guessed at
runtime. If your repository is **not** named `profile-page`, update the URLs in:

- `index.html` — the `canonical`, `og:url`, `og:image` and `twitter:image` tags
- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — the `<loc>` value

Your site will be live at `https://<your-username>.github.io/<repo-name>/`
(or `https://<your-username>.github.io/` if the repo is named
`<your-username>.github.io`).

### Deployment files, and why they exist

| File | Why it matters |
| --- | --- |
| `.nojekyll` | **Important.** GitHub Pages runs Jekyll by default, which *silently discards* files and folders beginning with an underscore. Uploaded projects often contain `_next/`, `_assets/` or `_app/`, and would break without this file. |
| `.github/workflows/deploy.yml` | Tests, then deploys. Deploying via Actions also bypasses Jekyll entirely. |
| `404.html` | Themed "Lost in space" page. Fully self-contained (inlined CSS), because Pages serves it for *any* missing path and relative URLs would break on deep ones. Its home link probes the real site root, so it works on both project and user sites. |
| `robots.txt` / `sitemap.xml` | Lets crawlers index the page. |

### Using a custom domain

Add a `CNAME` file containing just your domain (e.g. `harsha.dev`), set it
under **Settings → Pages → Custom domain**, and update the absolute URLs from
step 4. Note that the upload console can't auto-detect the repository on a
custom domain — it falls back to manual Owner/Repository fields.

## Adding real projects

Open `index.html` and find the `<!-- PROJECTS -->` section. Each
`.project-card` block currently has placeholder text, tags, and disabled
links — replace the icon, title, description, tags, and the two
`<span class="link-disabled">` elements with real `<a>` links (Live Demo /
Source Code) as you build things.

## Files

```
index.html          — page structure & content
404.html            — themed not-found page (self-contained)
styles.css          — dark space theme, layout, animations
script.js           — starfield canvas, scroll reveal, nav toggle, dino egg
assets/img/         — profile photo
assets/icons/       — favicon
assets/js/          — uploader logic + upload console UI
assets/vendor/      — JSZip (MIT), vendored locally
tests/              — Node tests for the uploader logic
.github/workflows/  — GitHub Pages deploy workflow
.nojekyll           — stops Jekyll eating files that start with "_"
robots.txt          — crawler rules
sitemap.xml         — sitemap for search engines
```

## 📦 Upload console (commit a .zip to GitHub from the browser)

The page includes a private admin console that takes a `.zip` and commits its
contents straight into **the very repository that hosts this site** — no
server, no local git needed.

### Opening it

The console is hidden from normal visitors. Reveal it with either:

- add `#admin` to the URL — `https://<your-site>/#admin`, or
- press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd>

A **📦 Upload** button then appears in the bottom-left corner.

### One-time token setup

A token is required even though uploads go to this site's own repository:
GitHub Pages is static hosting with no backend, and the browser has no GitHub
credentials of its own, so committing needs an authenticated API call.

Direct link: <https://github.com/settings/personal-access-tokens/new>
(or **GitHub → avatar → Settings → Developer settings → Personal access
tokens → Fine-grained tokens → Generate new token**).

1. **Token name**: something recognisable, e.g. `profile-page-uploads`.
2. **Expiration**: 90 days is a sensible default — regenerate when it lapses.
3. **Repository access**: *Only select repositories* → pick the repository
   that hosts this site (the same one uploads are committed to).
4. **Permissions → Repository permissions → Contents: Read and write.**
   (That single permission is all this needs — don't grant more.)
5. Click **Generate token** and copy it. GitHub shows it **only once**.
6. Paste it into the console's **GitHub token** field and click
   **Verify access** — it should confirm write access.

Tick *Remember on this device* to keep it in `localStorage`; leave it
unticked and the token lives in `sessionStorage` only, so it is gone when you
close the tab. **Forget token** clears both.

### Where uploads go

The console works out the destination repository **automatically** from the
page's own URL, so there is nothing to type:

| Site URL | Detected repository |
| --- | --- |
| `https://you.github.io/my-site/` | `you/my-site` |
| `https://you.github.io/` | `you/you.github.io` |

The detected repository is shown at the top of the console. Its **default
branch** is read from the GitHub API when you upload, so repos on `main`,
`master` or `gh-pages` all work without configuration.

Press **Change** if you ever want to target a different repository — that
reveals manual **Owner**, **Repository** and **Branch** fields. Those same
fields appear automatically when the page is *not* served from `github.io`
(for example on `localhost` or a custom domain), since detection isn't
possible there.

### Uploading

1. Confirm the detected repository and set the **Folder in repo**
   (auto-suggested from the zip's file name).
2. Drop a `.zip` onto the dropzone, or click to browse.
3. Pick a mode:
   - **Extract zip & commit its files** *(default)* — unpacks the archive and
     commits each file. A single wrapper folder inside the zip is removed, so
     `my-app/src/a.js` lands as `<folder>/src/a.js`.
   - **Commit the .zip file as-is** — commits the archive itself as one file.
4. Click **Commit to GitHub**. The progress log shows every step and links to
   the resulting commit.

Everything lands in **one atomic commit** via GitHub's Git Data API
(blobs → tree → commit → ref update), so the branch is never left half-updated.

### Safety behaviour

- Rejects path traversal (`../`), absolute paths and Windows drive paths, so a
  malicious archive cannot write outside the target folder.
- Skips `__MACOSX/`, `.DS_Store`, `Thumbs.db` and any `.git/` internals.
- Skips files over GitHub's 100 MB blob limit and warns about large ones.
- Rejects duplicate destination paths instead of silently dropping a file.
- Surfaces clear messages for invalid tokens, missing permissions, rate limits
  and branch protection rules.

### Security notes

- **No secret is stored in this repository.** The token is typed at runtime and
  kept only in your own browser.
- Requests go directly from your browser to `api.github.com`; nothing is
  proxied through a third party.
- Because the token lives in the browser, only enter it on a device you trust,
  and prefer a fine-grained token scoped to the single target repository.
- Anyone can *open* the console, but without a valid token it cannot do
  anything — the `#admin` gate is for tidiness, not security.

## Tests

The uploader's logic (path sanitization, archive planning, base64 encoding and
the full commit sequence against a mocked GitHub API) is covered by tests:

```bash
npm test          # or: node tests/uploader.test.js
```

## Easter egg 🦖

There's a small dinosaur hiding in the bottom-right corner of the screen —
give it a click.
