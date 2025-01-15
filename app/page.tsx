"use client";
import Image from "next/image";
import FileExplorer from "@/components/FileExplorer";
import WindowsRightClick from "@/components/WindowsRightClick";
import { useDataStore } from "@/store/data";
import { useEffect } from "react";
import { StoreDataType, AppType } from "..";
export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/wallpapers/wallpaper-purple.jpg')",
      }}
      className="relative h-screen bg-rose-500 bg-cover overflow-hidden"
    >
      <main className="w-full h-full relative">
        <FileExplorer />
        <WindowsRightClick />
        <div className="h-full w-fit min-w-[10%] px-8 pb-10 pt-5 flex flex-wrap gap-y-4 gap-x-5 justify-start flex-col items-start">
          {new Array(10).fill(0).map((value: number, idx: number) => {
            return (
              <div key={idx}>
                <Folder />
              </div>
            );
          })}
        </div>
      </main>
      <BottomTaskBar />
    </div>
  );
}

function BottomTaskBar() {
  const addOpenedApp = useDataStore(
    (state: StoreDataType) => state.addOpenedApp
  );
  const bottomNavBarApplications = useDataStore<AppType[]>(
    (state: StoreDataType) => state.apps
  );
  const currentTime: Date = new Date();
  return (
    <footer className="select-none bg-[rgba(255,255,255,0.7)] h-[4rem] absolute bottom-0 left-0 right-0 p-4 flex sm:justify-start justify-center gap-1 items-center">
      {bottomNavBarApplications.map((value: AppType, idx: number) => (
        <button
          key={idx}
          onDoubleClick={() => addOpenedApp(value.name)}
          className="p-2 relative group hover:shadow-md rounded-md transition-all duration-100"
        >
          <Image
            alt={value.name}
            src={value.iconUrl}
            width={32}
            height={32}
            className="group-active:w-[28px] group-active:h-[28px] transition-all duration-100"
          ></Image>

          <div
            style={{ opacity: value.isOpen ? 1 : 0 }}
            className="mt-1 left-5 mx-auto bg-[rgba(255,255,255,0.4)]  w-2 h-1 rounded-xl"
          ></div>
        </button>
      ))}
      <button className="absolute right-4 text-black p-3 min-w-fit w-[5rem] h-full flex flex-col justify-center items-end text-xs font-mono">
        <span>
          {currentTime.getHours()}:
          {currentTime.getMinutes() < 10
            ? "0" + currentTime.getMinutes()
            : currentTime.getMinutes()}
        </span>
        <span>{currentTime.toLocaleDateString()}</span>
      </button>
    </footer>
  );
}

function Folder() {
  return (
    <button className="hover:bg-[rgb(255,255,255,0.1)] p-2 rounded-md transition-all duration-100">
      <Image
        alt="folder icon 2"
        src={"/icons/folder-and-files/empty-folder.png"}
        width={48}
        height={48}
      ></Image>
      <p className="font-openSans text-sm font-semibold">Folder</p>
    </button>
  );
}
