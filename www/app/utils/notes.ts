export const normalizeNotes = (notes: string[]) => {

    if (notes.length === 0){
      return notes;
    }

    const normalize_alt = notes.map( n =>  n.replace("𝄫", "bb").replace("𝄪", "##"));
    const no_alts = notes.map( n =>  n.replace("𝄫", "").replace("𝄪", "").replace("#", "").replace("b", ""));
    const octaves = getOctaves(no_alts);

    return notes.map((n, i) => `${normalize_alt[i]}/${octaves[i]}`)
}

const getOctaves = (notes: string[]) => {
    
    const noteOrder = ["C", "D", "E", "F", "G", "A", "B"];
    let currentOctave = noteOrder.indexOf(notes[0]) >  3 ? 3 : 4;
    let previousNoteIndex = noteOrder.indexOf(notes[0][0]);

    return notes.map((note, i) => {
        const noteName = note[0];
        const noteIndex = noteOrder.indexOf(noteName);
    
        if (i > 0 && noteIndex <= previousNoteIndex) {
          currentOctave++;
        }
        
        previousNoteIndex = noteIndex; 
    
        return currentOctave;
      });

}