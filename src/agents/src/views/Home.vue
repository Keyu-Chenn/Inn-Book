<template>
  <div class="home-page-html-wrapper">

    <div class="container">
      <nav>
        <div class="logo">
          <a href="homepage.html" style="display: flex; align-items: center; text-decoration: none;">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="8" width="30" height="24" rx="2" fill="#c19a49" opacity="0.3" />
              <path d="M8 12 H32 M8 16 H28 M8 20 H30 M8 24 H25 M8 28 H22" stroke="#2c1e18" stroke-width="1.5" />
              <path d="M34 4 L36 6 L34 8 L32 6 Z" fill="#c19a49" />
              <path d="M20 4 L22 2 L24 4 L22 6 Z" fill="#c19a49" />
              <path d="M8 4 L10 2 L12 4 L10 6 Z" fill="#c19a49" />
              <path d="M28 36 L30 34 L32 36 L30 38 Z" fill="#c19a49" />
              <path d="M14 36 L16 34 L18 36 L16 38 Z" fill="#c19a49" />
            </svg>
            <h1>AI Book</h1>
          </a>
        </div>
        <ul class="nav-links">
          <li><a href="homepage.html" class="active">首页</a></li>
          <li><a href="creation-mode-list.html">创作模式</a></li>
          <li><a href="/game/launch.html">游戏模式</a></li>
          <li><a href="community-page.html">社区</a></li>
          <li><a href="help.html">帮助</a></li>
        </ul>
        <div class="user-info">
          <a href="dashboard-overview.html" class="avatar"> <!-- Link avatar to dashboard -->
            <svg viewBox="0 0 24 24" width="24" height="24" stroke-width="1.5" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
          <span class="username">李白</span>
        </div>
      </nav>
    </div>

    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h2>让AI书写你的奇幻世界</h2>
          <p class="hero-subtitle">用智能创作，让文字跃然纸上；通过游戏体验，让故事活在当下。AI Book让你的想象变为现实。</p>
          <div class="cta-buttons">
            <a href="creation-mode-list.html" class="btn btn-primary btn-large">开始创作</a>
            <a href="/game/launch.html" class="btn btn-outline btn-large">体验游戏</a>
          </div>
        </div>
        <!-- <div class="hero-image">
                <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20,20 C20,10 40,10 40,20 L40,140 C40,150 20,150 20,140 Z" fill="#e6dcbf" stroke="#5a4a3f" stroke-width="1"/>
                    <path d="M160,20 C160,10 180,10 180,20 L180,140 C180,150 160,150 160,140 Z" fill="#e6dcbf" stroke="#5a4a3f" stroke-width="1"/>
                    <rect x="20" y="20" width="140" height="120" fill="#f5f0e1" stroke="#5a4a3f" stroke-width="1"/>
                    <path d="M30,30 L150,30 M30,50 L130,50 M30,70 L140,70 M30,90 L120,90 M30,110 L145,110" stroke="#d4c8a8" stroke-width="1" opacity="0.5"/>
                    <circle cx="100" cy="80" r="25" fill="none" stroke="#c19a49" stroke-width="2"/>
                    <path d="M80,65 L120,95 M80,95 L120,65" stroke="#c19a49" stroke-width="2"/>
                    <path d="M100,55 L100,40 M100,105 L100,120 M75,80 L60,80 M140,80 L125,80" stroke="#c19a49" stroke-width="2"/>
                    <circle cx="100" cy="80" r="10" fill="#c19a49" opacity="0.3"/>
                    <path d="M150,30 L170,10" stroke="#5a4a3f" stroke-width="1.5"/>
                    <path d="M170,10 C175,5 180,15 170,20" fill="#5a4a3f"/>
                </svg>
            </div> -->
      </div>
    </section>

    <section class="modes">
      <div class="container">
        <div class="section-title">
          <h2>两种方式，无限可能</h2>
        </div>
        <div class="modes-container">
          <div class="mode-card">
            <!-- <div class="mode-icon">
                        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15" y="15" width="40" height="50" rx="3" fill="#e6dcbf" stroke="#5a4a3f" stroke-width="2"/>
                            <path d="M15,20 L55,20 M20,30 L50,30 M20,40 L45,40 M20,50 L50,50 M20,60 L40,60" stroke="#5a4a3f" stroke-width="1.5" opacity="0.7"/>
                            <path d="M60,20 L70,10" stroke="#5a4a3f" stroke-width="2"/>
                            <path d="M70,10 C75,5 80,15 70,20" fill="#5a4a3f"/>
                            <circle cx="35" cy="35" r="8" fill="#c19a49" opacity="0.3"/>
                        </svg>
                    </div> -->
            <div class="mode-content">
              <h3>创作模式</h3>
              <p>AI智能续写、角色塑造、情节建议和世界观构建，让你的创作如行云流水。无论科幻、奇幻还是现实主义，AI Book都将助你成为下一位畅销作家。</p>
              <a href="creation-mode-list.html" class="btn btn-primary">释放创作力</a>
            </div>
          </div>
          <div class="mode-card">
            <!-- <div class="mode-icon">
                        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10,20 L70,20 L60,60 L20,60 Z" fill="#e6dcbf" stroke="#5a4a3f" stroke-width="2"/>
                            <path d="M20,30 L60,30 M20,40 L60,40 M20,50 L60,50" stroke="#5a4a3f" stroke-width="1" opacity="0.5"/>
                            <path d="M30,25 L35,25 M45,25 L50,25 M40,35 L45,35 M25,45 L30,45 M50,45 L55,45" stroke="#c19a49" stroke-width="2"/>
                            <circle cx="40" cy="40" r="5" fill="#c19a49"/>
                            <path d="M40,30 L40,35 M35,40 L40,40 M40,40 L45,40 M40,40 L40,45" stroke="#5a4a3f" stroke-width="1.5"/>
                        </svg>
                    </div> -->
            <div class="mode-content">
              <h3>游戏模式</h3>
              <p>化身为故事中的角色或全知上帝，在你创造的世界中探索冒险。每一个选择都会改变剧情走向，AI实时推演因果，创造独一无二的沉浸式体验。</p>
              <a href="/game/launch.html" class="btn btn-primary">开启冒险</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>从想象到现实，只需一步</h2>
        <p>今天开始，让AI成为你的创作伙伴，让每一个故事都有机会被讲述，每一个世界都有机会被探索。</p>
        <a href="dashboard-overview.html" class="btn btn-primary btn-large">进入我的空间</a>
        <!-- Changed from Register to Dashboard -->
      </div>
    </section>

    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <a href="homepage.html" style="display: flex; align-items: center; text-decoration:none;">
              <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="8" width="20" height="14" rx="1" fill="#c19a49" opacity="0.3" />
                <path d="M8 12 H22 M8 15 H20 M8 18 H18" stroke="#e6dcbf" stroke-width="1" />
                <path d="M24 5 L25 4 L26 5 L25 6 Z" fill="#c19a49" />
                <path d="M15 5 L16 4 L17 5 L16 6 Z" fill="#c19a49" />
                <path d="M6 5 L7 4 L8 5 L7 6 Z" fill="#c19a49" />
                <path d="M20 25 L21 24 L22 25 L21 26 Z" fill="#c19a49" />
                <path d="M10 25 L11 24 L12 25 L11 26 Z" fill="#c19a49" />
              </svg>
              <h3>AI Book</h3>
            </a>
          </div>
          <ul class="footer-links">
            <li><a href="about.html">关于我们</a></li>
            <li><a href="terms.html">使用条款</a></li>
            <li><a href="privacy.html">隐私政策</a></li>
            <li><a href="help.html">帮助中心</a></li>
            <li><a href="contact.html">联系我们</a></li>
          </ul>
          <div class="copyright">
            &copy; 2025 AI Book. 保留所有权利。
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 可根据需要添加逻辑
</script>

