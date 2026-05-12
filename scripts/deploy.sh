#!/bin/sh
set -e

# Load .env file for USER and HOSTNAME
. "$(dirname "$0")/../.env"

PLUGIN_DIR="/home/$DECK_USER/homebrew/plugins/decky-ssh-toggle"
SOCKET="/tmp/decky_ctl"

# Open a reusable SSH control socket to avoid re-authenticating for each command
ssh -M -S "$SOCKET" -fNT "$DECK_USER@$DECK_HOST"

# Ensure the plugin directory exists and is owned by the deck user
ssh -t -S "$SOCKET" "$DECK_USER@$DECK_HOST" \
  "sudo mkdir -p $PLUGIN_DIR && sudo chown -R $DECK_USER:$DECK_USER $PLUGIN_DIR"

# Copy plugin files to the deck
scp -o "ControlPath=$SOCKET" -r \
  dist/ main.py plugin.json package.json \
  "$DECK_USER@$DECK_HOST:$PLUGIN_DIR/"

# Restart the Decky plugin loader to pick up the new files
ssh -t -S "$SOCKET" "$DECK_USER@$DECK_HOST" \
  "sudo systemctl restart plugin_loader"

# Close the control socket
ssh -S "$SOCKET" -O exit "$DECK_HOST" 2>/dev/null
