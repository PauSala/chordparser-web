export const normalizeNotes = (nts: { literal: string, modifier: string }[]): string[] => {
  if (nts.length === 0) {
    return [];
  }

  const notes = nts.map(n => `${n.literal}${n.modifier || ""}`);
  const normalize_alt = notes.map(n => n.replace("𝄫", "bb").replace("𝄪", "##"));
  const no_alts = notes.map(n => n.replace("𝄫", "").replace("𝄪", "").replace("#", "").replace("b", ""));
  const octaves = getOctaves(no_alts);

  return notes.map((n, i) => `${normalize_alt[i]}/${octaves[i]}`)
}

const getOctaves = (notes: string[]) => {

  const noteOrder = ["C", "D", "E", "F", "G", "A", "B"];
  const baseOcave = noteOrder.indexOf(notes[0]) > 3 ? 3 : 4;
  let previousNoteIndex = noteOrder.indexOf(notes[0][0]);

  let currentOctave = baseOcave;
  return notes.map((note, i) => {
    const noteName = note[0];
    const noteIndex = noteOrder.indexOf(noteName);

    if (i > 0 && noteIndex < previousNoteIndex && currentOctave < baseOcave + 1) {
      currentOctave++;
    }

    previousNoteIndex = noteIndex;

    return currentOctave;
  });

}