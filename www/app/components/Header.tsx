import { FaGithub } from "react-icons/fa";
import { GiSadCrab } from "react-icons/gi";

// gradient-text: font-bold bg-gradient-to-r from-warning to-success inline-block text-transparent bg-clip-text

export function Header() {
  return (
    <div className="p-3 bg-header font-righteous flex items-center justify-between sticky top-0 z-50 border-b border-t border-dashed">
      <div className="flex items-center gap-2 ml-4">
        <GiSadCrab className="text-warning w-7 h-7" />
        <h1 className="text-xl text-success ">ChordParser</h1>
      </div>
      <div
        className="mr-4  cursor-pointer text-primary hover:text-secondary transition-colors duration-300"
        title="github"
      >
        <a
          href="https://github.com/PauSala/chordparser"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}
