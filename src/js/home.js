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

let currentView = 'list';

function openModule(moduleKey, moduleTitle) {
    document.getElementById('modal-title').innerText = moduleTitle;
    const articles = fakeDatabase[moduleKey] || [];
    renderList(articles);
    document.getElementById('module-modal').setAttribute('open', 'true');
}

function renderList(articles) {
    const listContainer = document.getElementById('article-list');
    listContainer.innerHTML = ''; 

    if (articles.length === 0) {
        listContainer.innerHTML = '<p>这里空空如也...</p>';
        return;
    }

    articles.forEach(article => {
        const itemHtml = `
            <a href="/article.html?id=${article.id}" class="item">
                <div class="item-icon">${article.icon}</div>
                <div class="item-title"><strong>${article.title}</strong></div>
            </a>
        `;
        listContainer.innerHTML += itemHtml;
    });
}

function toggleView() {
    const listContainer = document.getElementById('article-list');
    if (currentView === 'list') {
        listContainer.classList.remove('view-list');
        listContainer.classList.add('view-grid');
        currentView = 'grid';
    } else {
        listContainer.classList.remove('view-grid');
        listContainer.classList.add('view-list');
        currentView = 'list';
    }
}

function closeModal() {
    document.getElementById('module-modal').removeAttribute('open');
}