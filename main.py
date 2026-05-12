import subprocess
import os
import decky

def _clean_env():
    env = os.environ.copy()
    env.pop("LD_LIBRARY_PATH", None)
    env.pop("LD_PRELOAD", None)
    return env

class Plugin:
    async def get_ssh_active(self) -> bool:
        try:
            result = subprocess.run(
                ["/usr/bin/systemctl", "is-active", "sshd"],
                capture_output=True, text=True, env=_clean_env()
            )
            return result.returncode == 0
        except Exception as e:
            decky.logger.error(f"Error getting SSH active state: {e}")
            return False

    async def set_ssh_active(self, enabled: bool) -> bool:
        try:
            action = "start" if enabled else "stop"
            result = subprocess.run(
                ["/usr/bin/systemctl", action, "sshd"],
                capture_output=True, text=True, env=_clean_env()
            )
            if result.returncode != 0:
                decky.logger.error(f"systemctl {action} sshd failed: {result.stderr.strip()}")
                return False
            return True
        except Exception as e:
            decky.logger.error(f"Error setting SSH active state: {e}")
            return False

    async def get_ssh_enabled(self) -> bool:
        try:
            result = subprocess.run(
                ["/usr/bin/systemctl", "is-enabled", "sshd"],
                capture_output=True, text=True, env=_clean_env()
            )
            return result.stdout.strip() in ("enabled", "enabled-runtime")
        except Exception as e:
            decky.logger.error(f"Error getting SSH enabled state: {e}")
            return False

    async def set_ssh_enabled(self, enabled: bool) -> bool:
        try:
            action = "enable" if enabled else "disable"
            result = subprocess.run(
                ["/usr/bin/systemctl", action, "sshd"],
                capture_output=True, text=True, env=_clean_env()
            )
            if result.returncode != 0:
                decky.logger.error(f"systemctl {action} sshd failed: {result.stderr.strip()}")
                return False
            return True
        except Exception as e:
            decky.logger.error(f"Error setting SSH enabled state: {e}")
            return False

    async def _main(self):
        decky.logger.info("SSH Toggle plugin loaded")

    async def _unload(self):
        decky.logger.info("SSH Toggle plugin unloaded")

    async def _uninstall(self):
        decky.logger.info("SSH Toggle plugin uninstalled")

    async def _migration(self):
        pass
