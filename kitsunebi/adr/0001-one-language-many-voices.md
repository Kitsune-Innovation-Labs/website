# ADR 0001 — Separate semantic grammar from expressive voice

**Status:** Proposed for review · 2026-10-22

## Context

The Kitsune Innovation Labs website already feels playful and professional. The current deployed Lab is more neutral and technical, and its editable application source is not present here. KitsuneOS needs a coherent interface across desktop, server-adjacent tooling, TV, touch and future devices. Simply skinning independently behaving widgets would repeat frustrations encountered while using a pieced-together Niri desktop.

## Decision

Kitsunebi SHALL have a stable layer of semantic roles, state/interaction contracts and accessibility invariants. User-authored expression profiles change appearance, comfort and permitted presentation strategies without changing domain actions. The website's expressive visual language becomes the **Reference Voice**, not an enforced universal colourway. Profiles are data, interoperable and locally portable. Conflict precedence and fallbacks are explicit. Runtime adapters implement platform-appropriate behaviour.

## Alternatives considered

1. **A single fixed UI style** — easier maintenance, defeats self-authorship.
2. **One unconstrained CSS/Qt theme per user** — high freedom, poor portability and unsafe/misleading semantics.
3. **Different hand-curated design systems for each platform** — local polish, drift and fragmented identity.
4. **A semantic grammar with expressive dialects (chosen)** — added engineering and governance, better balance of agency/cohesion.

## Consequences

Positive: supports user expression, accessibility policy and cross-platform contracts. Costs: resolver complexity, token governance, migration burden, and need for significant user research. A shared vocabulary does not prove a shared experience; empirical evaluation remains necessary.

## Non-goals

Not a new rendering engine, automatic personality inference, neural adaptation, or guarantee of pixel parity. Nor does this ADR mean replacing the live site.

## Review triggers

A role cannot map cleanly across platforms; accessibility override causes loss of agency; user tests reveal confusion; security/privacy problems emerge; implementation maintenance exceeds benefit. Revisit the decision with evidence rather than protecting its aesthetic appeal.
