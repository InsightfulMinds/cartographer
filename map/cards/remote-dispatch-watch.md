# remote-dispatch-watch
status: live (temporary loop)
source: ops/scripts/remote-dispatch-watch.sh ; Library/LaunchAgents/com.fleet.remote-dispatch-watch.plist (StartInterval 1200) ; state ops/state/remote-dispatch-watch.json
what: A single-shot-per-fire watcher for one dated dispatch running on box B: reads a
  PROGRESS file over the mesh (read-only), counts loaded jobs there, and alerts via the
  messenger helper if progress goes stale. Stops itself when the last row appears or a
  STOP file exists in ops/state/.
moves: every 20 min → ssh read of box B → write state json → alert on stale.
hits: ops/state (state + STOP file); nothing on box B — it only reads there.
does-not-hit: sync-legs — this watches a progress file, it does not move any bytes;
  the box B→A replication gap is untouched.
caution: the script encodes box B's mesh address directly; the plist was written under
  guard-deny and rewritten (guard event 08-29) — treat as a dated loop, not a fixture.
