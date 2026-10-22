# Semantic Invariance and User-Authored Interface Dialects: Toward an Expressive, Testable Design Language

**Kitsune Innovation Labs | Working paper 01, v0.1 | 22 October 2026**  
**Research category:** conceptual architecture + proposed evaluation protocol. **Status:** not peer reviewed; no empirical results.

## Abstract

Digital design systems commonly standardise appearance and reusable components. This paper proposes a complementary division: preserve a shared *semantic grammar* of operations and states while permitting independent variation of expression, comfort and presentation. We term this **semantic invariance under expressive transformation**. The proposed Kitsunebi architecture comprises (i) a semantic component model, (ii) a typed token vocabulary, (iii) versioned user-authored profiles, (iv) an accessibility and security gate, and (v) platform-specific renderers. A controlled comparison of a conventional fixed-style interface, unconstrained theming and Kitsunebi's mediated expression is specified but not yet conducted. The main contribution is a falsifiable design thesis and a set of concrete invariants; it does not claim demonstrated benefits.

**Keywords:** design languages, accessible HCI, personalisation, semantic invariants, design tokens, user agency, cross-platform interfaces.

## 1. Problem formulation

Design systems often answer how a button should look but are less explicit about what must remain unchanged when personal preferences modify its presentation. Conversely, unrestricted theming can permit illegible colour combinations, disappearance of focus cues or semantic ambiguity. Neither standardisation nor maximal freedom alone ensures usability. Existing user-centred design guidance (ISO 9241-210:2019) and accessibility criteria (W3C WCAG 2.2) motivate an approach in which experience is evaluated with diverse users, not inferred solely from stylistic consistency.

The design problem is not "find the perfect look." It is to preserve *meaning* and *operability* across a family of personally meaningful looks and interaction preferences.

## 2. Conceptual model

Let `I` be an application intent graph (actions, relationships, risk and state), `V` a bounded expression profile, `C` capability/context data, and `R` a target-platform renderer. A resolver `F(V,C)` produces an effective profile with explicit diagnostics. The presentation is `P=R(I,F(V,C))`. For a family of invariants `Q`, the engineering requirement is `∀q∈Q: q(I) ≈ q(P)`, where ≈ means equivalent task-relevant meaning and access, not identical pixels, appearance or subjective interpretation.

**Protected invariants:** control intent and accessible name; disclosure of risk; availability of feedback; keyboard reachability and visible focus; validity of state; recoverable adaptation; data and privacy boundaries. **Negotiable properties:** spacing, colour, typography, ornament, optional motion, presentation density and documented window-management behaviours.

The equivalence claim is conditional and operational. For instance, changing an icon's shape does not violate `window.close` intent, but removing all visible access paths does. A narrow interface can reposition a control without removing its label or accessible operation.

## 3. Technical instantiation

The initial web prototype represents primitive and semantic tokens with DTCG 2025.10 JSON objects and explicit aliases. Separate JSON Schema limits voice data. An interpreter computes contrast and preferred reduced-motion outcomes before assigning CSS custom properties. The first implementation is **partial**: it does not yet implement a complete widget ontology, QML translation, full WCAG evaluation or untrusted theme-package verification.

DTCG tokens are a suitable interchange layer because they model typed design properties and references, but DTCG alone does not express application semantics. Behaviour, policy, invariants and user consent belong in separate contracts. This avoids pretending an RGB value specifies the meaning of "delete".

## 4. Research questions

- **RQ1:** Does mediated expression improve perceived ownership and satisfaction without increasing fundamental action errors?
- **RQ2:** Do invariant-preserving controls improve task completion and recovery compared with unrestricted theming?
- **RQ3:** Which expression dimensions create genuine agency and which merely increase configuration burden?
- **RQ4:** Are platform adaptations judged coherent in meaning despite differences in layout and available input?

**H1:** Under matched tasks, invariant-preserving customisation will produce no worse first-attempt action success than a fixed interface, within a preregistered non-inferiority margin.  
**H2:** User-authored expression will improve reported sense of ownership relative to fixed theming, subject to effect-size and uncertainty analysis.  
**H3:** Explicit fallback explanations will reduce reported surprise compared with invisible accessibility overrides.

These are hypotheses, **not findings**.

## 5. Proposed study

**Participants:** stratified sampling of new Linux users, experienced users, keyboard-focused users and people with varied access requirements. Aim for sufficient diversity and report each subgroup's achieved size; determine sample size by a separate power/precision plan rather than inventing a universal number.

**Conditions:** (A) conventional fixed style with accessible defaults; (B) unconstrained appearance customisation with a basic validity check; (C) Kitsunebi mediated expression. Use equivalent semantic tasks (open, close, locate, save, correct errors and confirm destructive changes). Counterbalance order and control familiarity, device and input type.

**Measurements:** first-action success, task completion, time, misclicks, discovery assistance, recovery after an error, self-reported ownership, comfort, and a validated usability measure if its licence is appropriate. Log *only with consent* and minimise identifiers. Code interview themes using multiple raters and report disagreements.

**Analysis:** preregister primary outcome, inclusion criteria, transformations, confidence intervals and subgroup interpretation. For non-inferiority, specify the margin on substantive usability grounds. Distinguish performance changes due to training or task novelty from system design.

## 6. Anticipated confounds and falsification

Novelty, aesthetic preference, brand affinity, screen size, cultural association, assistive technology behaviour and prior shortcut knowledge can influence outcomes. A highly attractive theme may increase subjective satisfaction while reducing error recognition. The hypothesis fails if self-authorship significantly worsens task success or consistently increases fatigue, even if participants call it beautiful. Nothing in the proposed formalism can guarantee subjective equivalence.

## 7. Research significance and limitations

The work proposes a way to reason about *negotiable presentation and invariant meaning* in one system. It advances neither a validated computational theory of cognition nor evidence of universal accessibility. A successful prototype would demonstrate engineering feasibility; only systematic user research can support broader HCI claims. Interoperability remains conditional on adapters respecting capabilities.

## References

1. Design Tokens Community Group. (2025). *Design Tokens Format Module 2025.10*. https://www.designtokens.org/TR/2025.10/
2. W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
3. ISO. (2019). *ISO 9241-210:2019, Ergonomics of human-system interaction — Human-centred design for interactive systems*. https://www.iso.org/standard/77520.html
4. Norman, D. A. (2013). *The Design of Everyday Things* (revised and expanded). Basic Books.
5. Deci, E. L., & Ryan, R. M. (2000). The 'what' and 'why' of goal pursuits: Human needs and the self-determination of behavior. *Psychological Inquiry, 11*(4), 227–268. https://doi.org/10.1207/S15327965PLI1104_01
