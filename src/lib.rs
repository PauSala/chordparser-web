mod utils;

use serde::Serialize;
use std::sync::RwLock;
// use web_sys::console;

use chordparser::{chord::Chord, parsing::Parser, voicings::generate_voicing};
use lazy_static::lazy_static;
use serde_wasm_bindgen::to_value;
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
struct ErrorObject {
    errors: Vec<String>,
    positions: Vec<usize>,
}

#[derive(Serialize)]
struct ReturnType {
    chord: Chord,
    voicing: Vec<u8>,
}

#[wasm_bindgen(start)]
pub fn main() {
    utils::set_panic_hook();
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

// This is not working, the parser state is corrupted between calls
lazy_static! {
    static ref PARSER: RwLock<Parser> = RwLock::new(Parser::new());
}

#[wasm_bindgen]
pub fn parse(input: &str) -> JsValue {
    // console::log_1(&JsValue::from_str(input));
    let mut parser = Parser::new();

    match parser.parse(input) {
        Ok(chord) => {
            let v = generate_voicing(&chord, None);
            return to_value(&ReturnType { chord, voicing: v }).unwrap();
        }
        Err(e) => {
            let mut errors = vec![];
            let mut positions = vec![];
            for e in e.errors {
                errors.push(e.verbose_display(input));
                positions.push(e.error_position().unwrap_or(usize::MAX));
            }
            let error_object = ErrorObject { errors, positions };
            to_value(&error_object).unwrap()
        }
    }
}
