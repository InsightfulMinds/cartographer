# screen-audit
status: live (deliberate-keep/kill pending)
source: ops/screen-audit/capture.sh ; LaunchAgent, StartInterval 5s (hottest loop on box A, verified 08-16)
what: Screen-capture collector with the post-incident self-disable pattern: it measures
  output variation and halts+alerts when frames stop varying. Exists BECAUSE the naive
  version silently captured a live credential on another box (07-15/16 incident).
hits: disk (frames ring buffer); OS Screen Recording permission state; privacy posture
  of any session on this box.
does-not-hit: the work-capture skill — separate tool (task timelines/video), different
  wiring; killing screen-audit does not affect it.
caution: frames/ must stay excluded from all sync legs (additive-only syncs never prune).
