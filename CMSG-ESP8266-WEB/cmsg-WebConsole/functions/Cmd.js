// 執行輸入命令
export function execCmd(id) {
  var str;
  editCmd = 0;
  str = $(id).value;
  $(id).value = "";
  str.indexOf("clear msg") === 0
    ? ($("content").innerHTML = "")
    : str.indexOf("clear SYS DATA") === 0
    ? ($("DT").innerHTML = "")
    : postCmd(str);
}
