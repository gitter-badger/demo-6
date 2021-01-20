# WebConsole 網頁規格文件

## ESP8266 設定指令

|      說明       |               指令               |
| :-------------: | :------------------------------: |
|     AP 設定     |         set [SSID]:[PWD]         |
|    日期設定     |    set time 2021-01-01T00:00     |
|    外網搜尋     |             AP scan              |
|    外網連線     |     AP connect [SSID]:[PWD]      |
|  訊息位址設定   | set recv IP xxx.xxx.xxx.xxx:port |
|  裝置名稱設定   |       set device name NAME       |
| Line Token 設定 |    set Line Token [1]:[TOKEN]    |
|  Line 通知測試  |           Line<MESSAGE           |

- 指令前面加上 @ 代表傳給 WebConsole 的 ESP8266<br>
- 沒加則代表傳給連接裝置

## 參數資訊

|   參數   |          描述           |
| :------: | :---------------------: |
|   SSID   |    ESP8266 WIFI 名稱    |
| 連接網路 |    已連上 WIFI 名稱     |
|   訊號   | 與 ESP8266 間的連線品質 |
| 運作時間 |  顯示裝置持續運作時間   |
|   時間   |    顯示連接裝置時間     |
| Terminal |  顯示連接裝置傳輸訊息   |

## 資料傳輸格式

- JSON

## 網頁功能

|    功能    |                描述                |
| :--------: | :--------------------------------: |
| 功能頁切換 |    Terminal/Config/Help 頁切換     |
|  指令執行  |       發送指令進行設定/控制        |
|  指令記錄  | 在畫面上顯示指令使用(以時間為單位) |
|  清除記錄  |         清空 Terminal 畫面         |
|  自訂功能  |           自定義指令按鍵           |

## 版本資訊

### v1.0

- SerialPort(序列阜)連接設備雙向傳輸資料
- Linux 風格 Terminal 顯示回傳資料
- 系統功能按鍵(清除資料,網路搜尋,AP 設定,指令紀錄)
- 自定義指令按鍵
