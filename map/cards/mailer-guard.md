# mailer-guard
status: live
source: skills/booking-mailer/mailer-guard.sh ; Library/LaunchAgents/com.fleet.booking-mailer.plist (StartInterval 300)
what: Strike-counter wrapper around the booking product's mailer: runs one pass every 300s,
  12 consecutive failures (~1h) unload the LaunchAgent and leave an alert file, so a dead
  upstream cannot error forever in silence. No strikes file present 08-29 = zero strikes.
moves: 300s → mailer --once → on failure increment ops/state/booking-mailer.strikes.
hits: the booking product's outbound mail; ops/state (its strike counter).
does-not-hit: dispatch-watcher's 3-strike breaker — same pattern, separate counter file;
  clearing one never clears the other.
