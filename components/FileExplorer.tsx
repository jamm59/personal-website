"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useFileMangerStore } from "@/store/data";
import { AppNameType, AppType, FileManagerType } from "..";

export default function FileExplorer() {
  // constants
  const appName: AppNameType = "fileExplorer";
  const foregroundColor: string = "rgba(255,255,255,1)";
  const backgroundColor: string = "rgba(255,255,255,0.6)";
  const customWindowWidth: string = "95%";

  // Global state
  const apps = useFileMangerStore((state: FileManagerType) => state.apps);
  const closeAppFunction = useFileMangerStore(
    (state: FileManagerType) => state.handleCloseApp
  );
  const minimizeFunction = useFileMangerStore(
    (state: FileManagerType) => state.handleMinimizeApp
  );

  // components states and references
  const modalDiv = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // callback functions
  const handleCloseApp = () => {
    closeAppFunction(appName);
  };
  const handleMinimizeApp = () => {
    minimizeFunction(appName);
  };
  const handleMaximizeApp = () => {
    setIsMaximized(!isMaximized);
  };
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && modalDiv.current) {
      modalDiv.current.style.left = `${event.clientX - offsetX}px`;
      modalDiv.current.style.top = `${event.clientY - offsetY}px`;
      modalDiv.current.style.position = "absolute";
    }
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalDiv.current) {
      setIsDragging(true);
      setOffsetX(event.clientX - modalDiv.current.offsetLeft);
      setOffsetY(event.clientY - modalDiv.current.offsetTop);
    }
  };

  // logic
  let appIsOpen = false;
  let isMinimise = false;
  for (let app of apps) {
    if (app.name === appName && app.isOpen) appIsOpen = true;
    if (app.name === appName && app.isMinimized) isMinimise = true;
    if (appIsOpen && isMinimise) {
      break;
    }
  }

  if (!appIsOpen || isMinimise) return <></>;

  return (
    <>
      <div
        className="absolute inset-0 z-10 grid place-items-center"
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          ref={modalDiv}
          onMouseDown={handleMouseDown}
          style={{
            backgroundColor: backgroundColor,
            width: isMaximized ? customWindowWidth : "900px",
            aspectRatio: isMaximized ? "1 / 1" : "16 / 9",
          }}
          className="relative backdrop:blur-md rounded-md overflow-hidden"
        >
          <div className="h-[5rem]">
            <div className="grid grid-cols-4 h-[40%]">
              <div className="col-span-3 text-black pt-2 pl-1 flex">
                <div
                  style={{ backgroundColor: foregroundColor }}
                  className="select-none font-sans text-sm font-semibold w-[40%] rounded-t-md h-full flex justify-between px-3 items-center"
                >
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency/48/home-page.png"
                    alt="home-page"
                  />
                  <span className="mr-auto ml-2">Home</span>
                  <Image
                    alt="close"
                    src={"/icons/close.png"}
                    width={10}
                    height={10}
                  ></Image>
                </div>
                <div className="select-none font-openSans font-semibold w-fit rounded-t-md h-full flex justify-between px-3 items-center">
                  <Image
                    alt="add"
                    className="rotate-45"
                    src={"/icons/close.png"}
                    width={10}
                    height={10}
                  ></Image>
                </div>
              </div>
              <div className="flex justify-end items-center opacity-70 select-none">
                <button
                  onClick={() => handleMinimizeApp()}
                  className="h-full flex justify-center items-center w-12 hover:bg-[rgba(0,0,0,0.1)] transition-all duration-100"
                >
                  <Image
                    alt="minimize"
                    src={"/icons/minimize.png"}
                    width={10}
                    height={10}
                  ></Image>
                </button>
                <button
                  onClick={() => handleMaximizeApp()}
                  className="h-full flex justify-center items-center w-12 hover:bg-[rgba(0,0,0,0.1)] transition-all duration-100"
                >
                  <Image
                    alt="maximize"
                    src={"/icons/maximize.png"}
                    width={10}
                    height={10}
                  ></Image>
                </button>
                <button
                  onClick={() => handleCloseApp()}
                  className="h-full flex justify-center items-center w-12 hover:bg-red-500 transition-all duration-100"
                >
                  <Image
                    alt="close"
                    src={"/icons/close.png"}
                    width={10}
                    height={10}
                  ></Image>
                </button>
              </div>
            </div>
            <div
              className="h-[60%] text-black grid grid-cols-5"
              style={{ backgroundColor: foregroundColor }}
            >
              <div className="flex justify-around items-center opacity-45">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/windows/32/left.png"
                  alt="left"
                />
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/windows/32/right.png"
                  alt="right"
                />
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/windows/32/up.png"
                  alt="up"
                />
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/windows/32/reboot.png"
                  alt="reboot"
                />
              </div>
              <div className="col-span-3 p-2">
                <div className="bg-white py-1 px-2 flex gap-2 justify-start items-center h-full rounded-md shadow-md bg-[rgba(0,0,0,0.1)]">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency-systems-regular/50/home--v1.png"
                    alt="home--v1"
                  />
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/windows/32/more-than.png"
                    alt="more-than"
                  />
                  <span className="font-mono">Home</span>
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/windows/32/more-than.png"
                    alt="more-than"
                  />
                </div>
              </div>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search Desktop"
                  className="font-openSans px-3 placeholder:text-black shadow-md bg-[rgba(0,0,0,0.1)] h-full rounded-md max-w-full focus:outline-none"
                ></input>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 h-full flex flex-col">
            <div className="bg-white py-1 h-[5rem] grid border-y-[1px] border-gray-300 grid-cols-6 text-black text-sm">
              <div className=" opacity-45 flex justify-start pl-5 items-center gap-x-1 text-sm font-semibold font-openSans">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/windows/32/add--v1.png"
                  alt="add--v1"
                />

                <select className="w-[3.6rem] focus:outline-none">
                  <option value="actual value 1">New</option>
                  <option value="actual value 2">Folder</option>
                  <option value="actual value 3">Shortcut</option>
                </select>
              </div>
              <div className=" opacity-45 col-span-2 flex px-2 justify-around items-center border-l-[1px] border-gray-300">
                <img
                  width="24"
                  height="24"
                  className="rotate-[-90deg]"
                  src="https://img.icons8.com/windows/32/cut.png"
                  alt="cut"
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency-systems-regular/50/copy--v1.png"
                  alt="copy--v1"
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/metro/26/paste.png"
                  alt="paste"
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency-systems-regular/50/rename.png"
                  alt="rename"
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency-systems-regular/50/share-3.png"
                  alt="share-3"
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency-systems-regular/50/trash--v1.png"
                  alt="trash--v1"
                />
              </div>
              <div className="border-l-[1px] gap-x-3 px-3 flex justify-around items-center border-gray-300">
                <div className="flex justify-center items-center gap-1">
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/windows/32/sorting-arrows.png"
                    alt="sorting-arrows"
                  />
                  <span>sort</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/fluency-systems-filled/50/four-squares.png"
                    alt="four-squares"
                  />
                  <span>View</span>
                </div>
              </div>
              <div className="flex text-black text-sm justify-between px-3 items-center bg-white border-l-[1px] col-span-2 border-gray-300">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency-systems-filled/50/ellipsis.png"
                  alt="ellipsis"
                />
                <div className="p-2 min-w-[5rem] flex gap-2 justify-center items-center">
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/fluency-systems-filled/50/details.png"
                    alt="details"
                  />
                  <span>Details</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 h-auto min-h-full">
              <div className="bg-rose-500"></div>
              <div className="bg-green-400 col-span-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
