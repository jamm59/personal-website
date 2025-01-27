//"use client";
import Image from "next/image";
import { FileManagerType, AppType } from "..";
import { useFileMangerStore } from "@/store/data";

import { stringPadding } from "@/utils/methods";
import { useEffect, useRef, useState } from "react";

interface DesktopRef {
  isDragging: boolean;
  ref: any;
  offsetX: number;
  offsetY: number;
}
export default function DesktopApps() {
  // global state

  const handleOpenApp = useFileMangerStore(
    (state: FileManagerType) => state.handleOpenApp
  );

  const handleAddAppToTaskBar = useFileMangerStore(
    (state: FileManagerType) => state.handleAddAppToTaskBar
  );

  const apps = useFileMangerStore<AppType[]>(
    (state: FileManagerType) => state.apps
  );

  // helper functions
  const handleMouseMove = (
    event: React.MouseEvent<HTMLButtonElement>,
    reference: DesktopRef | undefined
  ) => {
    if (!reference || !reference.isDragging || !reference.ref) return;

    const offsetX = event.clientX - reference.offsetX;
    const offsetY = event.clientY - reference.offsetY;

    reference.ref.style.left = `${offsetX}px`;
    reference.ref.style.top = `${offsetY}px`;
    reference.ref.style.position = "absolute";
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement>,
    reference: DesktopRef | undefined
  ) => {
    if (!reference || !reference.ref) return;
    console.log("starting", reference.isDragging);
    reference.isDragging = true;
    reference.offsetX = event.clientX - reference.ref.offsetLeft;
    reference.offsetY = event.clientY - reference.ref.offsetTop;
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLButtonElement>,
    reference: DesktopRef | undefined
  ) => {
    if (!reference) return;
    reference.isDragging = false;
  };

  // component states and references
  const desktopProgramsRef = useRef<Map<number, DesktopRef>>(new Map());
  const div = useRef<HTMLDivElement>(null);

  useEffect(() => {}, [desktopProgramsRef]);

  return (
    <div
      ref={div}
      id="desktop-icon-parent"
      className="z-20 relative h-full w-fit px-8 pb-10 pt-5 gap-5 flex flex-col flex-wrap justify-start items-start select-none"
    >
      {apps
        .filter(
          (app: AppType) =>
            app.isOnBothDeskTopAndTaskBar || (!app.isOnTaskBar && app.showApp)
        )
        .map((app: AppType, idx: number) => {
          return (
            <button
              // onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
              //   handleMouseDown(e, desktopProgramsRef.current.get(idx))
              // }
              // onMouseMove={(e: React.MouseEvent<HTMLButtonElement>) =>
              //   handleMouseMove(e, desktopProgramsRef.current.get(idx))
              // }
              // onMouseUp={(e: React.MouseEvent<HTMLButtonElement>) =>
              //   handleMouseUp(e, desktopProgramsRef.current.get(idx))
              // }
              key={idx}
              ref={(r: HTMLButtonElement | null) => {
                // console.log(app.name, idx);
                const appRefence: DesktopRef = {
                  isDragging: false,
                  ref: r,
                  offsetX: 0,
                  offsetY: 0,
                };
                desktopProgramsRef.current.set(idx, appRefence);
              }}
              onDoubleClick={() => {
                handleOpenApp(app.name);
                handleAddAppToTaskBar(app.name, true);
              }}
              style={{
                top: `${idx < 1 ? 7 : 7 * idx}rem`,
              }}
              className="duration-75 transition-all ease-linear group hover:bg-[rgb(255,255,255,0.1)] p-1 rounded-md flex justify-center items-center flex-col"
            >
              <Image
                alt="folder icon"
                src={app.iconUrl}
                width={48}
                height={48}
                priority
              ></Image>
              <span className="justify-center items-center group-focus:hidden flex font-openSans whitespace-nowrap w-[5rem] text-sm font-semibold p-1 text-white">
                {stringPadding(app.name, 13)}
              </span>
              <span className="justify-center items-center group-focus:flex hidden font-openSans whitespace-nowrap w-[5rem] text-sm font-semibold p-1 text-white">
                {app.name}
              </span>
            </button>
          );
        })}
    </div>
  );
}
