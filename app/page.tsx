import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-rose-500 h-screen">
      <main>
        <div>Files and Folders</div>
        <div>Other Section</div>
      </main>
      <footer className="bg-[rgba(255,255,255,0.7)] blur-5 opacity- h-[60] absolute bottom-0 left-0 right-0 p-4 flex justify-start gap-5 items-center">
        <button>
          <Image alt="Windows icon" src={"/icons/taskbar/windows.png"} width={38} height={32}></Image>
        </button>
        <button>
          <Image alt="Windows icon" src={"/icons/taskbar/copilot.png"} width={32} height={32}></Image>
        </button>
        <button>
          <Image alt="Windows icon" src={"/icons/taskbar/microsoft-store.webp"} width={32} height={32}></Image>
        </button>
                <button>
          <Image alt="Windows icon" src={"/icons/taskbar/file-explorer.png"} width={32} height={32}></Image>
        </button>
      </footer>
    </div>
  );
}
