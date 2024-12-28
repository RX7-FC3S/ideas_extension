const manifest = chrome.runtime.getManifest();

document.getElementById("title").innerText = manifest.name;
document.getElementById("version").innerText = `version: ${manifest.version}`;

const handleShowBarcodeSettings = () => {
  const checkboxShowBarcode = document.getElementById("checkbox-show_barcode");

  // 监听单选框的变化事件
  checkboxShowBarcode.addEventListener("change", (event) => {
    // 存储当前选择的“显示条形码”的状态
    chrome.storage.local.set({ showBarcode: event.target.checked }, () => {});
  });

  // 读取存储的“显示条形码”的状态
  chrome.storage.local.get(["showBarcode"], (result) => {
    checkboxShowBarcode.checked = result.showBarcode;
  });
};

const handleSplitStringSettings = () => {
  const formSplitString = document.getElementById("form-split_string");

  // 监听单选框的变化事件
  formSplitString.addEventListener("change", (event) => {
    if (event.target.name === "split-char" && event.target.type === "radio") {
      // 存储当前选择的分隔符的索引值
      chrome.storage.local.set({ splitCharIndex: event.target.value }, () => {});
    }
  });

  // 读取存储的分隔符的索引值
  chrome.storage.local.get(["splitCharIndex"], (result) => {
    const radios = formSplitString.querySelectorAll("input[name='split-char']");
    radios.forEach((radio) => {
      if (radio.value === result.splitCharIndex) {
        radio.checked = true;
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // 处理“1. 为选中字符生成条形码”的设置
  handleShowBarcodeSettings();
  // 处理“4. 自动分割粘贴文本”的设置
  handleSplitStringSettings();
});
