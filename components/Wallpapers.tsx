"use client";
import { AppType } from "..";
import FolderWrapper from "./FolderWrapper";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, FileType } from "..";

export default function Wallpaper({ app }: { app: AppType }) {
  const setWallpaper = useFileMangerStore(
    (state: FileManagerType) => state.setWallpaper
  );
  return (
    <FolderWrapper app={app}>
      <div className="col-span-4 grid p-3 grid-rows-6 min-h-fit w-full flex-col overflow-y-scroll">
        <table className="table-auto w-full border-collapse text-sm">
          <thead>
            <tr className="font-semibold font-openSans">
              <th className="text-left p-2 border-r-[1px] border-[rgba(255,255,255,0.2)]">
                Name
              </th>
              <th className="text-left p-2 border-r-[1px] border-[rgba(255,255,255,0.2)]">
                Date Modified
              </th>
              <th className="text-left p-2 border-r-[1px] border-[rgba(255,255,255,0.2)]">
                Type
              </th>
              <th className="text-left p-2 border-r-[1px] border-[rgba(255,255,255,0.2)]">
                Size
              </th>
            </tr>
          </thead>
          <tbody>
            {app.children &&
              app.children.map((child: FileType | AppType, idx: number) => (
                <tr key={idx} className="hover:bg-[rgba(255,255,255,0.2)]">
                  <td
                    className="p-2 flex items-center gap-2 text-xs"
                    onDoubleClick={() => setWallpaper(child.name)}
                  >
                    <img
                      width="20"
                      height="20"
                      src={child.iconUrl}
                      alt="folder-icon"
                    />
                    <span>{child.name}</span>
                  </td>
                  <td className="p-2">{new Date().toISOString()}</td>
                  <td className="p-2">{(child as FileType).type ?? ""}</td>
                  <td className="p-2">{"-"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </FolderWrapper>
  );
}
