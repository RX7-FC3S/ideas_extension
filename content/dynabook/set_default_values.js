const INPUT_EVENT = new Event("input", { bubbles: true });

const obCreateInvoiceDialog = new MutationObserver((mutations, observer) => {
  mutations.forEach(async (mutation) => {
    mutation.addedNodes.forEach(async (node) => {
      const isDialog = node.classList.contains("el-dialog__wrapper") && node.hasChildNodes();
      const isCreateInvoiceDialog = isDialog && node.firstChild.classList.contains("modifyAddInvoicePackNoPage");
      if (isCreateInvoiceDialog) {
        await sleep(1000); // 等待弹窗加载完成

        const vesselInput = document.getElementById("omsOutboundOrder.invoicePackNo.vesselName");
        const voyageInput = document.getElementById("omsOutboundOrder.invoicePackNo.voyage");
        const requestedShipDate = document.getElementById("invoicePackNo.requestedShipDate");

        if (vesselInput && vesselInput.value === "") {
          vesselInput.value = "THE FIRST AVAILABLE AIRCRAFT";
          vesselInput.dispatchEvent(INPUT_EVENT);
        }

        if (voyageInput && voyageInput.value === "") {
          voyageInput.value = "-";
          voyageInput.dispatchEvent(INPUT_EVENT);
        }

        // if (requestedShipDate) {
        //   requestedShipDate.value = getFutureDate(1, "yyyy/MM/dd");
        //   requestedShipDate.dispatchEvent(ENTER_EVENT);
        // }
      }
    });
  });
});

obCreateInvoiceDialog.observe(document.body, { childList: true });
