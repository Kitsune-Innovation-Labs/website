# Kitsunebi Language Specification (KLS) 0.1 — Proposal

**Status:** EXPERIMENTAL, not a formal standard. Normative terms MUST/SHOULD/MAY express target contracts, not claims that every adapter already complies.

## 1. Vocabulary

- **Intent:** an operation's domain meaning (close window, delete file, save, navigate, acknowledge).
- **Role:** machine- and human-readable meaning of a visual or interactive part (`surface.page`, `text.primary`, `action.danger`, `focus.indicator`).
- **Grammar:** role structure, state transitions, focus and feedback rules, and component invariants.
- **Voice:** user-selected expression profile (appearance, density, typography, motion, decoration).
- **Context:** capability and environment signals (input modality, forced colours, reduced motion, screen size, assistive technology).
- **Dialect/adapter:** a platform implementation preserving the semantic grammar while mapping to web, Qt/QML, compositor shell, TV, or Wear.
- **Reference voice:** the Kitsune Innovation Labs expressive site, not the only valid voice.
- **Gate:** validation that rejects, repairs or asks consent for transformations that compromise required invariants.

## 2. The central contract

Given semantic interface tree I, supported context C, and permitted expression profile V, a renderer R returns a presentation P:

`P = R(I, resolve(V, C))`

For every protected semantic invariant q, `q(I) = q(P)` in the sense of equivalent available functionality and communicated meaning. The invariants include operation identity, disabled/busy/error/danger states, accessible naming, focus reachability, critical feedback, and preservation of user data.

Appearance and exact pixel positions are *not* invariants. The invariants are testable claims, not an assertion that any two UIs will be phenomenologically equivalent. A screen reader, switch user, pointer user and touchscreen user can require different presentations to attain equivalent access.

## 3. Protected invariants (provisional MUST)

1. **Action identity:** control names and effects persist across voice changes. Close must not silently become minimise.
2. **Risk clarity:** irreversible actions retain explicit warning and confirmation when required by product policy, with text/icon/state, never colour alone.
3. **Discoverability:** common actions have at least one immediately perceivable path or clear cue; hidden-hover-only controls are not sufficient.
4. **Keyboard parity:** all actions that support pointer input MUST be reachable and operable through supported keyboard paths, with visible focus.
5. **Assistive representation:** accessible names, roles, value/state and reading order MUST remain meaningful under expression.
6. **Legibility:** applicable text pairs SHOULD meet WCAG 2.2 AA contrast (4.5:1 normal; 3:1 large), non-text components 3:1 where required; target AAA and user-specific adjustments where possible.
7. **Motion safety:** `prefers-reduced-motion` or equivalent user choice overrides decorative motion. Critical state changes cannot be communicated solely through animation.
8. **Input parity:** touch interactions MUST NOT rely exclusively on hover; targets MUST be appropriately sized and spaced; platform-specific guidance applies.
9. **Reversibility:** voice changes MUST preview and be reversible. Invalid, unsupported or hostile profile data falls back to safe defaults.
10. **Privacy:** expression profiles MUST work without an account, telemetry or a remote inference service.

These constraints protect agency; they do not prescribe a single aesthetic. CSS `forced-colors`, high contrast, dyslexia-oriented typography options, and user-owned accessibility settings can override decorative colours without erasing profile identity outside the affected dimensions.

## 4. Three transformation boundaries

| Boundary | Change allowed | Guardrail |
| --- | --- | --- |
| Semantic | Content labels, roles, danger meaning, data actions | **Not by voice**; product domain governs |
| Structural | Density, responsive arrangement, navigation presentation, reveal methods | Alternative path, preserved focus/reading order and task completion |
| Expressive | Palette, typography, shape, imagery, optional motion, ornament | Contrast, motion, performance, user intent |

Structural modification demands stronger review than expressive modification. New gestures or contextual window controls need discoverability testing before adoption.

## 5. Resolution precedence

For each dimension, the implementation SHOULD apply the following explicit order:

1. Non-negotiable security and functional invariants.
2. OS/assistive-technology constraints such as forced-colours (no synthetic palette forcing over it).
3. Explicit user's current-session accessibility overrides.
4. Saved user's voice choices.
5. Contextual platform adaptations where no explicit preference exists.
6. Application/organisation's chosen voice.
7. Reference defaults.

`prefers-reduced-motion` is treated as an accessibility signal; users can request even less motion. A choice of `playful` must not re-enable animations disallowed by such a signal.

Conflict outcomes MUST be inspectable: *"Your system requested reduced motion; decorative animations are off."* Avoid secret UI mutations.

## 6. Component grammar, example: window close

**Semantic action:** `window.close`; accessible name: "Close [window name]"; available from pointer and keyboard; focus indicator; unsaved-work confirmation delegated to application policy.

- Reference voice: contextual capsule revealed at a generous top-edge zone, with a persistent discoverability cue.
- Workshop: always-visible compact labelled icon/control, keyboard-first options.
- Sanctuary: consistently visible, high-legibility control, reduced motion.
- Touch: explicit large tap target, not hover.

If the compositor cannot provide unified decorations for an app, the adapter MUST surface its limitation instead of fabricating a close button that does nothing. In Niri especially, app/client-side window decoration and compositor ownership require separate engineering.

## 7. Voice interchange (draft)

JSON voice object keys: `$schema`, `formatVersion`, `id`, `name`, `appearance`, `comfort`. Unknown extension names MUST be namespaced under `extensions`; unrecognised executable data is prohibited. Files are data, never code. Imported settings are validated, migrated and previewed before apply. See `docs/technical-architecture.md` and `schemas/voice-profile.schema.json` in this repository.

## 8. Expected state grammar

All interactive elements distinguish: idle, hover where available, focus-visible, pressed, selected, disabled, busy, success, warning and error where relevant. Disabled and busy are not interchangeable. Active selection never relies on hue alone. Feedback uses appropriate text, iconography, live regions or tactile alternatives.

## 9. Interoperability

Adopters MAY implement only a subset. They MUST declare capability support and not claim full KLS compliance. A voice profile is portable at the semantic expression level; pixel-identical output across native web/Qt/shell is not promised. Fallback is better than silent corruption.

## 10. Evidence required for version 1

A cross-voice acceptance suite; WCAG 2.2 audit; relevant assistive technology trials; formative usability research with new Linux users, experts and access-needs participants; profile import/export security review; and cross-platform fidelity checks. Until then, "One Language, Infinite Voices" is a research hypothesis and engineering direction.

**References:** W3C WCAG 2.2, https://www.w3.org/TR/WCAG22/ ; Design Tokens Community Group Format 2025.10, https://www.designtokens.org/TR/2025.10/ .
