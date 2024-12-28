const isIncludeChinese = (str) => {
  const reg = new RegExp("[\u4e00-\u9fa5]", "g");
  if (reg.test(str)) {
    return true;
  }
  return false;
};

const isIncludeLineFeed = (str) => {
  const reg = new RegExp("\n", "g");
  if (reg.test(str)) {
    return true;
  }
  return false;
};

function removeBarcode() {
  const _ = document.querySelector("#barcode");
  if (_) _.remove();
}

document.addEventListener("selectionchange", () => {
  // 获取用户选中的内容
  const selection = document.getSelection();
  // 获取用户选中内容中的文本
  const text = document.getSelection().toString();

  // 如果用户选中文本为空，或文本包含中文，或文本包含换行符时结束程序
  if (!text || isIncludeChinese(text) || isIncludeLineFeed(text)) {
    // 清除上次产生的条形码
    removeBarcode();
    return;
  }

  // 清除上次产生的条形码
  removeBarcode();

  const { x, y } = selection.getRangeAt(0).getBoundingClientRect();

  const element = document.createElement("canvas");
  element.id = "barcode";
  element.style.cssText = `position: absolute; top: ${y + 25}px; left: ${x}px; z-index: 99999; user-select: none;`;
  document.body.appendChild(element);

  JsBarcode("#barcode", text, {
    height: 40,
    font: "Consolas"
  });
  if (element.offsetLeft <= 0) {
    element.style.left = 20 + "px";
  } else if (element.offsetLeft + element.clientWidth > window.innerWidth) {
    element.style.left = window.innerWidth - element.offsetWidth + "px";
  } else {
    element.style.left = element.offsetLeft - element.offsetWidth / 2.4 + "px";
  }
});
