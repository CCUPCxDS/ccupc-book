# 環境設置

~~~admonish note title="作者"
D1stance (吳翰平)
~~~

在開始寫 C++ 程式之前，我們需要設置好開發環境，
原因是我們的電腦其實讀不懂 C++ 程式碼，
我們需要一個工具——**編譯器**，
它可以將我們寫的 C++ 程式碼轉換成電腦可以理解的機器碼，
然後電腦才能執行這些程式。

筆者假設大部分的讀者皆是剛入門程式設計的同學，
這裡介紹的第一種方法 [CP Editor](#cp-editor) 比較簡單，不用過多的設定，
但只適用於程式競賽課程，如果你之後也有打算寫其他程式語言，
建議你使用 [Visual Studio Code](#visual-studio-code) 這個編輯器，
它是目前最流行的程式編輯器之一，支援多種程式語言，
並且有許多擴充功能可以使用。

## CP Editor

[CP Editor](https://cpeditor.org/zh_tw/) 是一個專門用於程式競賽的輕量化編輯器，專門為程式競賽設計，因為下載的時候還可以一起把編譯器環境打包好，不用自己設定，所以在這裡介紹給初學者使用，這個軟體同時也是南臺灣學生資訊社群 (SCIST) 的指定編輯器。

### 安裝 CP Editor

1. 前往 [CP Editor 官方網站](https://cpeditor.org/zh_tw/)。
2. 點擊「下載軟體」按鈕，選擇適合你作業系的版本（Windows、macOS 或 Linux）。
3. 選擇帶有 `with-gcc` 字樣的安裝檔進行下載
![alt text](cp-editor/image.png)
4. 下載完成後，去到下載的資料夾雙擊安裝檔，按照指示完成安裝。   

安裝完畢之後就可以開始使用 CP Editor 了。

### 設定 CP Editor

1. 打開 CP Editor，點擊左上角的 "Options" > "Preferences"。
![alt text](cp-editor/image-1.png)
2. 選擇 "Appearance" > "General"，選擇 "正體中文" 作為語言。
![alt text](cp-editor/image-2.png)
3. 重開 CP Editor，你會看到介面已經變成中文了。接著我們回到 "選項" > "偏好設定"，在 "動作" > "測資" 中，勾選測資輸入為空時仍然執行。
![alt text](cp-editor/image-3.png)
4. 套用後回到主畫面，點擊左上角的 "檔案" > "新檔案"，按下 `Ctrl + S` 儲存檔案，將檔案命名為 `main.cpp`，這是 C++ 的標準檔案名稱，放在一個你想要的資料夾中。
5. 將範例程式碼複製到 `main.cpp` 中：

```cpp
#include <iostream>

int main()
{
    std::cout << "Hello world!\n";
    return 0;
}
```
6. 點擊編譯並執行按鈕，CP Editor 會自動編譯並執行你的程式，並在右方的輸出視窗中顯示結果。
![alt text](cp-editor/image-4.png)
7. 如果一切順利，你應該會看到輸出結果為 `Hello world!`。

至此，你已經成功設置了 CP Editor 開發環境，
並且可以開始寫 C++ 程式了。

~~~admonish caution title="注意"
如果你使用 Windows 系統，有時候防毒軟體會誤判 C++ 編譯產生的執行檔為
病毒，這是因為 C++ 編譯器會生成一個可執行檔，這個檔案有時候會被防毒軟體誤判為病毒，我建議大家選擇一個資料夾 (假設是桌面上某個 `cpp_learning` 資料夾)，然後點開 `Windows 安全性` 的防毒軟體設定，將這個資料夾加入白名單，這樣就不會被誤判了。
1. 點擊 `病毒與威脅防護` > `病毒與威脅防護設定` > `管理設定`。
![alt text](cp-editor/image-5.png)
2. 在 `排除項目` 中點擊 `新增或移除排除項目`。
3. 將剛剛建立的 `cpp_learning` 資料夾加入排除項目。

這樣就可以避免防毒軟體誤判 C++ 編譯器生成的執行檔為病毒了。
~~~

## Visual Studio Code

To be continued...