// Service worker shell. Every routing decision is delegated to the pure
// `chooseStrategy` in ./cache-strategy.js; this file only moves bytes.
//
// It is not bundled by Vite. scripts/vite-plugin-pwa.js inlines
// cache-strategy.js in place of the import below, substitutes the
// build-time constants, and emits the result as `<base>/sw.js` so the SW's
// scope covers the whole app. The output is a classic script, so it works
// in browsers without module-worker support for service workers.
// Pure routing policy for the service worker. No `self`, no DOM, no SW
// globals, no app imports: scripts/vite-plugin-pwa.js inlines this file into
// the emitted sw.js verbatim (minus `export`), and tests import it directly.

/**
 * Every cache this app creates starts with this. The SW and the Settings
 * escape hatch additionally namespace by base path (see `cacheNamespace`)
 * because a GitHub Pages origin (`<user>.github.io`) is shared by every
 * project site the user publishes; touching another site's caches would be
 * a cross-app bug.
 */
const CACHE_PREFIX = 'judge-pwa:';

/** `judge-pwa:/Judge/:` — the prefix owned by one deployment of the app. */
function cacheNamespace(basePath = '/') {
  return `${CACHE_PREFIX}${basePath}:`;
}

// Vite emits `<name>-<hash>.<ext>`, the hash being 8+ base64url chars.
const HASHED_FILE = /-([A-Za-z0-9_-]{8,})\.[A-Za-z0-9]+$/;

/**
 * True when the last path segment carries a Vite content hash.
 *
 * The segment must also contain a digit, an uppercase letter, or `_`. Without
 * that guard an ordinary hyphenated word (`vite-plugin-problems.js`,
 * `-overview.png`) would be treated as immutable and served stale forever.
 * The cost of the guard is that a hash made only of lowercase letters is
 * treated as unhashed — a harmless false negative (network-first still falls
 * back to the precached copy offline), whereas a false positive would pin a
 * mutable file.
 */
function isHashedAsset(pathname) {
  if (typeof pathname !== 'string') return false;
  const file = pathname.split('?')[0].split('#')[0].split('/').pop() ?? '';
  const match = HASHED_FILE.exec(file);
  if (!match) return false;
  return /[0-9A-Z_]/.test(match[1]);
}

function isDocument(pathname) {
  return pathname.endsWith('/') || pathname.endsWith('/index.html') || pathname === 'index.html';
}

/**
 * Decides how the service worker treats one request. Rules are evaluated in
 * order; the first match wins.
 *
 * @param {string|URL} url
 * @param {{origin?: string, method?: string}} [options]
 * @returns {'precache'|'network-first'|'network-only'|'bypass'}
 */
function chooseStrategy(url, { origin, method = 'GET' } = {}) {
  // 1. Only GET is cacheable. POST/PUT/PATCH/DELETE carry side effects and
  //    request bodies (GitHub commits, sync writes); answering one from cache
  //    would lie to the caller about whether the write happened.
  if (String(method).toUpperCase() !== 'GET') return 'bypass';

  let parsed;
  try {
    parsed = new URL(String(url), origin);
  } catch {
    // Unparseable input: do not touch it, let the browser handle it.
    return 'bypass';
  }

  // 2. Cross-origin (api.github.com, raw.githubusercontent.com, CDNs) never
  //    enters Cache Storage. GitHub API responses are fetched with a bearer
  //    token and can contain private repo data; persisting them would outlive
  //    the token and be readable by any script on this origin.
  if (!origin || parsed.origin !== origin) return 'network-only';

  // 3. The document is the one unhashed entry point and is how a new build
  //    is discovered: it must come from the network whenever possible, with
  //    the cached copy used only when offline.
  if (isDocument(parsed.pathname)) return 'network-first';

  // 4. Content-hashed build output is immutable: a new build produces a new
  //    filename, so serving it cache-first can never be stale. This includes
  //    the judge Worker and Monaco's language workers, without which the app
  //    would load offline but could not judge.
  if (isHashedAsset(parsed.pathname)) return 'precache';

  // 5. Any other same-origin file (manifest, icons, public/ files) can change
  //    without its URL changing, so prefer the network and fall back to cache.
  return 'network-first';
}


