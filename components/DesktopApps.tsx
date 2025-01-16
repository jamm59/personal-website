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
    input += " ";
  }
  return input;
};

export default function DesktopApps() {
  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  return (
    <div className="z-20 relative h-full w-fit min-w-[10%] px-8 pb-10 pt-5 flex flex-wrap gap-y-4 gap-x-5 justify-start flex-col items-start">
      {apps
        .filter((app: AppType) => !app.isOnTaskBar)
        .map((app: AppType, idx: number) => {
          return (
            <div key={idx}>
              <button className="hover:bg-[rgb(255,255,255,0.1)] p-1 rounded-md transition-all duration-100 flex justify-center items-center flex-col">
                <Image
                  alt="folder icon"
                  src={app.iconUrl}
                  width={48}
                  height={48}
                ></Image>
                <span className="font-openSans whitespace-nowrap w-[5rem] text-sm font-semibold p-1 text-white">
                  {stringPadding(app.name, 12)}
                </span>
              </button>
            </div>
          );
        })}
    </div>
  );
}
