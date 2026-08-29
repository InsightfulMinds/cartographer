# agent-observer
status: live
source: ops/scripts/agent-observer-dispatch.sh (supervisor) ; ops/scripts/agent-observer.sh (per-file) ; Library/LaunchAgents/com.fleet.agent-observer.plist (KeepAlive, pid verified 08-29)
what: Watches the session tool's projects tree for new subagent transcripts and spawns one
  observer per file, writing a sidecar event log per agent with size warnings at
  50/80/100MB. Shaped by the 2026-07-08 fork-exhaustion incident: a hard ceiling on
  concurrent observers so the user can never hit the per-user process cap again.
moves: fswatch (or poll) on the transcripts dir → spawn observer → sidecar log outside
  the runtime root (session-tool home, agent-events/).
hits: nothing inside the runtime root — all state lives in the session-tool home; the
  companion CLI agent-check.sh reads those sidecars and breaks if the dir moves.
does-not-hit: stall-watchdog — different signal entirely (transcript idle-time, not
  size); silencing one leaves the other firing.
