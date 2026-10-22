# Kitsunebi Technical Architecture — 0.1

**Purpose:** maintain a common semantic language across the Kitsune Innovation Labs website, KitsuneOS Desktop (Niri / Qt-QML), TV, Touch, Wear and web apps without coupling consumers to one renderer.

## Pipeline

```text
Domain app: semantic component tree & commands
                 |
        accessibility / policy invariants
                 |
Design tokens (DTCG 2025.10) <-- Reference Voice + user Voice Profile
                 |                |
        resolver / precedence / validation <--- Environment capabilities
                 |
    resolved semantic roles + behavioural policy + audit diagnostics
                 |
  Web CSS + DOM | Qt/QML | compositor-specific UI | TV/Touch adapters
                 |
            runtime tests & telemetry-free diagnostics
```

**Never** ship an arbitrary CSS/JS payload as an imported voice. The engine consumes bounded data and emits trusted platform values. Untrusted profiles cannot alter what a button does, invoke shell commands, load remote fonts, or read personal data.

## Modules and responsibility boundaries

| Module | Responsibility | First deliverable |
| --- | --- | --- |
| Token source | DTCG typed primitives and role aliases | `design/voice-lab/reference.tokens.json` |
| Profile schema | Versioned data contract, bounded enum and palette inputs | `kitsunebi/schemas/voice-profile.schema.json` |
| Resolver | Validate, normalise, apply precedence, expose diagnostics | `design/voice-lab/core.mjs` |
| Accessibility gate | Contrast / motion / focus / modality invariants and safe fallbacks | Partial proof of concept in core; full audit outstanding |
| Component grammar | Intent, states, affordances, semantic names | `docs/language-specification.md` |
| Adapter | Transform resolved roles into platform values and behaviour | Browser proof of concept only |
| Studio | Explore, preview, export/import voices | `design/voice-lab/` |
| Contract tests | Prove essential invariants across a matrix of voices | `kitsunebi/tests/` |

### Token layering

1. **Primitive:** brand palettes (e.g. foxfire, sakura, ember), spacing, radii and typography properties. These carry no semantic role.
2. **Semantic:** `color.surface.page`, `color.text.primary`, `color.action.primary`, `color.focus.indicator`, etc. This is ROLE ≠ HUE.
3. **Component:** optional mappings (`button.primary.background = color.action.primary`), with states and affordance contracts.
4. **Contextual resolution:** user choice, platform modality, reduced motion, forced colours, density.
5. **Output:** CSS custom properties, Qt/QML singleton tokens, or platform-native structures.

Reference palettes are not special security capabilities. A user may choose another accent; roles preserve meaning. The DTCG 2025.10 JSON is the interchange source; our behavioural grammar lives in our own schema, not in ad-hoc DTCG fields.

### Reference website audit (2026-10-22)

The organisation homepage and KitsuneOS site share an expressive CSS baseline: `--foxfire: #79c8ff`, `--foxfire-strong: #55b6f5`, `--sakura: #f7c8d5`, `--ember: #ef724a`, `--night: #101936`, cream backgrounds, strong rounded display typography, fluid organic forms and day/night themes. The deployed Kitsunebi Lab uses a more restrained `--lab-*` set and presents `--kitsunebi-version: "0.1-dev"`. It is stored as compiled assets, and the prior Lab is archived in `legacy/`.

**Resolution:** the website's expressive identity is the reference *voice*. The neutral Lab is useful as a constrained research/technical surface. Neither should be discarded; neither should be misrepresented as the single canonical source until actual editable code and architecture are consolidated.

### Runtime resolution order

1. Parse and validate input, no side effects.
2. Load typed primitive and role tokens; resolve aliases (detect cycles, type mismatch, missing refs).
3. Apply permitted voice modifications to *expressive* dimensions.
4. Apply accessibility and device context overrides.
5. Calculate contrast and target/focus affordance diagnostics.
6. Where a constraint fails, use a documented safe role fallback and report which preference was affected.
7. Emit a serialisable, audit-friendly effective profile; adapters consume only this resolved form.

Do not silently "correct" a user's health/accessibility preferences or apply colour-processing models that claim clinical efficacy. Contrast is necessary but insufficient for actual accessibility.

### Platform adapters roadmap

- **Web:** CSS variables + semantic HTML, focus-visible, forced-colors, reduced-motion; usable now for demonstration.
- **Qt/QML:** generated singleton with properties, view contracts, theme change signal, no application action rewriting. Proposed; not built.
- **Niri shell:** separate composition integration for panel, notifications, launcher and window controls; policy contracts first, compositor capabilities verified later.
- **TV:** remote focus graph, larger targets, spatial navigation; no hover assumptions.
- **Touch:** responsive targets and explicit gesture alternatives; accessible labels.
- **Wear:** prioritised glance content, constrained motion/power and accessible scaling.

### API stability / versioning

- **KLS 0.x:** design experimentation; migrations explicit and reversible.
- **Token schema:** DTCG 2025.10, independently versioned.
- **Voice format v0.1:** documented version and capability negotiation.
- **Adapter contract:** a declared capability manifest rather than hidden detection.
- KitsuneOS 27 Hibana may experiment; KitsuneOS 28 Foxfire is the aspirational first stable generation, not a delivery guarantee.

### Threat model (starting point)

Untrusted downloaded profile may attempt CSS injection, hidden controls, inaccessible colour, remote font tracking, gigantic resource consumption or spoofed danger labels. Mitigations: schema restriction, whitelisted colour strings, bounded values and file size, no remote assets, no code execution, contrast/visibility gate, semantic action ownership stays with app, preview before apply. Future work: sandbox Studio imports, signed bundles (optional; not a substitute for validation), reproducible adapters and fuzz tests.

### Privacy model

Default local-only; nothing uploaded to share until explicitly requested. Do not infer disability, identity, gender or neurotype from preferred settings. Profiles may contain sensitive preferences; export is intentional and clear. No usage telemetry without separate informed opt-in.

### Validation plan

Static schema tests; token alias/type checks; JS unit tests; web keyboard and screen-reader review; automated axe checks; perceptual contrast checks; user task studies; synthetic reduced-motion/forced-colors matrix; native adapter parity. Node unit tests currently cover a limited set only. See [roadmap](roadmap.md).
