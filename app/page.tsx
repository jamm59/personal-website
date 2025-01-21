"use client";
import WindowsRightClick from "@/components/WindowsRightClick";
import BottomTaskBar from "@/components/BottomTaskBar";
import DesktopApps from "@/components/DesktopApps";
import AppLauncher from "@/components/AppLauncher";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType } from "..";
import { useRef, useState } from "react";

export default function Home() {
  const wallpaperUrl = useFileMangerStore(
    (state: FileManagerType) => state.wallpaper
  );
  return (
    <div
      style={{
        backgroundImage: `url('/images/wallpapers/${wallpaperUrl}')`,
      }}
      className="relative h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-cover overflow-hidden"
    >
      <LockScreen />
      <main className="w-full h-full relative z-10">
        <DesktopApps />
        <AppLauncher />
        <WindowsRightClick />
      </main>
      <BottomTaskBar />
    </div>
  );
}

function LockScreen() {
  const [exit, setExit] = useState<boolean>(false);
  const currentTime: Date = new Date();
  return (
    <>
      <div
        onClick={() => setExit(true)}
        style={{
          transform: exit ? "translateY(-200%)" : "",
        }}
        className="absolute p-1 bg-[rgba(0,0,0,0.9)] inset-0 z-[100] transition-all duration-500 ease-out"
      >
        <div className="hover:cursor-pointer rounded-lg bg-[rgba(255,255,255,0.1)] text-gray-900 w-full h-full bg-cover flex justify-center items-center">
          <div className="w-[700px] aspect-video text-white flex flex-col justify-start items-center rounded-lg">
            <h1 className="w-full text-center font-black text-[120px] md:text-[100px] sm:text-[80px] font-alphaSlabOne tracking-wider">
              {currentTime.getHours() < 10
                ? "0" + currentTime.getHours()
                : currentTime.getHours()}
              :
              {currentTime.getMinutes() < 10
                ? "0" + currentTime.getMinutes()
                : currentTime.getMinutes()}
            </h1>
            <h2 className="w-full text-center p-1 mb-2 font-semibold">
              {currentTime.toDateString()}
            </h2>
            <div className="animate-bounce w-full text-center p-5 font-semibold flex justify-center items-center gap-3">
              <span>Click to open</span>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-two-tone/24/FFFFFF/blue-pointer.png"
                alt="blue-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
