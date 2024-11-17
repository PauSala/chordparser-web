import * as Tone from 'tone';

const midiToFrequency = (midi: number) => {
    return Tone.Frequency(midi, "midi").toFrequency();
};

export const playChord = (midiCodes: number[]) => {

    const gain = new Tone.Gain(0.3).toDestination(); // Lowered the gain for a softer sound

    const reverb = new Tone.Reverb({
        decay: 1.9,         
        wet: 0.8            
    }).toDestination();

    // PolySynth with Tone.Synth for a warmer sound
    const synth = new Tone.PolySynth(Tone.AMSynth, {
        oscillator: {
            type: 'fatsine3'
        },
        envelope: {
            attack: 0.01,   
            decay: 0.3,      
            sustain: 0.2,    
            release: 1.1    
        }
    }).connect(gain).connect(reverb); 

    const synth2 = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
            type: 'fattriangle20'
        },
        envelope: {
            attack: 0.01,   
            decay: 0.3,      
            sustain: 0.2,    
            release: 1.1    
        }
    }).connect(gain);

    const now = Tone.now();
    const frequencies = midiCodes.map(midiToFrequency);

    synth.triggerAttackRelease(frequencies, 0.7, now);
    synth2.triggerAttackRelease(frequencies, 0.7, now);
};