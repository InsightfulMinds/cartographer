# worker-queues
status: live
source: comms/dispatch/inbox (one queue per worker id; dispatch is the busiest); senders use ops/scripts/dispatch-to-worker.sh
caveat: liveness is PER QUEUE — consumers vary; verify before trusting any queue
what: One folder-queue per worker identity (dispatch, session, coder, ...). A file written
  here is QUEUED, never "sent" — delivery requires a consumer. Box-A consumers verified
  08-16: session-inbox-executor (flat comms/inbox, 300s), dispatch-watcher (DOWN, see its card).
hits: two-way comm contract (write AND poll own inbox); ack-required packets stall silently
  when a consumer dies.
does-not-hit: comms/outputs — deliverables, not a queue; nothing consumes it by contract
  (box C archives it nightly, which is replication, not consumption).
caution: rot signals — coder/inbox 4,480 items, one orphan queue 179, no consumer found.