<style scoped>
.home-page-html-wrapper {
  padding: 2rem;
}

:root {
  --parchment-light: #f5f0e1;
  --parchment-medium: #e6dcbf;
  --parchment-dark: #d4c8a8;
  --ink-light: #5a4a3f;
  --ink-dark: #2c1e18;
  --accent-gold: #c19a49;
  --accent-red: #8c3a2b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Serif SC', 'Microsoft YaHei', serif;
}

body {
  background-color: var(--parchment-light);
  color: var(--ink-dark);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: var(--parchment-dark);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo {
  display: flex;
  align-items: center;
}

.logo svg {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 24px;
  color: var(--ink-dark);
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 30px;
}

.nav-links a {
  text-decoration: none;
  color: var(--ink-light);
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--accent-gold);
}

/* User Info styling for logged-in state */
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--parchment-medium);
  /* Placeholder background */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--accent-gold);
  overflow: hidden;
  cursor: pointer;
}

.avatar a {
  /* Link styling for avatar */
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.avatar svg {
  /* Placeholder icon in avatar */
  stroke: var(--ink-dark);
}

.username {
  font-weight: 500;
  color: var(--ink-dark);
}

/* End User Info styling */

.btn {
  /* General button, might be reused or refined */
  padding: 8px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn-outline {
  border: 1px solid var(--ink-light);
  color: var(--ink-light);
  background: transparent;
}

.btn-outline:hover {
  background-color: var(--ink-light);
  color: var(--parchment-light);
}

.btn-primary {
  background-color: var(--accent-gold);
  color: var(--parchment-light);
  border: none;
}

.btn-primary:hover {
  background-color: #a88035;
}

.hero {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--parchment-medium);
  border-bottom: 3px solid var(--parchment-dark);
}

.hero-content {
  width: 60%;
  padding: 0 20px;
}

.hero h2 {
  font-size: 48px;
  margin-bottom: 20px;
  color: var(--ink-dark);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 18px;
  margin-bottom: 30px;
  color: var(--ink-light);
}

.cta-buttons {
  display: flex;
  gap: 20px;
}

.btn-large {
  padding: 12px 30px;
  font-size: 16px;
}

.hero-image {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image svg {
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.modes {
  padding: 80px 0;
  background-color: var(--parchment-light);
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}

.section-title h2 {
  font-size: 36px;
  color: var(--ink-dark);
  display: inline-block;
  padding-bottom: 10px;
  position: relative;
}

.section-title h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 3px;
  background-color: var(--accent-gold);
}

.modes-container {
  display: flex;
  gap: 40px;
  margin-top: 40px;
}

.mode-card {
  flex: 1;
  background-color: var(--parchment-medium);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
}

.mode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.mode-icon {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--parchment-light);
}

.mode-icon svg {
  width: 80px;
  height: 80px;
}

.mode-content {
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.mode-card h3 {
  font-size: 28px;
  margin-bottom: 15px;
  color: var(--ink-dark);
}

.mode-card p {
  margin-bottom: 30px;
  color: var(--ink-light);
  flex-grow: 1;
}

.cta-section {
  padding: 80px 0;
  background-color: var(--parchment-dark);
  text-align: center;
}

.cta-section h2 {
  font-size: 40px;
  margin-bottom: 20px;
  color: var(--ink-dark);
}

.cta-section p {
  font-size: 20px;
  margin-bottom: 30px;
  color: var(--ink-light);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

footer {
  background-color: var(--ink-dark);
  color: var(--parchment-light);
  padding: 40px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.footer-logo svg {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.footer-logo h3 {
  font-size: 20px;
  color: var(--parchment-light);
}

.footer-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.footer-links a {
  text-decoration: none;
  color: var(--parchment-light);
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 1;
  color: var(--accent-gold);
}

.copyright {
  opacity: 0.6;
  font-size: 14px;
  margin-top: 5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hero-content {
    width: 100%;
    text-align: center;
    padding: 0 10px;
  }

  .hero h2 {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-image {
    display: none;
  }

  .cta-buttons {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .cta-buttons .btn {
    width: 80%;
    max-width: 250px;
  }

  .hero {
    height: auto;
    padding: 60px 0;
  }

  .modes-container {
    flex-direction: column;
    gap: 30px;
  }

  .section-title h2 {
    font-size: 28px;
  }

  .mode-card h3 {
    font-size: 24px;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
  }
}
</style>