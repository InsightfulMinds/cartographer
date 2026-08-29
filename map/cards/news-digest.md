# news-digest
status: live (send failing)
source: ops/scripts/news-digest.py --run ; Library/LaunchAgents/com.fleet.news-digest.plist (StartCalendarInterval 09:03 + 21:xx) ; state ops/state/news-digest/{items,seen}.json
what: Feed crawler + two-bucket classifier that composes a messenger digest twice a day.
  Dedup state lives in seen.json so re-runs never re-send.
moves: calendar fire → crawl feeds → write items/seen → messenger send (direct bot call,
  not via notify-relay).
hits: ops/state/news-digest (delete seen.json and the next run re-sends history).
does-not-hit: notify-relay — this job talks to the messenger API directly; fixing the
  :8793 relay will not fix its sends.
caution: log 08-29 shows the send failing on name resolution ("nodename nor servname") —
  the crawl half is alive, the delivery half is not; the LaunchAgent still reports exit 0.
