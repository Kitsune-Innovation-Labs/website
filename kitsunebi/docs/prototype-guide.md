# Voice Lab experimental prototype

**Preview route:** `/design/voice-lab/` (once its staging branch is deployed). This route is additive and does not replace the existing `/design/` Lab or website homepage.

## Try it

Serve the repository root via HTTP (for example `python3 -m http.server 8000`) and open `http://localhost:8000/design/voice-lab/`.

1. Select Reference, Sanctuary, Playground or Workshop.
2. Independently vary theme, character, density, shape, motion, contrast and accent.
3. Close and reopen the simulated example window. Confirm the action remains accessible and clearly labelled. The demonstration does **not** control Niri or real OS windows.
4. Exercise the delete confirmation and save action; they simulate behaviour and do not write data.
5. Export a data-only JSON voice; import it back. Try invalid JSON, unsupported fields and oversized files.
6. Enable operating-system reduced motion and forced colours; look for the explicit fallback explanations.
7. Navigate every control with Tab, Shift-Tab, Enter and Space, and use a screen reader to review headings, labels, status and dialog.

## Scope and limitations

**Implemented:** bundled voices; independently adjustable dimensions; deterministic resolver; semantic-token aliases; calculated contrast of core text/button pairs; system reduced-motion and forced-colours delegation; coarse-pointer target size; local JSON import/export with size+format validation; simulation of close and destructive confirmation; Node contract tests; CSS/QML token fixture generation.

**Not yet implemented:** complete WCAG 2.2 audit; live Niri compositor integration; all component states; per-component non-text contrast; true font and text scaling; robust OS settings API; persistent user preferences; theme marketplace; arbitrary community extensions; Qt runtime integration; formal user studies; empirical validation of sensory effects.

## Guardrails and cautions

Contrast is computed for explicitly known colour pairs; this does not prove real rendered pixels meet WCAG under overlays, blending, zoom or anti-aliasing. Forced-colours delegates to system CSS keywords, whose concrete colours should be tested in actual browser/OS combinations. Import validates data shape but is not a hardened package sandbox. Do not claim accessibility certification or scientifically proven preference outcomes.

## Code ownership

`design/voice-lab/core.mjs` intentionally contains no DOM, storage or fetch calls. Browser interactions live in `app.mjs`; generators and tests import only the pure core. The DTCG JSON under the demo directory is the current experiment's source of truth, **not** yet a full company-wide token source. Before promotion, choose a maintained source repository and solve build provenance for the existing minified design Lab.
