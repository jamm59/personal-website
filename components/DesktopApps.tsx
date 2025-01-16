//"use client";
import Image from "next/image";

export default function DesktopApps() {
  return (
    <div className="z-20 relative h-full w-fit min-w-[10%] px-8 pb-10 pt-5 flex flex-wrap gap-y-4 gap-x-5 justify-start flex-col items-start">
      {new Array(10).fill(0).map((value: number, idx: number) => {
        return (
          <div key={idx}>
            <Folder />
          </div>
        );
      })}
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
