# The Cartographer

A fresh session once loaded my whole tree, edited a frozen locks file that looked live,
and the nightly sync made the mistake permanent on two more boxes before anyone noticed.
This folder exists so the next cold reader — usually a model — never has to eat the tree
to change one thing in it.

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

## Walk it cold

If you are a cold model: open `map/CATALOG.md`, pick the noun you were asked about, read
that one card, stop.

`map/` is the cartographer's real output, run against my own three-box home-lab ops
runtime (the Homestead — boxes A, B, C); two of its cards are ghosts found during the
walk, with the wiring I looked for and didn't find.

`verify-map.mjs` mechanically checks a map (catalog size, card structure, ghost evidence,
source-path cites, photocopy guard); it prints skipped categories explicitly because
skipped ≠ passed, and it carries a negative-control selftest (`--selftest`) that must
catch a deliberately broken card. The map's sources cite the private territory, so
path-existence checks only run on the owner's box; structure checks run anywhere:
`node verify-map.mjs map`.

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
- `map/` — the real output: catalog + 9 cards from the Homestead runtime walk
- `verify-map.mjs` — mechanical map checker (see "Walk it cold")
