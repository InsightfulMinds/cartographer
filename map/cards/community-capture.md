# community-capture
status: ghost
source: skills/community-capture/monitor.sh ; skills/community-capture/screenshots.sh ; Library/LaunchAgents/com.fleet.community-monitor.plist + com.fleet.community-screenshots.plist (KeepAlive false)
what: Two session-scoped capture daemons for a community-platform live event: a monitor and a
  screenshotter, both keyed on a .current-session marker written by start-session.sh.
  Without the marker they exit immediately by design.
looked-for: launchctl shows both loaded with last exit 1; their err logs end
  ".current-session not found, exiting" (08-14, 08-23); no marker file present 08-29.
hits: nothing while dormant; start-session.sh brings both to life for one event.
does-not-hit: screen-audit — the always-on 5s screen ring buffer is a different
  LaunchAgent with its own PAUSED switch; these two never write to frames/.
