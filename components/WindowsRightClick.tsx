"use client";
import { useEffect, useState } from "react";
import { useFileMangerStore } from "@/store/data";
import { FileManagerType, AppType } from "..";
const WindowsRightClick = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const createNewFolder = useFileMangerStore(
    (state: FileManagerType) => state.handleCreateNewFolder
  );

  interface MenuItemType {
    name: string;
    command?: string;
    icon?: any;
    callback?: () => void;
    submenu?: MenuItemType[];
  }

  const menuItems: { [key: string]: MenuItemType[] } = {
    group_1: [
      {
        name: "View",
        icon: (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-regular/50/four-squares.png"
            alt="four-squares"
          />
        ),
        submenu: [
          {
            name: "Large icons",
            command: "",
            icon: (
              <>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/windows/32/widescreen-tv.png"
                  alt="widescreen-tv"
                />
              </>
            ),
          },
          {
            name: "Medium icons",
            command: "",
            icon: (
              <>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/windows/32/tv.png"
                  alt="tv"
                />
              </>
            ),
          },
          {
            name: "Small icons",
            command: "",
            icon: (
              <>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency-systems-regular/50/four-squares.png"
                  alt="four-squares"
                />
              </>
            ),
          },
        ],
      },
      {
        name: "Sort by",
        submenu: [
          { name: "Name", command: "" },
          { name: "Size", command: "" },
          { name: "Item type", command: "" },
          { name: "Date modified", command: "" },
        ],
        icon: (
          <svg
            className="w-6 h-6 text-gray-80 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"
            />
          </svg>
        ),
      },
      {
        name: "Refresh",
        command: "",
        icon: (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/windows/32/recurring-appointment.png"
            alt="recurring-appointment"
          />
        ),
      },
    ],
    group_2: [
      {
        name: "New",
        submenu: [
          {
            name: "Folder",
            command: "",
            callback: () => createNewFolder(),
            icon: (
              <>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/emoji/48/file-folder-emoji.png"
                  alt="file-folder-emoji"
                />
              </>
            ),
          },
          {
            name: "Shortcut",
            command: "",
            icon: (
              <>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency/48/shortcut.png"
                  alt="shortcut"
                />
              </>
            ),
          },
        ],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <rect x="10" y="3" width="4" height="18" rx="2" />
            <rect x="3" y="10" width="18" height="4" rx="2" />
          </svg>
        ),
      },
      {
        name: "Display Settings",
        command: "Ctrl+C",
        icon: (
          <>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/window-settings.png"
              alt="window-settings"
            />
          </>
        ),
      },
      {
        name: "Personalise",
        icon: (
          <>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/ball-point-pen.png"
              alt="ball-point-pen"
            />
          </>
        ),
      },
    ],
    group_3: [
      {
        name: "AMD Software: Adrenalin Edition",
        command: "",
        icon: (
          <>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/amd.png"
              alt="amd"
            />
          </>
        ),
      },
      {
        name: "Rename with PowerRename",
        command: "",
        icon: (
          <>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency/48/rename.png"
              alt="rename"
            />
          </>
        ),
      },
      {
        name: "Open in Terminal",
        command: "",
        icon: (
          <>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-glyphs/30/console.png"
              alt="console"
            />
          </>
        ),
      },
    ],
    group_4: [
      {
        name: "Show more options",
        icon: (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/pulsar-line/48/share-3.png"
            alt="share-3"
          />
        ),
      },
    ],
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
  };

  const handleClick = () => {
    setMenuVisible(false);
    setSubmenuVisible(null);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const renderMenuItem = (item: MenuItemType, parentIndex: string) => (
    <div
      key={item.name}
      onClick={() => (item.callback ? item.callback() : {})}
      className="group flex items-center justify-between gap-x-2 px-2 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer relative"
      onMouseEnter={() =>
        item.submenu && setSubmenuVisible(`${parentIndex}-${item.name}`)
      }
      onMouseLeave={() => item.submenu && setSubmenuVisible(null)}
    >
      <div className="flex items-center gap-x-2">
        {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
        <span>{item.name}</span>
      </div>
      {item.submenu && (
        <span className="text-gray-600 group-hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
      {item.submenu && submenuVisible === `${parentIndex}-${item.name}` && (
        <div className="absolute left-full top-0 bg-white rounded-lg shadow-md border w-60 text-sm text-gray-800">
          {item.submenu.map((subItem, idx) =>
            renderMenuItem(subItem, `${parentIndex}-${item.name}-${idx}`)
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="font-openSans flex items-center justify-center overflow-hidden">
      {menuVisible && (
        <div
          className="absolute z-50 bg-white rounded-md shadow-md border w-72 text-sm text-gray-800"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          {Object.entries(menuItems).map(([group, items], groupIdx) => (
            <div key={group}>
              {groupIdx !== 0 && <div className="h-px bg-gray-200 my-1" />}
              <div className="py-1.5 px-2">
                {items.map((item, idx) =>
                  renderMenuItem(item, `group-${groupIdx}-${idx}`)
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WindowsRightClick;
