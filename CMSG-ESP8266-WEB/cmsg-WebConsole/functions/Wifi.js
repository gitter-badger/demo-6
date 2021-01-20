// 顯示WIF清單
export function showWifi() {
  $("mask").style = "display: block;";
  $("wifi-content").style = "display: block";
  document.body.style.overflow = "hidden";
  scanWifi();
}
var scanHandler;
// 顯示已搜尋WIFI清單
export function scanWifi() {
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
        btn.onclick = () => showPWD(e);
        li.appendChild(btn);
      });
      clearInterval(scanHandler);
      wf.disabled = false;
    }
  }, 1000);
}

// 關閉wifi視窗
export function closeWifi() {
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
export function showPWD(e) {
  $("wifi-list").style = "display: none";
  $("wifi-pwd").style = "display: block";
  SSID = e;
}

// AP connect
export function APconnect() {
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
export function APcancel() {
  $("pwd").value = "";
  $("wifi-pwd").style = "display: none";
  $("wifi-list").style = "display: block";
  scanWifi();
}
