import { Terminal } from "primereact/terminal";
// import { TerminalService } from "primereact/terminalservice";
import Image from "next/image";
import { AppType } from "..";
export default function CustomTerminal({ app }: { app: AppType }) {
  const terminalColor: string = "#1A1A19";

  if (!app.isOpen) return <></>;
  return (
    <>
      <div className="select-none absolute inset-0 grid place-items-center">
        <div className="h-[500px] aspect-video bg-white">
          <div className="grid grid-cols-4">
            <div className="col-span-3 pt-1 pl-1 flex">
              <div
                style={{ backgroundColor: terminalColor }}
                className="p-1 select-none font-sans text-sm font-semibold w-[40%] rounded-t-md h-full flex justify-between px-3 items-center"
              >
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/fluency/48/powershell.png"
                  alt="powershell"
                />
                <span className="mr-auto ml-2 ">Terminal</span>
                <img
                  width="10"
                  height="10"
                  src="https://img.icons8.com/metro/26/FFFFFF/delete-sign.png"
                  alt="delete-sign"
                />
              </div>
              <div className="select-none font-openSans font-semibold w-fit rounded-t-md h-full flex justify-between px-3 items-center">
                <img
                  width="10"
                  height="10"
                  src="https://img.icons8.com/metro/26/plus-math.png"
                  alt="plus-math"
                />
              </div>
            </div>
            <div className="flex justify-end items-center opacity-70 select-none">
              <button
                // onClick={() => handleMinimizeApp()}
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
                // onClick={() => handleMaximizeApp()}
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
                // onClick={() => handleCloseApp()}
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
          <Terminal
            style={{ backgroundColor: terminalColor }}
            className="h-full p-3 font-mono"
            welcomeMessage={`Windows PowerShell 
Copyright Microsoft Corporation. All rights reserved. 
Install the latest PowerShell for new features and improvements! https://aka.ns/PSWindows.`}
            prompt="PS C:\Users\PC\Desktop>"
            pt={{
              welcomeMessage:
                "whitespace-break-spaces flex w-fit min-h-fit p-1",
              prompt: "mt-2",
            }}
          />
        </div>
      </div>
    </>
  );
}
