const splitCharMapping = {
  1: " +",
  2: "\n",
  3: "\t",
};

document.addEventListener("paste", (event) => {
  // 阻止默认的粘贴行为
  event.preventDefault();

  // 获取粘贴板中的文本
  const clipboardData = event.clipboardData.getData("text");

  chrome.storage.local.get("splitCharIndex", (result) => {
    const splitCharIndex = result.splitCharIndex;

    const splitChar = splitCharIndex ? splitCharMapping[splitCharIndex] : null;

    let modifiedData;

    // 修改粘贴内容
    if (splitCharIndex === "0" || splitChar === null) {
      modifiedData = clipboardData;
    } else {
      modifiedData = clipboardData
        .split(new RegExp(splitChar))
        .filter((chunk) => chunk.trim()) // 分割后过滤掉空字符块
        .map((chunk, index) => (index === 0 ? chunk : `,${chunk}`)) // 第一块前面不需要加逗号
        .join("");
    }

    // 如果是输入框或可编辑区域，将修改后的内容插入
    const activeElement = document.activeElement;

    if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT")) {
      activeElement.value = modifiedData;
      activeElement.dispatchEvent(INPUT_EVENT);
    }
  });
});
