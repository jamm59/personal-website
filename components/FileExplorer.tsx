"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useDataStore } from "@/store/data";
import { AppNameType, AppType, StoreDataType } from "..";

export default function FileExplorer() {
  const appName: AppNameType = "fileExplorer";
  const allOpenApps = useDataStore<Set<AppNameType>>(
    (state: StoreDataType) => state.allOpenApps
  );
  useEffect(() => {
    console.log(allOpenApps + "something");
  }, [allOpenApps]);

  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const modalDiv = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalDiv.current) {
      setIsDragging(true);
      setOffsetX(event.clientX - modalDiv.current.offsetLeft);
      setOffsetY(event.clientY - modalDiv.current.offsetTop);
    }
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

  return (
    <>
      {allOpenApps.has(appName) && (
        <div
          className="absolute inset-0 grid place-items-center"
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={modalDiv}
            onMouseDown={handleMouseDown}
            className="relative bg-[rgba(255,255,255,0.4)] backdrop:blur-md w-[900px] aspect-video rounded-md overflow-hidden"
          >
            <div className="h-[100]">
              <div className="grid grid-cols-4 h-[40%]">
                <div className="col-span-3 text-black pt-2 pl-1 flex">
                  <div className="select-none font-openSans font-semibold w-[40%] bg-[rgba(255,255,255,0.4)] rounded-t-md h-full flex justify-between px-3 items-center">
                    <span>Home</span>
                    <Image
                      alt="close"
                      src={"/icons/other/close.png"}
                      width={10}
                      height={10}
                    ></Image>
                  </div>
                  <div className="select-none font-openSans font-semibold w-fit rounded-t-md h-full flex justify-between px-3 items-center">
                    <Image
                      alt="add"
                      className="rotate-45"
                      src={"/icons/other/close.png"}
                      width={10}
                      height={10}
                    ></Image>
                  </div>
                </div>
                <div className="flex gap-7 pr-5 justify-end items-center opacity-70 select-none">
                  <Image
                    alt="minimize"
                    src={"/icons/other/minimize.png"}
                    width={10}
                    height={10}
                  ></Image>
                  <Image
                    alt="maximize"
                    src={"/icons/other/maximize.png"}
                    width={10}
                    height={10}
                  ></Image>
                  <Image
                    alt="close"
                    src={"/icons/other/close.png"}
                    width={10}
                    height={10}
                  ></Image>
                </div>
              </div>
              <div className="h-full bg-[rgba(255,255,255,0.4)]"></div>
            </div>
            <div className="bg-white h-full flex flex-col">
              <div className="bg-sky-600 h-[70]"></div>
              <div className="grid grid-cols-2 h-full">
                <div className="bg-rose-500"></div>
                <div className="bg-green-400"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
