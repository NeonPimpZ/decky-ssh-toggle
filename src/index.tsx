import {
  PanelSection,
  PanelSectionRow,
  ToggleField,
  staticClasses,
} from "@decky/ui";
import {
  callable,
  definePlugin,
  toaster,
} from "@decky/api";
import { useState, useEffect } from "react";
import { FaTerminal } from "react-icons/fa";

const getSshActive = callable<[], boolean>("get_ssh_active");
const setSshActive = callable<[enabled: boolean], boolean>("set_ssh_active");
const getSshEnabled = callable<[], boolean>("get_ssh_enabled");
const setSshEnabled = callable<[enabled: boolean], boolean>("set_ssh_enabled");

function Content() {
  const [active, setActive] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loadingActive, setLoadingActive] = useState<boolean>(true);
  const [loadingEnabled, setLoadingEnabled] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setActive(await getSshActive());
      setLoadingActive(false);
      setEnabled(await getSshEnabled());
      setLoadingEnabled(false);
    })();
  }, []);

  const handleActiveToggle = async (value: boolean) => {
    setLoadingActive(true);
    const success = await setSshActive(value);
    if (success) {
      setActive(value);
    } else {
      toaster.toast({ title: "SSH Toggle", body: "Failed to start/stop SSH" });
    }
    setLoadingActive(false);
  };

  const handleEnabledToggle = async (value: boolean) => {
    setLoadingEnabled(true);
    const success = await setSshEnabled(value);
    if (success) {
      setEnabled(value);
    } else {
      toaster.toast({ title: "SSH Toggle", body: "Failed to enable/disable SSH" });
    }
    setLoadingEnabled(false);
  };

  return (
    <PanelSection title="SSH">
      <PanelSectionRow>
        <ToggleField
          label="Active"
          description={loadingActive ? "Loading..." : active ? "SSH is running" : "SSH is stopped"}
          checked={active}
          onChange={handleActiveToggle}
          disabled={loadingActive}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Start on boot"
          description={loadingEnabled ? "Loading..." : enabled ? "SSH starts automatically" : "SSH does not start automatically"}
          checked={enabled}
          onChange={handleEnabledToggle}
          disabled={loadingEnabled}
        />
      </PanelSectionRow>
    </PanelSection>
  );
}

export default definePlugin(() => {
  return {
    name: "SSH Toggle",
    titleView: <div className={staticClasses.Title}>SSH Toggle</div>,
    content: <Content />,
    icon: <FaTerminal />,
    onDismount() {},
  };
});
