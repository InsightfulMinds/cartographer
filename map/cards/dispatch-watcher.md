# dispatch-watcher
status: ghost
source: Library/LaunchAgents/com.fleet.dispatch-watcher.plist ; ops/scripts/dispatch-inbox-watcher.sh
what: Polled comms/dispatch/inbox every 300s and pushed messenger-app notifications — the
  dispatcher's doorbell on box A. Self-disabled 2026-08-15T01:41Z after 3 consecutive
  messenger send failures (designed 3-strike breaker; see the SELF-DISABLED note of
  2026-08-15 in comms/outputs/).
looked-for: launchctl list (not loaded, verified 08-16 and again 08-29); the disable note names the
  reload command. Someone reloaded it between: its log shows a 4th strike and a second
  SELF-DISABLED line on 08-23 — the relay was still dead, exactly as the caution below predicts.
hits: nothing at runtime — that is the danger. 633 items sit unconsumed in comms/dispatch/inbox (08-29),
  including fresh dispatches; "queued to the dispatcher" currently means "parked indefinitely".
does-not-hit: comms/inbox (flat) — its executor is a DIFFERENT service (session-inbox-executor)
  and still runs; do not conclude "inbox processing works" from it.
caution: root cause is likely notify-relay (see that card) — reload the watcher only AFTER a
  test send succeeds, or it strikes out again in 15 minutes.
