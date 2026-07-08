# /studies — Visual Studies catalog images

Drop generated studies in this directory named by catalog number, lowercase, WebP:

    sb-i-01.webp   sb-i-02.webp   sb-i-03.webp     (Movement I)
    sb-ii-01.webp  ...                              (Movement II)
    ...
    sb-vii-03.webp                                  (Movement VII)

The Visual Studies page (`visual-studies.html`) resolves each plate from this
convention automatically — a correctly named file lights up its slot with no
code change. Slots without a file render as STUDY_PENDING frames.

Prompts, notes, and optional per-plate `src` overrides live in the `CATALOG`
array in `src/visual-studies.js`.

The `M1-… M7-…` PNGs in this directory are the raw source exports — gitignored,
local only (same convention as `public/frames`). Convert to catalog WebPs with:

    cwebp -q 82 -m 6 M1-song-before-loss-01.png -o sb-i-01.webp
