"use client";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import FileExplorer from "./FileExplorer";
import StartWindow from "./StartWindow";
import CustomTerminal from "./CommandLineTerminal";
import RecycleBin from "./RecycleBin";
import CodeEditor from "./VSCode";
import FolderWrapper from "./FolderWrapper";

export default function AppLauncher() {
  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  return (
    <div className="">
      {apps.map((app: AppType, idx: number) => (
        <div key={idx}>
          {app.isDir && app.name !== "File Explorer" && (
            <FolderWrapper app={app} />
          )}
          {app.name === "Start" && <StartWindow app={app} />}
          {app.name === "Terminal" && <CustomTerminal app={app} />}
          {app.name === "vsCode" && <CodeEditor app={app} />}
          {app.name === "Recycle Bin" && <RecycleBin app={app} />}
          {app.name === "File Explorer" && <FileExplorer app={app} />}
        </div>
      ))}
    </div>
  );
}
