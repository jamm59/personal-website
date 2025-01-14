"use client";
import Image from "next/image";
import FileExplorer from "@/components/FileExplorer";
import WindowsRightClick from "@/components/WindowsRightClick";
import { Dispatch, SetStateAction, useState } from "react";

export default function Home() {
  const [explorerIsVisible, setExplorerVisible] = useState<Boolean>(false);
  return (
    <div className="relative h-screen bg-[url('../public/images/wallpapers/wallpaper-purple.jpg')] bg-rose-500 bg-cover overflow-hidden">
      <main className="w-full h-full relative">
        {explorerIsVisible ? <FileExplorer /> : <></>}
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
      <BottomTaskBar
        explorerIsVisible={explorerIsVisible}
        setExplorerVisible={setExplorerVisible}
      />
    </div>
  );
}

function BottomTaskBar({
  explorerIsVisible,
  setExplorerVisible,
}: {
  explorerIsVisible: Boolean;
  setExplorerVisible: Dispatch<SetStateAction<Boolean>>;
}) {
  return (
    <footer className="select-none bg-[rgba(255,255,255,0.7)] h-[70] absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-3 items-center">
      <button className="p-2 hover:shadow-md rounded-md transition-all duration-100">
        <Image
          alt="Windows icon"
          src={"/icons/taskbar/windows.png"}
          width={32}
          height={32}
        ></Image>
      </button>
      <button className="p-2 hover:shadow-md rounded-md transition-all duration-300">
        <Image
          alt="Copilot icon"
          src={"/icons/taskbar/copilot.png"}
          width={32}
          height={32}
        ></Image>
      </button>
      <button className="p-2 hover:shadow-md rounded-md transition-all duration-100">
        <Image
          alt="microsoft-store"
          src={"/icons/taskbar/microsoft-store.webp"}
          width={32}
          height={32}
        ></Image>
      </button>
      <button
        className="p-2 hover:shadow-md rounded-md transition-all duration-100"
        onDoubleClick={() => setExplorerVisible(true)}
      >
        <Image
          alt="file-explorer"
          src={"/icons/taskbar/file-explorer.png"}
          width={32}
          height={32}
        ></Image>
      </button>
    </footer>
  );
}

function Folder() {
  return (
    <>
      <Image
        alt="folder icon"
        src={"/images/folder-and-files/empty-folder.png"}
        width={48}
        height={48}
      ></Image>
      <p className="font-openSans text-sm font-semibold">Folder</p>
    </>
  );
}
