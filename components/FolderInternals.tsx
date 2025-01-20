"use client";
import { AppType, FileType, FileManagerType } from "..";
import { useFileMangerStore } from "@/store/data";

export default function FolderInternals({ app }: { app: AppType }) {
  const setWallpaper = useFileMangerStore(
    (state: FileManagerType) => state.setWallpaper
  );
  const HandleSubFileOrFolderIcons = ({
    child,
  }: {
    child: FileType | AppType;
  }) => {
    switch ((child as FileType).type) {
      case "image":
        return (
          <td
            className="p-2 flex items-center gap-2 text-xs"
            onDoubleClick={() => setWallpaper(child.name)}
          >
            <img width="20" height="20" src={child.iconUrl} alt="folder-icon" />
            <span>{child.name}</span>
          </td>
        );

      default:
        break;
    }
  };
  return (
    <>
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
          {app.children && app.children.length > 0 ? (
            app.children.map((child: FileType | AppType, idx: number) => (
              <tbody key={idx}>
                <tr key={idx} className="hover:bg-[rgba(255,255,255,0.2)]">
                  <HandleSubFileOrFolderIcons child={child} />
                  <td className="p-2">{new Date().toISOString()}</td>
                  <td className="p-2">{(child as FileType).type ?? ""}</td>
                  <td className="p-2">{"-"}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td
                  className="p-2 text-[rgba(255,255,255,0.6)] text-center"
                  colSpan={4}
                >
                  This folder is empty.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
