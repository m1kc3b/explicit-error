use js_sys::Function;
use wasm_bindgen::JsValue;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct OptionJs {
    value: Option<JsValue>,
}
#[wasm_bindgen]
impl OptionJs {
    #[wasm_bindgen(constructor)]
    pub fn new(value: JsValue) -> Self {
        let value = if value.is_null() || value.is_undefined() {
          None
        } else {
          Some(value)
        };

        Self { value }
    }

    // Returns true if the option is a Some value.
    #[wasm_bindgen]
    pub fn is_some(&self) -> bool {
        self.value.is_some()
    }

    // Returns true if the option is a Some and the value inside of it matches a predicate.
    #[wasm_bindgen]
    pub fn is_some_and(&self, f: Function) -> bool {
        if let Some(value) = &self.value {
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

    // Returns true if the option is a None value.
    #[wasm_bindgen]
    pub fn is_none(&self) -> bool {
        self.value.is_none()
    }

    // Returns true if the option is a None or the value inside of it matches a predicate.
    #[wasm_bindgen]
    pub fn is_none_or(&self, f: Function) -> bool {
        if let Some(value) = &self.value {
            let result = f.call1(&JsValue::NULL, &value);
            if let Ok(js_value) = result {
                return !js_value.as_bool().unwrap();
            } else {
                false
            }
        } else {
            true
        }
    }

    // Returns the contained Some value or a provided default.
    #[wasm_bindgen]
    pub fn unwrap_or(&self, default: JsValue) -> JsValue {
        self.value.clone().unwrap_or(default)
    }

    // Returns the contained Some value or computes it from a closure.
    #[wasm_bindgen]
    pub fn unwrap_or_else(&self, f: Function) -> JsValue {
        if let Some(value) = &self.value {
            value.clone()
        } else {
            f.call0(&JsValue::NULL)
                .expect("Callback function should not fail!")
        }
    }

    // Returns the contained Some value or a default.
    #[wasm_bindgen]
    pub fn unwrap_or_default(&self) -> JsValue {
        self.value.clone().unwrap_or_else(|| JsValue::NULL)
    }

    // Maps an Option<T> to Option<U> by applying a function to a contained value (if Some) or returns None (if None).
    #[wasm_bindgen]
    pub fn map(&self, f: Function) -> OptionJs {
        if let Some(value) = &self.value {
            let result = f.call1(&JsValue::NULL, &value);
            if let Ok(js_value) = result {
                return OptionJs::new(js_value);
            }
        }
        OptionJs::new(JsValue::NULL)
    }
}
