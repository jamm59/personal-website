import { create } from "zustand";
import { AppNameType, AppType, StoreDataType } from "..";

export const useDataStore = create<StoreDataType>((set) => ({
  apps: [
    {
      name: "windowsMenu",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/windows.png",
    },
    {
      name: "taskview",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/taskview.png",
    },

    {
      name: "copilot",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/copilot.png",
    },
    {
      name: "microsoftStore",
      isOpen: false,
      isOnTaskBar: false,
      iconUrl: "/icons/microsoft-store.webp",
    },
    {
      name: "fileExplorer",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/file-explorer.png",
    },
    {
      name: "vsCode",
      isOpen: false,
      isOnTaskBar: true,
      iconUrl: "/icons/vscode.png",
    },
  ],
  allOpenApps: new Set(),
  addOpenedApp: (appName: AppNameType) =>
    set((state) => {
      const newSet = new Set(state.allOpenApps);
      newSet.add(appName);

      const updatedApps = state.apps.map((app) =>
        app.name === appName ? { ...app, isOpen: true } : app
      );

      return { allOpenApps: newSet, apps: updatedApps };
    }),
  closeAppBasedOnAppName: (appName: AppNameType) =>
    set((state) => {
      const newSet = new Set(state.allOpenApps);
      const updatedApps = state.apps.map((app) =>
        app.name === appName ? { ...app, isOpen: false } : app
      );
      newSet.delete(appName);

      return { allOpenApps: newSet, apps: updatedApps };
    }),
}));

interface FileEntrieType {
  name: string;
  icon: string;
  type: string;
  children?: FileEntrieType[];
}
interface FileManagerType {
  Desktop: FileEntrieType[];
}

export const useFileManager = create((set) => {
  Desktop: [
    { name: "Recyle Bin", icon: "", type: "explorer" },
    { name: "About Author", icon: "", type: "card" },
    { name: "Wallpaper", icon: "", type: "settings" },
    { name: "Exit", icon: "", type: "exit" },
    {
      name: "Projects",
      icon: "",
      type: "folder",
      children: [
        { name: "New folder", icon: "", type: "folder", children: [] },
      ],
    },
  ];
  TaskBar: [
    { name: "Recyle Bin", icon: "", type: "explorer" },
    { name: "About Author", icon: "", type: "card" },
    { name: "Wallpaper", icon: "", type: "settings" },
    { name: "Exit", icon: "", type: "exit" },
    {
      name: "Projects",
      icon: "",
      type: "folder",
      children: [
        { name: "New folder", icon: "", type: "folder", children: [] },
      ],
    },
  ];
});
