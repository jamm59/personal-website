"use client";
import { useState, useRef } from "react";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import FileExplorer from "./FileExplorer";
import StartWindow from "./StartWindow";
import CustomTerminal from "./CommandLineTerminal";

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
        </div>
      ))}
    </div>
  );
}
