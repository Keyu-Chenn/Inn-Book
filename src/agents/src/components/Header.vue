<template>
    <header class="app-header">
        <div class="header-container">
            <nav class="header-nav">
                <div class="header-logo">
                    <a href="/homepage.html" class="logo-link">
                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
                            <rect x="5" y="8" width="30" height="24" rx="2" fill="#c19a49" opacity="0.3" />
                            <path d="M8 12 H32 M8 16 H28 M8 20 H30 M8 24 H25 M8 28 H22" stroke="#2c1e18"
                                stroke-width="1.5" />
                            <path d="M34 4 L36 6 L34 8 L32 6 Z" fill="#c19a49" />
                            <path d="M20 4 L22 2 L24 4 L22 6 Z" fill="#c19a49" />
                            <path d="M8 4 L10 2 L12 4 L10 6 Z" fill="#c19a49" />
                            <path d="M28 36 L30 34 L32 36 L30 38 Z" fill="#c19a49" />
                            <path d="M14 36 L16 34 L18 36 L16 38 Z" fill="#c19a49" />
                        </svg>
                        <h1 class="logo-title">Inn Book</h1>
                    </a>
                </div>
                <ul class="header-nav-links">
                    <li class="nav-item">
                        <a href="/homepage.html" class="nav-link"
                            :class="{ 'nav-active': currentPage === 'home' }">首页</a>
                    </li>
                    <li class="nav-item">
                        <a href="/creation-mode-list.html" class="nav-link"
                            :class="{ 'nav-active': currentPage === 'creation' }">创作模式</a>
                    </li>
                    <li class="nav-item">
                        <a href="/game/launch.html" class="nav-link"
                            :class="{ 'nav-active': currentPage === 'game' }">游戏模式</a>
                    </li>
                    <li class="nav-item">
                        <a href="/community-page.html" class="nav-link"
                            :class="{ 'nav-active': currentPage === 'community' }">社区</a>
                    </li>
                    <li class="nav-item">
                        <a href="/help.html" class="nav-link" :class="{ 'nav-active': currentPage === 'help' }">帮助</a>
                    </li>
                </ul>
                <div class="header-user-info">
                    <a href="/dashboard-overview.html" class="user-avatar">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke-width="1.5" fill="none"
                            class="avatar-svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>
                    <span class="header-username">{{ username }}</span>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
defineProps({
    currentPage: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: '李白'
    }
})
</script>

<style lang="scss" scoped>
/* 定义组件内部的颜色变量，避免依赖外部 */
.app-header {
    --header-parchment-light: #f5f0e1;
    --header-parchment-medium: #e6dcbf;
    --header-parchment-dark: #d4c8a8;
    --header-ink-light: #5a4a3f;
    --header-ink-dark: #2c1e18;
    --header-accent-gold: #c19a49;
    --header-accent-red: #8c3a2b;

    /* 确保完全占据顶部和左右空间 */
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    z-index: 1000 !important;

    /* 设置 header 样式 */
    background-color: var(--header-parchment-dark) !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
    line-height: 1.6 !important;
    color: var(--header-ink-dark) !important;
}

.header-container {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 20px !important;
    box-sizing: border-box !important;
}

.header-nav {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 15px 0 !important;
    margin: 0 !important;
    box-sizing: border-box !important;
}

.header-logo {
    display: flex !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
}

.logo-link {
    display: flex !important;
    align-items: center !important;
    text-decoration: none !important;
    color: inherit !important;
    margin: 0 !important;
    padding: 0 !important;
}

.logo-svg {
    height: 40px !important;
    width: 40px !important;
    margin-right: 10px !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-left: 0 !important;
    display: block !important;
}

.logo-title {
    font-size: 24px !important;
    color: var(--header-ink-dark) !important;
    font-weight: bold !important;
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.1 !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
}

.header-nav-links {
    display: flex !important;
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
    align-items: center !important;
}

.nav-item {
    margin-left: 30px !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: 0 !important;
    padding: 0 !important;
}

.nav-link {
    text-decoration: none !important;
    color: var(--header-ink-light) !important;
    font-weight: 500 !important;
    font-size: 16px !important;
    transition: color 0.3s !important;
    padding: 8px 12px !important;
    margin: 0 !important;
    border-radius: 4px !important;
    display: block !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
}

.nav-link:hover,
.nav-link.nav-active {
    color: var(--header-accent-gold) !important;
    background-color: transparent !important;
}

.header-user-info {
    display: flex !important;
    align-items: center !important;
    gap: 15px !important;
    margin: 0 !important;
    padding: 0 !important;
}

.user-avatar {
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% !important;
    background-color: var(--header-parchment-medium) !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    border: 2px solid var(--header-accent-gold) !important;
    overflow: hidden !important;
    cursor: pointer !important;
    text-decoration: none !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
}

.avatar-svg {
    stroke: var(--header-ink-dark) !important;
    width: 24px !important;
    height: 24px !important;
    margin: 0 !important;
    padding: 0 !important;
}

.header-username {
    font-weight: 500 !important;
    color: var(--header-ink-dark) !important;
    margin: 0 !important;
    padding: 0 !important;
    font-size: 16px !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
    line-height: 1.6 !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .header-nav-links {
        display: none !important;
    }

    .header-container {
        padding: 0 10px !important;
    }

    .header-user-info {
        gap: 10px !important;
    }

    .header-username {
        font-size: 14px !important;
    }

    .nav-item {
        margin-left: 15px !important;
    }
}

/* 强制重写可能被全局样式影响的元素 */
.app-header * {
    box-sizing: border-box !important;
}

.app-header a {
    color: inherit !important;
    font-weight: inherit !important;
}

.app-header a:hover {
    color: var(--header-accent-gold) !important;
}

.app-header h1 {
    font-size: 24px !important;
    line-height: 1.1 !important;
    margin: 0 !important;
    padding: 0 !important;
}

.app-header button {
    /* 如果有按钮元素，重置其样式 */
    all: unset !important;
}
</style>