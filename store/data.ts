import { create } from "zustand";
import { AppNameType, AppType, FileManagerType } from "..";

const template: AppType = {
  name: "None",
  isDir: false,
  isOpen: false,
  isMinimized: false,
  isOnTaskBar: true,
  canAddPages: false,
  isTempOnTaskBar: false,
  isOnBothDeskTopAndTaskBar: false,
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
      canAddPages: true,
      iconUrl: "/icons/file-explorer.png",
    },

    {
      ...template,
      name: "Recycle Bin",
      isDir: true,
      isOnTaskBar: false,
      canAddPages: true,
      iconUrl: "/icons/recycle-bin.png",
    },
    {
      ...template,
      name: "vsCode",
      isOnBothDeskTopAndTaskBar: true,
      iconUrl: "/icons/vscode.png",
    },
    {
      ...template,
      name: "Settings",
      iconUrl: "/icons/settings.png",
    },
    {
      ...template,
      name: "About Author",
      isDir: true,
      isOnTaskBar: false,
      canAddPages: true,
      iconUrl: "/icons/folder.png",
    },
    {
      ...template,
      name: "Wallpapers",
      isDir: true,
      canAddPages: true,
      isOnTaskBar: false,
      iconUrl: "/icons/folder.png",
    },
    {
      ...template,
      name: "Terminal",
      isDir: false,
      isOnTaskBar: false,
      canAddPages: true,
      iconUrl: "/icons/terminal.png",
    },
  ],
  handleOpenApp: (appName: AppNameType) =>
    set((state) => {
      const updatedApps = state.apps.map((app) => {
        if (appName != "Start" && app.name === "Start")
          return { ...app, isOpen: false };
        if (app.name === appName) return { ...app, isOpen: true };
        return app;
      });

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
      let newFolderName: string = "New folder";
      const otherNames = state.apps.filter((app: AppType) =>
        app.name.startsWith(newFolderName)
      );
      if (otherNames.length >= 1) {
        const lastItem = otherNames[otherNames.length - 1];
        let previousNumber: number = parseInt(
          lastItem.name.split(" ")[lastItem.name.split(" ").length - 1]
        );
        if (!isNaN(previousNumber)) {
          newFolderName += " " + (previousNumber + 1).toString();
        } else {
          newFolderName += " 1";
        }
      }

      const folder: AppType = {
        ...template,
        name: newFolderName,
        isDir: true,
        canAddPages: true,
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

  handlePinAndUnpinTaskBarApps: (appName: AppNameType, pinOrUnpin: boolean) =>
    set((state) => {
      console.log(pinOrUnpin);
      const updatedApps = state.apps.map((app) =>
        app.name === appName ? { ...app, isOnTaskBar: pinOrUnpin } : app
      );

      return { apps: updatedApps };
    }),
}));
