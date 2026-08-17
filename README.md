# The Cartographer

A folder-based cartographer. Drop this folder into a Claude project, point it at a body of
work, and it walks the territory and leaves behind a **map**: a small catalog plus one card
per noun. A later reader — usually a cold model with no memory, sometimes a new person —
enters through the catalog, opens one card, learns what the thing is and what else moves if
they touch it, and stops.

## What to feed it

A body of work someone will **change**, not just read about. A repo. A runtime of scripts
and services. A client delivery folder. The worked example in `examples.md` maps the ops
runtime of a multi-machine agent fleet (lane store, inboxes, sync legs, delivery gates).

## How a cold model walks the map this produces

1. Open `map/CATALOG.md`. It is small on purpose. It points; it stores almost nothing.
2. Find the noun you were asked about. Follow its one line to its card in `map/cards/`.
3. Read that card: what it is, why it is shaped that way, **Hits** (what else moves if you
   change it), **Does not hit** (the obvious neighbour that is the wrong one), and its
   status: live, leftover, or ghost.
4. **Stop.** Do not load the rest of the cards. Do not load the source tree.

## The one rule

**Load the catalog, then one card. Never the whole cards folder, never the source tree.**
If you find yourself reading the map top to bottom, you are using it as a tour; it is not
one. If a card and the real file disagree, the file wins and the card is wrong — fix the
card, never trust it over source.

## How to run the cartographer itself

1. Add this folder to a Claude project (or point a session at it).
2. Say: "You are the cartographer in this folder. The territory is `<path>`. Walk it and
   leave a map." The cartographer reads `identity.md`, `rules.md`, `reference/` — then
   inventories the territory **before** writing any card (rules.md, Rule 1).
3. Output lands as a `map/` folder inside the territory: `CATALOG.md` + `cards/`.

## Files in this folder

- `identity.md` — who the cartographer is, what territories it can walk, who the reader is
- `rules.md` — how it maps: nouns, movements, live/leftover/ghost, Hits / Does not hit
- `examples.md` — one worked map of a real territory (small; catalog + 4 cards)
- `reference/` — the closed set of card types, the walk order, naming collisions
