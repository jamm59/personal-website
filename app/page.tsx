"use client";
import Image from "next/image";
import FileExplorer from "@/components/FileExplorer";
import WindowsRightClick from "@/components/WindowsRightClick";
import BottomTaskBar from "@/components/BottomTaskBar";

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

function Folder() {
  return (
    <button className="hover:bg-[rgb(255,255,255,0.1)] p-2 rounded-md transition-all duration-100">
      <Image
        alt="folder icon 2"
        src={"/icons/empty-folder.png"}
        width={48}
        height={48}
      ></Image>
      <p className="font-openSans text-sm font-semibold text-white">Folder</p>
    </button>
  );
}
