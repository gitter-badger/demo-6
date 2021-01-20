function postCmd(str) {
  if (str === "") return;
  jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
}

function SendBt(btStr) {
  jsonCmd = { SENDCMD: btStr };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
}

function inputCmd() {
  let cmd = prompt("請輸入命令:");
  if (cmd.indexOf("clear msg") == 0) {
    $("content").innerHTML = "";
    return;
  }
  postCmd(cmd);
}
