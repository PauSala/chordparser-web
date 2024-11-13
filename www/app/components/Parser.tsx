"use client";

import { InitInput, InitOutput, parse as ParseType } from "chord_parser_demo";
import { useCallback, useEffect, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";
import Renderer from "./Renderer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const INITIAL_VALUE = "DbMaj7";

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

interface ParsedChord {
  note_literals: string[];
  normalized: string;
}

export default function Parser() {
  const [parsedHtml, setParsedHtml] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedChord | null>(null);
  const [error, setError] = useState<ParserError>(defaultParserError);
  const [inputValue, setInputValue] = useState(INITIAL_VALUE);

  const [isWasmInitialized, setIsWasmInitialized] = useState(false);
  const [isJsonVisible, setIsJsonVisible] = useState(false);

  const toggleJsonVisibility = () => {
    setIsJsonVisible(!isJsonVisible);
  };

  const handleParse = useCallback(
    (input: string) => {
      if (isWasmInitialized && WebAssembly.parse) {
        const res = (WebAssembly.parse as typeof ParseType)(input);
        if ("errors" in res) {
          setParsedHtml("");
          setParsed(null);
          setError(res);
          return;
        }
        setError(defaultParserError);
        setParsed(res);
        const html = prettyPrintJson.toHtml(res);
        setParsedHtml(html);
      }
    },
    [isWasmInitialized]
  );

  useEffect(() => {
    async function loadWasm() {
      const { default: init, parse, main } = await import("chord_parser_demo");

      WebAssembly.init = init;
      WebAssembly.main = main;
      WebAssembly.parse = parse;

      await WebAssembly.init();
      setIsWasmInitialized(true);
      handleParse(INITIAL_VALUE);
    }

    loadWasm();
  }, [handleParse]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleParse(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center p-4 gap-5 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
      <div className="flex gap-1 justify-center">
        <input
          className="text-gray-900 bg-slate-100 p-2 w-full text-center rounded border-none focus:outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </div>

      <Renderer
        chord={parsed?.note_literals || []}
        label={parsed?.normalized || ""}
      ></Renderer>

      <div>
        {parsedHtml && (
          <>
            <button
              className="flex items-center gap-2 text-primary"
              onClick={toggleJsonVisibility}
            >
              {isJsonVisible
                ? "Hide JSON representation"
                : "Show JSON representation"}
              {isJsonVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isJsonVisible && (
              <pre
                className="json-container p-4 text-xs border border-primary rounded mt-2 overflow-y-auto"
                // style={{ maxHeight: "calc(100vh - 400px)" }}
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
              ></pre>
            )}
          </>
        )}
      </div>
      {error.errors.length > 0 && (
        <div className="json-container p-4 border border-warning rounded">
          {error.errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
}
