import { create } from "zustand";
import { AppNameType, AppType, StoreDataType } from "..";

export const useDataStore = create<StoreDataType>((set) => ({
  apps: [
    {
      name: "windowsMenu",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/taskbar/windows.png",
    },
    {
      name: "copilot",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/taskbar/copilot.png",
    },
    {
      name: "microsoftStore",
      isOpen: false,
      isOnTaskBar: false,
      iconUrl: "/icons/taskbar/microsoft-store.webp",
    },
    {
      name: "fileExplorer",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/taskbar/file-explorer.png",
    },
    {
      name: "vsCode",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/taskbar/vscode.png",
    },
  ],
  allOpenApps: new Set(),
  addOpenedApp: (appName: AppNameType) =>
    set((state) => {
      // Create a new Set instance
      const newSet = new Set(state.allOpenApps);
      newSet.add(appName);
      return { allOpenApps: newSet };
    }),
  closeAppBasedOnAppName: (appName: AppNameType) =>
    set((state) => {
      // Create a new Set instance
      const newSet = new Set(state.allOpenApps);
      newSet.delete(appName);
      return { allOpenApps: newSet };
    }),
}));
