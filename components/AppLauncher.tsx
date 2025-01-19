"use client";
import { useState, useRef } from "react";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import FileExplorer from "./FileExplorer";
import StartWindow from "./StartWindow";
import CustomTerminal from "./CommandLineTerminal";
import CodeEditor from "./VSCode";

export default function AppLauncher() {
  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  return (
    <div className="">
      {apps.map((app: AppType, idx: number) => (
        <div key={idx}>
          {app.isDir && <FileExplorer app={app} />}
          {app.name === "Start" && <StartWindow app={app} />}
          {app.name === "Terminal" && <CustomTerminal app={app} />}
          {app.name === "vsCode" && <CodeEditor app={app} />}
        </div>
      ))}
    </div>
  );
}
