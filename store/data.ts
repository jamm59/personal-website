import { create } from "zustand";
import { AppNameType, AppType, FileManagerType } from "..";

const template = {
  name: "None",
  isDir: false,
  isOpen: false,
  isMinimized: false,
  isOnTaskBar: true,
  isTempOnTaskBar: false,
  iconUrl: "/icons/windows.png",
};
export const useFileMangerStore = create<FileManagerType>((set) => ({
  apps: [
    {
      ...template,
      name: "Start",
      iconUrl: "/icons/windows.png",
    },
    {
      ...template,
      name: "Task View",
      iconUrl: "/icons/taskview.png",
    },
    {
      ...template,
      name: "Copilot",
      iconUrl: "/icons/copilot.png",
    },
    {
      ...template,
      name: "Microsoft Store",
      iconUrl: "/icons/microsoft-store.webp",
    },
    {
      ...template,
      name: "File Explorer",
      isDir: true,
      iconUrl: "/icons/file-explorer.png",
    },
    {
      ...template,
      name: "vsCode",
      iconUrl: "/icons/vscode.png",
    },
    {
      ...template,
      name: "Settings",
      iconUrl: "/icons/settings.png",
    },
    {
      ...template,
      name: "Recycle Bin",
      isDir: true,
      isOnTaskBar: false,
      iconUrl: "/icons/recycle-bin.png",
    },
    {
      ...template,
      name: "About Author",
      isDir: true,
      isOnTaskBar: false,
      iconUrl: "/icons/folder.png",
    },
    {
      ...template,
      name: "New folder",
      isDir: true,
      isOnTaskBar: false,
      iconUrl: "/icons/folder.png",
    },
    {
      ...template,
      name: "Terminal",
      isDir: false,
      isOnTaskBar: false,
      iconUrl: "/icons/terminal.png",
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

  // desktop functions
  handleCreateNewFolder: () =>
    set((state) => {
      const folder: AppType = {
        name: "New folder",
        isDir: false,
        isOpen: false,
        isMinimized: false,
        isOnTaskBar: false,
        iconUrl: "/icons/folder.png",
      };
      return { apps: [...state.apps, folder] };
    }),

  handleAddAppToTaskBar: (appName: AppNameType, isTempOnTaskBar: boolean) =>
    set((state) => {
      const updatedApps = state.apps.map((app) =>
        app.name === appName
          ? { ...app, isTempOnTaskBar: isTempOnTaskBar }
          : app
      );

      return { apps: updatedApps };
    }),
}));
