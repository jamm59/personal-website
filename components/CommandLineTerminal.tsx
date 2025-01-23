"use client";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import { useEffect, useState } from "react";
import TopBarAppManager from "./TopBarAppManager";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
export default function CustomTerminal({ app }: { app: AppType }) {
  const terminalColor: string = "#1A1A19";

  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  const [welcomeMessage, setWelcomeMessage] =
    useState<string>(`Windows PowerShell 
Copyright Microsoft Corporation. All rights reserved. 
Install the latest PowerShell for new features and improvements! https://aka.ns/PSWindows.`);

  useEffect(() => {
    const commandHandler = (commandText: string) => {
      let response;

      switch (commandText.toLowerCase()) {
        case "ls":
          response = (
            <div className="flex justify-start gap-5 item-center flex-wrap">
              {apps.map(
                (app: AppType, idx: number) =>
                  !app.isOnTaskBar && <span key={idx}>{app.name}</span>
              )}
              <span></span>
            </div>
          );
          break;
        case "help":
          response = (
            <div className="">{"Available commands: help, greet, clear"}</div>
          );
          break;
        case "greet":
          response = (
            <div className="">{"Hello, welcome to the custom terminal!"}</div>
          );
          break;
        case "clear":
          setWelcomeMessage("");
          TerminalService.emit("clear");
          return;
        default:
          response = (
            <div className="">{`Unknown command: '${commandText}'`}</div>
          );
      }

      // Emit the response back to the terminal
      TerminalService.emit("response", response);
    };

    // Register the command handler
    TerminalService.on("command", commandHandler);

    // Cleanup listener on component unmount
    return () => {
      TerminalService.off("command", commandHandler);
    };
  }, []);
  return (
    <>
      <TopBarAppManager
        app={app}
        titleColor="white"
        bgColor={terminalColor}
        AppIcon={() => (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency/48/console.png"
            alt="console"
          />
        )}
      >
        <div className="h-full w-full aspect-video bg-orange-600">
          <Terminal
            style={{ backgroundColor: terminalColor }}
            className="h-full p-3 font-mono"
            welcomeMessage={welcomeMessage}
            prompt="PS C:\Users\PC\Desktop>"
            pt={{
              welcomeMessage: {
                className: "whitespace-break-spaces flex w-fit min-h-fit p-1",
              },
            }}
          />
        </div>
      </TopBarAppManager>
    </>
  );
}
