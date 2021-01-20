# WEB CONSOLE

## 燒錄

### 將production內的檔案全部燒錄即可

- index.html (主要網頁)
- help.html (幫助網頁)
- webstyle.css (UI 渲染)
- index.js (建立 worker,顯示 ws 資料)
- func.js (必要載入函式)
- worker.js (與 ESP8266 連接)
- module.js (動態載入函式庫)
- funtions (函式庫資料夾)

> 要將 web 轉成 app 的樣式,需加入 manifest.json <br>
> xxx_dev.js,xxx_dev.html 爲開發時用檔案,燒錄時爲壓縮過後的檔案

# Changelog

## [v0.3] - 2021-01-15

### Changed

- 將 func.js 中的部分 function,分成多個檔案放在 functions
- 在 index.html 中加入 module.js, type 爲 module,動態載入 functions 中函式

### Removed

- index.html 中移除 optional.js

## [v0.2] - 2021-01-13

### Fixed

- log 日期修正

## [v0.1] - 2021-01-13

### Added

- 取得並顯示外接裝置的資料
- 系統功能按鍵(開關滾動,清除資料,baud 設定)
- 自訂指令按鍵

### Fixed

- 外部裝置傳送資料解析錯誤修正

[v0.3]: http://10.10.10.103:10080/cmsg-esp8266-web/cmsg-webconsole/compare/v0.2...v0.3
[v0.2]: http://10.10.10.103:10080/cmsg-esp8266-web/cmsg-webconsole/compare/v0.1...v0.2
[v0.1]: http://10.10.10.103:10080/cmsg-esp8266-web/cmsg-webconsole/tags/v0.1
