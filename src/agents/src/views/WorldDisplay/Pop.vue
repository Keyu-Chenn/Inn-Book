<template>
    <div v-if="visible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="world-title">{{ worldData.name }}</h2>
                <button class="close-btn" @click="close" aria-label="关闭">
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="#d2b48c" stroke-width="2" fill="#fffbe6" />
                        <path d="M6 6L14 14M14 6L6 14" stroke="#8B4513" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="tabs">
                    <button v-for="tab in tabs" :key="tab.id" :class="['tab-btn', { active: activeTab === tab.id }]"
                        @click="activeTab = tab.id">
                        {{ tab.name }}
                    </button>
                </div>
                <div class="tab-content">
                    <div v-if="activeTab === 'essence'" class="tab-pane">
                        <div class="info-item">
                            <span class="label">核心吸引点：</span>
                            <p>{{ worldData.essence.core }}</p>
                        </div>
                        <div class="info-item">
                            <span class="label">主要题材：</span>
                            <p>{{ worldData.essence.genre }}</p>
                        </div>
                        <div class="info-item">
                            <span class="label">世界基调：</span>
                            <div class="tags">
                                <span v-for="tone in worldData.essence.tones" :key="tone" class="tag">{{ tone }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeTab === 'reality'" class="tab-pane">
                        <div class="info-item">
                            <span class="label">科技水平：</span>
                            <p>{{ worldData.reality.techLevel }}</p>
                        </div>
                        <div class="info-item">
                            <span class="label">地理环境概述：</span>
                            <p>{{ worldData.reality.geography }}</p>
                        </div>
                        <div class="info-item">
                            <span class="label">世界地图：</span>
                            <img v-if="worldData.reality.mapUrl" :src="worldData.reality.mapUrl" alt="世界地图"
                                class="map-image" />
                            <p v-else>未上传地图</p>
                        </div>
                        <div class="info-item">
                            <span class="label">特殊物理法则：</span>
                            <ul v-if="worldData.reality.physicalLaws && worldData.reality.physicalLaws.length"
                                class="physical-laws-list">
                                <li v-for="law in worldData.reality.physicalLaws" :key="law">{{ law }}</li>
                            </ul>
                            <p v-else>遵循现实物理法则</p>
                        </div>
                        <div class="info-item">
                            <span class="label">魔法/超自然力量体系：</span>
                            <p v-if="worldData.reality.magicSystem">{{ worldData.reality.magicSystem }}</p>
                            <p v-else>无</p>
                        </div>
                    </div>
                    <div v-if="activeTab === 'life'" class="tab-pane">
                        <div class="info-item">
                            <span class="label">智慧族群：</span>
                            <p v-if="worldData.life.races && worldData.life.races.length">{{
                                worldData.life.races.join(', ') }}</p>
                            <p v-else>主要为标准人类</p>
                        </div>
                        <div class="info-item">
                            <span class="label">社会结构与主要势力：</span>
                            <p>{{ worldData.life.society }}</p>
                        </div>
                        <div class="info-item">
                            <span class="label">关键历史背景/转折点：</span>
                            <p>{{ worldData.life.history }}</p>
                        </div>
                        <div v-if="worldData.characters && worldData.characters.length"
                            class="info-item world-characters-section">
                            <span class="label">主要人物：</span>
                            <div class="characters-list">
                                <div v-for="character in worldData.characters" :key="character.name"
                                    class="character-card">
                                    <img :src="character.portrait" class="character-avatar" />
                                    <div class="character-info">
                                        <div class="character-name">{{ character.name }}</div>
                                        <div class="character-occupation">{{ character.occupation }} · {{ character.race
                                            }}</div>
                                        <div class="character-desc">{{ character.personality }}｜{{ character.motivation
                                            }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    visible: Boolean,
    worldData: Object
});

const emit = defineEmits(['close']);

const activeTab = ref('essence');

const tabs = [
    { id: 'essence', name: '世界精粹' },
    { id: 'reality', name: '真实与奥秘' },
    { id: 'life', name: '生灵与传承' }
];

function close() {
    emit('close');
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    width: 70%;
    max-width: 900px;
    background: #FAF7F0;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(139, 69, 19, 0.13);
    overflow: hidden;
    position: relative;
    border: 4px double #d2b48c;
    /* 复古花纹边框（可选） */
    /* border-image: url('https://www.transparenttextures.com/patterns/old-mathematics.png') 30 repeat; */
}

