# checkpoint-daemon
status: ghost
source: ops/checkpoint-daemon.mjs ; ops/checkpoint-status-check.sh ; snapshots/checkpoints/
what: An hourly session-snapshot writer meant to be started by the dispatcher at session
  start and stopped before exit, writing 100-150 token checkpoints to snapshots/checkpoints/.
  Its state dir points into shadow-tree/ops/checkpoint-state — the retired tree.
looked-for: pgrep for the daemon (none, 08-29); newest checkpoint file is dated
  2026-04-09; no LaunchAgent references it; the ops CONTEXT.md still lists it as a key script.
hits: nothing at runtime. The danger is the doc: ops/CONTEXT.md names it as if running, so
  a cold reader will "check the daemon" and find silence.
does-not-hit: session-archive — the live nightly snapshot mechanism; it does not use
  checkpoints/ and does not need this daemon revived.
