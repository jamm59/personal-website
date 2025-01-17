"use client";
import WindowsRightClick from "@/components/WindowsRightClick";
import BottomTaskBar from "@/components/BottomTaskBar";
import DesktopApps from "@/components/DesktopApps";
import AppLauncher from "@/components/AppLauncher";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/wallpapers/wallpaper-purple.jpg')",
      }}
      className="relative h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-cover overflow-hidden"
    >
      <main className="w-full h-full relative z-10">
        <AppLauncher />
        <WindowsRightClick />
        <DesktopApps />
      </main>
      <BottomTaskBar />
    </div>
  );
}
