"use client";
import Image from "next/image";
import { useState, forwardRef } from "react";
import { useFileMangerStore } from "@/store/data";
import { AppNameType, AppType, FileManagerType } from "..";

interface FileExplorerType {
  appName: AppNameType;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const FileExplorer = forwardRef((props: FileExplorerType, ref: any) => {
  const { handleMouseDown, appName } = props;
  // constants and variables
  const foregroundColor: string = "rgba(255,255,255,1)";
  const backgroundColor: string = "rgba(255,255,255,0.6)";
  const customWindowWidth: string = "80%";

  // Global state
  const closeAppFunction = useFileMangerStore(
    (state: FileManagerType) => state.handleCloseApp
  );
  const minimizeFunction = useFileMangerStore(
    (state: FileManagerType) => state.handleMinimizeApp
  );

  const handleAddAppToTaskBar = useFileMangerStore(
    (state: FileManagerType) => state.handleAddAppToTaskBar
  );

  // components states and references
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // callback functions
  const handleCloseApp = () => {
    closeAppFunction(appName);
    handleAddAppToTaskBar(appName, false);
    console.log("closing name: " + appName);
  };
  const handleMinimizeApp = () => {
    minimizeFunction(appName);
  };
  const handleMaximizeApp = () => {
    setIsMaximized(!isMaximized);
  };

  const pinnedItems: any = [
    {
      name: "Desktop",
      iconUrl: "https://img.icons8.com/fluency/48/desktop.png",
      size: 24,
      alt: "desktop",
    },
    {
      name: "Downloads",
      iconUrl: "https://img.icons8.com/fluency/48/downloads-folder--v2.png",
      size: 24,
      alt: "",
    },
    {
      name: "Documents",
      iconUrl: "https://img.icons8.com/fluency/48/open-document.png",
      size: 24,
      alt: "open-document",
    },
    {
      name: "Pictures",
      iconUrl: "https://img.icons8.com/fluency/48/stack-of-photos.png",
      size: 24,
      alt: "stack-of-photos",
    },
    {
      name: "Music",
      iconUrl: "https://img.icons8.com/fluency/48/music.png",
      size: 24,
      alt: "music",
    },
    {
      name: "Video",
      iconUrl: "https://img.icons8.com/fluency/48/cinema-.png",
      size: 24,
      alt: "cinema",
    },
  ];

  return (
    <>
      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        style={{
          backgroundColor: backgroundColor,
          width: isMaximized ? customWindowWidth : "900px",
        }}
        className="z-20 relative aspect-video backdrop:blur-md rounded-md overflow-hidden"
      >
        <div className="h-[5rem]">
          <div className="grid grid-cols-4 h-[40%]">
            <div className="col-span-3 text-black pt-2 pl-1 flex">
              <div
                style={{ backgroundColor: foregroundColor }}
                className="select-none font-sans text-sm font-semibold w-[40%] rounded-t-md h-full flex justify-between px-3 items-center"
              >
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/fluency/48/home-page.png"
                  alt="home-page"
                />
                <span className="mr-auto ml-2">
                  {appName === "File Explorer" ? "Home" : appName}
                </span>
                <Image
                  alt="close"
                  src={"/icons/close.png"}
                  width={10}
                  height={10}
                />
              </div>
              <div className="select-none font-openSans font-semibold w-fit rounded-t-md h-full flex justify-between px-3 items-center">
                <Image
                  alt="add"
                  className="rotate-45"
                  src={"/icons/close.png"}
                  width={10}
                  height={10}
                ></Image>
              </div>
            </div>
            <div className="flex justify-end items-center opacity-70 select-none">
              <button
                onClick={() => handleMinimizeApp()}
                className="h-full flex justify-center items-center w-12 hover:bg-[rgba(0,0,0,0.1)] transition-all duration-100"
              >
                <Image
                  alt="minimize"
                  src={"/icons/minimize.png"}
                  width={10}
                  height={10}
                ></Image>
              </button>
              <button
                onClick={() => handleMaximizeApp()}
                className="h-full flex justify-center items-center w-12 hover:bg-[rgba(0,0,0,0.1)] transition-all duration-100"
              >
                <Image
                  alt="maximize"
                  src={"/icons/maximize.png"}
                  width={10}
                  height={10}
                ></Image>
              </button>
              <button
                onClick={() => handleCloseApp()}
                className="h-full flex justify-center items-center w-12 hover:bg-red-500 transition-all duration-100"
              >
                <Image
                  alt="close"
                  src={"/icons/close.png"}
                  width={10}
                  height={10}
                ></Image>
              </button>
            </div>
          </div>
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
              <div className="bg-white py-1 px-2 flex gap-2 justify-start items-center h-full rounded-md shadow-md bg-[rgba(0,0,0,0.1)]">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/fluency-systems-regular/50/home--v1.png"
                  alt="home--v1"
                />
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/windows/32/more-than.png"
                  alt="more-than"
                />
                <span className="font-mono">Home</span>
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/windows/32/more-than.png"
                  alt="more-than"
                />
              </div>
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="Search Desktop"
                className="font-openSans px-3 shadow-md bg-[rgba(0,0,0,0.1)] h-full rounded-md max-w-full focus:outline-none"
              ></input>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 h-full flex flex-col">
          <div className="bg-white py-1 h-[5rem] grid border-y-[1px] border-gray-300 grid-cols-7 text-black text-sm">
            <div className=" opacity-45 flex justify-start pl-5 items-center gap-x-1 text-sm font-semibold font-openSans">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/windows/32/add--v1.png"
                alt="add--v1"
              />

              <select className="w-[3.6rem] focus:outline-none">
                <option value="actual value 1">New</option>
                <option value="actual value 2">Folder</option>
                <option value="actual value 3">Shortcut</option>
              </select>
            </div>
            <div className=" opacity-45 col-span-2 flex px-2 justify-around items-center border-l-[1px] border-gray-300">
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
                      <>
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
                      </>
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
              <div className="col-span-4 grid grid-rows-6 min-h-fit w-full flex-col overflow-y-scroll">
                <div className="w-full row-span-4">
                  <div className="w-full text-sm h-[3rem] gap-3 flex justify-start p-2 items-center">
                    <img
                      width="15"
                      height="15"
                      src="https://img.icons8.com/fluency-systems-filled/50/737373/expand-arrow.png"
                      alt="expand-arrow"
                    />
                    <span>Quick access</span>
                  </div>
                  <div className="mx-auto w-[60%] gap-7 p-3 grid grid-cols-2 flex-wrap">
                    {pinnedItems.map((value: any, idx: number) => (
                      <>
                        <div
                          key={idx}
                          className="text-sm whitespace-nowrap gap-2 flex justify-start mb-1 items-center"
                        >
                          <img
                            width={value.size * 2}
                            height={value.size * 2}
                            src={value.iconUrl}
                            alt="desktop"
                          />
                          <div className="flex flex-col h-full pl#4-3">
                            <span>{value.name}</span>
                            <span className="text-xs opacity-70">
                              stored locally
                            </span>
                            <img
                              width={value.size - 4}
                              height={value.size - 4}
                              src="https://img.icons8.com/ios-filled/50/737373/pin3.png"
                              alt="pin3"
                            />
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                {/* <div className="bg-green-500 w-full">hello</div>
                <div className="bg-orange-500 w-full">world </div> */}
              </div>
            </div>
            <div className="h-6 flex justify-start items-center px-4 font-openSans text-sm bg-zinc-900 absolute bottom-0 w-full">
              14 items |
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default FileExplorer;
