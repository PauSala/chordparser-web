import { FaGithub } from "react-icons/fa";
import { GiSadCrab } from "react-icons/gi";
import { FaRust } from "react-icons/fa";

// gradient-text: font-bold bg-gradient-to-r from-warning to-success inline-block text-transparent bg-clip-text

export function Header() {
  return (
    <div className="p-3 bg-header flex items-center justify-between sticky top-0 z-50 border-b border-t border-dashed">
      <div className="font-righteous flex items-center gap-2 ml-4">
        <GiSadCrab className="text-warning w-7 h-7" />
        <h1 className="text-lg text-success ">ChordParser</h1>
      </div>
      <div className="flex">
        <div
          className="mr-4  cursor-pointer text-success opacity-80 hover:opacity-100 transition-opacity duration-300"
          title="github"
        >
          <a
            className="text-sm flex flex-row items-center gap-1"
            href="https://github.com/PauSala/chordparser"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-7 h-7" />
            github
          </a>
        </div>
        <div
          className="mr-4  cursor-pointer text-warning opacity-80 hover:opacity-100 transition-opacity duration-300"
          title="crates.io"
        >
          <a
            className="text-sm  flex flex-row items-center gap-1"
            href="https://crates.io/crates/chordparser"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaRust className="w-7 h-7" />
            crates.io
          </a>
        </div>
      </div>
    </div>
  );
}
