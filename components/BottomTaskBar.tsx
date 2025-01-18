import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
import Image from "next/image";

export default function BottomTaskBar() {
  const handleOpenApp = useFileMangerStore(
    (state: FileManagerType) => state.handleOpenApp
  );
  const handleMinimizeApp = useFileMangerStore(
    (state: FileManagerType) => state.handleMinimizeApp
  );
  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  const currentTime: Date = new Date();
  return (
    <footer className="z-20 select-none dark:bg-[rgba(0,0,0,0.6)]  bg-[rgba(255,255,255,0.7)] h-[3.5rem] absolute bottom-0 left-0 right-0 p-4 flex sm:justify-start justify-center gap-1 items-center">
      {apps
        .filter((app: AppType) => app.isOnTaskBar || app.isTempOnTaskBar)
        .map((app: AppType, idx: number) => (
          <button
            key={idx}
            onClick={() => {
              if (app.isMinimized || app.isOpen)
                return handleMinimizeApp(app.name);
              handleOpenApp(app.name);
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
              style={{ opacity: app.isOpen ? 1 : 0 }}
              className="mt-1 left-5 mx-auto bg-[rgba(255,255,255,0.4)]  w-2 h-1 rounded-xl"
            ></div>
          </button>
        ))}
      <button className="absolute sm:hidden right-4 text-black dark:text-white p-3 min-w-fit w-[5rem] h-full flex flex-col justify-center items-end text-xs font-mono">
        <span>
          {currentTime.getHours()}:
          {currentTime.getMinutes() < 10
            ? "0" + currentTime.getMinutes()
            : currentTime.getMinutes()}
        </span>
        <span>{currentTime.toLocaleDateString()}</span>
      </button>
    </footer>
  );
}
