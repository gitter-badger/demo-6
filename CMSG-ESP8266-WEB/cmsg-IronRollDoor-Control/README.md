# 雨水感知控制鐵門

## 燒錄所需檔案

- index.html (網頁)
- webstyle.css (UI 渲染)
- index.js (建立 worker,顯示 ws 資料)
- func.js (必要函式功能)
- worker.js (與 ESP8266 連接)
- modules.js (動態載入函式庫)
- funtions (函式庫資料夾)

> 要將 web 轉成 app 的樣式,需加入 manifest.json

# Changelog

## [v0.2] - 2021-01-15

### Added

- 新增wifi搜尋介面
- 以module.js動態載入wifi介面功能

## [v0.1] - 2021-01-15

### Added

- 4 個手動開關按鍵控制 4 面鐵門
- 雨水感知控制鐵門關閉
- 溫溼度感測資料顯示
- 可連接外網

[v0.2]: http://10.10.10.103:10080/cmsg-esp8266-web/cmsg-ironrolldoor-control/compare/v0.1...v0.2
[v0.1]: http://10.10.10.103:10080/cmsg-esp8266-web/cmsg-ironrolldoor-control/tags/v0.1
