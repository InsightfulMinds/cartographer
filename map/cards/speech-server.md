# speech-server
status: live
source: Library/LaunchAgents/com.fleet.ears-server.plist (KeepAlive; uvicorn on the box-A mesh address :8990, listener verified 08-29) ; venv outside the runtime root
what: Local speech-to-text HTTP service exposed on the private mesh so other boxes can post
  audio and get text. Runs from a separate venv directory beside the runtime root, not
  inside it — the runtime only holds the plist.
moves: KeepAlive; request/response only.
hits: any voice-stack caller on box B that hardcodes this box's mesh address:8990.
does-not-hit: the operator-level dictation guard agent (com.operator.*) — separate tool,
  separate LaunchAgent, not part of the runtime; stopping speech-server does not affect it.
