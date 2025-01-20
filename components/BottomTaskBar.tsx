import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function BottomTaskBar() {
  const handleOpenApp = useFileMangerStore(
    (state: FileManagerType) => state.handleOpenApp
  );
  const handleMinimizeApp = useFileMangerStore(
    (state: FileManagerType) => state.handleMinimizeApp
  );

  const handlePinAndUnpinTaskBarApps = useFileMangerStore(
    (state: FileManagerType) => state.handlePinAndUnpinTaskBarApps
  );

  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  ).filter((app: AppType) => app.isOnTaskBar || app.isTempOnTaskBar);

  const ref = useRef<any>([]);

  const handleContextMenu = (event: any, idx: number) => {
    event.preventDefault();
    if (ref.current[idx]) {
      ref.current[idx].classList.remove("hidden");
      ref.current[idx].classList.add("flex");

      for (let i = 0; i < apps.length; i++) {
        if (i !== idx && ref.current[i].classList.contains("flex")) {
          ref.current[i].classList.add("hidden");
          ref.current[i].classList.remove("flex");
        }
      }
    }
  };
  const hideTaskBarContextMenu = (event: any) => {
    event.preventDefault();
    for (let i = 0; i < apps.length; i++) {
      if (ref.current[i].classList.contains("flex")) {
        ref.current[i].classList.add("hidden");
        ref.current[i].classList.remove("flex");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideTaskBarContextMenu);
    return () => document.removeEventListener("click", hideTaskBarContextMenu);
  }, []);

  const excludedApps: string[] = ["Start", "Task View"];

  const currentTime: Date = new Date();
  return (
    <footer className="z-20 select-none dark:bg-[rgba(0,0,0,0.5)] bg-[rgba(255,255,255,0.7)] h-[3.5rem] absolute bottom-0 left-0 right-0 p-4 flex sm:justify-start justify-center gap-1 items-center">
      {apps.map((app: AppType, idx: number) => (
        <div key={idx} className="relative">
          <button
            key={idx}
            onClick={() => {
              if (app.isMinimized || app.isOpen)
                return handleMinimizeApp(app.name);
              handleOpenApp(app.name);
            }}
            onContextMenu={(event: any) => {
              event.preventDefault();
              !excludedApps.includes(app.name) && handleContextMenu(event, idx);
            }}
            className="p-2 relative group hover:shadow-md rounded-md transition-all duration-100"
          >
            <Image
              alt={app.name}
              src={app.iconUrl}
              width={32}
              height={32}
              className="group-active:w-[28px] group-active:h-[28px] transition-all duration-100"
            ></Image>

            <div
              style={{
                opacity: app.isOpen && !excludedApps.includes(app.name) ? 1 : 0,
              }}
              className="mt-1 left-5 mx-auto bg-[rgba(255,255,255,0.4)]  w-2 h-1 rounded-xl"
            ></div>
          </button>
          <div
            ref={(r: any) => (ref.current[idx] = r)}
            style={{
              top: app.isOpen ? "-5.4rem" : "-4rem",
            }}
            className="hidden bg-[rgba(0,0,0,0.1)] absolute justify-center items-start flex-col left-0 text-xs min-w-[10rem] p-1 rounded-md"
          >
            <div className="flex justify-start gap-x-2 items-center hover:bg-[rgba(0,0,0,0.2)] p-1 rounded-md w-full text-left pl-2">
              <Image
                alt={app.name}
                src={app.iconUrl}
                width={15}
                height={15}
                className="group-active:w-[28px] group-active:h-[28px] transition-all duration-100"
              ></Image>
              <span>{app.name}</span>
            </div>
            <div
              onClick={(event: any) =>
                handlePinAndUnpinTaskBarApps(
                  app.name,
                  app.isOnTaskBar ? false : true
                )
              }
              className="flex justify-start gap-x-2 items-center hover:bg-[rgba(0,0,0,0.2)] p-1 rounded-md w-full text-left pl-2"
            >
              {!app.isOnTaskBar ? (
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/ios/50/FFFFFF/pin--v1.png"
                  alt="pin--v1"
                />
              ) : (
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/ios/50/FFFFFF/unpin.png"
                  alt="unpin"
                />
              )}
              <span>
                {!app.isOnTaskBar ? "Pin to taskbar" : "Unpin from taskbar"}
              </span>
            </div>
            {app.isOpen && (
              <div className="flex justify-start gap-x-2 items-center hover:bg-[rgba(0,0,0,0.2)] p-1 rounded-md w-full text-left pl-2">
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png"
                  alt="delete-sign"
                />
                <span>Close window</span>
              </div>
            )}
          </div>
        </div>
      ))}
      <button className="absolute sm:hidden right-4 text-black dark:text-white p-3 min-w-fit w-[5rem] h-full flex flex-col justify-center items-end text-xs font-mono">
        <span>
          {currentTime.getHours() < 10
            ? "0" + currentTime.getHours()
            : currentTime.getHours()}
          :
          {currentTime.getMinutes() < 10
            ? "0" + currentTime.getMinutes()
            : currentTime.getMinutes()}
        </span>
        <span>{currentTime.toLocaleDateString()}</span>
      </button>
    </footer>
  );
}
