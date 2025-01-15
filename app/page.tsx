"use client";
import Image from "next/image";
import FileExplorer from "@/components/FileExplorer";
import WindowsRightClick from "@/components/WindowsRightClick";
import { useDataStore } from "@/store/data";
import { useEffect } from "react";
import { StoreDataType, AppType } from "..";

export default function Home() {
  return (
    <div className="relative h-screen bg-[url('../public/images/wallpapers/wallpaper-purple.jpg')] bg-rose-500 bg-cover overflow-hidden">
      <main className="w-full h-full relative">
        <FileExplorer />
        <WindowsRightClick />
        <div className="h-full w-fit min-w-[10%] px-8 pb-10 pt-5 flex flex-wrap gap-y-5 gap-x-5 justify-start flex-col items-start">
          {new Array(10).fill(0).map((value: number, idx: number) => {
            return (
              <button key={idx}>
                <Folder />
              </button>
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
  return (
    <footer className="select-none bg-[rgba(255,255,255,0.7)] h-[50] absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-1 items-center">
      {bottomNavBarApplications.map((value: AppType, idx: number) => (
        <button
          key={idx}
          onDoubleClick={() => addOpenedApp(value.name)}
          className="p-2 hover:shadow-lg rounded-md transition-all duration-100"
        >
          <Image
            alt={value.name}
            src={value.iconUrl}
            width={32}
            height={32}
          ></Image>
        </button>
      ))}
    </footer>
  );
}

function Folder() {
  return (
    <>
      <Image
        alt="folder icon 2"
        src={"/icons/folder-and-files/empty-folder.png"}
        width={48}
        height={48}
      ></Image>
      <p className="font-openSans text-sm font-semibold">Folder</p>
    </>
  );
}
