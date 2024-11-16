import * as Tone from 'tone';

const midiToFrequency = (midi: number) => {
    return Tone.Frequency(midi, "midi").toFrequency();
};

export const playChord = (midiCodes: number[]) => {
    // Create a gain node to control the volume
    const gain = new Tone.Gain(0.9).toDestination(); // Adjust the gain value to lower the volume

    // Create a PolySynth with adjusted parameters for a smoother sound
    const synth = new Tone.PolySynth(Tone.AMSynth, {
        harmonicity: 3.01,
        // modulationIndex: 11,

    }).connect(gain); // Connect the synth to the gain node

    const now = Tone.now();
    const frequencies = midiCodes.map(midiToFrequency);
    synth.triggerAttackRelease(frequencies, 1, now);
};