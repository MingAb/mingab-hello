// 为了方便演示，这里用一个假数据对象模拟你未来的 JSON 数据库
// 以后你可以把这个替换成 fetch('/data/list.json')
const fakeDatabase = {
    inspiration: [
        { id: "idea-1", title: "夜里的胡思乱想", icon: "🌌" },
        { id: "idea-2", title: "一款奇怪的APP设计", icon: "📱" }
    ],
    portfolio: [
        { id: "game-1", title: "Flappy Bird 网页版", icon: "🐦" },
        { id: "site-1", title: "我的第一个作品集", icon: "✨" }
    ],
    skills: [
        { id: "skill-1", title: "如何用 Vite 偷懒", icon: "⚡" },
        { id: "skill-2", title: "搞懂 CSS 响应式", icon: "📏" }
    ],
    thoughts: [
        { id: "diary-1", title: "2024年终总结", icon: "📆" }
    ]
};

// 当前的视图模式 (list 或 grid)
let currentView = 'list';

// 打开模态框并加载数据
function openModule(moduleKey, moduleTitle) {
    // 1. 设置弹窗标题
    document.getElementById('modal-title').innerText = moduleTitle;
    
    // 2. 获取对应的文章列表数据
    const articles = fakeDatabase[moduleKey] || [];
    
    // 3. 渲染列表
    renderList(articles);
    
    // 4. 显示弹窗 (Pico CSS 的特性，加上 open 属性就弹出，背景会自动淡化)
    document.getElementById('module-modal').setAttribute('open', 'true');
}

// 渲染列表的函数
function renderList(articles) {
    const listContainer = document.getElementById('article-list');
    listContainer.innerHTML = ''; // 清空旧内容

    if (articles.length === 0) {
        listContainer.innerHTML = '<p>这里空空如也...</p>';
        return;
    }

    // 循环生成文章链接
    articles.forEach(article => {
        // 注意这里的 a 标签跳转链接：带上了 ?id=xxx 参数！
        const itemHtml = `
            <a href="/article.html?id=${article.id}" class="item">
                <div class="item-icon">${article.icon}</div>
                <div class="item-title">${article.title}</div>
            </a>
        `;
        listContainer.innerHTML += itemHtml;
    });
}

// 切换视图函数
function toggleView() {
    const listContainer = document.getElementById('article-list');
    
    if (currentView === 'list') {
        // 从列表切换到大图标网格
        listContainer.classList.remove('view-list');
        listContainer.classList.add('view-grid');
        currentView = 'grid';
    } else {
        // 从大图标网格切换回列表
        listContainer.classList.remove('view-grid');
        listContainer.classList.add('view-list');
        currentView = 'list';
    }
}

// 关闭模态框
function closeModal() {
    document.getElementById('module-modal').removeAttribute('open');
}