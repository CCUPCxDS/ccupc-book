# 暴力搜尋法

~~~admonish note title="作者"
D1stance (吳翰平)
~~~

暴力搜尋法 (Brute Force) 可謂是一種最直覺的搜尋方法，通常是指對所有可能的解進行檢查，直到找到滿足條件的解為止。
常用來跟其他更高效的演算法進行比較，確認解法的正確性。

~~~admonish info title="例題"

糖果要 $a$ 元， 餅乾要 $b$ 元，兩種物品最多共買 $n$ 個，
請問你怎樣買總價才能最接近 $c$ 元?
請輸出糖果的數量和餅乾的數量，任意一組即可。
#### 技術規格
- $1 \le n \le 10^3$
~~~

這個問題乍看之下並不好解決，
如果我們固定糖果的數量 $x$，
那麼餅乾最多只能買 $n - x$ 個，

因此餅乾的數量 $y$ 只能在 $0 \le y \le n - x$ 之間變化，
這樣我們就可以枚舉出所有可能的 $x$ 和 $y$ 的組合，
去尋找跟 $c$ 最接近的總價。

又因為 $x$ 和 $y$ 的範圍都在 $[0, n]$ 之間，
使用兩層迴圈就可以枚舉出所有可能的組合，
時間複雜度為 $$n + (n - 1) + (n - 2) + ... + 1 = \mathcal{O}(n^2)$$

實力至上主義教室的龍園曾經說過：「暴力是世界上最強的力量。」
從剛才的例子中可見一斑。

~~~admonish info title="例題"

有 $n$ 個數字，請問有多少三個數字的組合，
使得這三個數字的和為 $10$ 的倍數?
#### 技術規格
- $1 \le n \le 2 \times 10^5$
- $1 \le a_i \le 10^{18}, a_i \ne a_j \text{ if } i \ne j$
~~~

這個例題中，直接用迴圈列舉出所有三個數字的組合時間複雜度為 $\mathcal{O}(n^3)$，顯然是不可行的。

你會得到一個大大的 Time Limit Exceeded (TLE) 錯誤，我們肯定需要從其他方向下手。

首先考慮十的倍數有甚麼性質，當個位數為 $0$ 時，整個數字就是十的倍數，
因此我們其實只要考慮這三個數字的個位數是甚麼數字，以及他們的和是否為十的倍數即可。

因此，對於每個輸入進來的數字 $a_i$，
我們只需要記錄它的個位數，然後將這些個位數出現次數記錄下來，
接著我們就可以用三層迴圈列舉出所有可能的個位數組合，
並檢查這三個數字的和是否為十的倍數。

這樣的時間複雜度為 $\mathcal{O}(n + 10^3)$，
其中 $n$ 是輸入的數字個數，$10^3$ 是因為我們只需要考慮個位數的組合，
這樣就可以在合理的時間內解決問題。


```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cin >> n;
    vector<int> cnt(10, 0);
    for(int i = 0; i < n; i++)
    {
        long long x; // 輸入到 10^18
        cin >> x;
        cnt[x % 10]++; // 記錄個位數出現次數
    }
    for(int i = 0; i < 10; ++i)
    {
        cnt[i]--;
        for(int j = 0; j < 10; ++j)
        {
            cnt[j]--;
            for(int k = 0; k < 10; ++k)
            {
                cnt[k]--;
                if(cnt[i] >= 0 && cnt[j] >= 0 && cnt[k] >= 0)
                {
                    cout << "Yes\n";
                    return 0;
                }
                cnt[k]++; // 恢復計數
            }
            cnt[j]++; // 恢復計數
        }
        cnt[i]++; // 恢復計數
    }
    cout << "No\n";
    return 0;
}
```

因為有可能選到同一個個位數，例如 `10, 20, 30`，
因此我們需要在每次迴圈開始前將計數器減一，
確認真的有足夠的個位數可供選擇。

如果我們不這樣做，可能會出現計數器為負的情況，
這樣就會導致錯誤的結果。
這樣的處理方式可以確保我們只考慮到不同的個位數組合，
避免重複計算。

由此可知，合理的爆搜可以幫助我們解決不少的問題。

## 子集合枚舉

