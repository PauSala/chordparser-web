# Web demo for the chordparser crate

## Commands

- run dev: `npm run dev`
- build wasm: `wasm-pack build --target web`

## Note

- In order to vercel's build to not complain about not finding the pkg wasm package it is copied to the app folder.
- It should be a way to setup all af this propperly but I don't want to lead with this now.
- So, to develop locally, add this to deps in package.json: `"chord_parser_demo": "file:../pkg",` and fix the import in `Parser.tsx`.
- Before deploying, if there are any changes in the wasm package, copy the pkg in the /App folder and fix again the import.
