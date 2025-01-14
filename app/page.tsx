import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faXmark,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="h-screen bg-[url('../public/images/wallpapers/wallpaper-purple.jpg')] bg-rose-500 bg-cover">
      <main className="w-full h-full relative">
        <PopUpWindowWrapper />
        <div className="h-full w-fit min-w-[10%] px-8 pb-10 pt-5 bg-[rgba(255,250,255,0.7)] flex flex-wrap gap-y-5 gap-x-5 justify-start flex-col items-start">
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
  return (
    <footer className="bg-[rgba(255,255,255,0.7)] blur-5 opacity- h-[60] absolute bottom-0 left-0 right-0 p-4 flex justify-start gap-5 items-center">
      <button>
        <Image
          alt="Windows icon"
          src={"/icons/taskbar/windows.png"}
          width={32}
          height={32}
        ></Image>
      </button>
      <button>
        <Image
          alt="Copilot icon"
          src={"/icons/taskbar/copilot.png"}
          width={32}
          height={32}
        ></Image>
      </button>
      <button>
        <Image
          alt="microsoft-store"
          src={"/icons/taskbar/microsoft-store.webp"}
          width={32}
          height={32}
        ></Image>
      </button>
      <button>
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

function PopUpWindowWrapper() {
  return (
    <>
      <div className="absolute inset-0 grid place-items-center">
        <div className="bg-[rgba(255,255,255,0.4)] backdrop:blur-md w-[900] aspect-video rounded-md overflow-hidden">
          <div className="h-[100]">
            <div className="grid grid-cols-4 h-[40%]">
              <div className="col-span-3 text-black pt-2 pl-1 flex">
                <div className="font-openSans font-semibold w-[40%] bg-[rgba(255,255,255,0.4)] rounded-t-md h-full flex justify-between px-3 items-center">
                  <span>Home</span>
                  <Image
                    alt="close"
                    src={"/icons/other/close.png"}
                    width={10}
                    height={10}
                  ></Image>
                </div>
                <div className="font-openSans font-semibold w-fit rounded-t-md h-full flex justify-between px-3 items-center">
                  <Image
                    alt="close"
                    className="rotate-45"
                    src={"/icons/other/close.png"}
                    width={10}
                    height={10}
                  ></Image>
                </div>
              </div>
              <div className="flex gap-7 pr-5 justify-end items-center opacity-70">
                <Image
                  alt="minimize"
                  src={"/icons/other/minimize.png"}
                  width={10}
                  height={10}
                ></Image>
                <Image
                  alt="maximize"
                  src={"/icons/other/maximize.png"}
                  width={10}
                  height={10}
                ></Image>
                <Image
                  alt="cloes"
                  src={"/icons/other/close.png"}
                  width={10}
                  height={10}
                ></Image>
              </div>
            </div>
            <div className="h-full bg-[rgba(255,255,255,0.4)]"></div>
          </div>
          <div className="bg-white h-full flex flex-col">
            <div className="bg-sky-600 h-[70]"></div>
            <div className="grid grid-cols-2 h-full">
              <div className="bg-rose-500"></div>
              <div className="bg-green-400"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
