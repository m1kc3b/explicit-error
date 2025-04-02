use js_sys::Function;
use wasm_bindgen::JsValue;
use wasm_bindgen::prelude::*;

use crate::option::OptionJs;

#[wasm_bindgen]
pub struct ResultJs {
  value: Result<JsValue, JsValue>,
}

#[wasm_bindgen]
impl ResultJs {
    #[wasm_bindgen(constructor)]
    pub fn new(value: JsValue) -> Self {
        let value = if value.is_null() || value.is_undefined() {
            Err(JsValue::NULL)
        } else {
            Ok(value)
        };

        Self { value }
    }

    // Returns true if the result is Ok.
    #[wasm_bindgen]
    pub fn is_ok(&self) -> bool {
      self.value.is_ok()
    }

    // Returns true if the result is Ok and the value inside of it matches a predicate.
    #[wasm_bindgen]
    pub fn is_ok_and(&self, f: Function) -> bool {
        if let Ok(value) = &self.value {
            let result = f.call1(&JsValue::NULL, &value);
            if let Ok(js_value) = result {
                return js_value.as_bool().unwrap();
            } else {
                false
            }
        } else {
            false
        }
    }

    // Returns true if the result is Err.
    #[wasm_bindgen]
    pub fn is_err(&self) -> bool {
      self.value.is_err()
    }

    // Returns true if the result is Err and the value inside of it matches a predicate.
    #[wasm_bindgen]
    pub fn is_err_and(&self, f: Function) -> bool {
        if let Err(value) = &self.value {
            let result = f.call1(&JsValue::NULL, &value);
            if let Ok(js_value) = result {
                return js_value.as_bool().unwrap();
            } else {
                false
            }
        } else {
            false
        }
    }

    // Converts from Result<T, E> to Option<T>.
    #[wasm_bindgen]
    pub fn ok(self) -> OptionJs {
        match self.value {
            Ok(value) => OptionJs::new(value),
            Err(_) => OptionJs::new(JsValue::NULL),
        }
    }

    // Converts from Result<T, E> to Option<E>.
    #[wasm_bindgen]
    pub fn err(self) -> OptionJs {
        match self.value {
            Ok(_) => OptionJs::new(JsValue::NULL),
            Err(value) => OptionJs::new(value),
        }
    }

    // Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.
    #[wasm_bindgen]
    pub fn map_ok(&self, f: Function) -> ResultJs {
        match &self.value {
            Ok(value) => {
                let result = f.call1(&JsValue::NULL, &value);
                if let Ok(js_value) = result {
                    ResultJs::new(js_value)
                } else {
                    ResultJs::new(JsValue::NULL)
                }
            }
            Err(_) => ResultJs::new(JsValue::NULL),
        }
    }

    // Returns the provided default (if Err), or applies a function to the contained value (if Ok).
    #[wasm_bindgen]
    pub fn map_err(&self, f: Function) -> ResultJs {
        match &self.value {
            Ok(_) => ResultJs::new(JsValue::NULL),
            Err(value) => {
                let result = f.call1(&JsValue::NULL, &value);
                if let Ok(js_value) = result {
                    ResultJs::new(js_value)
                } else {
                    ResultJs::new(JsValue::NULL)
                }
            }
        }
    }

    // Maps a Result<T, E> to U by applying fallback function default to a contained Err value, or function f to a contained Ok value.
    #[wasm_bindgen]
    pub fn map_or(&self, default: JsValue, f: Function) -> JsValue {
        match &self.value {
            Ok(value) => {
                let result = f.call1(&JsValue::NULL, &value);
                if let Ok(js_value) = result {
                    js_value
                } else {
                    JsValue::NULL
                }
            }
            Err(_) => default,
        }
    }

    // Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.
    #[wasm_bindgen]
    pub fn map_err_or(&self, f: Function, default: JsValue) -> ResultJs {
        match &self.value {
            Ok(_) => ResultJs::new(JsValue::NULL),
            Err(value) => {
                let result = f.call1(&JsValue::NULL, &value);
                if let Ok(js_value) = result {
                    ResultJs::new(js_value)
                } else {
                    ResultJs::new(default)
                }
            }
        }
    }
}