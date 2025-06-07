<template>
    <footer class="app-footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-logo">
                    <a href="/homepage.html" class="footer-logo-link">
                        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="footer-logo-svg">
                            <rect x="5" y="8" width="20" height="14" rx="1" fill="#c19a49" opacity="0.3" />
                            <path d="M8 12 H22 M8 15 H20 M8 18 H18" stroke="#e6dcbf" stroke-width="1" />
                            <path d="M24 5 L25 4 L26 5 L25 6 Z" fill="#c19a49" />
                            <path d="M15 5 L16 4 L17 5 L16 6 Z" fill="#c19a49" />
                            <path d="M6 5 L7 4 L8 5 L7 6 Z" fill="#c19a49" />
                            <path d="M20 25 L21 24 L22 25 L21 26 Z" fill="#c19a49" />
                            <path d="M10 25 L11 24 L12 25 L11 26 Z" fill="#c19a49" />
                        </svg>
                        <h3 class="footer-logo-title">Inn Book</h3>
                    </a>
                </div>
                <ul class="footer-nav-links">
                    <li class="footer-nav-item">
                        <a href="/about.html" class="footer-nav-link">关于我们</a>
                    </li>
                    <li class="footer-nav-item">
                        <a href="/terms.html" class="footer-nav-link">使用条款</a>
                    </li>
                    <li class="footer-nav-item">
                        <a href="/privacy.html" class="footer-nav-link">隐私政策</a>
                    </li>
                    <li class="footer-nav-item">
                        <a href="/help.html" class="footer-nav-link">帮助中心</a>
                    </li>
                    <li class="footer-nav-item">
                        <a href="/contact.html" class="footer-nav-link">联系我们</a>
                    </li>
                </ul>
                <div class="footer-copyright">
                    &copy; 2025 AI Book. 保留所有权利。
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Footer 组件不需要任何 props 或逻辑
</script>

<style lang="scss" scoped>
/* 定义组件内部的颜色变量 */
.app-footer {
    --footer-parchment-light: #f5f0e1;
    --footer-parchment-medium: #e6dcbf;
    --footer-parchment-dark: #d4c8a8;
    --footer-ink-light: #5a4a3f;
    --footer-ink-dark: #2c1e18;
    --footer-accent-gold: #c19a49;
    --footer-accent-red: #8c3a2b;

    /* 使用负边距突破父容器限制，完全占据底部和左右空间 */
    position: relative !important;
    width: 100vw !important;
    margin-left: calc(-50vw + 50%) !important;
    margin-right: calc(-50vw + 50%) !important;
    margin-top: 50 !important;
    margin-bottom: 0 !important;
    padding: 40px 0 !important;
    box-sizing: border-box !important;

    /* 设置 footer 样式 */
    background-color: var(--footer-ink-dark) !important;
    color: var(--footer-parchment-light) !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
    line-height: 1.6 !important;
}

.footer-container {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 20px !important;
    box-sizing: border-box !important;
}

.footer-content {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
}

.footer-logo {
    display: flex !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
}

.footer-logo-link {
    display: flex !important;
    align-items: center !important;
    text-decoration: none !important;
    color: inherit !important;
    margin: 0 !important;
    padding: 0 !important;
}

.footer-logo-svg {
    height: 30px !important;
    width: 30px !important;
    margin-right: 10px !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-left: 0 !important;
    display: block !important;
}

.footer-logo-title {
    font-size: 20px !important;
    color: var(--footer-parchment-light) !important;
    font-weight: 500 !important;
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
}

.footer-nav-links {
    display: flex !important;
    list-style: none !important;
    gap: 20px !important;
    margin: 0 !important;
    padding: 0 !important;
    align-items: center !important;
}

.footer-nav-item {
    margin: 0 !important;
    padding: 0 !important;
}

.footer-nav-link {
    text-decoration: none !important;
    color: var(--footer-parchment-light) !important;
    opacity: 0.8 !important;
    transition: opacity 0.3s, color 0.3s !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    padding: 5px 8px !important;
    margin: 0 !important;
    border-radius: 3px !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
}

.footer-nav-link:hover {
    opacity: 1 !important;
    color: var(--footer-accent-gold) !important;
    background-color: transparent !important;
}

.footer-copyright {
    opacity: 0.6 !important;
    font-size: 14px !important;
    margin: 0 !important;
    padding: 0 !important;
    color: var(--footer-parchment-light) !important;
    font-family: 'Noto Serif SC', 'Microsoft YaHei', serif !important;
    line-height: 1.6 !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column !important;
        text-align: center !important;
        gap: 20px !important;
    }

    .footer-nav-links {
        justify-content: center !important;
        flex-wrap: wrap !important;
        gap: 15px !important;
    }

    .footer-nav-link {
        font-size: 13px !important;
        padding: 4px 6px !important;
    }

    .footer-copyright {
        margin-top: 10px !important;
        font-size: 13px !important;
    }

    .footer-logo-title {
        font-size: 18px !important;
    }

    .footer-logo-svg {
        height: 25px !important;
        width: 25px !important;
    }
}

/* 强制重写可能被全局样式影响的元素 */
.app-footer * {
    box-sizing: border-box !important;
}

.app-footer a {
    color: inherit !important;
    text-decoration: none !important;
}

.app-footer a:hover {
    color: var(--footer-accent-gold) !important;
}

.app-footer h3 {
    font-size: 20px !important;
    line-height: 1.2 !important;
    margin: 0 !important;
    padding: 0 !important;
    font-weight: 500 !important;
}

.app-footer ul {
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
}

.app-footer li {
    margin: 0 !important;
    padding: 0 !important;
}
</style>