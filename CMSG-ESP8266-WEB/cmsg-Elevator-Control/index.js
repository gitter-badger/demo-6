var w;
var act;
var onScheEdit = 0;
var editCmd = 0;
var kM;
var json = {};
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
  //   console.log(e);
  for (i in e.data) {
    var result;
    var data =
      typeof e.data[i] === "string" ? e.data[i] : JSON.stringify(e.data[i]);
    if (i != "tx") {
      console.log(e.data[i]);
    } else {
      if (e.data[i].includes("VM")) {
        result = e.data[i].split(" ");
        result.forEach((element) => {
          if (element.includes(":")) {
            element = element.split(":");
            switch (element[0]) {
              case "MODE":
                json["MODE"] = element[1];
                break;
              case "CYCLES":
                json["CYCLES"] = element[1];
                break;
              case "POS":
                json["POS"] = element[1].split(",");
                break;
              case "LED":
                json["LED"] = element[1];
                break;
              case "BTS":
                json["BTS"] = element[1];
                break;
              case "STATE":
                json["STATE"] = element[1];
                break;
              case "SPEED":
                json["SPEED"] = element[1];
                break;
              case "execute":
                json["execute"] = element[1];
                break;
              default:
                json["other"] = element.toString();
                break;
            }
          }
          // console.log(json);
        });
      }
    }

    if (JSON.stringify(json) !== "{}") {
      var md = $("MD");
      switch (json["MODE"]) {
        case "1000":
          md.value = "觀察";
          break;
        case "0100":
          md.value = "單次";
          break;
        case "0010":
          md.value = "循環";
          break;

        default:
          break;
      }
      $("cycle").innerHTML = json["CYCLES"];
      $("SPD").innerHTML = json["SPEED"];
      $("PosS").innerHTML = json["POS"][0];
      $("PosE").innerHTML = json["POS"][1];
      $("POS").innerHTML = json["POS"][2];
    }

    if (i === "tx" && data.includes("|")) {
      res_wifi = data;
      console.log(res_wifi);
    }
  }
}

function inputCmd() {
  let cmd = prompt("請輸入命令:");
  postCmd(cmd);
}
function postCmd(str) {
  if (str === "" || null) return;
  jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
}
function SendBt(btStr) {
  jsonCmd = { SENDCMD: btStr };
  console.log(jsonCmd);
  mockAct(btStr);
  w.postMessage(jsonCmd);
}

function setCycle(i) {
  var retStr = "";
  if (i === 0) {
    retStr = "CYCLE ABORT";
  } else {
    var cys = $("Cycle").value;
    retStr = "CYCLE START ";
    retStr += cys;
  }
  SendBt(retStr);
}

var pos = -180;
var handleAct;
var spd = 0;
var m_pos;
var LT = false;
var LD = false;
document.getElementById("m-pos").style.top = `${pos}px`;
function mockAct(cmd) {
  var m = document.getElementById("m-pos").style;

  switch (cmd) {
    case "BTUp":
      if (LT) {
        return;
      }
      if (spd < 3) {
        spd += 0.3;
      }
      break;
    case "BTDn":
      if (LD) {
        return;
      }
      if (spd > -3) {
        spd -= 0.3;
      }
      break;
    case "BTStp":
      spd = 0;
      break;
    case "SPDUp":
      if (LT) {
        return;
      }
      if (spd < 3) {
        spd += 0.6;
      }
      break;
    case "SPDDn":
      if (LD) {
        return;
      }
      if (spd > -3) {
        spd -= 0.6;
      }
      break;
    default:
      break;
  }
  if (!handleAct) {
    handleAct = setInterval(() => {
      m.top = `${(pos -= spd)}px`;
      if (parseInt(m.top) > -180) {
        LD = true;
      } else {
        LD = false;
      }
      if (parseInt(m.top) < -420) {
        LT = true;
      } else {
        LT = false;
      }
      if (LD || LT) {
        spd = 0;
      }
    }, 100);
  }
}