// Injected at build time by scripts/vite-plugin-pwa.js.
const CACHE_VERSION = "b64861dd4146";
const BASE_PATH = "/Profile/projects/code-judge/";
const PRECACHE_URLS = [
  "/Profile/projects/code-judge/",
  "/Profile/projects/code-judge/assets/3sum-cs3uFvfX.js",
  "/Profile/projects/code-judge/assets/4sum-0wlHBGFr.js",
  "/Profile/projects/code-judge/assets/accounts-merge-S47uz3ni.js",
  "/Profile/projects/code-judge/assets/add-binary-CJa4jTlo.js",
  "/Profile/projects/code-judge/assets/add-two-numbers-BitdEkM-.js",
  "/Profile/projects/code-judge/assets/alien-dictionary-fq2cBA4T.js",
  "/Profile/projects/code-judge/assets/asteroid-collision-CwjiBzS6.js",
  "/Profile/projects/code-judge/assets/balanced-binary-tree-CsAJu491.js",
  "/Profile/projects/code-judge/assets/baseball-game-IF1KlKGo.js",
  "/Profile/projects/code-judge/assets/best-time-to-buy-and-sell-stock-1FJxnHvU.js",
  "/Profile/projects/code-judge/assets/best-time-to-buy-and-sell-stock-ii-D9zkgghG.js",
  "/Profile/projects/code-judge/assets/best-time-to-buy-and-sell-stock-with-cooldown-CkO7JLGi.js",
  "/Profile/projects/code-judge/assets/binary-search-Dx49p69a.js",
  "/Profile/projects/code-judge/assets/binary-tree-inorder-traversal-CRkuz6QY.js",
  "/Profile/projects/code-judge/assets/binary-tree-level-order-traversal-Z6CYsh6z.js",
  "/Profile/projects/code-judge/assets/binary-tree-maximum-path-sum-CJh7OROx.js",
  "/Profile/projects/code-judge/assets/binary-tree-postorder-traversal-E5tRp5pd.js",
  "/Profile/projects/code-judge/assets/binary-tree-preorder-traversal-CP6I3vXG.js",
  "/Profile/projects/code-judge/assets/binary-tree-right-side-view-C0_aeiMD.js",
  "/Profile/projects/code-judge/assets/bitwise-and-of-numbers-range-CY0KGkRO.js",
  "/Profile/projects/code-judge/assets/boats-to-save-people-CaQ221Js.js",
  "/Profile/projects/code-judge/assets/build-a-matrix-with-conditions-DijJowqi.js",
  "/Profile/projects/code-judge/assets/burst-balloons-CO2abODB.js",
  "/Profile/projects/code-judge/assets/candy-CGW522Qk.js",
  "/Profile/projects/code-judge/assets/capacity-to-ship-packages-within-d-days-7KhHFWUe.js",
  "/Profile/projects/code-judge/assets/car-fleet-CmYjuvmt.js",
  "/Profile/projects/code-judge/assets/car-pooling-btJQTkdF.js",
  "/Profile/projects/code-judge/assets/cheapest-flights-within-k-stops-Dlf8vzOZ.js",
  "/Profile/projects/code-judge/assets/climbing-stairs-CsP8iG9H.js",
  "/Profile/projects/code-judge/assets/clone-graph-tU9yH2u-.js",
  "/Profile/projects/code-judge/assets/coin-change-C4iF6h4s.js",
  "/Profile/projects/code-judge/assets/coin-change-ii-TlgLk64h.js",
  "/Profile/projects/code-judge/assets/combination-sum-CnJ12gdX.js",
  "/Profile/projects/code-judge/assets/combination-sum-ii-CFmWgV5N.js",
  "/Profile/projects/code-judge/assets/combination-sum-iv-DsENi1uK.js",
  "/Profile/projects/code-judge/assets/combinations-MltLpf3Z.js",
  "/Profile/projects/code-judge/assets/concatenation-of-array-DtzQdV_n.js",
  "/Profile/projects/code-judge/assets/construct-binary-tree-from-preorder-and-inorder-traversal-kbGqwa8h.js",
  "/Profile/projects/code-judge/assets/container-with-most-water-BjM_CCkZ.js",
  "/Profile/projects/code-judge/assets/contains-duplicate-5nEAtkEe.js",
  "/Profile/projects/code-judge/assets/contains-duplicate-ii-Bo0Ekmu1.js",
  "/Profile/projects/code-judge/assets/count-good-nodes-in-binary-tree-yJ59Hzkj.js",
  "/Profile/projects/code-judge/assets/counting-bits-BKgvsryt.js",
  "/Profile/projects/code-judge/assets/course-schedule-ii-DKsiMpyB.js",
  "/Profile/projects/code-judge/assets/course-schedule-iv-DgNt54J2.js",
  "/Profile/projects/code-judge/assets/course-schedule-uNpJQ4oz.js",
  "/Profile/projects/code-judge/assets/daily-temperatures-CaYu-sMr.js",
  "/Profile/projects/code-judge/assets/decode-string-CjZPAP3c.js",
  "/Profile/projects/code-judge/assets/decode-ways-BojVIp9U.js",
  "/Profile/projects/code-judge/assets/delete-leaves-with-a-given-value-BYIXLC2V.js",
  "/Profile/projects/code-judge/assets/delete-node-in-a-bst-D5Ik6Klo.js",
  "/Profile/projects/code-judge/assets/design-add-and-search-words-data-structure-ChL9vHjU.js",
  "/Profile/projects/code-judge/assets/design-circular-queue-BlH4ji1V.js",
  "/Profile/projects/code-judge/assets/design-hashmap-By0IEFtA.js",
  "/Profile/projects/code-judge/assets/design-hashset-BZWRVR1r.js",
  "/Profile/projects/code-judge/assets/design-twitter-Dobyeu8x.js",
  "/Profile/projects/code-judge/assets/detect-squares-wsCL40jK.js",
  "/Profile/projects/code-judge/assets/diameter-of-binary-tree-1WibajTg.js",
  "/Profile/projects/code-judge/assets/distinct-subsequences-DhXt7Uvu.js",
  "/Profile/projects/code-judge/assets/dota2-senate-8feGZ1tC.js",
  "/Profile/projects/code-judge/assets/edit-distance-BrCjqaQV.js",
  "/Profile/projects/code-judge/assets/editor.worker-Z-F9bRfX.js",
  "/Profile/projects/code-judge/assets/encode-and-decode-strings-WvOFlkPg.js",
  "/Profile/projects/code-judge/assets/evaluate-division-BQXmCID8.js",
  "/Profile/projects/code-judge/assets/evaluate-reverse-polish-notation-DzKGJPc5.js",
  "/Profile/projects/code-judge/assets/excel-sheet-column-title-DoRXL39p.js",
  "/Profile/projects/code-judge/assets/extra-characters-in-a-string-Bk8AOBtY.js",
  "/Profile/projects/code-judge/assets/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree-CoqN0SFq.js",
  "/Profile/projects/code-judge/assets/find-k-closest-elements-B6s1Wbrc.js",
  "/Profile/projects/code-judge/assets/find-median-from-data-stream-C5rUQu9H.js",
  "/Profile/projects/code-judge/assets/find-minimum-in-rotated-sorted-array-yyrs5h_U.js",
  "/Profile/projects/code-judge/assets/find-the-duplicate-number-CyRbB9hK.js",
  "/Profile/projects/code-judge/assets/find-the-town-judge-COR8fw7p.js",
  "/Profile/projects/code-judge/assets/first-missing-positive-D4RlVD8-.js",
  "/Profile/projects/code-judge/assets/gas-station-9Boy9In7.js",
  "/Profile/projects/code-judge/assets/generate-parentheses-CPKEKfua.js",
  "/Profile/projects/code-judge/assets/graph-valid-tree-BGn_xQQH.js",
  "/Profile/projects/code-judge/assets/greatest-common-divisor-of-strings-DuiVDTrk.js",
  "/Profile/projects/code-judge/assets/greatest-common-divisor-traversal-ihBz6NxJ.js",
  "/Profile/projects/code-judge/assets/group-anagrams-Db4ILxsV.js",
  "/Profile/projects/code-judge/assets/hand-of-straights-C_h_Up5K.js",
  "/Profile/projects/code-judge/assets/happy-number-l8doFsBj.js",
  "/Profile/projects/code-judge/assets/house-robber-BbxKZ7Pt.js",
  "/Profile/projects/code-judge/assets/house-robber-ii-CSflih3t.js",
  "/Profile/projects/code-judge/assets/house-robber-iii-RRNzJJid.js",
  "/Profile/projects/code-judge/assets/implement-queue-using-stacks-DEcQfIlY.js",
  "/Profile/projects/code-judge/assets/implement-stack-using-queues-DASea6B3.js",
  "/Profile/projects/code-judge/assets/implement-trie-prefix-tree-DTlpTeh_.js",
  "/Profile/projects/code-judge/assets/index-CcyZkdff.js",
  "/Profile/projects/code-judge/assets/index-D81Z-bof.css",
  "/Profile/projects/code-judge/assets/insert-greatest-common-divisors-in-linked-list-CGdcu0lH.js",
  "/Profile/projects/code-judge/assets/insert-interval-B_b1zRGW.js",
  "/Profile/projects/code-judge/assets/insert-into-a-binary-search-tree-1BHcKH8O.js",
  "/Profile/projects/code-judge/assets/integer-break-DCrBlSkP.js",
  "/Profile/projects/code-judge/assets/interleaving-string-AF8JqKGL.js",
  "/Profile/projects/code-judge/assets/invert-binary-tree-BZy3O8Wr.js",
  "/Profile/projects/code-judge/assets/ipo-B1US_QVU.js",
  "/Profile/projects/code-judge/assets/island-perimeter-gcZocImW.js",
  "/Profile/projects/code-judge/assets/javascript-pe-68biy.js",
  "/Profile/projects/code-judge/assets/jump-game-CFBLBltN.js",
  "/Profile/projects/code-judge/assets/jump-game-ii-ClRAYG1k.js",
  "/Profile/projects/code-judge/assets/jump-game-vii-C462TWjs.js",
  "/Profile/projects/code-judge/assets/k-closest-points-to-origin-BppaZTvP.js",
  "/Profile/projects/code-judge/assets/koko-eating-bananas-BcbLqQSz.js",
  "/Profile/projects/code-judge/assets/kth-largest-element-in-a-stream-BvwSitvy.js",
  "/Profile/projects/code-judge/assets/kth-largest-element-in-an-array-BYQUEkIp.js",
  "/Profile/projects/code-judge/assets/kth-smallest-element-in-a-bst-DaI46dm2.js",
  "/Profile/projects/code-judge/assets/largest-rectangle-in-histogram-qH-S3jHJ.js",
  "/Profile/projects/code-judge/assets/last-stone-weight-YtiV5c93.js",
  "/Profile/projects/code-judge/assets/last-stone-weight-ii-DlLobxkZ.js",
  "/Profile/projects/code-judge/assets/lemonade-change-SmcS926S.js",
  "/Profile/projects/code-judge/assets/letter-combinations-of-a-phone-number-CfBaxdLG.js",
  "/Profile/projects/code-judge/assets/lfu-cache-CvM_jqsq.js",
  "/Profile/projects/code-judge/assets/longest-common-prefix-0F-QtF6M.js",
  "/Profile/projects/code-judge/assets/longest-common-subsequence-DAKSaBqv.js",
  "/Profile/projects/code-judge/assets/longest-consecutive-sequence-CInvtRpb.js",
  "/Profile/projects/code-judge/assets/longest-happy-string-CaG0x4r6.js",
  "/Profile/projects/code-judge/assets/longest-increasing-path-in-a-matrix-DVe8VVYQ.js",
  "/Profile/projects/code-judge/assets/longest-increasing-subsequence-DSzaamFc.js",
  "/Profile/projects/code-judge/assets/longest-palindromic-substring-DmjkNsNe.js",
  "/Profile/projects/code-judge/assets/longest-repeating-character-replacement-Ct2z1uya.js",
  "/Profile/projects/code-judge/assets/longest-substring-without-repeating-characters-DhRISmxt.js",
  "/Profile/projects/code-judge/assets/longest-turbulent-subarray-DUN90uIi.js",
  "/Profile/projects/code-judge/assets/lowest-common-ancestor-of-a-binary-search-tree-DMVQejjS.js",
  "/Profile/projects/code-judge/assets/lru-cache-CdCR7cdb.js",
  "/Profile/projects/code-judge/assets/majority-element-BJoN9YHq.js",
  "/Profile/projects/code-judge/assets/majority-element-ii-BWGsab88.js",
  "/Profile/projects/code-judge/assets/matchsticks-to-square-C66Gjf28.js",
  "/Profile/projects/code-judge/assets/max-area-of-island-iRsryW1D.js",
  "/Profile/projects/code-judge/assets/maximum-depth-of-binary-tree-CJlh2ngY.js",
  "/Profile/projects/code-judge/assets/maximum-frequency-stack-DSixCuFd.js",
  "/Profile/projects/code-judge/assets/maximum-product-subarray-lBURpdWE.js",
  "/Profile/projects/code-judge/assets/maximum-subarray-BT7mc6V1.js",
  "/Profile/projects/code-judge/assets/maximum-sum-circular-subarray-Dt8kfylB.js",
  "/Profile/projects/code-judge/assets/median-of-two-sorted-arrays-BUthPe3e.js",
  "/Profile/projects/code-judge/assets/meeting-rooms-CA6XcNK0.js",
  "/Profile/projects/code-judge/assets/meeting-rooms-ii-rcKHpQmF.js",
  "/Profile/projects/code-judge/assets/meeting-rooms-iii-5fdyGU88.js",
  "/Profile/projects/code-judge/assets/merge-intervals-DYZKWThn.js",
  "/Profile/projects/code-judge/assets/merge-k-sorted-lists-Ds_GR0f1.js",
  "/Profile/projects/code-judge/assets/merge-sorted-array-B4HakYmM.js",
  "/Profile/projects/code-judge/assets/merge-strings-alternately-wUxcSNDc.js",
  "/Profile/projects/code-judge/assets/merge-triplets-to-form-target-triplet-CiABeYMb.js",
  "/Profile/projects/code-judge/assets/merge-two-sorted-lists-BfA9Ycam.js",
  "/Profile/projects/code-judge/assets/min-cost-climbing-stairs-BvFU5yV4.js",
  "/Profile/projects/code-judge/assets/min-cost-to-connect-all-points-BmUrpszK.js",
  "/Profile/projects/code-judge/assets/min-stack-D5qe-klc.js",
  "/Profile/projects/code-judge/assets/minimum-array-end-C9GwUoCN.js",
  "/Profile/projects/code-judge/assets/minimum-height-trees-BKQUW93x.js",
  "/Profile/projects/code-judge/assets/minimum-interval-to-include-each-query-DnZ1JWbg.js",
  "/Profile/projects/code-judge/assets/minimum-path-sum-CPohQ1sb.js",
  "/Profile/projects/code-judge/assets/minimum-size-subarray-sum-KSJrE1-H.js",
  "/Profile/projects/code-judge/assets/minimum-window-substring-D0gGd60i.js",
  "/Profile/projects/code-judge/assets/missing-number-w0WDZfJW.js",
  "/Profile/projects/code-judge/assets/multiply-strings-BAkAt8o4.js",
  "/Profile/projects/code-judge/assets/n-queens-Bu5Ov4Ey.js",
  "/Profile/projects/code-judge/assets/n-queens-ii-Dk-RwlFj.js",
  "/Profile/projects/code-judge/assets/n-th-tribonacci-number-DqIQV2cE.js",
  "/Profile/projects/code-judge/assets/network-delay-time-_lZEGyMx.js",
  "/Profile/projects/code-judge/assets/non-overlapping-intervals-DZw54rZj.js",
  "/Profile/projects/code-judge/assets/number-of-1-bits-bd6lERKs.js",
  "/Profile/projects/code-judge/assets/number-of-connected-components-in-an-undirected-graph-DeNpP35i.js",
  "/Profile/projects/code-judge/assets/number-of-islands-Cus1yfr6.js",
  "/Profile/projects/code-judge/assets/online-stock-span-C7Tr2_yd.js",
  "/Profile/projects/code-judge/assets/open-the-lock-RR0a8yxq.js",
  "/Profile/projects/code-judge/assets/pacific-atlantic-water-flow-C-BTELHP.js",
  "/Profile/projects/code-judge/assets/palindrome-partitioning-DvZ_ZOLP.js",
  "/Profile/projects/code-judge/assets/palindromic-substrings-D01ewNRA.js",
  "/Profile/projects/code-judge/assets/partition-equal-subset-sum-BQBSEs3v.js",
  "/Profile/projects/code-judge/assets/partition-labels-vBh4z31-.js",
  "/Profile/projects/code-judge/assets/partition-to-k-equal-sum-subsets-BDOAGRYv.js",
  "/Profile/projects/code-judge/assets/path-with-minimum-effort-CbNcE_kL.js",
  "/Profile/projects/code-judge/assets/perfect-squares-DfB65pXP.js",
  "/Profile/projects/code-judge/assets/permutation-in-string-YGT2RT1y.js",
  "/Profile/projects/code-judge/assets/permutations-BnU1lkZg.js",
  "/Profile/projects/code-judge/assets/permutations-ii-BNwXcihu.js",
  "/Profile/projects/code-judge/assets/plus-one-ysD0Jt0Q.js",
  "/Profile/projects/code-judge/assets/powx-n-CpQtRIK_.js",
  "/Profile/projects/code-judge/assets/problems.index-Oo6-4mSU.js",
  "/Profile/projects/code-judge/assets/product-of-array-except-self-u_tRLurV.js",
  "/Profile/projects/code-judge/assets/range-sum-query-2d-immutable-6EpYtEQQ.js",
  "/Profile/projects/code-judge/assets/reconstruct-itinerary-CRHbck7o.js",
  "/Profile/projects/code-judge/assets/redundant-connection-CCnnqTJR.js",
  "/Profile/projects/code-judge/assets/regular-expression-matching-KXns9dxy.js",
  "/Profile/projects/code-judge/assets/remove-duplicates-from-sorted-array-Na7_3e4B.js",
  "/Profile/projects/code-judge/assets/remove-element-DBqZpPlY.js",
  "/Profile/projects/code-judge/assets/remove-nth-node-from-end-of-list-55LSrv5k.js",
  "/Profile/projects/code-judge/assets/reorder-list-B4yerHkc.js",
  "/Profile/projects/code-judge/assets/reorganize-string-Ddxfma9l.js",
  "/Profile/projects/code-judge/assets/reverse-bits-w_T6jZxJ.js",
  "/Profile/projects/code-judge/assets/reverse-integer-Dy0wvIIl.js",
  "/Profile/projects/code-judge/assets/reverse-linked-list-C4wq8cJx.js",
  "/Profile/projects/code-judge/assets/reverse-linked-list-ii-C_XH6vK6.js",
  "/Profile/projects/code-judge/assets/reverse-nodes-in-k-group-COuAgAL7.js",
  "/Profile/projects/code-judge/assets/reverse-string-Br136NjK.js",
  "/Profile/projects/code-judge/assets/roman-to-integer-cZDCpfEV.js",
  "/Profile/projects/code-judge/assets/rotate-array-B2mI6QDZ.js",
  "/Profile/projects/code-judge/assets/rotate-image-CPls2BwP.js",
  "/Profile/projects/code-judge/assets/rotting-oranges-DZWw-F9T.js",
  "/Profile/projects/code-judge/assets/same-tree-C7fDbdAN.js",
  "/Profile/projects/code-judge/assets/sandbox-worker-4aLmIa6w.js",
  "/Profile/projects/code-judge/assets/search-a-2d-matrix-mWsFlEOJ.js",
  "/Profile/projects/code-judge/assets/search-in-rotated-sorted-array-PBFjjd8P.js",
  "/Profile/projects/code-judge/assets/search-in-rotated-sorted-array-ii-CH4a8aBf.js",
  "/Profile/projects/code-judge/assets/search-insert-position-C_C2wRPc.js",
  "/Profile/projects/code-judge/assets/serialize-and-deserialize-binary-tree-CZkt5-UK.js",
  "/Profile/projects/code-judge/assets/set-matrix-zeroes-B8HGI_pf.js",
  "/Profile/projects/code-judge/assets/simplify-path-20BuQSJy.js",
  "/Profile/projects/code-judge/assets/single-number-BxoIB_9R.js",
  "/Profile/projects/code-judge/assets/single-threaded-cpu-yBuXIPYg.js",
  "/Profile/projects/code-judge/assets/sliding-window-maximum-CcBoA_cU.js",
  "/Profile/projects/code-judge/assets/sort-an-array-9V1nic4y.js",
  "/Profile/projects/code-judge/assets/sort-colors-B_GZ_Uz-.js",
  "/Profile/projects/code-judge/assets/spiral-matrix-D_cy9p4s.js",
  "/Profile/projects/code-judge/assets/split-array-largest-sum-PQ1K6St3.js",
  "/Profile/projects/code-judge/assets/sqrtx-MShXGTwf.js",
  "/Profile/projects/code-judge/assets/stone-game-CKaqhcou.js",
  "/Profile/projects/code-judge/assets/stone-game-ii-CCmBp3C7.js",
  "/Profile/projects/code-judge/assets/stone-game-iii-3qcCS0_F.js",
  "/Profile/projects/code-judge/assets/subarray-sum-equals-k-ObVQ3JFo.js",
  "/Profile/projects/code-judge/assets/subsets-C_fPj8cb.js",
  "/Profile/projects/code-judge/assets/subsets-ii-DINya4o3.js",
  "/Profile/projects/code-judge/assets/subtree-of-another-tree-Bhhck2vL.js",
  "/Profile/projects/code-judge/assets/sum-of-all-subset-xor-totals-zQg2Asw5.js",
  "/Profile/projects/code-judge/assets/sum-of-two-integers-DgMg1aQt.js",
  "/Profile/projects/code-judge/assets/surrounded-regions-DwobT7PA.js",
  "/Profile/projects/code-judge/assets/swim-in-rising-water-OgIbK3lO.js",
  "/Profile/projects/code-judge/assets/target-sum-D-S8tOh5.js",
  "/Profile/projects/code-judge/assets/task-scheduler-BBlKYaX6.js",
  "/Profile/projects/code-judge/assets/time-based-key-value-store-C0ynVt7D.js",
  "/Profile/projects/code-judge/assets/top-k-frequent-elements-CNMwMee_.js",
  "/Profile/projects/code-judge/assets/transpose-matrix-Re0nEDRe.js",
  "/Profile/projects/code-judge/assets/trapping-rain-water-CwMoSO0q.js",
  "/Profile/projects/code-judge/assets/ts.worker-CIbuYjqZ.js",
  "/Profile/projects/code-judge/assets/two-sum-C7qBSc8F.js",
  "/Profile/projects/code-judge/assets/two-sum-ii-input-array-is-sorted-Bc616ti0.js",
  "/Profile/projects/code-judge/assets/typescript-Od_8tekg.js",
  "/Profile/projects/code-judge/assets/unique-paths-CYeslW7n.js",
  "/Profile/projects/code-judge/assets/unique-paths-ii-Cp0D37hW.js",
  "/Profile/projects/code-judge/assets/valid-anagram-CRuc7nQA.js",
  "/Profile/projects/code-judge/assets/valid-palindrome-ClMR_jJe.js",
  "/Profile/projects/code-judge/assets/valid-palindrome-ii-DeOyT0do.js",
  "/Profile/projects/code-judge/assets/valid-parentheses-D8Yv4ClN.js",
  "/Profile/projects/code-judge/assets/valid-parenthesis-string-C9QUo9W0.js",
  "/Profile/projects/code-judge/assets/valid-sudoku-C40pm4FY.js",
  "/Profile/projects/code-judge/assets/validate-binary-search-tree-BqXg9AEh.js",
  "/Profile/projects/code-judge/assets/verifying-an-alien-dictionary-P8iXkVEO.js",
  "/Profile/projects/code-judge/assets/walls-and-gates-Dd-sNL34.js",
  "/Profile/projects/code-judge/assets/word-break-Bsltb6Gc.js",
  "/Profile/projects/code-judge/assets/word-break-ii-CDPdntN_.js",
  "/Profile/projects/code-judge/assets/word-ladder-BtvtX1Er.js",
  "/Profile/projects/code-judge/assets/word-search-Ci--Vxkl.js",
  "/Profile/projects/code-judge/assets/word-search-ii-CClMQNKq.js",
  "/Profile/projects/code-judge/assets/worker-cw9Wd7ty.js",
  "/Profile/projects/code-judge/icons/icon-192.png",
  "/Profile/projects/code-judge/icons/icon-512.png",
  "/Profile/projects/code-judge/icons/maskable-512.png",
  "/Profile/projects/code-judge/index.html",
  "/Profile/projects/code-judge/manifest.webmanifest"
];

