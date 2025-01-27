import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function BottomTaskBar() {
  // Global state
  const handleOpenApp = useFileMangerStore(
    (state: FileManagerType) => state.handleOpenApp
  );
  const handleCloseApp = useFileMangerStore(
    (state: FileManagerType) => state.handleCloseApp
  );
  const handleMinimizeApp = useFileMangerStore(
    (state: FileManagerType) => state.handleMinimizeApp
  );

  const handlePinAndUnpinTaskBarApps = useFileMangerStore(
    (state: FileManagerType) => state.handlePinAndUnpinTaskBarApps
  );

  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  // References and variables
  const appRef = useRef<any>([]);
  const [showSidePopUp, setShowSidePopUp] = useState<boolean>(false);
  const [showSocialsPopUp, setShowSocialsPopUp] = useState<boolean>(false);

  // methods
  const handleContextMenu = (event: any, idx: number) => {
    event.preventDefault();
    if (appRef.current[idx]) {
      appRef.current[idx].classList.remove("hidden");
      appRef.current[idx].classList.add("flex");

      for (let i = 0; i < apps.length; i++) {
        if (
          i !== idx &&
          appRef.current[i] &&
          appRef.current[i].classList.contains("flex")
        ) {
          appRef.current[i].classList.add("hidden");
          appRef.current[i].classList.remove("flex");
        }
      }
    }
  };
  const hideTaskBarContextMenu = (event: any) => {
    event.preventDefault();
    for (let i = 0; i < apps.length; i++) {
      if (appRef.current[i] && appRef.current[i].classList.contains("flex")) {
        appRef.current[i].classList.add("hidden");
        appRef.current[i].classList.remove("flex");
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
    <footer className="z-20 select-none dark:bg-[rgba(0,0,0,0.7)] bg-[rgba(255,255,255,0.7)] h-[3.5rem] absolute bottom-0 left-0 right-0 p-4 flex sm:justify-start justify-center gap-1 items-center">
      {apps
        .filter(
          (app: AppType) =>
            app.isOnTaskBar || app.isOpen || (app.isOpen && !app.showApp)
        )
        .map((app: AppType, idx: number) => (
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
                !excludedApps.includes(app.name) &&
                  handleContextMenu(event, idx);
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
                  opacity:
                    app.isOpen && !excludedApps.includes(app.name) ? 1 : 0,
                }}
                className="mt-1 left-5 mx-auto bg-[rgba(255,255,255,0.4)]  w-2 h-1 rounded-xl"
              ></div>
            </button>
            <div
              ref={(r: any) => (appRef.current[idx] = r)}
              style={{
                top: app.isOpen ? "-5.4rem" : "-4rem",
              }}
              className="hidden bg-[rgba(0,0,0,0.1)] absolute justify-center items-start flex-col left-0 text-xs min-w-[10rem] p-1 rounded-md"
            >
              <button
                onClick={() => {
                  if (app.isMinimized || app.isOpen)
                    return handleMinimizeApp(app.name);
                  handleOpenApp(app.name);
                }}
                className="flex justify-start gap-x-2 items-center hover:bg-[rgba(0,0,0,0.2)] p-1 rounded-md w-full text-left pl-2"
              >
                <Image
                  alt={app.name}
                  src={app.iconUrl}
                  width={15}
                  height={15}
                  className="group-active:w-[28px] group-active:h-[28px] transition-all duration-100"
                ></Image>
                <span>{app.name}</span>
              </button>
              <button
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
              </button>
              {app.isOpen && (
                <button
                  onClick={() => handleCloseApp(app.name)}
                  className="flex justify-start gap-x-2 items-center hover:bg-[rgba(0,0,0,0.2)] p-1 rounded-md w-full text-left pl-2"
                >
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png"
                    alt="delete-sign"
                  />
                  <span>Close window</span>
                </button>
              )}
            </div>
          </div>
        ))}
      <div className="absolute sm:hidden right-0 px-4 text-black dark:text-white py-3 w-[15rem] h-full flex justify-center items-center">
        <div className="min-w-fit p-2 gap-x-2 w-h-full w-1/2 flex justify-center items-center">
          <SideWindowPopUp showSidePopUp={showSidePopUp} />
          <SocialsPopUp showSocialsPopUp={showSocialsPopUp} />
          <button
            onClick={() => {
              setShowSocialsPopUp(!showSocialsPopUp);
              setShowSidePopUp(false);
            }}
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <img
              width="13"
              height="13"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/collapse-arrow.png"
              alt="collapse-arrow"
            />
          </button>
          <button
            onClick={() => {
              setShowSocialsPopUp(false);
              setShowSidePopUp(!showSidePopUp);
            }}
            className="rounded-md transition-all duration-100 hover:bg-[rgba(255,255,255,0.1)] flex gap-x-2 p-2"
          >
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/FFFFFF/wired-network-connection.png"
              alt="wired-network-connection"
            />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/FFFFFF/speaker.png"
              alt="speaker"
            />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/fluency-systems-regular/50/FFFFFF/medium-battery.png"
              alt="medium-battery"
            />
          </button>
        </div>
        <button className="min-w-fit w-h-full w-1/2 flex flex-col justify-center items-end font-mono text-xs">
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
      </div>
    </footer>
  );
}

