// 開啟/關閉 terminal畫面滾動
export function swScroll() {
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
