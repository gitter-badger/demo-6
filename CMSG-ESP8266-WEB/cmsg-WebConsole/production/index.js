var w;
var w2;
var act;
var onScheEdit = 0;
var editCmd = 0;
var kM;
var res_wifi;

function $(id) {
  return document.getElementById(id);
}

function connect() {
  if (typeof Worker === "undefined") {
    console.log("not support Worker");
    return;
  }
  if (typeof w === "undefined") {
    w = new Worker("./worker.js");
    w.onmessage = wkMsg;
  }
  cmd = { URL: document.URL };
  w.postMessage(cmd);
}
function wkMsg(e) {
  if (e.data instanceof Uint8Array) {
    e.data[0] === 0x01 ? showEEPROM(e.data) : 0;
    return;
  }
  var ii;
  for (i in e.data) {
    var data =
      typeof e.data[i] === "string" ? e.data[i] : JSON.stringify(e.data[i]);
    ii = $(i);
    if (i != "tx" && ii) {
      ii.innerHTML = data;
    } else {
      ii = $("tx");
      str = ii.value;
      str += `\n\n[${new Date(Date.now()).toLocaleDateString(
        "en-US"
      )} ${new Date(Date.now()).toLocaleTimeString("en-US", {
        hour12: false,
      })}]: `;
      str += data;
      ii.value = str;
      if (parseInt(window.localStorage.getItem("isScroll"))) {
        ii.scrollTop = ii.scrollHeight;
      }
    }

    if (i === "tx" && data.includes("|")) {
      res_wifi = data;
      console.log(res_wifi);
    }
    if (i === "tx" && data.includes("baudrate")) {
      var baud = data.substring(23);
      window.localStorage.setItem("baud", baud);
    }
  }
}

// 發送命令
var jsonCmd = {};
function postCmd(str) {
  if (str === "") return;
  jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
}

// 隱藏下導航欄
function hiddenFooter() {
  $("nav").style = "display: none";
}

// 顯示下導航欄
function showFooter() {
  $("nav").style = "display: block";
}

// 預設畫面滾動
var isScroll = 1;
window.localStorage.setItem("isScroll", "1");

// 更新顯示鮑率
setInterval(() => {
  for (let i = 1; i < 16; i++) {
    const element = document.getElementById("baud").options[i].value;
    var s = window.localStorage.getItem("baud");
    if (element === s) {
      document.getElementById("baud").selectedIndex = i;
    }
  }
}, 1000);