一個集合 (Set) 可以包含多個元素，
而子集合 (Subset) 則是指從這個集合中選擇一些元素組成的新集合，
這些新集合可以是空的，也可以是包含所有元素的集合。

假設現在有一個集合 $S = \lbrace1, 2, 3\rbrace$，
和一個集合 $T = \lbrace4, 5\rbrace$，$T$ 的元素 $4, 5$ 都不在 $S$ 中，所以 $T$ 不是 $S$ 的子集合。

但是如果 $T = \lbrace1, 3\rbrace$，因為 $T$ 的元素都在 $S$ 中，
所以 $T$ 是 $S$ 的子集合。

假設現在有一個集合 $S = \lbrace1, 2, 3\rbrace$，
那麼它的所有子集合包括：
- 空集合 $\lbrace\rbrace$
- 單元素集合 $\lbrace1\rbrace, \lbrace2\rbrace, \lbrace3\rbrace$
- 雙元素集合 $\lbrace1, 2\rbrace, \lbrace1, 3\rbrace, \lbrace2, 3\rbrace$
- 全部元素集合 $\lbrace1, 2, 3\rbrace$

總共有 $2^3 = 8$ 個子集合。

對於每一個元素，我們有放在子集合中的選擇，跟不放在子集合中的選擇，
所以會有 $2 \times 2 \times 2$ 種可能，
如果用 $0, 1$ 分別代表放與不放入該子集合中，可以列出下表：

| 子集合 |  1 |  2 |  3 |
| :----: | :-: | :-: | :-: |
| $\lbrace\rbrace$ | 0 | 0 | 0 |
| $\lbrace1\rbrace$ | 1 | 0 | 0 |
| $\lbrace2\rbrace$ | 0 | 1 | 0 |
| $\lbrace1, 2\rbrace$ | 1 | 1 | 0 |
| $\lbrace3\rbrace$ | 0 | 0 | 1 |
| $\lbrace1, 3\rbrace$ | 1 | 0 | 1 |
| $\lbrace2, 3\rbrace$ | 0 | 1 | 1 |
| $\lbrace1, 2, 3\rbrace$ | 1 | 1 | 1 |

一個子集合的樣子其實就是一個三位元的二進位數，
例如 $\lbrace1, 2\rbrace$ 可以表示為 $110_2$，
而 $\lbrace1, 2, 3\rbrace$ 可以表示為 $111_2$。
這樣的表示方式可以讓我們很方便地枚舉出所有的子集合，
假設這個集合有 $n$ 個元素，
那麼我們可以用 $0 \sim 2^n - 1$ 的數字來表示所有的子集合，
例如 $n = 3$ 時，所有的子集合可以用 $000_2, 001_2, 010_2, 011_2, 100_2, 101_2, 110_2, 111_2$ 來表示。

這樣的枚舉方式可以用一個迴圈來實現，
假設我們有一個集合 $S$ 包含 $n$ 個元素，
我們可以用一個迴圈從 $0$ 到 $2^n - 1$ 來枚舉所有的子集合樣貌，
在每次迴圈中，我們可以用位元運算來檢查每一個元素是否在子集合中。
```cpp
if(mask & (1 << i)) {
    // 第 i 個元素在子集合中
} else {
    // 第 i 個元素不在子集合中
}
```
`1 << i` 代表 $1$ 左移 $i$ 位，`1 << 1` 相當於 $1 \times 2 = 2^1$，所以 `1 << i` 就是 $2^i$，
我們可以用 `and` & 來檢查這個代表當前子集合樣子的二進位數字中，第 $i$ 個位元 ($2^i$) 是否為一來看是否有要放入該元素。

這樣的方式可以讓我們很方便地枚舉出所有的子集合，
時間複雜度為 $\mathcal{O}(2^n \times n)$，
其中 $n$ 是集合中的元素個數。
這樣的時間複雜度在 $n$ 小於等於 $20$ 時是可以接受的，
因為 $2^{20} \times 20 = 1048576 \times 20 = 20971520$，
這樣的數字是可以在合理的時間內處理的。

~~~admonish info title="練習題"
給定 n 個整數組成的集合，
請問有多少個子集合的和為 $k$ 的倍數?
#### 技術規格
- $1 \le n \le 20$
- $1 \le k \le 10^9$
- $1 \le a_i \le 10^9$
~~~

