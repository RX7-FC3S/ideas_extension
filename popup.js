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

const handleAutoFillWorkerSettings = () => {
  const inputWorkerId = document.getElementById("input-worker_id");

  // 监听单选框的变化事件
  inputWorkerId.addEventListener("change", (event) => {
    // 存储当前选择的“显示条形码”的状态
    chrome.storage.local.set({ worderId: event.target.value }, () => {});
  });

  // 读取存储的“显示条形码”的状态
  chrome.storage.local.get(["worderId"], (result) => {
    inputWorkerId.value = result.worderId ?? null;
  });
};

const handleAutoFillPkgUnitSpecSettings = () => {
  const inputLength = document.getElementById("input-length");
  const inputWidth = document.getElementById("input-width");
  const inputHeight = document.getElementById("input-height");
  const inputInnerQty = document.getElementById("input-inner_qty");

  // 监听输入框的变化事件
  inputLength.addEventListener("change", (event) => {
    chrome.storage.local.set({ pkgLength: event.target.value }, () => {});
  });
  inputWidth.addEventListener("change", (event) => {
    chrome.storage.local.set({ pkgWidth: event.target.value }, () => {});
  });
  inputHeight.addEventListener("change", (event) => {
    chrome.storage.local.set({ pkgHeight: event.target.value }, () => {});
  });
  inputInnerQty.addEventListener("change", (event) => {
    chrome.storage.local.set({ pkgInnerQty: event.target.value }, () => {});
  });

  // 读取存储的包装规格的长度、宽度、高度
  chrome.storage.local.get(["pkgLength", "pkgWidth", "pkgHeight", "pkgInnerQty"], (result) => {
    inputLength.value = result.pkgLength ?? null;
    inputWidth.value = result.pkgWidth ?? null;
    inputHeight.value = result.pkgHeight ?? null;
    inputInnerQty.value = result.pkgInnerQty ?? null;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // 处理“1. 为选中字符生成条形码”的设置
  handleShowBarcodeSettings();
  // 处理“4. 自动分割粘贴文本”的设置
  handleSplitStringSettings();
  // 处理“6. 自动填写工号”的设置
  handleAutoFillWorkerSettings();
  // 处理“7. 自动填写包装规格”的设置
  handleAutoFillPkgUnitSpecSettings();
});
