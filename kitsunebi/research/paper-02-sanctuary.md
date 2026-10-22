# Sanctuary Without Paternalism: Sensory Comfort, Accessibility, and Agency in Personal Computing

**Kitsune Innovation Labs | Working paper 02, v0.1 | 22 October 2026**  
**Research category:** conceptual/ethical framework and proposed mixed-methods evaluation. **Status:** not peer reviewed; no participant findings.

## Abstract

Personal computing interfaces frequently position accessibility as a special mode, while expressive personalisation is treated as an aesthetic luxury. This manuscript proposes that *sensory comfort and self-authorship should be independently composable*: a user may prefer vibrant colours, dense information and reduced motion, or minimal ornament with generous targets, without being forced into an externally assigned identity. We describe an explicit precedence system for accessibility signals, bounded user choice and interface requirements. We outline safeguards against inaccessible customisation, opaque adaptive interfaces and medicalised claims about colour or cognitive needs. Evaluation procedures are specified but not performed.

**Keywords:** accessibility, inclusive design, autonomy, sensory comfort, personalisation, human-centred computing.

## 1. Motivation

The "Sanctuary" metaphor proposes computing environments as spaces people can inhabit without having to conform to one assumed sensory or behavioural norm. This metaphor is a normative design aspiration, not clinical evidence. Personal experiences of discomfort or frustration provide design questions but cannot establish what other individuals need.

Accessibility and choice can conflict. A theme engine that always prioritises visual novelty might create flicker, hide controls or remove contrast. A paternalistic accessibility engine might eliminate expression without explanation. Kitsunebi instead seeks an inspectable negotiation: hard constraints protect operation and meaning; the user controls legitimate expressive space.

## 2. Agency as a system property

Following human-centred design practice, user needs are elicited through iterative engagement. Self-determination theory suggests autonomy is an important dimension of motivation, though this theory does *not* itself establish that theming improves psychological wellbeing. We use autonomy as a design lens, with explicit, testable outcomes.

We separate **preference** (the user says "I prefer little animation"), **capability** (the platform offers reduced-motion/forced-colour controls), and **policy** (a safety-critical action must remain identifiable). These should not be collapsed into a presumed diagnosis. The system MUST NOT attempt to infer disability, neurotype, gender or identity from aesthetic choices. Comfort controls are available to everyone.

## 3. The comfort matrix

Independent axes include:

- Motion: none / essential-only / expressive, with platform reduced-motion overrides.
- Information density: spacious / comfortable / compact, constrained by text scaling and target size.
- Contrast: standard / enhanced / system-managed, without equating hue with readability.
- Typography: font size, weight, spacing and family, while acknowledging individual variability.
- Ornament: none / subtle / expressive, disabled for critical information paths.
- Interaction: explicit/persistent vs contextual controls, with keyboard/touch equivalence.

The axes are *composable*, not categorical archetypes. A user should not have to accept an unwanted "minimalist" identity in order to disable animation.

## 4. Explicit adaptation and consent

A resolver can merge environmental signals and expression choices through deterministic precedence. If a profile requests bouncing animations but the system requests reduced motion, show: "Reduced motion is enabled in your system settings; decorative animations are off." Do not surprise the user by creating hidden policies or rearranging tasks without warning. Users may override nonessential defaults; hard safety and accessibility invariants must remain.

No remote decision service should be needed for a theme change. Profiles remain locally inspectable and exportable; share is an affirmative action. Imported profiles are treated as hostile until validated. Colour and contrast checks must not pretend to test photosensitivity or treat subjective perceptual comfort as a single scalar.

## 5. Proposed evaluation

**Phase A — formative interviews:** participants describe successful and difficult experiences, using their own terms. Avoid asking them to disclose diagnoses. Capture practical preferences and affordance discovery. Provide accessible participation formats, informed consent and withdrawal options.

**Phase B — crossover interface tasks:** compare a conventional accessibility "mode" with independent Kitsunebi controls on matched tasks; counterbalance order and train both groups equally. Observe completion, override understanding, configuration time, backtracking, changes retained, perceived agency, annoyance and fatigue.

**Phase C — longitudinal diary study:** users adopt the tool in ordinary workflows over multiple weeks. Study how configurations evolve after novelty fades, without routine sensitive telemetry. Participant-owned entries can be reviewed and withdrawn.

**Research questions:** Do users express more agency when comfort dimensions are decoupled from aesthetic archetypes? Can accessibility override explanations be made understandable without increasing cognitive load? Which safeguards are experienced as supportive versus obstructive?

## 6. Ethics and limitations

Recruitment must not require disclosure of health information or adopt a deficit framing. A small, convenience sample cannot demonstrate universal usefulness. Colour-comfort interventions should not be presented as clinical therapies; do not promise relief from visual stress or other medical symptoms. Participation data should be minimised and stored separately from device profile exports. Where Aotearoa participants and culturally significant motifs are involved, consult appropriate community advisers and apply data stewardship principles.

## 7. Implications for design

The user should always see *what changed, why it changed and how to reverse it*. If a product forces a decision not reducible to safety or platform constraints, it should disclose the tradeoff rather than masquerading as an unavoidable rule. A sanctuary is not quiet by definition: it is **chosen**, understandable and controllable.

## References

1. W3C. (2023). *WCAG 2.2*. https://www.w3.org/TR/WCAG22/
2. W3C WAI. *Understanding Contrast (Minimum)*. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
3. W3C WAI. *Understanding Focus Appearance*. https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
4. ISO. (2019). *ISO 9241-210:2019*. https://www.iso.org/standard/77520.html
5. Deci, E. L., & Ryan, R. M. (2000). The 'what' and 'why' of goal pursuits. *Psychological Inquiry, 11*(4), 227–268. https://doi.org/10.1207/S15327965PLI1104_01
