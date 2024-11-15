"use client";

import React, { useRef, useEffect } from "react";
import Vex, { Accidental, Barline, BarlineType } from "vexflow";
import { normalizeNotes } from "../utils/notes";
import { FaHeartBroken } from "react-icons/fa";

const Renderer = ({ chord, label }: { chord: string[]; label: string }) => {
  const isVoid = chord.length === 0;
  const vexContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const VF = Vex.Flow;

    // Clear the container before re-rendering
    if (vexContainerRef.current) {
      vexContainerRef.current.innerHTML = "";
    }

    // Initialize the renderer
    if (vexContainerRef.current) {
      const renderer = new VF.Renderer(
        vexContainerRef.current,
        VF.Renderer.Backends.SVG
      );
      renderer.resize(210, 125);
      const context = renderer.getContext();

      context.setFillStyle("#c6d0f5");
      context.setStrokeStyle("#c6d0f5");

      // Map the notes to VexFlow StaveNote objects
      const staveNotes = [chord].map(normalizeNotes).map((notes: string[]) => {
        const chord = new VF.StaveNote({
          clef: "treble",
          keys: notes,
          duration: "w",
          // align_center: true,
        });
        notes.forEach((n, i) => {
          if (n.indexOf("##") >= 0) {
            chord.addModifier(new Accidental("##"), i);
          } else if (n.indexOf("bb") >= 0) {
            chord.addModifier(new Accidental("bb"), i);
          } else if (n.indexOf("#") >= 0) {
            chord.addModifier(new Accidental("#"), i);
          } else if (n.indexOf("b") >= 0) {
            chord.addModifier(new Accidental("b"), i);
          }
        });
        return chord;
      });

      const voice = new VF.Voice({
        num_beats: 4,
        beat_value: 4,
      });

      // Create a stave at position x=10, y=40, with a width of 400 pixels
      const stave = new VF.Stave(10, 0, 210, { left_bar: true });

      // Add a double barline at the end of the stave
      if (chord.length > 0) {
        voice.addTickables(staveNotes);
        // Format and justify the notes to the stave width, then draw
        new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
      }

      stave.addClef("treble");
      stave.addTimeSignature("4/4", 0);
      stave.addEndModifier(new Barline(BarlineType.DOUBLE));

      voice.draw(context, stave);
      stave.setContext(context).draw();
    }
  }); // re-run effect if `notes` prop changes

  return (
    <div
      className={` ${
        isVoid ? "border-warning" : "border-success"
      } bg-ibackground border border-success rounded min-w-fit sm:min-w-64  p-2 flex flex-col sm:flex-row flex  md:gap-2 lg:gap-5 justify-center items-center`}
    >
      {(!isVoid && <p className="text-2xl text-success">{label}</p>) || (
        <div className="flex items-center gap-2 m-2">
          <FaHeartBroken className="w-5 h-5" />
          <p>This does not look like a valid chord.</p>
        </div>
      )}
      <div className="" ref={vexContainerRef}></div>
    </div>
  );
};

export default Renderer;
