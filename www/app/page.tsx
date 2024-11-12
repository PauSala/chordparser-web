"use client";

import { InitInput, InitOutput, parse as ParseType } from "chord_parser_demo";
import { useEffect, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";

const WebAssembly: {
  init:
    | ((
        module_or_path?:
          | {
              module_or_path: InitInput | Promise<InitInput>;
            }
          | InitInput
          | Promise<InitInput>
      ) => Promise<InitOutput>)
    | null;

  main: (() => void) | null;
  parse: ((input: string) => unknown) | null;
} = {
  init: null,
  main: null,
  parse: null,
};

interface ParserError {
  errors: string[];
  positions: number[];
}

const defaultParserError = {
  errors: [],
  positions: [],
};

export default function Home() {
  const [parsed, setParsed] = useState<string | null>(null);
  const [error, setError] = useState<ParserError>(defaultParserError);
  const [inputValue, setInputValue] = useState("");
  const [isWasmInitialized, setIsWasmInitialized] = useState(false);

  useEffect(() => {
    async function loadWasm() {
      const { default: init, parse, main } = await import("chord_parser_demo");

      WebAssembly.init = init;
      WebAssembly.main = main;
      WebAssembly.parse = parse;

      await WebAssembly.init();
      setIsWasmInitialized(true);
    }

    loadWasm();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleParse(event.target.value);
  };

  const handleParse = (input: string) => {
    if (isWasmInitialized && WebAssembly.parse) {
      const res = (WebAssembly.parse as typeof ParseType)(input);
      if ("errors" in res) {
        setParsed("");
        setError(res);
        return;
      }
      setError(defaultParserError);
      const html = prettyPrintJson.toHtml(res);
      setParsed(html);
    }
  };

  return (
    <div className="flex flex-col justify-center p-10 gap-5">
      <div className="flex gap-1 justify-center">
        <input
          className="text-gray-900"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        {parsed && (
          <pre
            className="json-container p-4 text-xs"
            dangerouslySetInnerHTML={{ __html: parsed }}
          ></pre>
        )}
      </div>
      {error.errors.length > 0 && (
        <div className="json-container p-4 ">
          {error.errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
}
