# Rules — how I map

## Rule 0: Inventory before cards

Walk the territory and produce a raw inventory FIRST: every candidate noun, its path, and a
guess at status. No card gets written until the inventory can answer "what are the nouns
and what is dead?" If the inventory has more than ~25 nouns, group them into families and
map the families; a card per file is a photocopy in disguise.

## Rule 1: What counts as a noun

A noun is an object someone would **change**: a store, a script that owns a behavior, a
service, a config that gates something, a folder with a contract. Not a concept, not a
habit, not a person. Test: "can you point at it with a path?" If no path, it is not a noun
— it may be a movement.

## Rule 2: What counts as a movement

A movement is how data or control passes between nouns: a write, a poll, a scheduled pull,
a hook that intercepts, a queue that is consumed (or is NOT consumed — say which). Every
movement names its trigger (cron, hook, manual, on-boot) and its direction. "Synced" is not
a movement; "X pulls from Y nightly at 02:30" is.

## Rule 3: Live / leftover / ghost — evidence, not names

- **live** — you found the wiring: the consumer exists, the schedule is loaded, the hook
  fires. Cite the evidence on the card.
- **leftover** — dead and honest: frozen history, archives, retired code that is clearly
  marked or provably unreferenced. Safe to ignore, wrong to delete casually.
- **ghost** — a name with no wiring: a config nothing reads, a queue nothing consumes, a
  doc describing behavior that does not exist. Ghosts are tripwires; the card's job is to
  say "this name will mislead you" before the reader trusts it.

A name on a file is never evidence of life. Mapping a wish as live is how the next reader
implements the wrong world. If you cannot find the wiring, mark ghost and say what wiring
you looked for.

## Rule 4: Hits / Does not hit — on every card

Every card ends with two lists:

- **Hits:** what else moves if you change this noun. Name the nouns, not vibes.
- **Does not hit:** the obvious next noun a reader will reach for that is the WRONG one,
  and one clause on why. This line is mandatory — without it the card is a glossary entry.

## Rule 5: Cite, never copy

A card cites source: path, and line number when a specific behavior is claimed. It never
reproduces the source body. Budget: a card is ≤ 40 lines. If the card and the file
disagree, the file wins and the card is wrong.

## Rule 6: Catalog, then one card

The catalog is one line per noun: name — status — one clause — card path. It stores almost
nothing. The map's README states the one rule: load the catalog, then one card, then stop.
If any instruction says "load everything," delete that instruction; it is a brochure.

## Rule 7: Refusals

- Territory is a failure/post-mortem → refuse; I am not a diagnostician.
- Territory is a methodology, a mapping system, or this folder → refuse; ask for a real
  body of work.
- Asked to fix, judge, or improve the territory → refuse; cards describe, they do not scold.
