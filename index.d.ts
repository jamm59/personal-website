export type AppNameType =
  | "folder"
  | "taskview"
  | "fileExplorer"
  | "browser"
  | "copilot"
  | "microsoftStore"
  | "windowsMenu"
  | "vsCode"
  | string;

export interface AppType {
  name: AppNameType;
  isOpen: boolean;
  isMinimized: boolean;
  isOnTaskBar: boolean;
  iconUrl: string;
  children?: AppType[];
}

export interface FileManagerType {
  apps: AppType[];
  handleOpenApp: (appName: AppNameType) => void;
  handleCloseApp: (appName: AppNameType) => void;
  handleMinimizeApp: (appName: AppNameType) => void;
  handleCreateNewFolder: () => void;
}
