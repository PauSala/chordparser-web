"use client";

export function Introduction() {
  return (
    <div className="bg-ibackground p-4 border border-dashed border-primary  text-sm">
      <div>
        <span>This is a playground for </span>
        <a
          href="https://crates.io/crates/chordparser"
          className="text-md text-success font-righteous opacity-90 hover:opacity-100 transition-opacity duration-300"
        >
          ChordParser
        </a>
        <span>, a library for parsing musical chords. </span>
        <span>
          It is written in the{" "}
          <a
            className="text-warning opacity-90 hover:opacity-100 transition-opacity duration-300"
            href="https://www.rust-lang.org/"
          >
            Rust
          </a>{" "}
          language and ported to the web via{" "}
          <a
            className="text-primary opacity-90 hover:opacity-100 transition-opacity duration-300"
            href="https://webassembly.org/"
          >
            WebAssembly.
          </a>{" "}
        </span>
      </div>
      <div className="mt-4">
        <p>Some of its main features are:</p>
        <ul>
          <li>- Parsing of nearly any chord.</li>
          <li>- Normalization of string inputs.</li>
          <li>
            - JSON output with enharmonically correct notes, intervals, and
            semitone values.
          </li>
          <li>- Transposition with consistent enharmonic representation.</li>
          <li>
            - Detailed error messages, including the position of any error when
            possible.
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <span> For a full list of features, refer to the </span>
        <span>
          <a
            className="text-success opacity-90 hover:opacity-100 transition-opacity duration-300"
            href="https://docs.rs/chordparser/4.0.1/chordparser/"
          >
            Documentation
          </a>
        </span>
        <span>.</span>
      </div>
    </div>
  );
}
