"use client";
import { useState, useRef } from "react";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import FileExplorer from "./FileExplorer";
import StartWindow from "./StartWindow";
import CustomTerminal from "./Terminal";

export default function AppLauncher() {
  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  const [currentRefIndex, setCurrentRefIndex] = useState<number>(0);
  const modalDivRef = useRef<any[]>([]);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    refIdx: number
  ) => {
    if (isDragging && modalDivRef.current) {
      modalDivRef.current[refIdx].style.left = `${event.clientX - offsetX}px`;
      modalDivRef.current[refIdx].style.top = `${event.clientY - offsetY}px`;
      modalDivRef.current[refIdx].style.position = "absolute";
    }
  };
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    refIdx: number
  ) => {
    if (modalDivRef.current[refIdx]) {
      setIsDragging(true);
      setOffsetX(event.clientX - modalDivRef.current[refIdx].offsetLeft);
      setOffsetY(event.clientY - modalDivRef.current[refIdx].offsetTop);
    }
  };

  return (
    <div className="">
      {apps.map((app: AppType, idx: number) => (
        <div key={idx}>
          {app.isDir && app.isOpen && !app.isMinimized && (
            <div
              onMouseUp={handleMouseUp}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              className="select-none absolute inset-0 grid place-items-center"
            >
              <FileExplorer
                ref={(el: any) => (modalDivRef.current[idx] = el)}
                handleMouseDown={(e) => handleMouseDown(e, idx)}
                appName={app.name}
              />
            </div>
          )}
          {app.name === "Start" && <StartWindow app={app} />}
          {app.name === "Terminal" && <CustomTerminal app={app} />}
        </div>
      ))}
    </div>
  );
}