~~~admonish note title="範例解法" collapsible=true

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for(int i = 0; i < n; ++i)
        cin >> a[i];
    int count = 0;
    for(int mask = 0; mask < (1 << n); ++mask)
    {
        long long sum = 0;
        for(int i = 0; i < n; ++i)
            if(mask & (1 << i))
                sum += a[i];
        if(sum % k == 0)
            count++;
    }
    cout << count << '\n';
    return 0;
}
```

因為透過二進位的方式枚舉子集合，
所以還需要多花一個迴圈才知道當前選了哪些元素，
因此時間複雜度為 $\mathcal{O}(2^n \times n)$。

~~~

我們回頭看一下子集合是如何產生的，假設當前有 $1, 2, 3$ 三個元素，
$\lbrace\rbrace$ 是空集合，<br>
只考慮 $1$ 這個元素，子集合會是 $\lbrace\rbrace, \lbrace1\rbrace$，<br>
再考慮 $2$ 這個元素，子集合會是 $\lbrace\rbrace, \lbrace1\rbrace, \lbrace2\rbrace, \lbrace1, 2\rbrace$，<br>
最後也考慮 $3$ 這個元素，子集合會是 $\lbrace\rbrace, \lbrace1\rbrace, \lbrace2\rbrace, \lbrace1, 2\rbrace, \lbrace3\rbrace, \lbrace1, 3\rbrace, \lbrace2, 3\rbrace, \lbrace1, 2, 3\rbrace$。<br>

每次多考慮一個元素時，就是把原本的子集合複製一份，
然後在每個子集合中加入這個新元素，
這樣就可以得到新的子集合。

可以想像就是，分別考慮不放跟放入當前的元素。
這樣的想法可以讓我們很方便地透過遞迴來完成實作，
時間複雜度為 $\mathcal{O}(2^n \cdot n)$，
其中 $n$ 是集合中的元素個數。

以下是透過 C++ 實作的範例程式碼：

```cpp
vector<vector<int>> generate_subset(vector<int> a)
{
    if(empty(a))
        return {{}};
    int x = a.back(); // 取出最後一個元素
    a.pop_back(); // 移除最後一個元素
    auto subsets_without_x = generate_subset(a); // 生成不包含 x 的子集合
    auto subsets_with_x = subsets_without_x; // 複製不包含 x 的
    for(auto& subset : subsets_with_x)
        subset.push_back(x); // 將 x 加入到每個子集合中
    vector<vector<int>> all_subsets;
    for(auto& subset : subsets_without_x)
        all_subsets.push_back(subset); // 將不包含 x 的子集合加入
    for(auto& subset : subsets_with_x)
        all_subsets.push_back(subset); // 將包含 x 的子集合加入
    return all_subsets; // 返回所有子集合
}
```

是不是非常漂亮的純函數？
這個函式 `generate_subset` 接受一個整數陣列 `a` 作為參數，
然後返回一個包含所有子集合的二維陣列。

這個函式的遞迴邏輯是：
1. 如果 `a` 是空的，則返回一個包含空集合的二維陣列。
2. 否則，取出 `a` 的最後一個元素 `x`，然後從 `a` 中移除它。
3. 使用 `generate_subset` 函式遞迴地生成不包含 `x` 的子集合。
4. 複製不包含 `x` 的子集合，然後將 `x` 加入到每個子集合中，生成包含 `x` 的子集合。
5. 將不包含 `x` 的子集合和包含 `x` 的子集合合併到一個新的二維陣列 `all_subsets` 中。

這樣的實作方式可以讓我們很方便地生成所有的子集合，
但如果我們今天只是要求出和為 $k$ 的子集合數量，這樣就有點冗贅了，
複製一份的想法我們可以延伸下去，
其實就是對於每個元素，分成兩種情況，
一種是放在子集合中，另一種是不放在子集合中，
然後對於剩下的元素繼續考慮，
直到所有元素都被考慮過為止。

我們可以用一個參數來表示當前考慮到的元素和，
如果已經超過 $k$，就不用再繼續考慮下去了。

### 範例程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, k, count = 0;

void generate_subset(vector<int>& a, int idx, int sum)
{
    if(sum > k) // 如果當前和已經超過 k，就不需要繼續考慮
        return;
    if(idx == n) // 已經考慮完所有元素
    {
        if(sum == k)
            count++;
        return;
    }
    generate_subset(a, idx + 1, sum); // 不放當前元素
    generate_subset(a, idx + 1, sum + a[idx]); // 放當前元素
}
```


