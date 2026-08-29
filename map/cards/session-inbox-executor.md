# session-inbox-executor
status: live
source: ops/scripts/session-inbox-executor.sh ; Library/LaunchAgents/com.fleet.session-inbox-executor.plist (StartInterval 300)
what: The flat task-card consumer on box A. Polls comms/inbox/ every 300s for cards tagged
  for the session tool, runs each headless with a 5-minute ceiling, moves the card to
  comms/processed/ and writes the result to comms/outbox/. This is the ONE queue on box A
  with a verified consumer; its log reads "inbox clear" every tick (checked 08-29).
moves: poll comms/inbox → run → write comms/outbox + comms/processed; completion ping via
  the messenger alert lib (degrades silently when notify-relay is down).
hits: comms/outbox and comms/processed (its only writers); anything that drops a card in
  comms/inbox expecting a human — it will be executed, not read.
does-not-hit: comms/dispatch/inbox — the dispatcher queue has a DIFFERENT consumer
  (dispatch-watcher, currently a ghost); a card there is parked, not run.
caution: defaults its root to the legacy root alias (see collision-root); the alias is a
  symlink today, so it works — remove the symlink and this loop dies quietly.
