"use client";
import { useEffect, useState } from "react";

const WindowsRightClick = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const submenuItem = {
    name: "Plugins",
    icon: (
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
    ),
    submenu: [
      { name: "Unsplash", command: "" },
      { name: "Inbox Cleaner", command: "" },
      { name: "Auto layout", command: "" },
    ],
  };

  const menuItems = {
    group_1: [
      { name: "Share", command: "" },
      { name: "Move to", command: "Ctrl+M" },
    ],
    group_2: [{ name: "Copy link", command: "Ctrl+C" }],
    group_3: [
      { name: "Rename", command: "" },
      { name: "Duplicate", command: "" },
    ],
    group_4: [
      { name: "Delete", command: "Ctrl+D" },
      { name: "Archive", command: "" },
      { name: "Import files", command: "" },
    ],
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
  };

  const handleClick = () => {
    setMenuVisible(false);
    setSubmenuVisible(false);
  };
  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="flex items-center justify-center overflow-hidden"
      //   onContextMenu={handleContextMenu}
      //   onClick={handleClick}
    >
      {menuVisible && (
        <div
          className="absolute z-50 bg-white rounded-lg shadow-md border w-60 text-sm text-gray-800"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <div className="py-1.5 px-2">
            <div
              className="group flex items-center justify-between gap-x-2 px-2 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer"
              onMouseEnter={() => setSubmenuVisible(true)}
              onMouseLeave={() => setSubmenuVisible(false)}
            >
              {submenuItem.name}
              <div className="text-gray-600 group-hover:text-white">
                {submenuItem.icon}
              </div>
            </div>

            {submenuVisible && (
              <div
                className="absolute left-full top-0 mt-1 bg-white rounded-lg shadow-md border w-60 text-sm text-gray-800"
                style={{ left: "100%", top: "0" }}
              >
                <div className="py-1.5 px-2">
                  {submenuItem.submenu.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-x-2 px-2 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {Object.values(menuItems).map((group, groupIdx) => (
            <div key={groupIdx}>
              {groupIdx !== 0 && <div className="h-px bg-gray-200 my-1" />}
              <div className="py-1.5 px-2">
                {group.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-x-2 px-2 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    {item.name}
                    <span className="text-gray-500 group-hover:text-white">
                      {item.command}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WindowsRightClick;