## 排列枚舉

排列 (Permutation) 是指從一個集合中選擇一些元素，並將這些元素按照一定的順序排列起來，
例如對於集合 $S = \lbrace1, 2, 3\rbrace$，
我們可以得到以下的排列：
$1, 2, 3$、$1, 3, 2$、$2, 1, 3$、$2, 3, 1$、$3, 1, 2$、$3, 2, 1$。

我們是不是可以用剛才生成子集合的方式來生成排列呢？
考慮只有第一個元素的情況，
只有 $1$ 這個元素，所以排列只有 $1$。
考慮有兩個元素的情況，$1, 2$，
排列有 $1, 2$ 和 $2, 1$，
考慮有三個元素的情況，$1, 2, 3$，
排列有 $1, 2, 3$、$1, 3, 2$、$2, 1, 3$、$2, 3, 1$、$3, 1, 2$、$3, 2, 1$。

你有發現什麼嗎？其實每次多考慮一個元素時，
就是將原本的排列複製一份，
然後在每個排列中每個位置嘗試放置這個新元素，
這樣就可以得到新的排列。

像是在考慮 $2$ 的時候，我們可以插入在 $1$ 的前面跟後面，因此產生了 $1, 2$ 和 $2, 1$ 兩種可能，
以此類推。

對於每個位置考慮所有放置的可能，
在放置之後，紀錄已經被放過的元素，
然後對於剩下的元素繼續放置，
直到所有位置都被放置完畢。

每次能放的東西都少一個，所以時間複雜度為 $\mathcal{O}(n!)$。

大家可以試著自己實作，然後我們 C++ 的 STL 中也有提供 `next_permutation` 函式，
可以用來生成下一個排列。

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    vector<int> a = {1, 2, 3};
    do {
        for(int x : a)
            cout << x << ' ';
        cout << '\n';
    } while(next_permutation(a.begin(), a.end()));
    return 0;
}
```

下一個排列是指，
假設我們將 $1, 2, 3$ 組成的排列依照字數字大小排好，
$1, 2, 3$、$1, 3, 2$、$2, 1, 3$、$2, 3, 1$、$3, 1, 2$、$3, 2, 1$，
$1, 2, 3$ 的下一組就是 $1, 3, 2$，
如果我們沒有把 `a` 排序好，

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    vector<int> a = {2, 3, 1};
    do {
        for(int x : a)
            cout << x << ' ';
        cout << '\n';
    } while(next_permutation(a.begin(), a.end()));
    return 0;
}
```

這樣下一個拿到的排列就是 $3, 1, 2$，就沒有成功列出所有可能了。

~~~admonish info title="練習題"
給定一個整數 $n$，請問有多少個由數字 $1, 2, \ldots, n$ 組成的排列，該排列中相鄰的兩個數字之差的絕對值不超過 $k$？
#### 技術規格
- $1 \le n \le 10$
- $1 \le k \le n$
~~~

~~~admonish note title="範例程式碼" collapsible=true

對於相鄰元素有限制的排列，真的把所有排列列舉出來再一一檢查就有點過頭了，
我們可以沿用剛才的想法，排列其實就是將元素放在不同的位置，
所以我們不妨這樣想，當一個元素還沒被考慮過時，
我們可以嘗試放放看，如果放置後滿足條件，遞迴下去放置剩下的元素，
如果不滿足條件，就不放置這個元素，然後繼續考慮下一個元素。

這樣的方式可以確保我們只考慮滿足條件的排列，
時間複雜度為 $\mathcal{O}(n!)$，但是比較起來更高效，
因為我們不需要列舉所有的排列，只需要列舉滿足條件的排列。

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, k, count = 0;

