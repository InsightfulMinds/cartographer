# outputs-shelf
status: live
source: comms/outputs/ (2,831 dated folders, open tier) ; ops/manifest/new-output.sh (the sanctioned creator) ; skills/write-router.sh
what: Where deliverables land: one dated folder per piece of work, created by the router
  script so names stay uniform. Not a queue — nothing consumes it by contract; box C
  archives it nightly (replication). Also home to a few LIVE things that are not
  deliverables: the client-review server root, the notify staging area, _closeout/ manifests.
moves: sessions write via write-router; box B→C nightly pull; box A→B manual push.
hits: sync-legs volume; closeout-hooks manifests; local-servers (one serves from here).
does-not-hit: outbox/ — that is the executor's result drop, a different folder with a
  different writer; a deliverable belongs here, a task result belongs there.
caution: a stray CATALOG.md sits at the shelf root — it is a copy of a small TEST map of
  comms/lanes, not a catalog of outputs; do not load it expecting an index of deliverables.
