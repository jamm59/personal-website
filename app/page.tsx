"use client";
import WindowsRightClick from "@/components/WindowsRightClick";
import BottomTaskBar from "@/components/BottomTaskBar";
import DesktopApps from "@/components/DesktopApps";
import AppLauncher from "@/components/AppLauncher";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType } from "..";

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
      <main className="w-full h-full relative z-10">
        <DesktopApps />
        <AppLauncher />
        <WindowsRightClick />
      </main>
      <BottomTaskBar />
    </div>
  );
}
