# decky-ssh-toggle

A [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) plugin for the Steam Deck that lets you toggle SSH on and off directly from the Quick Access Menu.

## Features

- **Active** toggle — start or stop the `sshd` service immediately
- **Start on boot** toggle — enable or disable `sshd` auto-start via systemctl

## Installation

First, install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader), then enable **Developer Mode** in the Decky settings (gear icon in the Quick Access Menu).

### Install from URL (easiest)

1. In the **Developer** section, select **Install Plugin from URL**.
2. Enter:

   ```text
   https://github.com/NeonPimpZ/decky-ssh-toggle/releases/latest/download/decky-ssh-toggle.zip
   ```

3. Confirm — the plugin will install and appear under the plug icon.

### Install from ZIP

1. Download `decky-ssh-toggle.zip` from the [latest release](https://github.com/NeonPimpZ/decky-ssh-toggle/releases/latest) onto your Steam Deck.
2. In the **Developer** section, select **Install Plugin from ZIP** and select the downloaded file.
3. The plugin will install and appear under the plug icon.

## Development

### Prerequisites

- Node.js v16.14+ and pnpm v9
- Docker (for the reproducible build)

```bash
sudo npm i -g pnpm@9
```

### Setup

```bash
pnpm install
```

### Build

```bash
pnpm build          # single build
pnpm watch          # rebuild on file changes
pnpm build:docker   # reproducible build inside Docker
```

### Deploy

Copy the built plugin to your Steam Deck and restart the plugin loader:

```bash
pnpm deploy
```

The deploy script reads connection details from a `.env` file in the project root. Copy `.env.example` and fill in your Deck's hostname and username:

```bash
cp .env.example .env
```

```env
DECK_USER=deck
DECK_HOST=steamdeck
```
