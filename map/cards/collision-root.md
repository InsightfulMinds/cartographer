# collision-root
status: live
source: the runtime root vs the legacy root alias (a symlink at the home dir, created 07-12, pointing at the runtime root)
what: Collision card. "The root" means two paths. Meaning 1: the runtime root — the flat
  tree write-guard enforces, what every card here cites. Meaning 2: the legacy root alias —
  a symlink with the old name that several loops still default to: session-inbox-executor,
  reference-shelf's state-probe, dual-host-sync, mail-watch's plist.
moves: none — but every script that reads the root env var falls back to one of the two.
hits: removing the symlink kills the four loops above silently (they resolve a path that
  no longer exists and their LaunchAgents keep reporting exit 0 or restart forever).
does-not-hit: write-guard scope — the guard keys on the runtime root only; a write
  through the alias resolves to the same inode and is guarded the same way.
