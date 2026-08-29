# Homestead runtime — catalog (walked 2026-08-16, full pass 2026-08-29)
> Load this file, then ONE card from cards/. Then stop.
> Boxes: A=build (this box), B=ops-canonical, C=publish/archive. Stores first, then loops, then gates, then shelves.

lane-store              live      lanes.json, sole writer lanes.mjs CLI                 cards/lane-store.md
worker-queues           live*     30+ comms/<id>/inbox dirs; consumers vary             cards/worker-queues.md
outputs-shelf           live      2,831 dated deliverable dirs; not a queue              cards/outputs-shelf.md
vault                   live      long memory; writers = nightly archiver + indexer      cards/vault.md
skills-shelf            live      133 entries; two LaunchAgents run from inside it       cards/skills-shelf.md
reference-shelf         live      canon + hourly GENERATED STATE.md                      cards/reference-shelf.md
shadow-tree/            leftover  retired tree, 4 LIVE services still inside            cards/shadow-tree.md
session-inbox-executor  live      flat comms/inbox, 300s, the one verified consumer      cards/session-inbox-executor.md
steer-listener          live      30s poll of a steer file → dispatcher queue            cards/steer-listener.md
dispatch-watcher        ghost     self-disabled 08-15, re-struck 08-23; dispatcher deaf  cards/dispatch-watcher.md
notify-relay            ghost     :8793 dead; publish gates stage-only                   cards/notify-relay.md
session-relay           ghost     broker not running; helpers write to nothing           cards/session-relay.md
remote-dispatch-watch   live      20-min read-only check of one box-B dispatch           cards/remote-dispatch-watch.md
sync-legs               live      3 legs, box B→A leg absent by gap                     cards/sync-legs.md
edge-tunnel             live      boundary: box A → edge provider, inbound HTTP only     cards/edge-tunnel.md
local-servers           live      :8790 review + :3121/:3122 boards, loopback            cards/local-servers.md
speech-server           live      speech-to-text on the mesh address :8990               cards/speech-server.md
local-model-host        live      boundary: model server :11434; no proxy running        cards/local-model-host.md
agent-observer          live      subagent transcript sidecars; fork-cap                 cards/agent-observer.md
stall-watchdog          live      120s idle-transcript notifier                          cards/stall-watchdog.md
closeout-hooks          live      per-session deliverable ledger via tool hooks          cards/closeout-hooks.md
session-archive         live      02:17 nightly transcript → vault notes                 cards/session-archive.md
checkpoint-daemon       ghost     last checkpoint 04-09; ops doc still names it          cards/checkpoint-daemon.md
overnight-council       live      local-model nightly audit; 08-29 round FAILED          cards/overnight-council.md
news-digest             live      twice-daily digest; send half failing 08-29            cards/news-digest.md
screen-audit            live      5s capture loop; PAUSED marker present 08-29           cards/screen-audit.md
mailer-guard            live      300s mailer pass, 12-strike self-disable               cards/mailer-guard.md
mail-watch              live      60s inbound-mail lure scan (via legacy root alias)     cards/mail-watch.md
community-capture       ghost     exits without a session marker; loaded, not running    cards/community-capture.md
write-guard             live      manifest write enforcement, all box-A sessions         cards/write-guard.md
output-gate             live      de-secret pass before anything leaves the org          cards/output-gate.md
proof-gate              live      DONE-claim evidence gate, exit 0/1/2                   cards/proof-gate.md
index-router            live      recall-before-search; 371 descriptors                  cards/index-router.md
collision-root          live      "the root" = runtime root vs legacy alias symlink      cards/collision-root.md
staged plists           leftover  3 plists in ops/launchagents never loaded on box A     (not carded; one is the box B→A leg, see sync-legs)
retired residue         leftover  inert retired-product residue, staged removal          (not carded; see LEGACY-RETIREMENT.md)
