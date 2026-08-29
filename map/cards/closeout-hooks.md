# closeout-hooks
status: live
source: session-tool settings.json hooks block ; ops/scripts/closeout-track.py (PostToolUse) ; ops/scripts/closeout-longrun.py (SessionStart --drain) ; ops/scripts/closeout-stop-hook.sh (Stop)
what: The per-session deliverable ledger. Every write under comms/outputs/ is recorded in
  a manifest keyed by session id (comms/outputs/_closeout/, 119 manifests 08-29); on Stop
  the closeout runs against ONLY that manifest. Built after a multi-tab closeout shipped
  other tabs' files (2026-07-31) — mtime scanning cannot tell sessions apart.
moves: PostToolUse hook → append manifest; Stop hook → closeout for that session id;
  SessionStart → drain long-run leftovers. All hooks exit 0 always — a tracker never blocks.
hits: write-guard (both are PreToolUse/PostToolUse neighbours in the same hook config —
  reorder one and you reorder the other); the notify-publish path the closeout calls.
does-not-hit: session-archive — that distills TRANSCRIPTS nightly; this ledgers FILES at
  write time. Emptying _closeout/ does not touch the vault.
