const BLUR_EVENT = new Event("blur", { bubbles: true });
const INPUT_EVENT = new Event("input", { bubbles: true });

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

obCreateInvoiceDialog.observe(document.body, { childList: true });

const obWorkerIdInput = new MutationObserver((mutations, observer) => {
  mutations.forEach(async (mutation) => {
    mutation.addedNodes.forEach(async (node) => {
      try {
        const workerIdInput = node?.querySelector("#workerId");
        if (workerIdInput) {
          setTimeout(() => {
            chrome.storage.local.get(["worderId"], (result) => {
              workerIdInput.value = result.worderId || null;
              workerIdInput.dispatchEvent(INPUT_EVENT);
              workerIdInput.dispatchEvent(BLUR_EVENT);
            });
          }, 500);
        }
      } catch (error) {
        // ignore
      }
    });
  });
});

obCreateInvoiceDialog.observe(document.body, { childList: true });
obWorkerIdInput.observe(document.body, { childList: true, subtree: true });
