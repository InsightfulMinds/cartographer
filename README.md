# The Cartographer

A folder-based cartographer. Drop this folder into a Claude project, point it at a body of
work, and it walks the territory and leaves behind a **map**: a small catalog plus one card
per noun. A later reader — usually a cold model with no memory, sometimes a new person —
enters through the catalog, opens one card, learns what the thing is and what else moves if
they touch it, and stops.

## Run it (the door)

1. Add this folder to a Claude project (or point a session at it).
2. Say: "You are the cartographer in this folder. The territory is `<path>`. Walk it and
   leave a map."
3. The cartographer loads exactly three things: `identity.md`, `rules.md`, `reference/` —
   then inventories the territory **before** writing any card (rules.md, Rule 0).
4. Output lands as a `map/` folder inside the territory: `CATALOG.md` + `cards/`.
5. Check the result mechanically: `node verify-map.mjs <map-dir>`.

**Do NOT load `map/` or `examples.md` when running the cartographer on your territory.**
Those two are worked *output* from my territory — the answers, not the instrument. The
drop-in is `identity.md` + `rules.md` + `reference/`; the proof-of-run is `map/` and the
worked example in `examples.md`. Loading someone else's finished map before your own walk
will bias the walk toward its nouns and statuses. They exist so you can see what a real
run produces, and so the checker has something real to check — not as input.

## Walk a finished map cold

If you are a cold model handed a map this tool produced:

1. Open `map/CATALOG.md`. It is small on purpose. It points; it stores almost nothing.
2. Find the noun you were asked about. Follow its one line to its card in `map/cards/`.
3. Read that card: what it is, why it is shaped that way, **Hits** (what else moves if you
   change it), **Does not hit** (the obvious neighbour that is the wrong one), and its
   status: live, leftover, or ghost.
4. **Stop.** Do not load the rest of the cards. Do not load the source tree.

**The one rule: load the catalog, then one card. Never the whole cards folder, never the
source tree.** If you find yourself reading the map top to bottom, you are using it as a
tour; it is not one. If a card and the real file disagree, the file wins and the card is
wrong — fix the card, never trust it over source.

## Why this exists

A fresh session once loaded my whole tree, edited a frozen locks file that looked live,
and the nightly sync made the mistake permanent on two more boxes before anyone noticed.
This folder exists so the next cold reader — usually a model — never has to eat the tree
to change one thing in it.

Feed it a body of work someone will **change**, not just read about: a repo, a runtime of
scripts and services, a client delivery folder.

## The proof-of-run

`map/` is the cartographer's real output, run against my own three-box home-lab ops
runtime (the Homestead — boxes A, B, C); two of its cards are ghosts found during the
walk, with the wiring I looked for and didn't find. `examples.md` is an earlier, smaller
worked map of the same territory (snapshot noted inside; statuses have since moved, and
`map/` is the fresher record).

`runs/refusal-transcript.md` is a filmed exercise of the Rule 7 refusals: two
diagnostician-shaped requests refused verbatim, one valid request accepted, produced by
running this folder's own rules.

## verify-map.mjs

`verify-map.mjs` mechanically checks a map (catalog size, card structure, ghost evidence,
source-path cites, photocopy guard); it prints skipped categories explicitly because
skipped ≠ passed, and it carries a negative-control selftest (`--selftest`) that must
catch a deliberately broken card. The map's sources cite the private territory, so
path-existence checks only run on the owner's box; structure checks run anywhere:
`node verify-map.mjs map`.

### Falsify this

Don't take the checker's word for it — plant a violation and watch it die by name:

- Add a card to `map/cards/` with no `does-not-hit:` section → the run reports
  `missing does-not-hit: section` for that card by filename.
- Strip the `looked-for:` line from a ghost card → the run reports
  `ghost card missing looked-for: line`, again by filename. (Marking a ghost `live` to
  dodge that check is caught by the human side of the contract: Rule 3 demands cited
  wiring on every live card, and the card will have none to cite.)
- `node verify-map.mjs --selftest` does exactly this on purpose: it fabricates a broken
  card and PASSES only if the checker catches precisely that card and nothing else.

## Files in this folder

- `identity.md` — who the cartographer is, what territories it can walk, who the reader is
- `rules.md` — how it maps: nouns, movements, live/leftover/ghost, Hits / Does not hit
- `reference/` — the closed set of card types, the walk order, naming collisions
- `examples.md` — one worked map of a real territory (small; catalog + 3 cards) — output, not input
- `map/` — the real output: catalog + 9 cards from the Homestead runtime walk — output, not input
- `runs/refusal-transcript.md` — Rule 7 exercised on the record, not asserted
- `verify-map.mjs` — mechanical map checker
