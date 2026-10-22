# Kitsunebi 狐火 — One Language, Infinite Voices

**Status:** design research / experimental implementation, v0.1 proposal (22 October 2026). This is not a published academic result or a production-certified accessibility system.

Kitsunebi is the design language of Kitsune Innovation Labs. It separates *what an interface means* from *how a person chooses to experience and express it*. Its reference voice comes from the existing Kitsune Innovation Labs website: M PLUS Rounded, snow/cream surfaces, Foxfire Blue, Sakura, Ember and Night Indigo, soft organic forms, warmth, restrained delight, and solid content over optional translucent decoration.

> A user should be able to speak the language of their digital environment in their own voice without losing the shared grammar needed for understanding, safety, or access.

## Repository map

- [Language specification](docs/language-specification.md): proposed normative rules, invariants and extension model.
- [Architecture](docs/technical-architecture.md): tokens, resolver, accessibility gate, adapters and security boundaries.
- [Delivery and experiments](docs/roadmap.md): acceptance gates, milestones, ownership and risks.
- [Research programme](research/README.md): three original *conceptual / methods* papers and a research ethics plan.
- [Research Library generator](tools/build-research.mjs): builds browsable, accessible reading pages from those canonical Markdown files, without copying or rewriting their content; the `/design/research/` pages are generated as part of the staging and production site builds.
- [Research Library styles and interaction](../design/research/): self-hosted CSS and small JS for reading, citations and print-to-PDF.
- [ADR 0001](adr/0001-one-language-many-voices.md): the founding architecture decision.
- [DTCG token source](../design/voice-lab/reference.tokens.json): one real, reviewable source for the prototype.
- [Interactive proof of concept](../design/voice-lab/index.html): public static experiment under `/design/voice-lab/` when staged.
- [Pure resolver](../design/voice-lab/core.mjs): small, dependency-free reference implementation; not yet a complete cross-platform engine.
- [Node tests](tests/core.test.mjs): contract checks for semantic roles, contrast, expression and fallbacks.

## Principles

1. **Meaning before appearance.** A destructive action cannot become a harmless navigation action when a theme changes.
2. **Role ≠ hue.** Semantic tokens name functions (surface, danger, focus), not arbitrary colours. Colour is never the sole state cue.
3. **Agency without punishment.** Users can choose density, shape, motion, palette and input affordances independently. Safety and legibility are retained.
4. **Predictable adaptation.** System preferences have understandable precedence. No opaque learning algorithm silently rearranges UI.
5. **Sanctuary.** Accessibility and sensory comfort are core qualities, not a special aesthetic.
6. **Solid over glass.** Readability and target visibility precede translucency, blur and decoration.
7. **Blue foxfire, never purple** defines our *reference brand voice*, not a ban on personal palettes.
8. **Portability and sovereignty.** Human-readable profiles, explicit export/import, local-first operation, and no hidden telemetry.
9. **Honest maturity.** The current proof of concept implements a subset; experimental claims require testing.

## Design provenance

The repository currently stores the organisation's expressive landing-page styles as source (`index.html`, `kitsuneos/src/index.css`) but the active `design/` lab is a *compiled* bundle. It also preserves the older living-styleguide under `legacy/`. Do not overwrite these assets or declare the compiled lab's CSS canonical merely because its build output is available. A future task is to recover or rebuild the Lab as maintainable source, reconcile it with the expressive website, and identify the canonical upstream of each principle.

## Run the experiment

Serve the repository root with an HTTP static server, visit `/design/voice-lab/`, then run `node --test kitsunebi/tests/*.test.mjs` (Node 22+ recommended). The demo needs no npm packages. A test passing is not a substitute for manual accessibility auditing or usability studies.

## Release governance

Proposals become stable only after: documented review; assistive-technology evaluation; keyboard/touch testing; no critical accessibility defects; compatibility and migration plan; clear security boundaries; and evidence from users beyond the project team. Research is released as drafts until independently reviewed.
