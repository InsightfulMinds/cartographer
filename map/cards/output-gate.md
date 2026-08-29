# output-gate
status: live (invoked, not scheduled)
source: ops/gates/external-output-gate.py ; ops/gates/pre-send.sh ; ops/gates/deny-terms.txt (35 rules) ; ops/gates/impeccable-gate.sh ; ops/gates/gate-health.sh
what: The de-secret/anonymize pass for anything leaving the org. Presence-only by
  construction — reports file, line, rule name, count; never prints a matched value, so it
  can be pointed at logs. Exit 0 pass / 2 findings / 3 could-not-read (never a pass).
  pre-send.sh is the shape a send path calls; there is no --force.
moves: manual or hook call → read targets → verdict on stdout; no state.
hits: every send path that honours pre-send.sh; the deny-terms list (add a term, block a
  send fleet-wide).
does-not-hit: write-guard — that gates WHERE files may be written; this gates WHAT may
  leave. Passing one says nothing about the other.
