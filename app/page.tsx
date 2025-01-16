"use client";
import FileExplorer from "@/components/FileExplorer";
import WindowsRightClick from "@/components/WindowsRightClick";
import BottomTaskBar from "@/components/BottomTaskBar";
import DesktopApps from "@/components/DesktopApps";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/wallpapers/wallpaper-purple.jpg')",
      }}
      className="relative h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-cover overflow-hidden"
    >
      <main className="w-full h-full relative">
        <FileExplorer />
        <WindowsRightClick />
        <DesktopApps />
      </main>
      <BottomTaskBar />
    </div>
  );
}
