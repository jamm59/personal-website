"use client";
import { pinnedItems } from "@/utils/constants";
import FolderWrapper from "./FolderWrapper";
import { AppType } from "..";

export default function FileExplorer({ app }: { app: AppType }) {
  return (
    <FolderWrapper app={app}>
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
                    <span className="text-xs opacity-70">stored locally</span>
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
      </div>
    </FolderWrapper>
  );
}
