export type AppNameType =
  | "folder"
  | "fileExplorer"
  | "browser"
  | "copilot"
  | "microsoftStore"
  | "windowsMenu"
  | "vsCode";

export interface AppType {
  name: AppNameType;
  isOpen: boolean;
  isOnTaskBar: boolean;
  iconUrl: string;
}

export interface StoreDataType {
  apps: AppType[];
  allOpenApps: Set<AppNameType>;
  addOpenedApp: (appName: AppNameType) => void;
  closeAppBasedOnAppName: (appName: AppNameType) => void;
}
