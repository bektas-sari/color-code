(function () {
    if (window.colorPickerActivated) return;
    window.colorPickerActivated = true;
  
    let tooltip = document.createElement("div");
    tooltip.style.position = "fixed";
    tooltip.style.padding = "5px 8px";
    tooltip.style.background = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.fontFamily = "monospace";
    tooltip.style.fontSize = "14px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.zIndex = "9999";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);
  
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d", { willReadFrequently: true });
  
    async function captureScreen() {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "captureScreen" }, (dataUrl) => {
          let img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve();
          };
          img.src = dataUrl;
        });
      });
    }
  
    async function updateColor(e) {
      if (!canvas.width || !canvas.height) return;
      let x = e.clientX;
      let y = e.clientY;
      let pixel = ctx.getImageData(x, y, 1, 1).data;
      let hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
  
      if (hexColor !== "#000000") {
        tooltip.textContent = hexColor;
        tooltip.style.left = `${x + 15}px`;
        tooltip.style.top = `${y + 15}px`;
        tooltip.style.display = "block";
        tooltip.style.background = hexColor;
        tooltip.style.color = getContrastColor(hexColor);
      }
    }
  
    async function pickColor(e) {
      await captureScreen();
      updateColor(e);
    }
  
    async function copyColor(e) {
      let x = e.clientX;
      let y = e.clientY;
      let pixel = ctx.getImageData(x, y, 1, 1).data;
      let hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
  
      if (hexColor !== "#000000") {
        await navigator.clipboard.writeText(hexColor);
        tooltip.textContent = `${hexColor} ✅`;
        setTimeout(() => tooltip.style.display = "none", 1000);
      }
    }
  
    function cleanup() {
      document.removeEventListener("mousemove", updateColor);
      document.removeEventListener("click", copyColor);
      document.removeEventListener("keydown", handleKeyDown);
      tooltip.remove();
      window.colorPickerActivated = false;
    }
  
    function handleKeyDown(e) {
      if (e.key === "Escape") cleanup();
    }
  
    function rgbToHex(r, g, b) {
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    }
  
    function getContrastColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? "#000" : "#fff";
    }
  
    alert("İstediğin renge git, tıklayınca otomatik kopyalanır. (Çıkmak için ESC)");
  
    document.addEventListener("mousemove", updateColor);
    document.addEventListener("click", copyColor);
    document.addEventListener("keydown", handleKeyDown);
    captureScreen();
  })();
  