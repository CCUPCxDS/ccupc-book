# Welcome to CCUPC Book


CCUPC Book 使用 Rust 團隊的 MDBook 作為網站的內容管理系統，並使用 GitHub Pages 作為靜態網站的部署平台。
整合歷屆中正競程所上過的課程，整合一般課程、寒暑假訓練營、競賽等課程的內容，方便學員以及講師們複習以及準備課程。

## 使用說明

### 內容管理

如果你想要新增或修改內容，請透過 Github 的 Pull Request 功能來提交你的修改，
對本網站的 [Repository](https://github.com/CCUPCxDS/ccupc-book) 進行 Fork，然後在你的 Fork 上進行修改，最後提交 Pull Request。

可以在左邊導覽列中查看預計的內容結構，選擇你想要的主題進行撰寫。
如果你不熟悉 Pull Request 的流程，可以參考 [GitHub 的官方說明](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)。

在經過審核後，修改將會被合併到主分支中，等待下一次部署時，網站內容將會更新。

歡迎使用圖片協助說明教學，圖片請放在與 md 檔同位置的 image 資料夾底下，
另外，Latex 公式也可以直接使用，請使用 `\\(` `\\)` 來包覆行內公式，或使用 `\\[` `\\]` 來包覆多行公式。
### MDBook 使用說明

如果你想要了解如何使用 MDBook 來撰寫內容，可以參考 [MDBook 的官方文檔](https://rust-lang.github.io/mdBook/index.html)。

#### Local 開發
如果你想要在本地端開發，可以使用以下指令來啟動 MDBook 的本地伺服器：

```bash
mdbook serve
```

(確保你已經安裝了 MDBook，並且在專案根目錄下執行此指令。)
這個指令會啟動一個本地伺服器，通常會在 `http://localhost:3000` 上運行。

這樣就可以在本地端啟動一個伺服器，並且可以在瀏覽器中查看內容。