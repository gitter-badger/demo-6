// wifi event
document.getElementById("wifi").addEventListener("click", async () => {
  try {
    const module = await import("./functions/Wifi.js");
    module.showWifi();
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("mask").addEventListener("click", async () => {
  try {
    const module = await import("./functions/Wifi.js");
    module.closeWifi();
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("wifi-refresh").addEventListener("click", async () => {
  try {
    const module = await import("./functions/Wifi.js");
    module.scanWifi();
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("APconnect").addEventListener("click", async () => {
  try {
    const module = await import("./functions/Wifi.js");
    module.APconnect();
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("APcancel").addEventListener("click", async () => {
  try {
    const module = await import("./functions/Wifi.js");
    module.APcancel();
  } catch (error) {
    console.error(error);
  }
});
