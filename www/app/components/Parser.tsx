"use client";

import {
  InitInput,
  InitOutput,
  parse as ParseType,
} from "../pkg/chord_parser_demo";
import { useCallback, useEffect, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";
import { Renderer } from "./Renderer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { formatErrors } from "../utils/formatErrors";

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

export interface ParserError {
  errors: string[];
  positions: number[];
}

const defaultParserError: ParserError = {
  errors: [],
  positions: [],
};

interface ParsedChord {
  notes: { literal: string; modifier: string }[];
  normalized: string;
}

export default function Parser() {
  const [parsedHtml, setParsedHtml] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedChord | null>(null);
  const [voicing, setVoicing] = useState<number[]>([]);
  const [error, setError] = useState<ParserError>(defaultParserError);
  const [errorMsg, setErrorMsg] = useState<string>("");
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
          setVoicing([]);
          setError(res);
          setErrorMsg(formatErrors(res, input));
          return;
        }
        setError(defaultParserError);
        setParsed(res.chord);
        setVoicing(res.voicing);
        const html = prettyPrintJson.toHtml(res);
        setParsedHtml(html);
      }
    },
    [isWasmInitialized]
  );

  useEffect(() => {
    async function loadWasm() {
      const {
        default: init,
        parse,
        main,
      } = await import("../pkg/chord_parser_demo");

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
    <div className="flex flex-col justify-center mt-4 p-2 gap-3 w-full ">
      <div className="flex gap-1 justify-center">
        <input
          className="text-gray-900 bg-slate-100 p-2 w-full text-center rounded border-none focus:outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </div>

      <Renderer
        chord={parsed?.notes || []}
        label={parsed?.normalized || ""}
        voicing={voicing}
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
                className="json-container p-4 text-xs border border-primary rounded mt-2 mb-4 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
              ></pre>
            )}
          </>
        )}
      </div>
      {error.errors.length > 0 && (
        <div className="flex justify-center json-container p-4 mt-[-1em] border border-warning rounded overflow-x-auto">
          <div className="">
            <pre className="spaced-text text-primary">{inputValue}</pre>
            <pre className="spaced-text mt-[-22px] text-error">{errorMsg}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
