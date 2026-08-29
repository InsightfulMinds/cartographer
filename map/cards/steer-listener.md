# steer-listener
status: live
source: ops/scripts/steer-listener.sh ; Library/LaunchAgents/com.fleet.steer-listener.plist (KeepAlive, pid verified 08-29)
what: The human-to-dispatcher doorbell. A persistent loop that polls comms/steers/dispatcher.md
  every 30s; each appended line is copied to comms/steers/steer-log.md and turned into a
  queue file via dispatch-to-worker.sh. Exists so the operator can steer with one append
  instead of composing a task card.
moves: file append (manual) → poll 30s → write comms/dispatch/inbox; state in a tmp file,
  so a reboot re-reads from the top.
hits: worker-queues (every steer lands in the dispatcher queue — which nothing consumes
  while dispatch-watcher is down, so a steer today is a parked note).
does-not-hit: dispatch-watcher — that is the READ side of the same queue and a separate
  service; fixing the listener changes nothing about delivery.
