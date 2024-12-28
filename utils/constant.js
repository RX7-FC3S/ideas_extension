const BLUR_EVENT = new Event("blur", { bubbles: true });

const INPUT_EVENT = new Event("input", { bubbles: true });

const FOCUS_EVENT = new Event("focus", { bubbles: true });

const ENTER_EVENT = new KeyboardEvent("keydown", { keyCode: 13, code: "Enter", key: "Enter", bubbles: true, cancelable: true });
