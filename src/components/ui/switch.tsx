// src/components/ui/switch.tsx
import { Switch as HeadlessSwitch } from "@headlessui/react";

export function Switch({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-300"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform bg-white rounded-full transition`}
      />
    </HeadlessSwitch>
  );
}
