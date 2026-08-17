# Homestead runtime — catalog (2026-08-16)
> Load this file, then ONE card from cards/. Then stop.
> Boxes: A=build, B=ops-canonical, C=publish/archive.

lane-store        live      lanes.json, sole writer lanes.mjs CLI            cards/lane-store.md
worker-queues     live*     30+ comms/<id>/inbox dirs; consumers vary        cards/worker-queues.md
dispatch-watcher  ghost     self-disabled 08-15; dispatcher deaf on box A    cards/dispatch-watcher.md
notify-relay      ghost     :8793 dead; publish gates stage-only             cards/notify-relay.md
sync-legs         live      3 legs, box B→A leg absent by gap                cards/sync-legs.md
write-guard       live      manifest write enforcement, all box-A sessions   cards/write-guard.md
index-router      live      recall-before-search; 371 descriptors            cards/index-router.md
shadow-tree/      leftover  retired tree, 4 LIVE services still inside       cards/shadow-tree.md
screen-audit      live      5s capture loop on box A; incident family        cards/screen-audit.md
retired residue   leftover  inert retired-product residue, staged removal    (not carded; see LEGACY-RETIREMENT.md)
