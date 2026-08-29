# session-relay
status: ghost
source: relay/ (broker.ts, server.ts, dispatcher/) ; ops/relay/{relay-lib,relay-send,relay-status,relay-hook,relay-init}.sh ; logs/relay-launchd.log
what: Cross-session message bridge: a local broker plus shell helpers so one session can
  send to another (or to a box) and query what is queued vs delivered. The helpers resolve
  boxes by ssh alias, never by address. By design the bridge does not store — a message
  dies with the receiving session.
looked-for: pgrep for the broker (none, 08-29); relay-launchd.log ends with the broker's
  shutdown lines; no loaded LaunchAgent carries a relay label on box A.
hits: nothing at runtime. Risk is the shell helpers: relay-send.sh returns cleanly into a
  queue no broker drains, so "sent via relay" today means written and waiting.
does-not-hit: worker-queues — the folder queues are a separate, file-based contract;
  the relay was the low-latency path beside them, not their consumer.
