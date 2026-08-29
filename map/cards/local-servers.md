# local-servers
status: live
source: Library/LaunchAgents/com.fleet.client-review.plist (:8790) ; com.fleet.board-client.plist (:3121) ; com.fleet.board-rollup.plist (:3122) — all KeepAlive, all bound to 127.0.0.1, listeners verified 08-29
what: Three small Python HTTP servers for human review surfaces: one client-review server
  rooted in a comms/outputs/ folder, two deliverable-board servers rooted in
  shadow-tree/clients/comm-boards/. Loopback-only; reachable off-box only if edge-tunnel
  declares an ingress for them.
moves: KeepAlive restarts on crash; no scheduled work; serve on request.
hits: shadow-tree retirement (two of the three execute from inside it); edge-tunnel
  ingress rules if any point at these ports.
does-not-hit: speech-server (:8990) — that one binds the mesh address, not loopback, and
  is a different LaunchAgent; the port list in reference-shelf STATE.md is the map of all.
