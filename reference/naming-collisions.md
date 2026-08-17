# Naming collisions — in the worked territory (Homestead runtime)

Chat is not always Chat. Write the collisions down before writing cards.

| name | meaning 1 | meaning 2 | rule |
|---|---|---|---|
| "sync" | box-A → box-B push (manual/script) | box-C nightly pull at 02:30 | never say "synced"; name the leg |
| "inbox" | per-worker queue folder `comms/<id>/inbox` | the human's message inbox | cards say "queue" for the folder kind |
| "sent" | file written to a queue folder | consumer actually read it | written = QUEUED, never "sent/delivered" |
| "lock" | live lane-store ownership record | frozen historical LOCKS file | the LOCKS file is a leftover; wiring lives in the lane store |
| "archive" | the `archive/` folder (leftover, honest) | retired product residue at repo root | residue is ghost/leftover per card, not "the archive" |

When mapping a NEW territory: rebuild this table from scratch for that territory. The
collisions above are examples of shape, not reusable content.
