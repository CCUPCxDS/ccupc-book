#!/bin/bash
set -e

# 下載並解壓 mdbook
curl -Lo mbbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.4.52/mdbook-v0.4.52-x86_64-unknown-linux-musl.tar.gz;
tar xvzf mbbook.tar.gz

# 下載並解壓 katex plugin
curl -Lo mdbook-katex.tar.gz https://github.com/lzanini/mdbook-katex/releases/download/v0.9.4/mdbook-katex-0.9.4.tar.gz
tar xvzf mdbook-katex.tar.gz

# 下載並解壓 admonish plugin
curl -Lo mdbook-admonish.tar.gz https://github.com/tommilligan/mdbook-admonish/releases/download/v1.20.0/mdbook-admonish-v1.20.0-x86_64-unknown-linux-musl.tar.gz
tar xvzf mdbook-admonish.tar.gz
