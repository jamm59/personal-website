export type AppNameType =
  | "Folder"
  | "Task View"
  | "File Explorer"
  | "Copilot"
  | "Microsoft Store"
  | "Start"
  | "vsCode"
  | string;

export interface FileType {
  type: "picture";
  name: AppNameType;
  iconUrl: string;
}
export interface AppType {
  name: AppNameType;
  isDir: boolean;
  isOpen: boolean;
  isMinimized: boolean;
  isOnTaskBar: boolean;
  canAddPages: boolean;
  isTempOnTaskBar: boolean;
  isOnBothDeskTopAndTaskBar: boolean;
  iconUrl: string;
  children?: AppType[] | FileType[];
}

export interface FileManagerType {
  apps: AppType[];
  wallpaper: string;
  setWallpaper: (wallpaperName: string) => void;
  handleOpenApp: (appName: AppNameType) => void;
  handleCloseApp: (appName: AppNameType) => void;
  handleMinimizeApp: (appName: AppNameType) => void;
  handleCreateNewFolder: () => void;
  handleAddAppToTaskBar: (appName: AppNameType, isOnTaskBar: boolean) => void;
  handlePinAndUnpinTaskBarApps: (
    appName: AppNameType,
    pinOrUnpin: boolean
  ) => void;
}
