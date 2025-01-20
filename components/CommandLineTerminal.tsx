"use client";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import { useEffect, useState } from "react";
import TopBarAppManager from "./TopBarAppManager";
import { AppType } from "..";
export default function CustomTerminal({ app }: { app: AppType }) {
  const terminalColor: string = "#1A1A19";

  const [welcomeMessage, setWelcomeMessage] =
    useState<string>(`Windows PowerShell 
Copyright Microsoft Corporation. All rights reserved. 
Install the latest PowerShell for new features and improvements! https://aka.ns/PSWindows.`);
  useEffect(() => {
    // Add command listener
    const commandHandler = (commandText: string) => {
      let response;

      // Define custom commands and responses
      switch (commandText.toLowerCase()) {
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
          TerminalService.emit("clear"); // Clear terminal content
          return; // Skip sending a response
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
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/48/powershell.png"
            alt="powershell"
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
