# vault
status: live
source: vault/ (protected tier; sessions/, research/, leads/, library/, plans/, a mirrored second-brain tree) ; writers: session-archive (nightly), ops/scripts/vault-indexer.py ; reader ops/scripts/vault-search.py
what: The long-memory store: distilled session notes, research, lead ledgers, plans.
  Protected so sessions cannot scribble in it directly; the sanctioned writers are the
  nightly archiver and the indexer.
moves: 02:17 nightly notes in; index rebuilt by the indexer on demand; search reads only.
hits: vault-search results; index passes that read the second-brain tree.
does-not-hit: memory/ at the runtime root — empty on box A (0 entries 08-29) and a
  different concept (the session tool keeps its own memory in the session-tool home).
