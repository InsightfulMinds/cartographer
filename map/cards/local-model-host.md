# local-model-host
status: live
source: the local model server on :11434 (listener verified 08-29) ; ops/modelfiles/ ; ops/litellm/config.yaml + ops/scripts/start-litellm.sh
what: Boundary card. The on-box model runtime the nightly jobs talk to instead of a paid
  API. What crosses: HTTP completions from overnight-council (and any session that opts
  in). Model definitions live in ops/modelfiles/; the server's own state is outside the
  runtime root.
moves: request/response only; no schedule of its own.
hits: overnight-council (its only scheduled caller); the A/B override that swaps a hosted
  model in for a date.
does-not-hit: the proxy layer — a proxy config exists in ops/litellm/ but no proxy process
  was found running (08-29); jobs call the model server directly.
