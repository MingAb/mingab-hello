// src/js/article.js

// 1. 获取浏览器地址栏的 ID（比如：article.html?id=hello-world）
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// 2. 如果网址没有带 ID，直接踢回首页
if (!articleId) {
    window.location.href = '/index.html';
} else {
    // 3. 去拉取 public/data/articles/ 目录下的 Markdown 文件
    fetch(`/data/articles/${articleId}.md`)
        .then(response => {
            if (!response.ok) throw new Error('文章不存在');
            return response.text();
        })
        .then(markdownText => {
            // 4. 用 marked 工具将 Markdown 转换成 HTML，塞进页面的文章区
            document.getElementById('article-content').innerHTML = marked.parse(markdownText);
        })
        .catch(error => {
            // 如果没找到文件，显示 404
            document.getElementById('article-content').innerHTML = "<h2>😱 404 - 找不到这篇文章</h2><p>它可能还在我的大脑里，没有被写出来...</p>";
        });

    // 5. （附加功能）去拉取文章列表数据，看看这篇文章有没有专属的“附件下载”
    fetch('/data/list.json')
        .then(response => response.json())
        .then(articles => {
            const currentArticle = articles.find(item => item.id === articleId);
            if (currentArticle) {
                // 动态修改网页标题
                document.title = currentArticle.title + " - 我的极客小站";
                
                // 如果 JSON 里配置了下载链接，就把隐藏的下载按钮显示出来！
                if (currentArticle.download) {
                    const downloadBtn = document.getElementById('btn-download');
                    downloadBtn.href = currentArticle.download;
                    downloadBtn.style.display = 'inline-block';
                }
            }
        })
        .catch(e => console.log("文章列表加载失败或不存在，但不影响正文显示"));
}