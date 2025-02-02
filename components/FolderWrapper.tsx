"use client";
import { useRef, useState } from "react";
import { AppType } from "..";
import TopBarAppManager from "./TopBarAppManager";
import FolderInternals from "./FolderInternals";
import { pinnedItems } from "@/utils/constants";

interface FolderWrapperType {
  app: AppType;
  children?: React.ReactNode;
}

const FolderWrapper = (props: FolderWrapperType) => {
  const { app, children } = props;
  // constants and variables
  const foregroundColor: string = "rgba(255,255,255,1)";

  // components states and references
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const newFolderREf = useRef<HTMLDivElement>(null);

  return (
    <TopBarAppManager
      app={app}
      titleColor={"black"}
      bgColor={foregroundColor}
      AppIcon={() =>
        app.name === "File Explorer" ? (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/48/home-page.png"
            alt="home-page"
          />
        ) : (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/emoji/48/file-folder-emoji.png"
            alt="file-folder-emoji"
          />
        )
      }
    >
      <div>
        <div
          className="h-[60%] text-black grid grid-cols-5"
          style={{ backgroundColor: foregroundColor }}
        >
          <div className="flex justify-around items-center opacity-45">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/left.png"
              alt="left"
            />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/right.png"
              alt="right"
            />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/up.png"
              alt="up"
            />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/windows/32/reboot.png"
              alt="reboot"
            />
          </div>
          <div className="col-span-3 p-2">
            <div className="text-sm bg-white py-1 px-2 flex gap-2 justify-start items-center h-full rounded-md shadow-md">
              {app.name === "File Explorer" ? (
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/windows/32/smart-home-2.png"
                  alt="smart-home-2"
                />
              ) : (
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/forma-light/24/my-computer.png"
                  alt="my-computer"
                />
              )}
              <img
                width="10"
                height="10"
                src="https://img.icons8.com/windows/32/more-than.png"
                alt="more-than"
              />
              <span className="">{app.name}</span>
            </div>
          </div>
          <div className="p-2">
            <input
              type="text"
              placeholder="Search Desktop"
              className=" placeholder:text-[rgba(0,0,0,0.5)] placeholder:text-sm font-openSans px-3 shadow-md h-full rounded-md max-w-full focus:outline-none"
            ></input>
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col">
        <div className="bg-white py-1 h-[5rem] grid border-y-[1px] border-gray-300 grid-cols-7 text-black text-sm">
          <div className="flex justify-start pl-5 items-center text-sm font-semibold font-openSans">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/cotton/128/plus--v3.png"
              alt="plus--v3"
            />
            <div
              onClick={() =>
                newFolderREf.current && [
                  newFolderREf.current.classList.toggle("hidden"),
                  newFolderREf.current.classList.toggle("flex"),
                ]
              }
              className="min-w-full relative flex justify-start items-center gap-x-2 p-2 focus:outline-none"
            >
              <button>New</button>
              <div
                ref={newFolderREf}
                className="hidden justify-center flex-col items-start absolute rounded-md p-1 bg-white h-fit left-0 top-[3rem]"
              >
                <button className="flex justify-start items-center w-full gap-x-1 hover:bg-[rgba(0,0,0,0.1)] py-1 pl-1 pr-3 rounded-md">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/emoji/48/file-folder-emoji.png"
                    alt="file-folder-emoji"
                  />
                  <span>Folder</span>
                </button>
                <button className="flex justify-start items-center w-full gap-x-1 hover:bg-[rgba(0,0,0,0.1)] py-1 pl-1 pr-3 rounded-md">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency/48/shortcut.png"
                    alt="shortcut"
                  />
                  <span>Shortcut</span>
                </button>
              </div>
              <img
                width="10"
                height="10"
                src="https://img.icons8.com/ios-filled/50/expand-arrow--v1.png"
                alt="expand-arrow--v1"
              />
            </div>
          </div>
          <div className="opacity-45 col-span-2 flex px-2 justify-around items-center border-l-[1px] border-gray-300">
            <img
              width="24"
              height="24"
              className="rotate-[-90deg]"
              src="https://img.icons8.com/windows/32/cut.png"
              alt="cut"
            />
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/50/copy--v1.png"
              alt="copy--v1"
            />
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/metro/26/paste.png"
              alt="paste"
            />
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/50/rename.png"
              alt="rename"
            />
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/50/share-3.png"
              alt="share-3"
            />
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/50/trash--v1.png"
              alt="trash--v1"
            />
          </div>
          <div className="opacity-45 border-l-[1px] gap-x-3 px-3 flex col-span-2 justify-around items-center border-gray-300">
            <div className="flex justify-center items-center gap-1">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/windows/32/sorting-arrows.png"
                alt="sorting-arrows"
              />
              <span>sort</span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency-systems-regular/50/737373/four-squares.png"
                alt="four-squares"
              />
              <span>View</span>
            </div>

            <div className="flex justify-center items-center gap-1">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency-systems-regular/50/filter--v1.png"
                alt="filter--v1"
              />
              <span>Filter</span>
            </div>
          </div>
          <div className="flex opacity-45 text-black text-sm justify-between px-3 items-center bg-white border-l-[1px] col-span-2 border-gray-300">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-filled/50/ellipsis.png"
              alt="ellipsis"
            />
            <div className="p-2 min-w-[5rem] flex gap-2 justify-center items-center">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency-systems-filled/50/details.png"
                alt="details"
              />
              <span>Details</span>
            </div>
          </div>
        </div>
        <div className="min-h-full">
          <div className="grid grid-cols-5 h-full w-full bg-white dark:bg-zinc-950 dark:text-white text-black">
            <div className="pr-1 border-r-[1px] border-gray-700 pb-10">
              <div
                style={{ height: isMaximized ? "40rem" : "22rem" }}
                className=" font-semibold font-openSans overflow-y-scroll overflow-x-hidden flex justify-start items-center p-1 flex-col"
              >
                <div className="w-full min-h-1/2 border-b-[1px] border-gray-700 flex flex-col justify-center items-start gap-1 p-4">
                  <div className="text-sm whitespace-nowrap flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/home-page.png"
                      alt="home-page"
                    />
                    <span>Home</span>
                  </div>
                  <div className="text-sm whitespace-nowrap flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/image-gallery.png"
                      alt="image-gallery"
                    />
                    <span>Gallery</span>
                  </div>
                  <div className="text-sm whitespace-nowrap flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/microsoft-onedrive-2019.png"
                      alt="microsoft-onedrive-2019"
                    />
                    <span>OneDrive - Personal</span>
                  </div>
                  <div className="text-sm whitespace-nowrap flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/folder-invoices--v2.png"
                      alt="folder-invoices--v2"
                    />
                    <span>Desktop</span>
                  </div>
                  <div className="text-sm whitespace-nowrap flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/folder-invoices--v2.png"
                      alt="folder-invoices--v2"
                    />
                    <span>Documents</span>
                  </div>
                  <div className="flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/folder-invoices--v2.png"
                      alt="folder-invoices--v2"
                    />
                    <span>Pictures</span>
                  </div>
                </div>
                <div className="w-full min-h-1/2 border-b-[1px] border-gray-700 flex flex-col justify-center items-start gap-1 p-4">
                  {pinnedItems.map((value: any, idx: number) => (
                    <div
                      key={idx}
                      className="text-sm whitespace-nowrap flex justify-around mb-1 items-center gap-2 w-full"
                    >
                      <img
                        width={value.size}
                        height={value.size}
                        src={value.iconUrl}
                        alt={value.alt}
                      />
                      <span>{value.name}</span>
                      <img
                        width={value.size - 4}
                        height={value.size - 4}
                        className="ml-auto"
                        src="https://img.icons8.com/ios-filled/50/737373/pin3.png"
                        alt="pin3"
                      />
                    </div>
                  ))}
                </div>
                <div className="w-full min-h-1/2 flex flex-col justify-center items-start gap-1 p-4">
                  <div className="text-sm whitespace-nowrap flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/monitor--v1.png"
                      alt="monitor--v1"
                    />
                    <span>This PC</span>
                  </div>
                  <div className="text-sm whitespace-nowrap flex justify-start mb-1 items-center gap-2 w-full">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/network-symbol.png"
                      alt="network-symbol"
                    />
                    <span>Network</span>
                  </div>
                </div>
              </div>
            </div>
            {children ?? <FolderInternals app={app} />}
          </div>
          <div className="h-6 flex justify-start items-center px-4 font-openSans text-sm bg-zinc-900 absolute bottom-0 w-full">
            14 items |
          </div>
        </div>
      </div>
    </TopBarAppManager>
  );
};

export default FolderWrapper;
