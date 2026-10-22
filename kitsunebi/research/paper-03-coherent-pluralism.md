# Coherent Pluralism: Interoperability and Governance for a User-Authored Design Language

**Kitsune Innovation Labs | Working paper 03, v0.1 | 22 October 2026**  
**Research category:** systems-design / governance proposal. **Status:** not peer reviewed; no empirical study.

## Abstract

A design language intended to support personal expression across web, desktop, television and wearable environments faces tension between a common identity and device-specific affordances. This paper proposes **coherent pluralism**: semantic contracts and user-owned expression data remain stable while presentation and input interaction are delegated to platform-aware adapters with declared capabilities. We define layers, migration and security obligations, outline an open-governance model, and propose measurable interoperability tests. The paper advances a specification and evaluation agenda; it does not claim that all target platforms already implement Kitsunebi.

**Keywords:** multi-platform design systems, interoperability, end-user development, user sovereignty, platform adapters, participatory governance.

## 1. Background and problem

A traditional brand system can maintain visual recognisability by enforcing a palette and component library. Yet reproducing desktop controls verbatim on touch or TV can undermine usability. Conversely, one-off product identities fracture continuity and make user preferences non-portable. The goal is neither identical pixels nor independently designed products; it is continuity of **semantic grammar** plus context-appropriate expression.

The problem worsens as users customise: if a colour palette is inseparable from a component's semantic meaning, a shared theme may make error states indistinguishable. If settings are tied to platform-specific CSS or QML, they become difficult to migrate or audit.

## 2. Layered model

**Layer A — intents and states:** application/domain controls semantic meaning.  
**Layer B — protected contracts:** accessibility, focus, operation, privacy and risk.  
**Layer C — shared expression vocabulary:** DTCG typed tokens and profile schema.  
**Layer D — resolution/capability negotiation:** merge user choices and context, explain fallbacks.  
**Layer E — target adapters:** web, Qt/QML, Niri compositor/shell, TV remote, touch and wearable.

A central insight is that expression profiles can be portable while presentation itself cannot be assumed portable. For example, a user's low-motion preference is meaningful across devices; "reveal close control on hover" is not a universal affordance. Capability negotiation must convert or replace it with an explicitly discoverable touch or remote alternative.

## 3. Versioning and migration

Every profile contains `formatVersion` and `id`. The importer SHOULD preview migrations, preserve original data, fail closed on unknown critical fields and offer a clear reversible action. Extension keys must be namespaced to avoid collisions. Adapters advertise capability sets. A profile MUST remain interpretable offline; remote font and scripted content are excluded from the minimal format.

Release naming may follow KitsuneOS 27 Hibana as an internal experimental generation and KitsuneOS 28 Foxfire as an intended stable generation, while semantic contract and token versions evolve independently. Calendar branding should never force unsafe schema breakage.

## 4. Governance and social expression

Kitsunebi should be an *open grammar with many voices*, not a hierarchy declaring one culture or aesthetic "correct." Governance can use public ADRs, compatibility suites and community review, with transparent exception decisions and accessible contribution processes. The reference Kitsune site remains recognisable without monopolising allowable palettes, shapes or language. Shared galleries may create community and learning but introduce moderation, harassment, attribution and intellectual property risks.

A consent-based sharing protocol should carry only selected voice data, not screenshots of private workspaces or inferred identities. Review translated or culturally situated motifs with the communities concerned, rather than treating folklore as an unrestricted asset library.

## 5. Evaluation plan

**Interoperability fixture set:** a corpus of semantic controls under 20+ voice/context permutations tested across at least two independent renderers. The test must compare action reachability, accessible names, focus order, risk signalling, user-visible fallback diagnostics and exported profile round-trips, not pixel equality.

**Qualitative study:** recruit users who operate across desktop/mobile/TV, including assistive technology users. Ask whether voice persists perceptually, whether controls remain predictable, and whether contextual adaptations are intelligible.

**Governance evaluation:** record issue resolution time, percentage of proposed extensions successfully mapped, number of incompatible profiles across schema migrations, contributor diversity and documented accessibility objections. These are measures to collect, not claimed outcomes.

## 6. Failure modes and alternatives

- **Centralised resolver becomes too prescriptive:** preserve an extension mechanism and explicit user overrides subject to invariants.
- **Platform adapters lie about capability:** compliance fixtures, manifest versioning and manual audit.
- **Theme marketplace becomes tracking infrastructure:** offline profiles, consent-based import/export and no default social account.
- **Portability collapses to screenshots:** test semantic outcomes; use platform-specific mappings.
- **Expressive ornament overrules clarity:** contrast/focus checks and progressive enhancement with reduced-motion alternatives.
- **Governance captures one narrow aesthetic:** advisory participation and transparent design rationale.

## 7. Conclusion

Coherent pluralism frames consistency as a contract of meaning and agency, not an obligation to look identical everywhere. Its actual value depends on empirical usability, sustainable adapter maintenance, openness and meaningful community stewardship. The design proposal is falsifiable and incomplete; the next task is to build, measure and revise.

## References

1. Design Tokens Community Group. (2025). *Format Module 2025.10*. https://www.designtokens.org/TR/2025.10/
2. W3C. (2023). *WCAG 2.2*. https://www.w3.org/TR/WCAG22/
3. ISO. (2019). *ISO 9241-210:2019*. https://www.iso.org/standard/77520.html
4. Norman, D. A. (2013). *The Design of Everyday Things*. Basic Books.
