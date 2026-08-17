# notify-relay
status: ghost
source: expected listener on box A :8793 ; sender shadow-tree/.../send-notify-file.sh via ops/scripts/notify-publish.sh
what: The messenger-app delivery relay on box A. notify-publish.sh (GATE 1 HTML-only,
  GATE 2 SHA dedup, GATE 3 title) hands off to a relay on :8793; with no listener,
  publishes STAGE to comms/outputs/notify-outbound/ and report "no link".
looked-for: two notify-publish runs on 08-16 both returned "nothing serves box A :8793".
hits: dispatch-watcher (its 3 send failures), every closeout packet delivery, any "sent to
  the operator" claim from a box-A session — all silently degrade to staged-only.
does-not-hit: box B's messenger stack (poll/outbound LaunchAgents) — that relay is
  separate and was reachable per fleet notes; fixing box A's :8793 does not touch it.
