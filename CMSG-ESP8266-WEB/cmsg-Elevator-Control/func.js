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
