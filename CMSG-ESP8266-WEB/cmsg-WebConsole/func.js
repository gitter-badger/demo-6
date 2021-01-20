// 浮動輸入框功能
const FloatLabel = (() => {
  // add active class and placeholder
  const handleFocus = (e) => {
    const target = e.target;
    target.parentNode.classList.add("active");
    target.setAttribute("placeholder", target.getAttribute("data-placeholder"));
  };

  // remove active class and placeholder
  const handleBlur = (e) => {
    const target = e.target;
    if (!target.value) {
      target.parentNode.classList.remove("active");
    }
    target.removeAttribute("placeholder");
  };

  // register events
  const bindEvents = (element) => {
    const floatField = element.querySelector("input");
    floatField.addEventListener("focus", handleFocus);
    floatField.addEventListener("blur", handleBlur);
  };

  // get DOM elements
  const init = () => {
    const floatContainers = document.querySelectorAll(".float-container");

    floatContainers.forEach((element) => {
      if (element.querySelector("input").value) {
        element.classList.add("active");
      }

      bindEvents(element);
    });
  };

  return {
    init: init,
  };
})();

// 重整時更新
FloatLabel.init();

// 發送命令
function postCmd(str) {
  if (str === "") return;
  jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
}

// 執行輸入命令
function execCmd(id) {
  editCmd = 0;
  str = $(id).value;
  $(id).value = "";
  str.indexOf("clear msg") === 0
    ? ($("content").innerHTML = "")
    : str.indexOf("clear SYS DATA") === 0
    ? ($("DT").innerHTML = "")
    : postCmd(str);
}

// 顯示EEPROM資訊
function showEEPROM(data) {
  var str = '<tr><th colspan="17">EEPROM<th></tr>';
  str += "<tr><th>&#92;</th>";
  for (i = 0; i < 16; ++i) {
    str += "<th>";
    str += i.toString(16);
    str += "</th>";
  }
  str += "</tr>";
  ptr = 3;
  for (i = 0; i < 20; ++i) {
    str += "<tr>";
    str += "<th>";
    str += i.toString(16);
    str += "</th>";
    for (j = 0; j < 16; ++j) {
      str += "<td>";
      str += data[ptr++].toString(16);
      str += "</td>";
    }
    str += "</tr>";
  }
  $("DT").innerHTML = str;
}

// 分頁選擇
function swPage(page) {
  $(`html-help`).style = "display: none";
  document.getElementsByName("btn-page").forEach((element) => {
    element.checked = false;
  });
  document.getElementsByName("div-page").forEach((element) => {
    element.style = "display: none";
  });
  document.getElementsByName("page-back").forEach((element) => {
    element.style = "background: #f0ece6";
  });
  switch (page) {
    case "terminal":
      $(page).checked = true;
      $("container").style = "";
      $(`div-${page}`).style = "";
      $(`span-${page}`).style = "background: #2979e2";
      // Optional.setBtn();
      break;
    case "config":
      $(page).checked = true;
      $("container").style = "";
      $(`div-${page}`).style = "";
      $(`span-${page}`).style = "background: #2979e2";
      // Optional.init();
      break;
    case "help":
      $(page).checked = true;
      $("container").style = "display: none";
      $(`span-${page}`).style = "background: #2979e2";
      $(`html-${page}`).style = "";
      break;
    default:
      alert("error");
      break;
  }
}

// 隱藏下導航欄
function hiddenFooter() {
  document.getElementById("nav").style = "display: none";
}

// 顯示下導航欄
function showFooter() {
  document.getElementById("nav").style = "display: block";
}

// 顯示WIF清單
function showWifi() {
  $("mask").style = "display: block;";
  $("wifi-content").style = "display: block";
  document.body.style.overflow = "hidden";
  scanWifi();
}
var scanHandler;
// 顯示已搜尋WIFI清單
function scanWifi() {
  var timeout = 0;
  var res = "";
  var wr = $("wifi-result");
  var wf = $("wifi-refresh");
  res_wifi = "";
  wr.innerHTML = "";
  postCmd("@AP scan");
  wf.disabled = true;
  var div = document.createElement("div");
  var h3 = document.createElement("h3");
  h3.innerHTML = "搜尋中...";
  div.appendChild(h3);
  wr.appendChild(div);
  scanHandler = setInterval(() => {
    console.log("searching...");
    timeout += 1;
    if (timeout >= 10) {
      alert("無搜尋結果,請重試");
      clearInterval(scanHandler);
      wr.innerHTML = "";
      wf.disabled = false;
      return;
    }
    if (res_wifi) {
      res = res_wifi;
      $("wifi-now").innerHTML = $("wifi").value;
      wr.innerHTML = "";
      var res_result = res.split("|");

      var li = document.createElement("li");
      wr.appendChild(li);
      res_result.forEach((e) => {
        if (e === "") return;
        console.log(e);
        var btn = document.createElement("input");
        btn.className = "w-btn";
        btn.type = "button";
        btn.value = e;
        btn.onclick = function () {
          showPWD(e);
        };
        li.appendChild(btn);
      });
      clearInterval(scanHandler);
      wf.disabled = false;
    }
  }, 1000);
}

// 關閉wifi視窗
function closeWifi() {
  $("wifi-content").style = "display: none";
  $("mask").style = "display: none";
  $("pwd").value = "";
  $("wifi-pwd").style = "display: none";
  $("wifi-list").style = "display: block";
  document.body.style.overflow = "";
  clearInterval(scanHandler);
}
var SSID;
// 輸入密碼視窗
function showPWD(e) {
  $("wifi-list").style = "display: none";
  $("wifi-pwd").style = "display: block";
  SSID = e;
}

// AP connect
function APconnect() {
  var PWD = $("pwd").value;
  var cmd = `{ SENDCMD: "AP connect [${SSID}]:[${PWD}]" }`;
  postCmd(cmd);
  $("wifi").value = SSID;
  $("wifi-content").style = "display: none";
  $("mask").style = "display: none";
  $("wifi-pwd").style = "display: none";
  $("wifi-list").style = "display: block";
  $("pwd").value = null;
  document.body.style.overflow = "";
}

// 取消密碼輸入
function APcancel() {
  $("pwd").value = "";
  $("wifi-pwd").style = "display: none";
  $("wifi-list").style = "display: block";
  scanWifi();
}

// 開啟/關閉 terminal畫面滾動
function swScroll() {
  if (isScroll) {
    window.localStorage.setItem("isScroll", "0");
    isScroll = 0;
    $("scroll").value = "開啟滾動";
  } else {
    window.localStorage.setItem("isScroll", "1");
    isScroll = 1;
    $("scroll").value = "關閉滾動";
  }
}
