import { create } from "zustand";
import { AppNameType, AppType, FileManagerType } from "..";

export const useFileMangerStore = create<FileManagerType>((set) => ({
  apps: [
    {
      name: "windowsMenu",
      isOpen: false,
      isMinimized: false,
      isOnTaskBar: true,
      iconUrl: "/icons/windows.png",
    },
    {
      name: "taskview",
      isOpen: false,
      isMinimized: false,
      isOnTaskBar: true,
      iconUrl: "/icons/taskview.png",
    },

    {
      name: "copilot",
      isOpen: false,
      isMinimized: false,
      isOnTaskBar: true,
      iconUrl: "/icons/copilot.png",
    },
    {
      name: "microsoftStore",
      isOpen: false,
      isMinimized: false,
      isOnTaskBar: false,
      iconUrl: "/icons/microsoft-store.webp",
    },
    {
      name: "fileExplorer",
      isOpen: false,
      isMinimized: false,
      isOnTaskBar: true,
      iconUrl: "/icons/file-explorer.png",
    },
    {
      name: "vsCode",
      isOpen: false,
      isMinimized: false,
      isOnTaskBar: true,
      iconUrl: "/icons/vscode.png",
    },
  ],
  handleOpenApp: (appName: AppNameType) =>
    set((state) => {
      const updatedApps = state.apps.map((app) =>
        app.name === appName ? { ...app, isOpen: true } : app
      );

      return { apps: updatedApps };
    }),

  handleCloseApp: (appName: AppNameType) =>
    set((state) => {
      const updatedApps = state.apps.map((app) =>
        app.name === appName ? { ...app, isOpen: false } : app
      );

      return { apps: updatedApps };
    }),

  handleMinimizeApp: (appName: AppNameType) =>
    set((state) => {
      const updatedApps = state.apps.map((app) =>
        app.name === appName ? { ...app, isMinimized: !app.isMinimized } : app
      );
      return { apps: updatedApps };
    }),
}));
