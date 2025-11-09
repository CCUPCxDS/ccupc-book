# Manacher's Algorithm 馬拉車演算法

另外一個字串問題中很常見的問題——回文，回文是指一段正著看和反著看都一樣的字串，
我們來看要怎麼求出一個字串中的最長回文子字串。

一個想法是我們從某個字元出發，往左右的字元延伸檢查，找出最長的回文子字串，
第一個問題是，像是 abba 這樣的回文沒有中心，為了解決這樣的問題，我們可以在字元間跟字串頭尾插入不屬於字元集的字元，
這裡我們用 `$`，變成 \$a\$b\$b\$a\$，這樣長度為偶數的回文就可以用 `$` 當作中心，實際的回文長度就是我們找到得回文長度的一半。

如果我們單純逐一比較，時間複雜度是 $O(|S|^2)$，如果事先透過 Hashing 進行預處理，可以對於每個字元二分搜回文半徑長度，將時間複雜度改善到 $O(|S|\log{|S|})$，
而這裡要介紹的則是線性的做法——馬拉車。

這是我們要求的字串，我們從最左邊開始
![alt](manacher_assets/image0.jpg)

第一個顯然是 1，下一格會是三，我們可以如同 z box 一樣，從對稱的另外一邊截取數值，
![alt](manacher_assets/image1.jpg)

但是跟 z box 一樣，我們其實有往後延伸的可能，所以對稱軸提供的其實是下界，
![alt](manacher_assets/image2.jpg)
![alt](manacher_assets/image3.jpg)
![alt](manacher_assets/image4.jpg)
![alt](manacher_assets/image5.jpg)

也跟 z box 有類似的問題，如果對稱軸對應的值已經超出我們已知的範圍，反而要縮回來重新計算，
不能直接沿用，但是回文區塊的右界不變，
![alt](manacher_assets/image6.jpg)
![alt](manacher_assets/image7.jpg)
![alt](manacher_assets/image8.jpg)
![alt](manacher_assets/image9.jpg)
![alt](manacher_assets/image10.jpg)

所以當你學完了 z algorithm 之後，就會發現馬拉車也是用類似的概念，
因為回文區塊只會不斷往右，所以我們可以在線性時間求解。

在實作上為了比較好表示，我們通常存的是回文半徑而非圖示上的回文長度，
因為這樣比較好算目前區塊延伸到哪裡。

