'use client';

import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export const useTone = () => {
    const synthRef = useRef<Tone.PolySynth | null>(null);
    const filterRef = useRef<Tone.Filter | null>(null);

    useEffect(() => {
        // 1. Create a Low Pass Filter to remove the "noise/hiss"
        const filter = new Tone.Filter({
            frequency: 1500, // Cuts off the harsh highs
            type: "lowpass",
            rolloff: -24
        }).toDestination();

        // 2. Add a softer reverb (lower 'wet' value)
        const reverb = new Tone.Reverb({
            decay: 2.5,
            preDelay: 0.01,
            wet: 0.3 // Much cleaner
        }).connect(filter);

        // 3. Single PolySynth with a warmer oscillator
        const synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "fatsine4", // Balanced thickness
                spread: 15,      // Slight detune for warmth
            },
            envelope: {
                attack: 0.05,    // Soften the "click" at the start
                decay: 0.3,
                sustain: 0.4,
                release: 1.2,    // Smooth fade out
            },
            volume: -12,         // Headroom to prevent clipping chords
        }).connect(reverb);

        // Limit maximum polyphony to prevent audio dropouts
        synth.maxPolyphony = 12;

        synthRef.current = synth;
        filterRef.current = filter;

        return () => {
            synth.dispose();
            reverb.dispose();
            filter.dispose();
        };
    }, []);

    const playChord = async (midiCodes: number[]) => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }

        const now = Tone.now();

        midiCodes.forEach((midi, index) => {
            const freq = Tone.Frequency(midi, "midi").toFrequency();
            synthRef.current?.triggerAttackRelease(freq, "2n", now + (index * 0.015));
        });
    };

    return { playChord };
};