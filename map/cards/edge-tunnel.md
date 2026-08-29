# edge-tunnel
status: live
source: Library/LaunchAgents/com.fleet.box-a-tunnel.plist (KeepAlive, pid verified 08-29) ; token file outside the runtime root
what: Boundary card. The outbound tunnel from box A to the CDN/edge provider. What crosses:
  HTTP for the hostnames declared in the provider-side ingress, inbound only, terminating
  on loopback ports on this box. Nothing in the runtime root configures its routes — the
  route table lives in the provider dashboard, and that is where its docs live.
moves: KeepAlive daemon; reconnects on its own; no files written in the runtime.
hits: any local-servers port an ingress points at; the public hostnames the operator
  hands out.
does-not-hit: sync-legs — replication rides the private mesh between boxes, never this
  tunnel; a tunnel outage changes nothing about box B or C.
