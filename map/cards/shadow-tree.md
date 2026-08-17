# shadow-tree/
status: leftover — WITH LIVE WIRING (the dangerous kind)
source: shadow-tree/ at the runtime root (7.7GB); retirement list comms/outputs/2026-08-07-index-pass/review/LEGACY-RETIREMENT.md §L9
what: The pre-2026-07-16 shadow tree, retired by the flat-tree decision. Kept because
  content merges additively over time; new writes are banned by manifest.
looked-for (life): launchctl + plists show 4 services still executing from inside it:
  quality-sweep (06:00), two board servers (:3121/:3122), and notify-publish's
  send helper script. Verified 08-16.
hits: retiring/moving this tree breaks those 4 services unless rehomed first; sync jobs
  that still log to shadow-tree/ops/logs/sync.log.
does-not-hit: comms/, ops/, projects/ at root — the live tree; nothing there imports from
  shadow-tree except the 4 paths above.
