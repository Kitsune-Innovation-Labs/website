# Kitsunebi Research Library — build and editorial guide

## Canonical source, no duplicative manuscripts

Academic working papers, methods, specifications and decisions live under `kitsunebi/research/`, `kitsunebi/docs/` and `kitsunebi/adr/`. Those Markdown sources are authoritative. **No separate edited HTML copy** should exist.

`node kitsunebi/tools/build-research.mjs <output-directory>` renders their content into a self-contained static Research Library: index, each article, table of contents, working-paper labels, source links, citation copy text, and printable page layouts. Defaults to `design/research` for local previews; **do not commit generated pages**. GitHub Actions uses `_site/design/research` instead.

The static assets `design/research/library.css` and `design/research/library.mjs` are maintained source and are copied automatically with the existing `design/` directory.

The existing `design/` Lab is bundled/minified and intentionally untouched; the Research Library links to the Lab and Voice Lab, while Voice Lab now links directly to Research.

## Reader features

- Clean web reading, section anchors, persistent TOC on larger screens, print styles, day/night themes.
- Plain-language status and research integrity caveats; PDF is **Print / Save as PDF via the browser**, not a downloadable pre-generated PDF.
- Copyable citation with source-backed URL, clearly identified as an unreviewed working draft; source Markdown links for transparency.
- Semantic HTML and no external JavaScript dependencies or tracking.

## Editing or adding a paper

Update only its canonical Markdown. To add an article, register metadata/path/route in `kitsunebi/tools/build-research.mjs`. Its citation, page, index card and TOC are generated. Re-run CI and visually inspect staging. Maintain consistent titles and publication status.

**Known limitations:** the minimal dependency-free Markdown renderer covers the current manuscripts (headings, paragraphs, inline emphasis/code/links, lists, tables, quotes, fences). It is not yet a full CommonMark/GFM parser; future complex math, citations, footnotes and figures need a vetted local build-time renderer and regression fixtures. No PDFs or DOIs have been minted. Do not label papers peer-reviewed without external review and evidence.

## Navigation and reading architecture

The shared wayfinding bar links the existing compiled Design Lab, Voice Studio and Research Library (`design/kb-navigation.*`), with the current section clearly identified. The original Design Lab is not replaced. A research landing page offers labelled jumps to papers, methods and specifications. Individual reading pages offer category browsing, on-page contents, mobile disclosure versions of both, breadcrumbs, and previous/next links. The active document is marked with `aria-current=page`; all destinations are ordinary links that work without the navigation JavaScript.

## Reading-first layout experiment (2026-10-23)

Based on direct usability feedback that the overall library feels confusing or overwhelming, the development preview replaces the long, multi-panel homepage with one short list of three paper entries and two optional disclosure groups: Research methods and Technical foundations. It intentionally removes duplicate statistics, category-jump cards and promotional paragraphs. Paper readers now keep just Back to library, a single collapsible Contents section, a secondary citation/print/source disclosure and previous/next links. **All eight canonical Markdown documents and routes remain intact.** This is a design hypothesis, not an empirically validated result; evaluate ease of finding a paper and returning without instruction before promoting to production.

## Site-wide navigation integration (23 October 2026)

The Kitsune Innovation Labs primary navigation is now **one shared implementation** in `assets/kil-site-header.mjs` and `assets/kil-site-header.css`. The site's root homepage and all Kitsunebi pages load that same menu structure (Home, Kitsunebi, Software, Hardware, Research, Company and the shared day/night switch). The site's Research destination now points to `/design/research/` rather than the older bundled Lab hash route. The KIL homepage no longer maintains an independent copy of the header HTML. A small `design/kb-navigation.mjs` bar remains only for movement within Kitsunebi, and is inserted *after* the KIL header. Documents and draft statuses remain unchanged.

The theme setting uses the site's existing `kitsune-theme` key, not a second Research-only preference. A responsive mobile menu keeps the company hierarchy available without horizontally overflowing the page. Navigation does not depend on user-specific data or telemetry. Static minimal fallback links are included on the homepage if JS is disabled. Validate dropdowns and touch/keyboard interactions on staging; the original compiled Design Lab remains unmodified internally.
