// src/components/ui/tabs.tsx
import * as React from "react";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import clsx from "clsx";

// Root Tabs wrapper
export function Tabs({
  defaultIndex,
  selectedIndex,
  onChange,
  children,
}: {
  defaultIndex?: number;
  selectedIndex?: number;
  onChange?: (index: number) => void;
  children: React.ReactNode;
}) {
  return (
    <TabGroup
      defaultIndex={defaultIndex}
      selectedIndex={selectedIndex}
      onChange={onChange}
    >
      {children}
    </TabGroup>
  );
}

// TabsList — holds the triggers
export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabList className={clsx("flex space-x-2 bg-gray-100 rounded-lg p-1", className)}>
      {children}
    </TabList>
  );
}

// Single Tab (trigger)
export function TabsTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          "px-4 py-2 text-sm font-medium rounded-md transition",
          selected
            ? "bg-white shadow text-blue-600"
            : "text-gray-500 hover:text-blue-500 hover:bg-white/60",
          className
        )
      }
    >
      {children}
    </Tab>
  );
}

// TabsContent wrapper — wraps multiple panels
export function TabsContent({ children }: { children: React.ReactNode }) {
  return <TabPanels>{children}</TabPanels>;
}

// Single content panel
export function TabPanelContent({ children }: { children: React.ReactNode }) {
  return <TabPanel className="mt-4">{children}</TabPanel>;
}
