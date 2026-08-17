# Worked example — the Homestead runtime

Territory: the ops runtime of a three-box home-lab fleet (boxes **A**, **B**, **C** on a
private mesh network). Multiple automated workers and one human operate across the boxes.
The objects below are real; names and paths are aliased. The later reader here is a cold
model: a fresh session that must change one thing without loading the whole tree.

## The catalog (map/CATALOG.md)

```
# Homestead runtime — catalog
Load this file, then ONE card from cards/. Then stop.

lane-store      live      who owns which workstream; all writes via lanes CLI   cards/lane-store.md
worker-queues   live      per-worker folder queues; written ≠ delivered         cards/worker-queues.md
sync-legs       live      3 legs, asymmetric; one leg missing by design gap     cards/sync-legs.md
publish-gate    live      the only sanctioned door for operator-facing sends    cards/publish-gate.md
locks-file      leftover  frozen pre-July history; grep-only                    cards/locks-file.md
screen-capture  ghost     LaunchAgent name exists; unloaded after incident      cards/screen-capture.md
legacy-product  leftover  retired product residue at repo root; inert           cards/legacy-product.md
"sync"/"inbox"  —         naming collisions                                     cards/collisions.md
```

## Card: lane-store (noun card, live)

```
# lane-store
status: live
source: comms/lanes/lanes.json ; CLI comms/lanes/lanes.mjs
what: The single record of who owns which workstream, its status, and its latest
  evidence. It is shaped as one JSON store with a CLI wrapper because raw edits by
  parallel workers destroyed it once; the wrapper is now the only sanctioned writer.
moves:
  - workers claim/update via `lanes.mjs set <id> ...` (manual, on claim)
  - box-A copy drifts from box-B canonical between syncs (see sync-legs)
hits: worker-queues (claims reference queue tasks); any freshness check that compares
  lane counts across boxes; session-start tooling that reads the brief.
does-not-hit: locks-file — it is the word everyone reaches for ("check the locks"),
  but it froze in July; editing it changes nothing and the CLI rejects raw writes anyway.
caution: the CLI whitelists fields at write time (lanes.mjs:73) and silently DROPS any
  field not on the list. A "successful" write can lose data. Cited, not copied — read
  the whitelist before adding fields.
```

## Card: sync-legs (noun card, live — with a hole)

```
# sync-legs
status: live
source: ops/scripts/sync-all.sh ; box-C LaunchAgent com.fleet.nightly-pull
what: Three replication legs, deliberately asymmetric and additive-only (a --delete
  flag once destroyed a week of work; the no-delete rule is why every leg looks
  "inefficient"). Leg 1: box-A pushes builds to box-B on demand. Leg 2: box-C pulls
  outputs from box-B nightly at 02:30, then box-B prunes after 2 days. Leg 3
  (box-B → box-A) DOES NOT EXIST; convergence back to box-A is manual hand-delivery.
moves: as above — one on-demand push, one scheduled pull, one absent leg.
hits: lane-store drift (leg 3's absence is why box-A's lane copy goes stale);
  anything that assumes "all boxes see the same outputs folder."
does-not-hit: publish-gate — sends to the operator do not ride the sync legs at all;
  fixing a stale file on box-A never fixes a missed delivery.
```

## Card: screen-capture (ghost card)

```
# screen-capture
status: ghost
source: ops/screen-audit/capture.sh ; LaunchAgent plist com.fleet.screen-audit
what: A periodic screen-capture service whose NAME survives in the tree and in older
  notes, but whose wiring is down: the LaunchAgent was unloaded on box-B after it
  captured sensitive session content without erroring (the OS returns exit 0 even
  when the permission is missing).
looked-for: `launchctl list | grep screen-audit` on each box (not loaded); recent
  frames in ops/screen-audit/frames/ (none newer than the incident date).
hits: nothing at runtime — that is the point of the card.
does-not-hit: your change plans. A reader who trusts the name will "re-enable
  monitoring" and re-open a credential-exposure hole. If it comes back, it comes
  back through the self-disabling variant in capture.sh, not the plist.
```

## One change, traced

**Change:** add a `priority` field to lane records.

- Catalog → `lane-store` card, two hops.
- The card's caution line routes you to the CLI whitelist (lanes.mjs:73) — without it
  your field writes "successfully" and silently vanishes.
- **Hits:** freshness tooling that diffs lane stores across boxes (unknown field on one
  box only = false drift alarm until leg-2 sync runs).
- **Does not hit:** locks-file, even though "locks" is the first word a newcomer greps.
- Stop. You never loaded the queues, the gates, or the ghosts.
```
