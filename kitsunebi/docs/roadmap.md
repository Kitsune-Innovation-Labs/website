# Kitsunebi Research, Design and Delivery Roadmap

**Principle:** publish evidence, not merely promises. This workstream feeds KitsuneOS Core-independent UI foundations; it does not delay Core boot/update/recovery.

## Milestone R0 — Provenance & governance (in progress)

- Inventory old `legacy/` guide, compiled `design/` Lab, organisation site, KitsuneOS source CSS, and any separately maintained design docs.
- Confirm sources/ownership/licensing and identify where editable current Lab source lives.
- Publish the proposed Constitution/grammar and record disputes as ADRs.
- Maintain a **decision ledger**: observed evidence, alternatives, risk, accept/reject and rationale.

**Exit:** an auditable map of existing components and tokens; no production regression.

## Milestone R1 — Language and working reference

- Stable names for primitives, semantic roles, interaction states, and expression dimensions.
- DTCG token validation and aliases; CSS generator; JSON voice schema.
- Profile interpreter with explicit precedence; deterministic local-only processing.
- Interactive Voice Lab: three alternative voices, independent density/shape/motion/colour, export/import, accessible preview, contrast diagnostics and fallbacks.
- Tests on Node and browser; documentation of incomplete guardrails.

**Exit:** reproducible pure resolution; user can alter voice without changing control purpose. The first prototype is a demonstration, *not* a production toolkit.

## Milestone R2 — Research and participatory studies

- Ethics and accessibility review; consent and safeguarding for participants.
- Baseline: new Niri user tasks with existing desktop; comparable tasks in Kitsunebi prototype.
- Mixed methods: first-action success, task time, error recovery, discoverability, SUS (with licence review), NASA-TLX or a suitable alternative, fatigue/comfort self-report, qualitative interviews.
- Cross-condition comparisons (expert/newcomer, keyboard, mouse, touch where available; low motion/contrast preferences).
- Report uncertainty, confounding, effect sizes and negative results, not only positive testimonials.
- Release revised papers **after** collecting actual evidence. Avoid claiming accessibility certification from automated scores.

**Exit:** design changes directly grounded in representative users; failure cases documented.

## Milestone R3 — Production-ready foundations

- Recover/rebuild active Lab as maintained source; migrate visual reference voice without regressing original site.
- Token generators and parity fixtures for CSS / Qt-QML.
- State grammar for buttons, menus, dialogs, notifications, window actions, navigation and focus.
- Robust accessibility gate (contrast, target size, text scaling, focus, reduced motion, forced colours).
- Portability tests; strict profile versioning and migrations; CSP/security review.
- Evaluate maintenance costs, CPU/GPU load and mobile/low-resource behaviour.

**Exit:** validated design-system library with real adopters, CI and semantic versioning.

## Milestone R4 — KitsuneOS integration (Hibana → Foxfire)

- Core ships platform-independent integration contracts and updater, not the GUI framework.
- Desktop alpha integrates Kitsunebi and Niri shell prototypes. Do not promise global server-side window decorations without verifying compositor/app constraints.
- Implement usable settings, undo, user profiles, user-owned import/export, and plain-language fallback diagnostics.
- Begin TV/Touch capability adapters only after desktop contracts withstand independent tests.

**Exit:** cross-edition semantic consistency demonstrated with actual applications and assistive tech.

## Early backlog with priorities

| Priority | Task | Verification |
| --- | --- | --- |
| P0 | Restore editable source for current Lab | Build produces same page from source |
| P0 | Resolve contrast/state grammar for action buttons and danger states | CI + manual assistive test |
| P0 | Keep close-window actions discoverable without mouse hover | Newcomer task study |
| P0 | Profile schema, safe parsing, migration and defaults | Invalid-input property tests |
| P1 | Token code generation for CSS + QML | Snapshots and render parity |
| P1 | Screen reader focus, accessible live messages and target size | NVDA/Orca/VoiceOver matrix |
| P1 | Accessibility overrides precedence and inspectable reasons | Context matrix |
| P1 | Language governance / external contribution protocol | ADR review |
| P2 | Gallery/community sharing with moderation and signed metadata | Security/privacy review |
| P2 | Internationalisation and right-to-left layout | Language testing |

## Do not ship until

No critical or high-severity access issues; functional keyboard/pointer parity; recoverable presets; no unauthorised remote requests; documented supported environments; all high-risk component states tested; performance budget defined and measured. The absence of a result is not evidence of success.
