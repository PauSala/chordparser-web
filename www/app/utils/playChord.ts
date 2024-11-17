import * as Tone from 'tone';

const midiToFrequency = (midi: number) => {
    return Tone.Frequency(midi, "midi").toFrequency();
};


export const playChord = async (midiCodes: number[]) => {

    await Tone.start();

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
    });
    
    
    const synth2 = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
            type: 'fattriangle3'
        },
        envelope: {
            attack: 0.01,   
            decay: 0.3,      
            sustain: 0.2,    
            release: 1.1    
        }
    });
    
    const gain = new Tone.Gain(0.3).toDestination(); // Lowered the gain for a softer sound
    
    const reverb = new Tone.Reverb({
        decay: 1.9,         
        wet: 0.8            
    }).toDestination();


    synth.connect(gain).connect(reverb); 
    synth2.connect(gain);

    const now = Tone.now();
    const frequencies = midiCodes.map(midiToFrequency);

    synth.triggerAttackRelease(frequencies, 0.7, now);
    synth2.triggerAttackRelease(frequencies, 0.7, now);
    setTimeout(() => {
        synth.releaseAll();
        synth2.releaseAll();
    }, 1500);
};