// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><a href="index.html">網站簡介</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item "><a href="courses/intro.html">競賽入門</a></li><li class="chapter-item "><a href="courses/syntax.html">C++ 基礎語法</a></li><li class="chapter-item "><a href="courses/loop-and-array.html">陣列與迴圈</a></li><li class="chapter-item "><div>指標與字元字串</div></li><li class="chapter-item "><div>副函式與遞迴應用</div></li><li class="chapter-item "><div>時間複雜度、排序與二分搜尋法</div></li><li class="chapter-item "><div>標準模板庫 STL</div></li><li class="chapter-item "><div>暴力搜尋法</div></li><li class="chapter-item "><div>貪婪演算法</div></li><li class="chapter-item "><div>基礎動態規劃</div></li><li class="chapter-item "><div>數論</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><div>質數與篩法</div></li><li class="chapter-item "><div>模運算</div></li><li class="chapter-item "><div>中國餘數定理*</div></li><li class="chapter-item "><div>排列組合</div></li></ol></li><li class="chapter-item "><div>圖論</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><div>圖的基礎概念</div></li><li class="chapter-item "><div>最短路徑</div></li><li class="chapter-item "><div>樹與最小生成樹</div></li><li class="chapter-item "><div>強連通分量*</div></li><li class="chapter-item "><div>圖上動態規劃*</div></li></ol></li><li class="chapter-item "><div>分治法</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><div>基礎分治</div></li><li class="chapter-item "><div>線段樹</div></li><li class="chapter-item "><div>樹狀數組</div></li></ol></li><li class="chapter-item "><div>賽局理論</div></li><li class="chapter-item "><div>網路流*</div></li><li class="chapter-item "><div>字串演算法*</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><div>雜湊與 KMP</div></li><li class="chapter-item "><div>Trie</div></li></ol></li><li class="chapter-item "><div>計算幾何*</div></li><li class="chapter-item "><div>進階動態規劃*</div></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item "><a href="thanks.html">特別感謝</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
