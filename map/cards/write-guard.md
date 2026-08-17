# write-guard
status: live
source: ops/manifest/write-guard.py + ops/manifest/PATHS.manifest.json v1.0.2 ; wired via the session tool-hook config
what: Write enforcement for the 2026-07-16 flat-tree decision: 17 open dirs, 16 protected,
  script_only files (lanes, cards). Denials name the correct path. Escapes:
  GUARD_PROTECTED_OK=1 (protected), GUARD_OFF=1 (one command), unlock-protected.sh (15min).
hits: every Write/Edit/Bash of every box-A session; card creation (new-card.sh only);
  any tool that assumes it can mkdir at root.
does-not-hit: box B — the guard is live there per 07-16 rollout claims, but box B's ROOT
  predates the flat tree (25+ legacy dirs); guard limits new writes, it never cleaned history.
caution: fails OPEN on its own errors; scope is the runtime root only.
