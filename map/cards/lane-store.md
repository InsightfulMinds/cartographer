# lane-store
status: live
source: comms/lanes/lanes.json (box B canonical; box-A copy drifts) ; CLI comms/lanes/lanes.mjs
what: The single record of who owns which workstream, status, evidence. One JSON store +
  mandatory CLI because parallel raw edits corrupted it (sync-conflict debris in the same
  folder is the scar). Raw writes rejected by write-guard script_only tier.
moves: claim/update via `node lanes.mjs set <id> ...`; read `lanes.mjs brief` at session start.
hits: freshness.sh drift check; tabs/board views; duplicate-work prevention across all workers.
does-not-hit: TASK_LOCKS.md — frozen 2026-07-16 history; grep-only archaeology.
caution: set() whitelists fields and silently DROPS unknown keys (lanes.mjs ~line 73);
  id-less set once wrote {id: undefined} and crashed brief() fleet-wide — now throws (line 66).
