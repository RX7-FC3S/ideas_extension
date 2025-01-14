const BLUR_EVENT = new Event("blur", { bubbles: true });
const INPUT_EVENT = new Event("input", { bubbles: true });
const CHANGE_EVENT = new Event("change", { bubbles: true });

// 用户新建发票箱单时，自动填写以下内容：
// 1. 船名：THE FIRST AVAILABLE AIRCRAFT
// 2. 航次：-
const obCreateInvoiceDialog = new MutationObserver((mutations, observer) => {
  mutations.forEach(async (mutation) => {
    mutation.addedNodes.forEach(async (node) => {
      const vesselInput = document.getElementById("omsOutboundOrder.invoicePackNo.vesselName");
      const voyageInput = document.getElementById("omsOutboundOrder.invoicePackNo.voyage");

      if (vesselInput && vesselInput.value === "") {
        vesselInput.value = "THE FIRST AVAILABLE AIRCRAFT";
        vesselInput.dispatchEvent(INPUT_EVENT);
      }

      if (voyageInput && voyageInput.value === "") {
        voyageInput.value = "-";
        voyageInput.dispatchEvent(INPUT_EVENT);
      }
    });
  });
});

// 用户进行作业确认时，自动填写账号获取操作人
// 所填写的账号可在 Popup 页面进行配置
const obWorkerIdInput = new MutationObserver((mutations, observer) => {
  mutations.forEach(async (mutation) => {
    mutation.addedNodes.forEach(async (node) => {
      const workerIdInput = node.querySelector?.("#workerId");

      if (!workerIdInput) return;

      await sleep(100);

      chrome.storage.local.get(["worderId"], (result) => {
        workerIdInput.value = result.worderId || null;
        workerIdInput.dispatchEvent(INPUT_EVENT);
        workerIdInput.dispatchEvent(BLUR_EVENT);
      });
    });
  });
});

// 用户编辑货品包装单位时，自动填写包裹长度、宽度、高度
// 自动取消勾选所有选择框
const obEditPkgUnitDialog = new MutationObserver((mutations, observer) => {
  mutations.forEach(async (mutation) => {
    mutation.addedNodes.forEach(async (node) => {
      const editPkgUnitDialog = node.querySelector?.(".editPackageUnitPage");

      if (!editPkgUnitDialog) return;

      await sleep(100);

      const checkboxes = editPkgUnitDialog.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.dispatchEvent(CHANGE_EVENT);
      });

      const lengthInput = document.getElementById("packageUnit.length");
      const widthInput = document.getElementById("packageUnit.width");
      const heightInput = document.getElementById("packageUnit.height");
      const innerQtyInput = document.getElementById("packageUnit.convertFigure");

      chrome.storage.local.get(["pkgLength", "pkgWidth", "pkgHeight", "pkgInnerQty"], (result) => {
        if (lengthInput && lengthInput.value === "0") {
          lengthInput.value = result.pkgLength || null;
          lengthInput.dispatchEvent(INPUT_EVENT);
          lengthInput.dispatchEvent(BLUR_EVENT);
        }

        if (widthInput && widthInput.value === "0") {
          widthInput.value = result.pkgWidth || null;
          widthInput.dispatchEvent(INPUT_EVENT);
          widthInput.dispatchEvent(BLUR_EVENT);
        }

        if (heightInput && heightInput.value === "0") {
          heightInput.value = result.pkgHeight || null;
          heightInput.dispatchEvent(INPUT_EVENT);
          heightInput.dispatchEvent(BLUR_EVENT);
        }

        if (innerQtyInput && innerQtyInput.value === "1") {
          innerQtyInput.value = result.pkgInnerQty || null;
          innerQtyInput.dispatchEvent(INPUT_EVENT);
          innerQtyInput.dispatchEvent(BLUR_EVENT);
        }
      });
    });
  });
});

obCreateInvoiceDialog.observe(document.body, { childList: true });
obWorkerIdInput.observe(document.body, { childList: true, subtree: true });
obEditPkgUnitDialog.observe(document.body, { childList: true, subtree: true });
