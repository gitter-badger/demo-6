(async () => {
  var timeout = 1000;
  const delay = (s) => {
    return new Promise((resolve) => {
      setTimeout(resolve, s);
    });
  };

  (async () => {
    try {
      const moduleSpecifier = "./functions/Optional.js";
      const module = await import(moduleSpecifier);
      module.Optional.setBtn();
      document.getElementById("options").addEventListener("change", (e) => {
        e.preventDefault();
        module.Optional.show();
      });
      document.getElementById("option-set").addEventListener("click", (e) => {
        e.preventDefault();
        module.Optional.set();
      });
      document.getElementById("option-reset").addEventListener("click", (e) => {
        e.preventDefault();
        module.Optional.reset();
      });
      document.getElementById("terminal").addEventListener("click", () => {
        module.Optional.setBtn();
      });
      document.getElementById("config").addEventListener("click", () => {
        module.Optional.init();
      });
    } catch (error) {
      console.error(error);
    }
  })();

  await delay(timeout);
  (async () => {
    try {
      const moduleSpecifier = "./functions/FloatLabel.js";
      await import(moduleSpecifier);
    } catch (error) {
      console.error(error);
    }
  })();
})();

// execCmd event
document.getElementById("execCmd").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const module = await import("./functions/Cmd.js");
    module.execCmd("WSSCMD");
  } catch (error) {
    console.error(error);
  }
});

// baud setting event
document.getElementById("baud").addEventListener("change", async (e) => {
  e.preventDefault();
  try {
    const module = await import("./functions/Cmd.js");
    module.postCmd(`@bps: ${$("baud").value}`);
  } catch (error) {
    console.error(error);
  }
});

// switch page event
document.getElementById("terminal").addEventListener("change", async () => {
  try {
    const module = await import("./functions/SwitchPage.js");
    module.swPage("terminal");
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("config").addEventListener("change", async () => {
  try {
    const module = await import("./functions/SwitchPage.js");
    module.swPage("config");
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("help").addEventListener("change", async () => {
  try {
    const module = await import("./functions/SwitchPage.js");
    module.swPage("help");
  } catch (error) {
    console.error(error);
  }
});

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

// switch scroll event
document.getElementById("scroll").addEventListener("click", async () => {
  try {
    const module = await import("./functions/SwitchScroll.js");
    module.swScroll();
  } catch (error) {
    console.error(error);
  }
});

// read json file
document.getElementById("read").addEventListener("click", async () => {
  try {
    const module = await import("./config.js");
    console.log(module.default);
  } catch (error) {
    console.error(error);
  }
});
