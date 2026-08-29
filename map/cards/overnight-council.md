# overnight-council
status: live (last round FAILED)
source: ops/scripts/overnight-council.sh ; Library/LaunchAgents/com.fleet.overnight-council.plist (StartCalendarInterval 23:00 / 02:xx / 05:xx) ; output comms/outputs/council/
what: Nightly audit-and-research pass on the local model host only — no paid API by design.
  A circuit breaker skips the model call when the input hash is unchanged; an A/B override
  file (ops/config/digest-model-override.conf) can swap in a hosted model per date.
moves: 2-3 fires per night → read runtime state → write council-YYYYMMDD.log + one round
  file; on failure the round file is suffixed .FAILED and the hash is NOT advanced.
hits: local-model-host (its whole compute path); comms/outputs/council/ growth.
does-not-hit: news-digest — a separate scheduled job with its own state and its own
  messenger send; a failed council round says nothing about the digest.
caution: 08-29 round-3 exited 1 (model 7b-coder override); re-fires re-evaluate — check
  the .FAILED file before assuming the schedule is dead.
