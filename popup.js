const manifest = chrome.runtime.getManifest();

document.getElementById("title").innerText = manifest.name;
document.getElementById("version").innerText = `version: ${manifest.version}`;

document.addEventListener("DOMContentLoaded", () => {
  const formSplitString = document.getElementById("form-split_string");

  // 监听单选框的变化事件
  formSplitString.addEventListener("change", (event) => {
    const target = event.target;

    // 检查是否是单选框触发的事件
    if (target.name === "split-char" && target.type === "radio") {
      const selectedValue = target.value; // 获取选中的单选框值

      // 保存到 chrome.storage.local (可选)
      chrome.storage.local.set({ splitCharIndex: selectedValue }, () => {});
    }
  });

  // 从 chrome.storage.local 读取默认值并设置为选中状态 (可选)
  chrome.storage.local.get(["splitCharIndex"], (result) => {
    const savedValue = result.splitCharIndex || 0;

    const radios = formSplitString.querySelectorAll("input[name='split-char']");

    radios.forEach((radio) => {
      if (radio.value === savedValue) {
        radio.checked = true;
      }
    });
  });
});
