# Walk order

How the cartographer walks a territory. In order; do not skip.

1. **Front door.** Read the territory's own entry file (README/INDEX/CONTEXT) if one
   exists. It is a claim, not truth — it seeds the inventory, nothing more.
2. **Stores before scripts.** Find the places state lives (databases, JSON stores, queues,
   folders-as-queues). Every store is a noun.
3. **Writers before readers.** For each store, find what writes it, then what reads it.
   A store with writers and no readers is a ghost candidate. A store with readers and no
   writers is fossilizing — leftover candidate.
4. **Schedules.** Enumerate everything that runs on a clock or a trigger (cron, LaunchAgent,
   systemd, hooks, CI). Each is a movement; confirm it is actually loaded/enabled — the
   file existing is not the schedule running.
5. **Names vs wiring.** For every noun the entry file *claims*, verify the wiring. Claims
   that fail become ghost cards.
6. **Collisions.** List every name used for two different things, or two names for one
   thing. Write the collision cards before the noun cards that use those names.
7. **Cards, then catalog.** Write noun cards from the inventory. Write the catalog LAST,
   from the cards — never the other way around.
