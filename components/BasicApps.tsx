"use client";
import { useState } from "react";
import { AppType } from "..";
import TopBarAppManager from "./TopBarAppManager";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

export function TextEditor({ app }: { app: AppType }) {
  const [fileInfo, setFileInfo] = useState<string>(`
              1. All icons used in this project were downloaded from Icons8[https://icons8.com/icons].
              2. Wallpapers from uhdpaper[https://www.uhdpaper.com/]

              `);
  return (
    <TopBarAppManager
      app={app}
      titleColor="white"
      bgColor={"#171717"}
      AppIcon={() => (
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/skeuomorphism/64/document.png"
          alt="document"
        />
      )}
    >
      <div className="h-full w-full bg-zinc-900">
        <div className="h-[2rem] flex justify-start items-center text-sm font-mono gap-4 pl-5 px-2 py-5 border-y-[1px] border-[rgba(255,255,255,0.1)]">
          <button>File</button>
          <button>Edit</button>
          <button>View</button>
        </div>
        <textarea
          className="h-full bg-neutral-950 w-full p-3 focus:outline-none text-sm"
          // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          //   setFileInfo((prev) => e.target.value);
          // }}
          defaultValue={fileInfo}
        ></textarea>
      </div>
    </TopBarAppManager>
  );
}

export function PDFEditor({ app }: { app: AppType }) {
  return (
    <TopBarAppManager
      app={app}
      titleColor="black"
      bgColor={"white"}
      AppIcon={() => (
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/skeuomorphism/64/document.png"
          alt="document"
        />
      )}
    >
      <EmbedPDF
        className="h-full w-full"
        mode="inline"
        documentURL="/files/cv.pdf"
      />
    </TopBarAppManager>
  );
}
