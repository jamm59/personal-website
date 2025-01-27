"use client";
import Editor from "@monaco-editor/react";
import TopBarAppManager from "./TopBarAppManager";
import { useState } from "react";
import { AppType } from "..";
interface CodeEditorType {
  app: AppType;
}
export default function CodeEditor({ app }: CodeEditorType) {
  const editorOptions = {
    fontSize: 16,
    fontFamily: "system ui",
    theme: "vs-light",
  };

  const bgColor: string = "black";

  const [displayCode, setDisplayCode] = useState<string>(files[0].code);
  const [codeLanguage, setCodeLanguage] = useState<string>(files[0].language);

  return (
    <TopBarAppManager
      app={app}
      titleColor="white"
      mainWrapperBackgroundColor={"white"}
      bgColor={bgColor}
      AppIcon={() => (
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
          alt="visual-studio-code-2019"
        />
      )}
    >
      <div className="w-full h-full flex justify-center items-center bg-white">
        <div className="w-[7%] h-full flex flex-col justify-start pt-5 px-2 gap-y-4 border-r-[1px] border-[rgba(0,0,0,0.1)] items-center">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/cotton/64/copy--v1.png"
            alt="copy--v1"
          />
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/windows/32/search--v1.png"
            alt="search--v1"
          />
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/merge-git.png"
            alt="merge-git"
          />
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-filled/50/window-bug.png"
            alt="window-bug"
          />
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/dotty/80/four-squares.png"
            alt="four-squares"
          />
        </div>
        <div className="w-[93%] h-full">
          <div className="h-10 flex justify-start shadow-md bg-[rgba(0,0,0,0.1)] items-center">
            {files.map(
              (
                file: { name: string; code: string; language: string },
                idx: number
              ) => (
                <button
                  onClick={() => {
                    setDisplayCode(file.code);
                    setCodeLanguage(file.language);
                  }}
                  key={idx}
                  style={{
                    backgroundColor:
                      file.language === codeLanguage ? "white" : "",
                  }}
                  className="shadow-inner border-r-[1px] border-[rgba(0,0,0,0.1)] flex h-full justify-around items-center gap-x-3 text-black transition-all duration-200 ease-out hover:bg-[rgba(0,0,0,0.1)] font-openSans text-sm px-4 py-1"
                >
                  <span>{file.name}</span>
                  <img
                    width="12"
                    height="12"
                    src="https://img.icons8.com/ios-glyphs/30/737373/multiply.png"
                    alt="multiply"
                  />
                </button>
              )
            )}
          </div>
          <Editor
            key={codeLanguage}
            className="bg-white p-2 text-lg"
            height="100%"
            width="100%"
            defaultLanguage={codeLanguage}
            value={displayCode}
            options={editorOptions}
          />
        </div>
      </div>
    </TopBarAppManager>
  );
}

const files = [
  {
    name: "main.py",
    language: "python",
    code: `# This script demonstrates a function to generate even numbers
  def evenNumbers(start: int, end: int, step: int):
      for i in range(start, end, step):
          if i % 2 == 0:
              yield i
      return "No even numbers found!"`,
  },

  {
    name: "index.html",
    language: "html",
    code: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sample HTML File</title>
  </head>
  <body>
      <h1>Welcome to the Example HTML File</h1>
      <p>This is a basic HTML structure.</p>
      <script src="index.js"></script>
  </body>
  </html>`,
  },

  {
    name: "styles.css",
    language: "css",
    code: `/* Basic CSS styles for the example project */
  body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
  }
  
  h1 {
      color: #007bff;
  }`,
  },

  {
    name: "index.js",
    language: "javascript",
    code: `// A simple JavaScript function to log even numbers to the console
  function evenNumbers(start, end, step) {
      for (let i = start; i < end; i += step) {
          if (i % 2 === 0) {
              console.log(i);
          }
      }
      console.log("Completed!");
  }
  evenNumbers(0, 10, 1);`,
  },
];
