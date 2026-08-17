# Card types (closed set)

Exactly four card types. Do not invent new ones.

## 1. Noun card (the default)

```
# <name>
status: live | leftover | ghost
source: <path>[:line]
what: 2–4 sentences — what it is and why it is shaped this way
moves: its movements (trigger + direction), one line each
hits: nouns that move if you change this
does-not-hit: <the obvious wrong neighbour> — <why>
```

## 2. Ghost card

Noun card plus a `looked-for:` line — the wiring you searched for and did not find.
A ghost card without `looked-for:` is an accusation, not evidence.

## 3. Boundary card

For a noun the map touches but does not own (an external service, another team's repo).
States only: what crosses the boundary, in which direction, and where the far side's own
map/docs live. Never describes the far side's internals.

## 4. Collision card

One card per naming collision in the territory (see naming-collisions.md). Lists each
meaning of the shared name and which card owns each meaning.
