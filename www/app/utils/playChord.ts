'use client';

import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export const useTone = () => {
    const synthRef = useRef<Tone.PolySynth | null>(null);
    const filterRef = useRef<Tone.Filter | null>(null);

    useEffect(() => {
        const filter = new Tone.Filter({
            frequency: 1500,
            type: "lowpass",
            rolloff: -24
        }).toDestination();

        const reverb = new Tone.Reverb({
            decay: 2.5,
            preDelay: 0.01,
            wet: 0.3
        }).connect(filter);

        const synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "fatsine4",
                spread: 15,
            },
            envelope: {
                attack: 0.05,
                decay: 0.3,
                sustain: 0.4,
                release: 1.2,
            },
            volume: -12,
        }).connect(reverb);


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
        if (Tone.getContext().state !== 'running') {
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