# sync-legs
status: live (asymmetric by design + one gap)
source: ops/scripts/sync-all.sh ; ops/scripts/dual-host-sync.sh ; box-B LaunchAgent com.fleet.nightly-pull
what: Additive-only replication (a --delete once destroyed a week of work — standing ban).
  Leg 1: box A→B manual push (builds/deliverables). Leg 2: box B→C nightly 02:30 pull,
  box B prunes after 2 days. Leg 3 box B→A: DOES NOT EXIST — plist staged at
  ops/launchagents/com.fleet.b-to-a-sync.plist, never installed (verified launchctl 08-16).
hits: lane-store drift on box A (leg-3 absence is the cause); any "all boxes see X" assumption.
does-not-hit: messenger delivery — sends don't ride sync legs; fixing a stale file fixes
  no delivery.
caution: fleet syncs are additive-only, so ring buffers pruned on one box accumulate
  forever on the others — exclude frames/ and similar from any new leg.
