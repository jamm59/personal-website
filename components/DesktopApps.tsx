//"use client";
import Image from "next/image";
import { FileManagerType, AppType } from "..";
import { useFileMangerStore } from "@/store/data";

const stringPadding = (input: string, maxLength: number): string => {
  const stringLength = input.length;
  const difference = maxLength - stringLength;

  if (stringLength > maxLength) {
    return input.slice(0, maxLength - 3) + "...";
  }

  for (let i = 0; i < difference; i++) {
    input = input.concat(" ");
  }
  return input;
};

export default function DesktopApps() {
  const handleOpenApp = useFileMangerStore(
    (state: FileManagerType) => state.handleOpenApp
  );

  const handleAddAppToTaskBar = useFileMangerStore(
    (state: FileManagerType) => state.handleAddAppToTaskBar
  );

  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  return (
    <div className="relative h-full w-fit min-w-[10%] px-8 pb-10 pt-5 flex flex-wrap gap-y-4 gap-x-5 justify-start flex-col items-start">
      {apps
        .filter((app: AppType) => !app.isOnTaskBar)
        .map((app: AppType, idx: number) => {
          return (
            <div key={idx}>
              <button
                onDoubleClick={() => {
                  handleOpenApp(app.name);
                  console.log("opening name: " + app.name);
                  handleAddAppToTaskBar(app.name, true);
                }}
                className="group hover:bg-[rgb(255,255,255,0.1)] p-1 rounded-md transition-all duration-100 flex justify-center items-center flex-col"
              >
                <Image
                  alt="folder icon"
                  src={app.iconUrl}
                  width={48}
                  height={48}
                ></Image>
                <span className="group-focus:hidden flex font-openSans whitespace-nowrap w-[5rem] text-sm font-semibold p-1 text-white">
                  {stringPadding(app.name, 11)}
                </span>
                <span className="group-focus:flex hidden font-openSans whitespace-nowrap w-[5rem] text-sm font-semibold p-1 text-white">
                  {app.name}
                </span>
              </button>
            </div>
          );
        })}
    </div>
  );
}
