# stall-watchdog
status: live
source: session-tool home bin/session-stall-watchdog.sh ; Library/LaunchAgents/com.operator.session-stall-watchdog.plist (StartInterval 120)
what: Finds the most recently modified session transcript and raises a desktop
  notification if it has been idle 10+ minutes but less than 6 hours old (so ancient
  sessions never re-alert). De-duplicates per transcript. Exists because a stalled tab
  looks identical to a thinking tab from across the room.
moves: 120s poll of transcript mtimes → local notification only; no file writes in the
  runtime root.
hits: nothing in the runtime; only the operator's notification center.
does-not-hit: agent-observer — that watches SUBAGENT transcript size, not main-session
  idleness; the two never share state.
