# mail-watch
status: live
source: Library/LaunchAgents/com.fleet.mail-watch.plist (StartInterval 60) ; products/mail-protect/tools/mail-watch.py (invoked via the legacy root alias)
what: Sixty-second poll of a local mail client for phishing-shaped messages, part of the
  mail-protect product living under products/. The plist addresses the script through the
  legacy root alias, not the runtime root (see collision-root).
moves: 60s poll → product-local state; alerts by the product's own path.
hits: products/mail-protect (its only home); the legacy root alias symlink.
does-not-hit: output-gate — that scans OUTBOUND artifacts for secrets; this scans INBOUND
  mail for lures. Same word "protect", opposite direction.
