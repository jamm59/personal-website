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
  type: "image" | "folder" | "pdf" | "text";
  name: AppNameType;
  launcher: "Text Viewer" | "Pdf Viewer" | "Image Viewer";
  iconUrl: string;
  parent?: AppType;
}
export interface AppType {
  name: AppNameType;
  launcher: AppNameType | null;
  isDir: boolean;
  isOpen: boolean;
  stackLevel: number;
  showApp: boolean;
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
  handleUpdateStackZIndexLevel: (appName: AppNameType) => void;
  handlePinAndUnpinTaskBarApps: (
    appName: AppNameType,
    pinOrUnpin: boolean
  ) => void;
}