void permute(vector<int>& a, int idx)
{
    if(idx == n) // 已經排列完畢
    {
        count++;
        return;
    }
    for(int i = 0; i < n; ++i)
    {
        if(a[i] == 0) // 如果這個位置還沒有被使用
        {
            a[idx] = i + 1; // 放置當前數字
            if(idx == 0 || abs(a[idx - 1] - a[idx]) <= k) // 檢查相鄰兩數字之差的絕對值
                permute(a, idx + 1); // 繼續排列下一個位置
            a[i] = 0; // 恢復狀態
        }
    }
}
int main()
{
    cin >> n >> k;
    vector<int> a(n, 0); // 初始化一個大小為 n 的 vector，初始值為 0
    permute(a, 0); // 從第 0 個位置開始排列
    cout << count << '\n'; // 輸出排列的數量
    return 0;
}
```
~~~

## 折半枚舉

~~~admonish info title="例題"

給定 n 個整數組成的集合，
請問有多少個子集合的和為 $k$?
#### 技術規格
- $1 \le n \le 40$
- $1 \le k \le 10^9$
- $1 \le a_i \le 10^9$
~~~

這題看似可以用暴力搜尋法來解決，
但因為 $n$ 的上限是 $40$，
所以直接枚舉所有的子集合會有 $2^{40} = 1099511627776$ 個子集合，
這樣的數字是遠遠超過我們能接受的範圍，
因此我們需要用其他方法來解決這個問題。

這裡交給大家的技巧是「折半枚舉」，
我們可以將這個集合分成兩個部分，
然後分別枚舉這兩個部分的所有子集合，
接著將這兩個部分的子集合和進行合併，
這樣就可以得到所有子集合的和。

假設現在有一個集合 $S = \lbrace 1, 4, 3, 2\rbrace$

我們可以將它分成兩個部分：
- 第一部分 $S_1 = \lbrace 1, 4\rbrace$
- 第二部分 $S_2 = \lbrace 3, 2\rbrace$

接著我們可以分別枚舉這兩個部分的所有子集合，
得到以下的子集合和：
| 子集合 | 和 |
| :----: | :-: |
| $\lbrace\rbrace$ | 0 |
| $\lbrace 1\rbrace$ | 1 |
| $\lbrace 4\rbrace$ | 4 |
| $\lbrace 1, 4\rbrace$ | 5 |

| 子集合 | 和 |
| :----: | :-: |
| $\lbrace\rbrace$ | 0 |
| $\lbrace 3\rbrace$ | 3 |
| $\lbrace 2\rbrace$ | 2 |
| $\lbrace 3, 2\rbrace$ | 5 |

假設我們目標是 $k = 5$，
那第一部分中的子集合和為 $0$ 的子集合是不是就可以跟第二部分中的子集合和為 $5$ 的子集合配對，
第一部分中的子集合和為 $1$ 的子集合是不是就可以跟第二部分中的子集合和為 $4$ 的子集合配對，
以此類推。

如果我們直接逐一檢查另外一部份的子集合和，
那麼時間複雜度會是 $\mathcal{O}(2^{n/2} \times 2^{n/2}) = \mathcal{O}(2^n)$，
這樣的時間複雜度跟原本沒有分割的情況下枚舉所有子集合的時間複雜度是相同的，
因此我們需要用更高效的方式來查詢。

如果我們先將所有第一部分或者第二部分可能的和進行排序，其實就可以透過二分搜尋法的方式，
把問題轉化成在陣列中找一個數字 $y$ 是否存在了，同時效率也變得更好，
這樣的時間複雜度為 $\mathcal{O}(2^{\frac{n}{2}} \log(2^{\frac{n}{2}})) = \mathcal{O}(2^{\frac{n}{2}} \cdot n)$，
在 $n \le 40$ 時是可以接受的，
透過砍半的技巧大幅度的降低了時間複雜度。

## 結論

### 所以暴搜有什麼用?

因為暴力法是顯然正確的解法，只是可能比較慢，
因為我們嘗試了所有可能，
所以可以用來在小測資上驗證其他更有效率的演算法之正確性，
也可以幫助我們尋找答案的規律性，
因此是一個比賽中的重要工具。

## 題單

- [Codeforces 1490C - Sum of Cubes](https://codeforces.com/contest/1490/problem/C)
- [CSES 1623 - Apple Division](https://cses.fi/problemset/task/1623)
- [AtCoder ABC196 D - Hanjo](https://atcoder.jp/contests/abc196/tasks/abc196_d)