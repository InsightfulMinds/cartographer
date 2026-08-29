# session-archive
status: live
source: ops/scripts/session-archive.mjs ; Library/LaunchAgents/com.fleet.session-archive.plist (StartCalendarInterval 02:17; state file touched 02:33 on 08-29)
what: Nightly transcript distiller. Scans the session tool's transcripts for sessions new or
  changed since last run, skips anything under 3 real user messages, strips tool calls,
  and has a small model write one note per session into vault/sessions/YYYY/MM/ (47 notes
  for 08). Resumed sessions overwrite their note by session id instead of duplicating.
moves: 02:17 nightly (fires on wake if asleep) → read transcripts → write vault/sessions;
  state in vault/sessions/.archive-state.json.
hits: vault (its only writer of sessions/); the index passes that later read those notes.
does-not-hit: checkpoint-daemon — a different, older snapshot idea (see its ghost card);
  restarting it would write to snapshots/, not the vault.
