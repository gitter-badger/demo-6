// 初始化選單爲新增指令
document.getElementById("options").selectedIndex = 0;

/**指令設定選單功能 */
export const Optional = (() => {
  /**以id取得dom物件 */
  function $(id) {
    return document.getElementById(id);
  }
  var o = $("options");
  var obj = {};
  var key = "1";
  var option = {};

  /**初始化&更新選單 */
  const init = () => {
    var new_list = {};
    o.options.length = 0;
    o.options.add(new Option("新增指令", "new"));
    if (localStorage.getItem("options") != null) {
      obj = JSON.parse(localStorage.getItem("options"));
      let entries = Object.entries(obj);
      for (let [i, [k, value]] of entries.entries()) {
        if (Object.hasOwnProperty.call(obj, k)) {
          new_list[(i + 1).toString()] = value;
          o.options.add(new Option(`${i}: ${value.name}`, k));
        }
      }
      localStorage.setItem("options", JSON.stringify(new_list));
    }
  };

  /**顯示選單到資料欄位 */
  const show = () => {
    if (o.selectedIndex == 0) {
      $("isCmd").checked = true;
      $("option-name").value = "";
      $("option-cmd").value = "";
    } else {
      key = o.selectedIndex.toString();
      obj = JSON.parse(localStorage.getItem("options"));
      setTimeout(() => {
        $("option-cmd").focus();
      }, 10);
      $("option-name").focus();
      

      $("isCmd").checked = obj[key].isCmd;
      $("option-name").value = obj[key].name;
      $("option-cmd").value = obj[key].cmd;
    }
  };

  /**新增&設定指令 */
  const set = () => {
    var obj = {};
    option.isCmd = $("isCmd").checked;
    option.name = $("option-name").value;
    option.cmd = $("option-cmd").value;
    // 新增指令時
    if (o.selectedIndex == 0) {
      if (option.name == "" || option.cmd == "") {
        alert("請輸入名稱與指令");
        return;
      }
      o.options.length = 0;
      o.options.add(new Option("新增指令", "new"));
      if (localStorage.getItem("options") != null) {
        obj = JSON.parse(localStorage.getItem("options"));
        key = (Object.keys(obj).length + 1).toString();
        obj[key] = option;
      }
      obj[key] = option;
      for (const k in obj) {
        if (Object.hasOwnProperty.call(obj, k)) {
          const element = obj[k];
          o.options.add(new Option(`${k}: ${element.name}`, k));
        }
      }
      localStorage.setItem("options", JSON.stringify(obj));
      alert(`新增指令 ${key} - 名稱:${option.name},指令:${option.cmd}`);
      $("isCmd").checked = true;
      $("option-name").value = "";
      $("option-cmd").value = "";
    }
    // 更新指令時 
    else {
      key = o.selectedIndex.toString();
      obj = JSON.parse(localStorage.getItem("options"));
      obj[key] = option;
      o.options[o.selectedIndex].label = `${key}: ${option.name}`;
      localStorage.setItem("options", JSON.stringify(obj));
      alert(`更新指令 ${key} - 名稱:${obj[key].name},指令:${obj[key].cmd}`);
    }
  };

  /**清空欄位&刪除指令 */
  const reset = () => {
    $("isCmd").checked = true;
    $("option-name").value = "";
    $("option-cmd").value = "";
    if (o.selectedIndex !== 0) {
      key = o.selectedIndex.toString();
      obj = JSON.parse(localStorage.getItem("options"));
      if(confirm(`確定刪除指令 ${key} - 名稱:${obj[key].name},指令:${obj[key].cmd} ?`)){
        delete obj[key];
        localStorage.setItem("options", JSON.stringify(obj));
        o.selectedIndex = 0;
        init();
      }
      else{
        $("isCmd").checked = obj[key].isCmd;
        $("option-name").value = obj[key].name;
        $("option-cmd").value = obj[key].cmd;
        return;
      }
      
      
    }
  };

  /**顯示指令按鍵 */
  const setBtn = () => {
    var node = document.getElementById("table-option");
    node.innerHTML = "";
    obj = JSON.parse(localStorage.getItem("options"));
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        var td = document.createElement("td");
        var btn = document.createElement("input");
        btn.type = "button";
        btn.value = element.name;

        if (element.isCmd) {
          btn.onclick = function () {
            postCmd(element.cmd);
          };
        } else {
          btn.onclick = function () {
            $("WSSCMD").value = element.cmd;
            $("WSSCMD").focus();
          };
        }
        td.appendChild(btn);
        node.appendChild(td);
      }
    }
  };
  return {
    init: init,
    show: show,
    set: set,
    reset: reset,
    setBtn: setBtn,
  };
})();

// 每次重整網頁更新
Optional.setBtn();
