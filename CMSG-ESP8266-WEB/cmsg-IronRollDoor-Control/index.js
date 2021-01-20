var w;
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
  var ii;
  for (i in e.data) {
    ii = $(i);
    if (ii) {
      if (ii.tagName === "INPUT") {
        if (e.data[i] === "ON") {
          ii.style.backgroundColor = "#FF50FF";
        } else {
          ii.style.backgroundColor = "#50FFFF";
        }
      } else {
        ii.innerHTML = e.data[i];
      }
    }
  }
  if (i === "tx" && data.includes("|")) {
    res_wifi = data;
    console.log(res_wifi);
  }
  if (typeof e.data == "string" && e.data.toString().includes("執行")) {
    var btn = document.getElementsByTagName("button");
    var color = "background: chartreuse";
    var timeout = 1000;
    for (let index = 0; index < btn.length; index++) {
      const element = btn[index];
      element.style = "";
    }
    switch (e.data) {
      case "{執行> EAST OPEN}":
        btn[0].style = color;
        setTimeout(() => {
          btn[0].style = "";
        }, timeout);
        break;
      case "{執行> EAST STOP}":
        btn[1].style = color;
        setTimeout(() => {
          btn[1].style = "";
        }, timeout);
        break;
      case "{執行> EAST CLOSE}":
        btn[2].style = color;
        setTimeout(() => {
          btn[2].style = "";
        }, timeout);
        break;
      case "{執行> SOUTH OPEN}":
        btn[3].style = color;
        setTimeout(() => {
          btn[3].style = "";
        }, timeout);
        break;
      case "{執行> SOUTH STOP}":
        btn[4].style = color;
        setTimeout(() => {
          btn[4].style = "";
        }, timeout);
        break;
      case "{執行> SOUTH CLOSE}":
        btn[5].style = color;
        setTimeout(() => {
          btn[5].style = "";
        }, timeout);
        break;
      case "{執行> WEST OPEN}":
        btn[6].style = color;
        setTimeout(() => {
          btn[6].style = "";
        }, timeout);
        break;
      case "{執行> WEST STOP}":
        btn[7].style = color;
        setTimeout(() => {
          btn[7].style = "";
        }, timeout);
        break;
      case "{執行> WEST CLOSE}":
        btn[8].style = color;
        setTimeout(() => {
          btn[8].style = "";
        }, timeout);
        break;
      case "{執行> NORTH OPEN}":
        btn[9].style = color;
        setTimeout(() => {
          btn[9].style = "";
        }, timeout);
        break;
      case "{執行> NORTH STOP}":
        btn[10].style = color;
        setTimeout(() => {
          btn[10].style = "";
        }, timeout);
        break;
      case "{執行> NORTH CLOSE}":
        btn[11].style = color;
        setTimeout(() => {
          btn[11].style = "";
        }, timeout);
        break;

      default:
        alert("error");
        break;
    }
  }
}