const NAMESPACE = cacheNamespace(BASE_PATH);
const CACHE_NAME = `${NAMESPACE}${CACHE_VERSION}`;
// Servers may send `Vary: Origin` (vite preview does). Precache requests carry
// no Origin header while module scripts and crossorigin stylesheets do, so an
// exact match misses and the app fails to boot offline. Only same-origin GETs
// reach the cache, and hashed URLs are immutable, so ignoring Vary is safe.
const MATCH = { cacheName: CACHE_NAME, ignoreVary: true };

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // The first install has no active worker and therefore no controlled
      // page that could be running a judge; taking over immediately is safe.
      // An update must wait for the user's "Reload" (register.js), because
      // swapping chunks under a running judge Worker could tear a run.
      const isFirstInstall = !self.registration.active;
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(PRECACHE_URLS);
      } catch (err) {
        // ~8.6 MB can exhaust quota. Degrade to online-only rather than fail
        // install: fetch() falls through to the network on every cache miss.
        console.warn('[sw] precache failed; running online-only', err);
        await caches.delete(CACHE_NAME).catch(() => {});
      }
      if (isFirstInstall) await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const names = await caches.keys();
        await Promise.all(
          names
            .filter((name) => name.startsWith(NAMESPACE) && name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      } catch (err) {
        console.warn('[sw] old cache cleanup failed', err);
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  let strategy;
  try {
    strategy = chooseStrategy(request.url, { origin: self.location.origin, method: request.method });
  } catch {
    return;
  }
  // Not calling respondWith() leaves the request entirely to the browser:
  // cross-origin (GitHub API, token-bearing) and non-GET never touch a cache.
  if (strategy !== 'precache' && strategy !== 'network-first') return;

  event.respondWith(
    handle(request, strategy).catch(() => fetch(request))
  );
});

async function handle(request, strategy) {
  return strategy === 'precache' ? cacheFirst(request) : networkFirst(request);
}

function isCacheable(response) {
  return response && response.ok && response.type === 'basic';
}

async function put(request, response) {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
  } catch {
    // Quota or a closed cache: serving the response matters, storing it does not.
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, MATCH);
  if (cached) return cached;
  const response = await fetch(request);
  if (isCacheable(response)) await put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (isCacheable(response)) await put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await caches.match(request, { ...MATCH, ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      // Hash routing means every navigation is the same document.
      const shell =
        (await caches.match(`${BASE_PATH}index.html`, MATCH)) ||
        (await caches.match(BASE_PATH, MATCH));
      if (shell) return shell;
    }
    throw err;
  }
}
