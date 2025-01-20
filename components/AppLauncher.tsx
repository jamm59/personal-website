"use client";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import FileExplorer from "./FileExplorer";
import StartWindow from "./StartWindow";
import CustomTerminal from "./CommandLineTerminal";
import CodeEditor from "./VSCode";
import FolderWrapper from "./FolderWrapper";
import { PDFEditor, TextEditor } from "./BasicApps";

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
          {app.name === "File Explorer" && <FileExplorer app={app} />}
          {app.name === "Pdf Viewer" && <PDFEditor app={app} />}
          {app.name === "Text Viewer" && <TextEditor app={app} />}
        </div>
      ))}
    </div>
  );
}
