"use client";
import { AppType, FileType, FileManagerType } from "..";
import { useFileMangerStore } from "@/store/data";
import { getFormattedDate } from "@/utils/methods";

export default function FolderInternals({ app }: { app: AppType }) {
  const setWallpaper = useFileMangerStore(
    (state: FileManagerType) => state.setWallpaper
  );
  const handleOpenApp = useFileMangerStore(
    (state: FileManagerType) => state.handleOpenApp
  );
  const HandleSubFileOrFolderIcons = ({
    child,
  }: {
    child: FileType | AppType;
  }) => {
    const childType = (child as FileType).type;
    switch ((child as FileType).type) {
      case "image":
        return (
          <td
            className="p-1 flex items-center gap-2"
            onDoubleClick={() => setWallpaper(child.name)}
          >
            <img width="24" height="24" src={child.iconUrl} alt="folder-icon" />
            <span>{child.name}</span>
          </td>
        );

      case "pdf":
        return (
          <td
            className="p-1 flex items-center gap-2"
            onDoubleClick={() =>
              handleOpenApp(childType === "pdf" ? "Pdf Viewer" : "")
            }
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/color/48/pdf.png"
              alt="pdf"
            />
            <span>{child.name}</span>
          </td>
        );

      case "text":
        return (
          <td
            className="p-1 flex items-center gap-2"
            onDoubleClick={() =>
              handleOpenApp(childType === "text" ? "Text Viewer" : "")
            }
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/skeuomorphism/64/document.png"
              alt="document"
            />
            <span>{child.name}</span>
          </td>
        );

      case "folder":
        return (
          <td className="p-1 flex items-center gap-2" onDoubleClick={() => {}}>
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
              <th className="text-left p-2 border-r-[1px] transition-all duration-100 ease-out hover:bg-[rgba(255,255,255,0.2)] border-[rgba(255,255,255,0.2)]">
                Name
              </th>
              <th className="text-left p-2 border-r-[1px] transition-all duration-100 ease-out hover:bg-[rgba(255,255,255,0.2)] border-[rgba(255,255,255,0.2)]">
                Date Modified
              </th>
              <th className="text-left p-2 border-r-[1px] transition-all duration-100 ease-out hover:bg-[rgba(255,255,255,0.2)] border-[rgba(255,255,255,0.2)]">
                Type
              </th>
              <th className="text-left p-2 border-r-[1px] transition-all duration-100 ease-out hover:bg-[rgba(255,255,255,0.2)] border-[rgba(255,255,255,0.2)]">
                Size
              </th>
            </tr>
          </thead>
          {app.children && app.children.length > 0 ? (
            app.children.map((child: FileType | AppType, idx: number) => (
              <tbody key={idx}>
                <tr
                  key={idx}
                  className="hover:bg-[rgba(255,255,255,0.2)] text-xs"
                >
                  <HandleSubFileOrFolderIcons child={child} />
                  <td className="p-1">{getFormattedDate()}</td>
                  <td className="p-1">{(child as FileType).type ?? ""}</td>
                  <td className="p-1">{"-"}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td
                  className="p-1 text-[rgba(255,255,255,0.6)] text-center"
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
