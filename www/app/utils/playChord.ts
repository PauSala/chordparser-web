'use client';

import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

const midiToFrequency = (midi: number) => {
    return Tone.Frequency(midi, "midi").toFrequency();
};

export const useTone = () => {
    const synthRef = useRef<Tone.PolySynth | null>(null);
    const synth2Ref = useRef<Tone.PolySynth | null>(null);
    const gainRef = useRef<Tone.Gain | null>(null);
    const reverbRef = useRef<Tone.Reverb | null>(null);
    const toneStartedRef = useRef(false);

    useEffect(() => {
        const synth = new Tone.PolySynth(Tone.AMSynth, {
            oscillator: {
                type: 'fatsine3'
            },
            envelope: {
                attack: 0.01,
                decay: 0.4,
                sustain: 0.3,
                release: 0.2
            }
        });

        const synth2 = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: 'fatsine9'
            },
            envelope: {
                attack: 0.01,
                decay: 0.4,
                sustain: 0.3,
                release: 0.2
            }
        });
        const reverb = new Tone.Reverb({
            decay: 1.9,
            wet: 0.8
        }).toDestination();

        const gain = new Tone.Gain(0.5).connect(reverb);

        synth2.connect(gain)
        synth.connect(gain)

        synthRef.current = synth;
        synth2Ref.current = synth2;
        gainRef.current = gain;
        reverbRef.current = reverb;
    }, []);

    const playChord = async (midiCodes: number[]) => {
        if (!toneStartedRef.current) {
            await Tone.start();
            toneStartedRef.current = true;
        }

        const now = Tone.now();
        const frequencies = midiCodes.map(midiToFrequency);

        synthRef.current?.triggerAttackRelease(frequencies, 0.7, now);
        synth2Ref.current?.triggerAttackRelease(frequencies, 0.7, now);
    };

    return { playChord };
};
