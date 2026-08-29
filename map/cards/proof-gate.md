# proof-gate
status: live (CLI; hooked at card close)
source: ops/manifest/proof-gate.mjs (v0.2.1) ; ops/manifest/proof-gate-corpus/ ; engine source cited in the file header
what: Rule engine that reads a "DONE" report and returns ACCEPT / RETURN / ESCALATE by
  looking for unproven claims (a 200 is not a working user path, a secret is not a
  receipt, etc.). Rules are copied verbatim from a published editor engine; one extra
  advisory rule is gate-only. Redacts secrets in its own output.
moves: card-close and lane-evidence flows call it; exit code 0/1/2.
hits: the card-close script (new-card.sh flow) and any lane evidence update that shells
  to it; the corpus fixtures if a rule changes.
does-not-hit: output-gate — that hunts secrets/PII leaving the org; this judges whether a
  claim of completion is backed by evidence. Both must pass; neither implies the other.
