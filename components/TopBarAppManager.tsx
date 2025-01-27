"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { useFileMangerStore } from "@/store/data";
import { AppType, FileManagerType } from "..";

interface TopBarAppManagerType {
  app: AppType;
  children?: React.ReactNode;
  mainWrapperBackgroundColor?: string | null;
  titleColor: string;
  bgColor: string;
  AppIcon: any;
}
const TopBarAppManager = (props: TopBarAppManagerType) => {
  const {
    app,
    children,
    titleColor,
    bgColor,
    AppIcon,
    mainWrapperBackgroundColor,
  } = props;
  // constants and variables
  const [backgroundColor, setBackgroundColor] = useState<string>(
    mainWrapperBackgroundColor ?? "rgba(255,255,255,0.8)"
  );
  const customWindowWidth: string = "80%";

  // Global state
  const closeAppFunction = useFileMangerStore(
    (state: FileManagerType) => state.handleCloseApp
  );
  const minimizeFunction = useFileMangerStore(
    (state: FileManagerType) => state.handleMinimizeApp
  );

  const handleAddAppToTaskBar = useFileMangerStore(
    (state: FileManagerType) => state.handleAddAppToTaskBar
  );

  const handleUpdateStackZIndexLevel = useFileMangerStore(
    (state: FileManagerType) => state.handleUpdateStackZIndexLevel
  );

  // components states and references
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  // callback functions
  const handleCloseApp = () => {
    closeAppFunction(app.name);
    handleAddAppToTaskBar(app.name, false);
  };
  const handleMinimizeApp = () => {
    minimizeFunction(app.name);
  };
  const handleMaximizeApp = () => {
    setIsMaximized(!isMaximized);
  };
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && ref.current) {
      ref.current.style.left = `${event.clientX - offsetX}px`;
      ref.current.style.top = `${event.clientY - offsetY}px`;
      ref.current.style.position = "absolute";
    }
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      setIsDragging(true);
      setOffsetX(event.clientX - ref.current.offsetLeft);
      setOffsetY(event.clientY - ref.current.offsetTop);
    }
  };

  if (!app.isOpen || app.isMinimized) return <></>;

  return (
    <div
      key={app.name}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="select-none absolute inset-0 grid place-items-center"
    >
      <div
        ref={ref}
        style={{
          zIndex: app.stackLevel,
          // transform: `translateY(${Math.random() * 10}px)`,
          backgroundColor: backgroundColor,
          width: isMaximized ? customWindowWidth : "900px",
        }}
        onClick={() => handleUpdateStackZIndexLevel(app.name)}
        className="relative aspect-video backdrop:blur-md rounded-md overflow-hidden"
      >
        <div className="grid grid-cols-6">
          <div
            onMouseDown={handleMouseDown}
            className="col-span-5 pt-1 pl-1 flex"
          >
            <div
              style={{
                backgroundColor: app.canAddPages ? bgColor : "",
                color: app.canAddPages ? titleColor : "black",
              }}
              className="py-1 px-2 select-none font-sans text-sm font-semibold w-[35%] rounded-t-md h-full flex justify-between pl-2 items-center"
            >
              <AppIcon />
              <span className="mr-auto ml-2">{app.name}</span>
              {app.canAddPages && (
                <img
                  width="12"
                  height="12"
                  src="https://img.icons8.com/ios-glyphs/30/737373/multiply.png"
                  alt="multiply"
                />
              )}
            </div>
            <div className="select-none font-openSans font-semibold w-fit rounded-t-md h-full flex justify-between px-2 items-center">
              {app.canAddPages && (
                <img
                  className="rotate-45"
                  width="12"
                  height="12"
                  src="https://img.icons8.com/ios-glyphs/30/737373/multiply.png"
                  alt="multiply"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end items-center opacity-70 select-none">
            <button
              onClick={() => handleMinimizeApp()}
              className="h-full flex justify-center items-center w-12 hover:bg-[rgba(0,0,0,0.1)] transition-all duration-100"
            >
              <img
                width="14"
                height="14"
                src="https://img.icons8.com/fluency-systems-regular/50/000000/horizontal-line.png"
                alt="horizontal-line"
              />
            </button>
            <button
              onClick={() => handleMaximizeApp()}
              className="h-full flex justify-center items-center w-12 hover:bg-[rgba(255,255,255,0.2)] transition-all duration-100"
            >
              <img
                width="14"
                height="14"
                src="https://img.icons8.com/fluency-systems-regular/50/000000/maximize-button.png"
                alt="maximize-button"
              />
            </button>
            <button
              onClick={() => handleCloseApp()}
              className="h-full flex justify-center items-center w-12 hover:bg-red-500 transition-all duration-100"
            >
              <img
                width="14"
                height="14"
                src="https://img.icons8.com/fluency-systems-regular/50/000000/delete-sign--v1.png"
                alt="delete-sign--v1"
              />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default TopBarAppManager;
