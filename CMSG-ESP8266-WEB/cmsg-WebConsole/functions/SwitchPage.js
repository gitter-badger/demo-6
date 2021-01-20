// 分頁切換
export function swPage(page) {
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
        break;
      case "config":
        $(page).checked = true;
        $("container").style = "";
        $(`div-${page}`).style = "";
        $(`span-${page}`).style = "background: #2979e2";
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