const SocialsPopUp = ({ showSocialsPopUp }: { showSocialsPopUp: boolean }) => {
  return (
    <div
      style={{
        top: showSocialsPopUp ? "-65px" : "65px",
      }}
      className="transition-all duration-200 ease-in-out bg-[rgba(0,0,0,1)] w-[10rem] left-[-90px] rounded-md min-h-fit h-[50px] overflow-hidden absolute text-sm p-4 flex justify-between items-center"
    >
      <a href="">
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/ios-filled/FFFFFF/24/github.png"
          alt="github"
        />
      </a>
      <a href="">
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/color/FFFFFF/48/linkedin.png"
          alt="linkedin"
        />
      </a>
      <a href="">
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/ios-filled/FFFFFF/50/instagram-new--v1.png"
          alt="instagram-new--v1"
        />
      </a>
      <a href="mailto:jammoben@gmail.com">
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/ios-filled/FFFFFF/50/apple-mail.png"
          alt="apple-mail"
        />
      </a>
    </div>
  );
};

const SideWindowPopUp = ({ showSidePopUp }: { showSidePopUp: boolean }) => {
  return (
    <div
      style={{
        top: showSidePopUp ? "-360px" : "360px",
      }}
      className="transition-all duration-200 ease-in-out bg-[rgba(0,0,0,1)] w-[20rem] left-[-90px] rounded-md min-h-fit h-[350px] overflow-hidden absolute text-sm p-2 flex flex-col justify-start items-center"
    >
      <div className="grid border-b-[1px] border-[rgba(255,255,255,0.1)] pb-2 grid-cols-3 grid-row-2 gap-2 py-4 h-1/2">
        <div
          className="rounded-md flex flex-col justify-center items-center gap-y-1
            "
        >
          <div className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] w-full grid place-items-center h-full p-2 rounded-md">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/FFFFFF/wired-network-connection.png"
              alt="wired-network-connection"
            />
          </div>
          <span>Wifi</span>
        </div>
        <div
          className="rounded-md flex flex-col justify-center items-center gap-y-1
            "
        >
          <div className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] w-full grid place-items-center h-full p-2 rounded-md">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/fluency-systems-filled/50/FFFFFF/bluetooth.png"
              alt="bluetooth"
            />
          </div>
          <span>Bluetooth</span>
        </div>
        <div
          className="rounded-md flex flex-col justify-center items-center gap-y-1
            "
        >
          <div className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] w-full grid place-items-center h-full p-2 rounded-md">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/FFFFFF/airplane-mode-on.png"
              alt="airplane-mode-on"
            />
          </div>
          <span>Flight mode</span>
        </div>
        <div
          className="rounded-md flex flex-col justify-center items-center gap-y-1
            "
        >
          <div className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] w-full grid place-items-center h-full p-2 rounded-md">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/fluency-systems-regular/50/FFFFFF/battery-alert.png"
              alt="battery-alert"
            />
          </div>
          <span>Energy saver</span>
        </div>
        <div
          className="rounded-md flex flex-col justify-center items-center gap-y-1
            "
        >
          <div className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] w-full grid place-items-center h-full p-2 rounded-md">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/FFFFFF/light-on.png"
              alt="light-on"
            />
          </div>
          <span>Night light</span>
        </div>
        <div
          className="rounded-md flex flex-col justify-center items-center gap-y-1
            "
        >
          <div className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] w-full grid place-items-center h-full p-2 rounded-md">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/FFFFFF/accessibility2.png"
              alt="accessibility2"
            />
          </div>
          <span>Accessibility</span>
        </div>
      </div>
      <div className="h-[40%] w-full flex p-2 flex-col justify-center items-center gap-y-5">
        <div className="w-full flex justify-start gap-4 items-center">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/windows/32/FFFFFF/sun.png"
            alt="sun"
          />
          <input
            type="range"
            id="brightness"
            name="brightness"
            min="0"
            max="11"
            className="w-full h-[0.3rem]"
          />
        </div>

        <div className="w-full flex justify-start gap-4 items-center">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/windows/32/FFFFFF/medium-volume.png"
            alt="medium-volume"
          />
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="11"
            className="w-full h-[0.3rem]"
          />
        </div>
      </div>
      <div className="border-t-[1px] border-[rgba(255,255,255,0.1)] h-[2rem] w-full bottom-0 absolute flex justify-between items-center p-5 text-xs">
        <div className="flex justify-center items-center gap-2">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-regular/50/FFFFFF/medium-battery.png"
            alt="medium-battery"
          />
          <span>78%</span>
        </div>
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/windows/32/FFFFFF/settings--v1.png"
          alt="settings--v1"
        />
      </div>
    </div>
  );
};
