"use client";
import { useState, useRef, useEffect } from "react";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType, AppNameType } from "..";
import Image from "next/image";
import { stringPadding } from "@/utils/methods";

export default function StartWindow({ app }: { app: AppType }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  const handleCloseApp = useFileMangerStore(
    (state: FileManagerType) => state.handleCloseApp
  );

  const excludedApps: AppNameType[] = ["Start", "Task View", "Recycle Bin"];
  const placeHolderText: any = [
    "search",
    "icon",
    "taskview",
    "start",
    "vscode",
  ];

  useEffect(() => {
    if (ref.current && app.isOpen) {
      ref.current.style.bottom = "4.5rem";
    }
  }, [ref, app]);

  const handleOpenApp = useFileMangerStore(
    (state: FileManagerType) => state.handleOpenApp
  );

  const handleAddAppToTaskBar = useFileMangerStore(
    (state: FileManagerType) => state.handleAddAppToTaskBar
  );

  return (
    <div
      className="select-none absolute inset-0 grid place-items-center"
      onClick={() => {
        setIsOpen(false);
        if (ref.current) ref.current.style.bottom = "-40rem";
        handleCloseApp("Start");
      }}
    >
      <div
        ref={ref}
        style={{
          bottom: "-40rem",
        }}
        className="absolute bottom-0 transition-all ease-in-out duration-300 bg-[rgba(255,255,255,0.4)] backdrop-blur-md overflow-hidden dark:bg-[rgba(0,0,0,0.4)] rounded-md h-[600px] w-[600px]"
      >
        <div className="h-full">
          <div className="h-[10%] grid place-items-center px-10">
            <div className="w-full relative">
              <input
                type="text"
                className="bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.4)] border-[1px] w-full rounded-full pl-12 border-[rgba(255,255,255,0.1)] focus:outline-none pr-3 py-1"
                placeholder="Search for apps, settings, and documents"
              />
              <img
                className="absolute left-3 top-2"
                width="20"
                height="20"
                src="https://img.icons8.com/metro/26/FFFFFF/search.png"
                alt="search"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center h-[40%]">
            <div className="h-10 w-full flex justify-between px-10 items-center">
              <span className="font-semibold">Pinned</span>
              <button className="text-xs bg-[rgba(255,255,255,0.1)] flex justify-center items-center gap-2 px-3 py-1 rounded-md">
                <span>All</span>
                <img
                  width="10"
                  height="10"
                  src="https://img.icons8.com/metro/26/FFFFFF/more-than.png"
                  alt="more-than"
                />
              </button>
            </div>
            <div className="h-full w-full flex flex-wrap justify-center items-center gap-2 px-3">
              {apps
                .filter(
                  (app: AppType) =>
                    !app.isDir && !excludedApps.includes(app.name)
                )
                .map((app: AppType, idx: number) => (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        handleOpenApp(app.name);
                        handleAddAppToTaskBar(app.name, true);
                      }}
                      className="group hover:bg-[rgb(255,255,255,0.1)] p-1 rounded-md transition-all duration-100 flex justify-center items-center flex-col"
                    >
                      <Image
                        alt="folder icon"
                        src={app.iconUrl}
                        width={40}
                        height={40}
                      ></Image>
                      <span className="justify-center items-center group-focus:hidden flex font-openSans whitespace-nowrap w-[5rem] text-sm font-semibold p-1 text-white">
                        {stringPadding(app.name, 11)}
                      </span>
                      <span className="justify-center items-center group-focus:flex hidden font-openSans whitespace-nowrap w-[5rem] text-sm font-semibold p-1 text-white">
                        {app.name}
                      </span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="h-[50%]">
            <div className="h-10 w-full flex justify-between px-10 items-center">
              <span className="font-semibold">Recommended</span>
              <button className="text-xs bg-[rgba(255,255,255,0.1)] flex justify-center items-center gap-2 px-3 py-1 rounded-md">
                <span>More</span>
                <img
                  width="10"
                  height="10"
                  src="https://img.icons8.com/metro/26/FFFFFF/more-than.png"
                  alt="more-than"
                />
              </button>
            </div>
            <div className="w-full h-fit flex flex-wrap justify-start items-center gap-5 py-5 px-10">
              {placeHolderText.map((value: any, idx: number) => (
                <>
                  <div
                    key={idx}
                    className="text-sm whitespace-nowrap gap-2 flex justify-start mb-1 items-center"
                  >
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/image-file.png"
                      alt="image-file"
                    />
                    <div className="flex flex-col h-full pl#4-3">
                      <span>{value}</span>
                      <span className="text-xs opacity-70">
                        Yesterday at 17:45
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {}
          </div>
        </div>
        <div className="border-t-[1px] flex justify-between px-10 items-center  border-[rgba(0,0,0,0.1)] mx-auto bottom-0 absolute w-full h-14">
          <div className="flex justify-center gap-3 items-center">
            <img
              className="bg-white rounded-full p-1"
              width="30"
              height="30"
              src="https://img.icons8.com/fluency-systems-regular/50/737373/user--v1.png"
              alt="user--v1"
            />
            <span>F M J</span>
          </div>
          <img
            className="hover:bg-[rgba(255,255,255,0.1)] p-2 rounded-md transition-all duration-100"
            width="38"
            height="38"
            src="https://img.icons8.com/fluency-systems-regular/50/FFFFFF/shutdown.png"
            alt="shutdown"
          />
        </div>
      </div>
    </div>
  );
}