.modal-content::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 16px;
    border: 2px solid #e6dcbf;
    z-index: 1;
}

.modal-content::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 16px;
    opacity: 0.08;
    background: url('https://www.transparenttextures.com/patterns/old-mathematics.png');
    /* 细腻纸张纹理 */
    z-index: 0;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.3rem 1.5rem 0.7rem 1.5rem;
    border-bottom: none;
    position: relative;
    background: transparent;
    z-index: 2;
}

.world-title {
    font-size: 2.1rem;
    font-family: 'STZhongsong', '华文中宋', serif;
    font-weight: bold;
    color: #8B4513;
    margin: 0;
    letter-spacing: 2px;
    text-shadow: 2px 2px 0 #f5e6c8, 0 1px 0 #fffbe6;
}

.close-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid #d2b48c;
    background: #fffbe6;
    color: #8B4513;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
    position: relative;
    z-index: 2;
    outline: none;
    padding: 0;
    overflow: visible;
}

.close-btn:hover {
    background: #f9f6ef;
    border-color: #8B4513;
    color: #c19a49;
}

.close-btn svg {
    width: 70%;
    height: 70%;
    display: block;
    vertical-align: middle;
    margin: auto;
}

/* 装饰性分割线 */
.modal-header::after {
    content: '';
    display: block;
    position: absolute;
    left: 1.5rem;
    right: 1.5rem;
    bottom: -0.3rem;
    height: 6px;
    background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(193, 154, 73, 0.13);
    z-index: 1;
}

.modal-body {
    padding: 1.5rem 2rem 2rem 2rem;
    background: transparent;
    z-index: 2;
    position: relative;
}

.tabs {
    display: flex;
    gap: 1.2rem;
    border-bottom: none;
    margin-bottom: 1.5rem;
    justify-content: flex-start;
    position: relative;
    z-index: 2;
}

.tab-btn {
    padding: 0.6rem 1.6rem 0.6rem 1.6rem;
    background: #f9f6ef;
    border: none;
    border-radius: 12px 12px 0 0;
    font-weight: bold;
    font-family: 'STZhongsong', '华文中宋', serif;
    font-size: 1.08rem;
    color: #8B4513;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.07);
    margin-bottom: -2px;
    position: relative;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

.tab-btn.active {
    background: #fffbe6;
    color: #c19a49;
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.10);
    z-index: 3;
}

.tab-btn:not(.active):hover {
    background: #f5e6c8;
    color: #8B4513;
}

.tab-content {
    padding: 1.2rem 0 0 0;
}

.info-item {
    margin-bottom: 1.2rem;
}

.label {
    font-weight: bold;
    color: #8B4513;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.tag {
    background: #fffbe6;
    padding: 0.25rem 0.8rem;
    border-radius: 8px;
    color: #8B4513;
    font-family: 'STZhongsong', '华文中宋', serif;
    font-size: 1rem;
    box-shadow: 0 1px 4px rgba(139, 69, 19, 0.06);
    margin: 0 0.2rem;
}

.map-image {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.physical-laws-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
}

.physical-laws-list li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.2em 0;
    font-size: 1rem;
    color: #8B4513;
    position: relative;
    padding-left: 1.5em;
}

.physical-laws-list li::before {
    content: '';
    display: inline-block;
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    background: #d2b48c;
    margin-right: 0.7em;
    position: absolute;
    left: 0.2em;
    top: 50%;
    transform: translateY(-50%);
}

.world-characters-section {
    margin-top: 2rem;
}

.characters-title {
    font-size: 1.1rem;
    color: #8B4513;
    font-family: 'STZhongsong', '华文中宋', serif;
    margin-bottom: 0.7rem;
}

.characters-list {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.character-card {
    background: #fffbe6;
    border: 2px solid #d2b48c;
    border-radius: 12px;
    padding: 1rem 1.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 180px;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
}

.character-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #d2b48c;
}

.character-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.character-name {
    font-family: 'STZhongsong', '华文中宋', serif;
    font-size: 1.1rem;
    color: #8B4513;
    font-weight: bold;
}

.character-occupation {
    font-size: 0.95rem;
    color: #bfa97a;
}

.character-desc {
    font-size: 0.92rem;
    color: #a88b5a;
    margin-top: 0.2rem;
}
</style>
