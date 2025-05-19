<template>
    <div class="logo">
        <h1>WORLD EXHIBITION</h1>
    </div>
    <div class="world-display-layout">
        <!-- 页面标题 -->
        <div class="page-header">
            <h1 class="page-title">
                <svg class="title-icon" viewBox="0 0 32 32" width="32" height="32">
                    <path d="M16 2L20 12H12L16 2Z" fill="#c19a49" />
                    <circle cx="16" cy="24" r="6" fill="#fff" stroke="#c19a49" stroke-width="2" />
                </svg>
                世界观档案室
            </h1>
            <div class="title-underline"></div>
        </div>

        <div class="world-display-content">
            <!-- 主要内容区 -->
            <main class="worlds-panel">
                <!-- 搜索区 -->
                <div class="search-box">
                    <div class="custom-search">
                        <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path
                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                                fill="#8B4513" />
                        </svg>
                        <input v-model="searchQuery" type="text" placeholder="搜索世界观名称..." />
                    </div>
                </div>
                <!-- 筛选区 -->
                <div class="filter-row">
                    <div class="custom-select-group">
                        <div class="custom-select-wrapper">
                            <select v-model="selectedGenre" class="custom-select">
                                <option value="">题材风格</option>
                                <option v-for="genre in genreOptions" :key="genre" :value="genre">{{ genre }}</option>
                            </select>
                        </div>
                        <div class="custom-select-wrapper">
                            <select v-model="selectedStatus" class="custom-select">
                                <option value="">世界状态</option>
                                <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}
                                </option>
                            </select>
                        </div>
                        <div class="custom-select-wrapper">
                            <select v-model="sortBy" class="custom-select">
                                <option value="">排序方式</option>
                                <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- 世界观卡片网格 -->
                <div class="worlds-grid">
                    <!-- 新建世界卡片 -->
                    <div class="world-card create-card" @click="createNewWorld">
                        <div class="scroll-pattern"></div>
                        <div class="card-content">
                            <div class="plus-icon">＋</div>
                            <h3>创建新世界</h3>
                            <p>开始构建你的新宇宙</p>
                        </div>
                    </div>
                    <!-- 世界卡片列表 -->
                    <div v-for="world in sortedAndFilteredWorlds" :key="world.id" class="world-card"
                        @click="viewWorld(world)">
                        <div class="world-image">
                            <img :src="world.image || defaultImage" :alt="world.name" />
                            <div class="card-actions">
                                <button class="action-btn edit-btn" @click.stop="editWorld(world)">
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <circle cx="12" cy="12" r="9" fill="#fffbe6" stroke="#d2b48c"
                                            stroke-width="2" />
                                        <path
                                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                            fill="#8B4513" />
                                    </svg>
                                </button>
                                <button class="action-btn view-btn" @click.stop="viewWorld(world)">
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <circle cx="12" cy="12" r="9" fill="#fffbe6" stroke="#d2b48c"
                                            stroke-width="2" />
                                        <path
                                            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                                            fill="#8B4513" />
                                    </svg>
                                </button>
                                <button class="action-btn delete-btn" @click.stop="deleteWorld(world)">
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <circle cx="12" cy="12" r="9" fill="#fffbe6" stroke="#d2b48c"
                                            stroke-width="2" />
                                        <path
                                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                            fill="#8B4513" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="world-name">{{ world.name }}</h3>
                            <p class="world-desc">{{ world.description }}</p>
                            <div class="world-tags">
                                <span class="custom-tag genre-tag">{{ world.genre }}</span>
                                <span class="custom-tag status-tag">{{ world.status }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <!-- 右侧统计与快速编辑区 -->
            <aside class="stats-panel">
                <div class="stats-card">
                    <h3>创作统计</h3>
                    <div class="stat-item">
                        <div class="stat-icon-wrapper">
                            <svg class="stat-icon" viewBox="0 0 24 24" width="24" height="24">
                                <circle cx="12" cy="12" r="10" fill="#f9f6ef" />
                                <path
                                    d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"
                                    fill="#8B4513" />
                            </svg>
                        </div>
                        <div class="stat-info">
                            <span class="stat-label">已创造世界</span>
                            <span class="stat-value">{{ stats.totalWorlds }}</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon-wrapper">
                            <svg class="stat-icon" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8B4513"
                                    stroke-width="2" fill="none" />
                            </svg>
                        </div>
                        <div class="stat-info">
                            <span class="stat-label">最常用题材</span>
                            <span class="stat-value">{{ stats.mostUsedGenre }}</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon-wrapper">
                            <svg class="stat-icon" viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v6h-2zm0 8h2v2h-2z"
                                    fill="#8B4513" />
                            </svg>
                        </div>
                        <div class="stat-info">
                            <span class="stat-label">总角色数</span>
                            <span class="stat-value">{{ stats.totalCharacters }}</span>
                        </div>
                    </div>
                </div>
                <div class="quick-edit-card">
                    <h3>快速编辑</h3>
                    <div v-if="sortedAndFilteredWorlds.length" class="quick-edit-content">
                        <div class="quick-edit-title">{{ sortedAndFilteredWorlds[0].name }}</div>
                        <div class="quick-edit-desc">{{ sortedAndFilteredWorlds[0].description }}</div>
                        <button class="quick-edit-btn" @click="editWorld(sortedAndFilteredWorlds[0])">继续编辑</button>
                    </div>
                    <div v-else class="quick-edit-content empty">暂无可编辑世界</div>
                </div>
            </aside>
        </div>
        <Pop :visible="showModal" :worldData="selectedWorld" @close="closeModal" />
        <div v-if="showDeleteModal" class="modal-overlay">
            <div class="delete-modal">
                <div class="modal-header">
                    <h2 class="world-title">删除世界</h2>
                    <button class="close-btn" @click="cancelDelete" aria-label="关闭">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6L14 14M14 6L6 14" stroke="#8B4513" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body" style="text-align:center;">
                    <p style="font-size:1.1rem;color:#8B4513;">确定要删除世界"{{ worldToDelete?.name }}"吗？此操作不可撤销。</p>
                    <div style="margin-top:2rem;display:flex;justify-content:center;gap:2rem;">
                        <button class="quick-edit-btn delete-confirm-btn" @click="confirmDelete">确认删除</button>
                        <button class="quick-edit-btn delete-cancel-btn" @click="cancelDelete">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import defaultImage from '@/assets/img/纪念碑谷.jpg'
import Pop from './Pop.vue'
import worldDetails from './presetWorld.js'

const router = useRouter()

// 搜索和筛选状态
const searchQuery = ref('')
const selectedGenre = ref('')
const selectedStatus = ref('')
const sortBy = ref('')

// 排序选项
const sortOptions = [
    { label: '创建时间（最新）', value: 'created_desc' },
    { label: '创建时间（最旧）', value: 'created_asc' },
    { label: '修改时间（最新）', value: 'modified_desc' },
    { label: '修改时间（最旧）', value: 'modified_asc' },
    { label: '名称（A-Z）', value: 'name_asc' },
    { label: '名称（Z-A）', value: 'name_desc' }
]

// 统计数据
const stats = ref({
    totalWorlds: 12,
    mostUsedGenre: '奇幻',
    totalCharacters: 156
})

// 选项数据
const genreOptions = [
    '奇幻', '科幻', '现代', '历史', '武侠', '仙侠', '都市', '校园', '末日', '架空'
]

const statusOptions = [
    '构思中', '草稿', '进行中', '已完成'
]

// 示例数据
const worlds = ref([
    {
        id: 1,
        name: '星辰大海',
        description: '一个充满未知与探索的科幻世界，人类文明已经发展到了星际时代...',
        genre: '科幻',
        status: '进行中',
        image: defaultImage,
        createdAt: '2024-03-15',
        modifiedAt: '2024-03-20'
    },
    {
        id: 2,
        name: '魔法学院',
        description: '在这个世界中，魔法是真实存在的，年轻的魔法师们在古老的学院中学习...',
        genre: '奇幻',
        status: '已完成',
        image: defaultImage,
        createdAt: '2024-03-10',
        modifiedAt: '2024-03-18'
    },
    {
        id: 3,
        name: '末日求生',
        description: '一场突如其来的灾难改变了世界，幸存者们在这个残酷的新世界中挣扎求生...',
        genre: '末日',
        status: '构思中',
        image: defaultImage,
        createdAt: '2024-03-05',
        modifiedAt: '2024-03-05'
    },
    {
        id: 4,
        name: '江湖风云',
        description: '一个充满侠义与恩怨的武侠世界，各大门派之间的明争暗斗从未停歇...',
        genre: '武侠',
        status: '草稿',
        image: defaultImage,
        createdAt: '2024-03-01',
        modifiedAt: '2024-03-12'
    },
    {
        id: 5,
        name: '未来都市',
        description: '在科技高度发达的未来，人类与人工智能共同生活在这个充满可能性的城市中...',
        genre: '科幻',
        status: '进行中',
        image: defaultImage,
        createdAt: '2024-02-28',
        modifiedAt: '2024-03-19'
    }
])

// 过滤和排序后的世界列表
const sortedAndFilteredWorlds = computed(() => {
    let filtered = worlds.value.filter(world => {
        const matchesSearch = world.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesGenre = !selectedGenre.value || world.genre === selectedGenre.value
        const matchesStatus = !selectedStatus.value || world.status === selectedStatus.value
        return matchesSearch && matchesGenre && matchesStatus
    })

    if (sortBy.value) {
        const [field, order] = sortBy.value.split('_')
        filtered.sort((a, b) => {
            let comparison = 0
            if (field === 'name') {
                comparison = a.name.localeCompare(b.name)
            } else if (field === 'created') {
                comparison = new Date(a.createdAt) - new Date(b.createdAt)
            } else if (field === 'modified') {
                comparison = new Date(a.modifiedAt) - new Date(b.modifiedAt)
            }
            return order === 'desc' ? -comparison : comparison
        })
    }

    return filtered
})

// 标签样式
function getGenreTagType(genre) {
    const types = {
        '奇幻': 'success',
        '科幻': 'info',
        '现代': 'warning',
        '历史': 'danger',
        '武侠': 'success',
        '仙侠': 'info',
        '都市': 'warning',
        '校园': 'danger',
        '末日': 'success',
        '架空': 'info'
    }
    return types[genre] || ''
}

function getStatusTagType(status) {
    const types = {
        '构思中': 'info',
        '草稿': 'warning',
        '进行中': 'success',
        '已完成': 'danger'
    }
    return types[status] || ''
}

// 卡片操作函数
function createNewWorld() {
    router.push('/world/create')
}

function editWorld(world) {
    // 1. 查找详细数据
    const detail = worldDetails.find(w => w.id === world.id)
    if (detail) {
        // 2. 存入localStorage
        localStorage.setItem('worldEditData', JSON.stringify(detail))
    }
    // 3. 跳转到世界设定页面
    router.push('/world-setting')
}

function viewWorld(world) {
    selectedWorld.value = worldDetails.find(w => w.id === world.id)
    showModal.value = true
}

// 新增删除弹窗相关状态
const showDeleteModal = ref(false)
const worldToDelete = ref(null)

function deleteWorld(world) {
    showDeleteModal.value = true
    worldToDelete.value = world
}

function confirmDelete() {
    if (worldToDelete.value) {
        const idx = worlds.value.findIndex(w => w.id === worldToDelete.value.id)
        if (idx !== -1) worlds.value.splice(idx, 1)
        showDeleteModal.value = false
        worldToDelete.value = null
    }
}

function cancelDelete() {
    showDeleteModal.value = false
    worldToDelete.value = null
}

// 模态框控制逻辑
const showModal = ref(false)
const selectedWorld = ref(null)

function closeModal() {
    showModal.value = false
}
</script>

<style scoped>
:root {
    --primary-color: #8B4513;
    --secondary-color: #d2b48c;
    --bg-light: #f9f6ef;
    --card-gradient: linear-gradient(135deg, #fffbe6 70%, #f5f5dc 100%);
    --text-main: #6b4c1b;
    --text-secondary: #bfa97a;
    --border-default: #d2b48c;
    --border-active: #8B4513;
}

.world-display-layout {
    min-height: 100vh;
    background: #f8f5ef;
    padding: 2rem 3vw;
}

.page-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.page-title {
    display: inline-flex;
    align-items: center;
    font-family: 'STZhongsong', '华文中宋', serif;
    font-size: 2.8rem;
    color: var(--primary-color);
    letter-spacing: 3px;
    font-weight: bold;
    margin-bottom: 0.2rem;
    text-shadow: 3px 3px 0 rgba(139, 69, 19, 0.13);
}

.title-icon {
    margin-right: 0.7rem;
}

.title-underline {
    width: 180px;
    height: 6px;
    margin: 0.2rem auto 0 auto;
    background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(193, 154, 73, 0.13);
}

.world-display-content {
    display: flex;
    gap: 2rem;
    max-width: 1600px;
    margin: 0 auto;
}

.worlds-panel {
    flex: 1;
    min-width: 0;
    max-width: 900px;
    margin: 0 auto;
}

.search-box {
    margin-bottom: 0.5rem;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.custom-search {
    position: relative;
    width: 100%;
}

.custom-search input {
    width: 100%;
    padding: 0.8em 1em 0.8em 2.8em;
    border: 2px solid #d2b48c;
    border-radius: 12px;
    font-size: 1rem;
    color: var(--primary-color);
    background: transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'STZhongsong', '华文中宋', serif;
    box-sizing: border-box;
}

.custom-search input:focus {
    border-color: var(--border-active);
    background: #fff;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.1);
}

.search-icon {
    position: absolute;
    left: 0.8em;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.filter-row {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-bottom: 1.2rem;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.custom-select-group {
    display: flex;
    gap: 1rem;
}

.custom-select-wrapper {
    flex: 1;
}

.custom-select {
    width: 100%;
    padding: 0.6em 1em;
    border: 2px solid #d2b48c;
    border-radius: 12px;
    font-size: 1rem;
    color: var(--primary-color);
    background: transparent;
    font-family: 'STZhongsong', '华文中宋', serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
}

.custom-select:focus {
    border-color: var(--border-active);
    outline: none;
    background: #fff;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.1);
}

.worlds-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.world-card {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    border: 2px solid #f5e6c8;
}

.world-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(139, 69, 19, 0.12);
    border-color: var(--primary-color);
}

.world-image {
    height: 180px;
    overflow: hidden;
    background: #f9f6ef;
    position: relative;
}

.world-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 2;
}

.world-card:hover .card-actions {
    opacity: 1;
}

.action-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid var(--secondary-color);
    background: var(--primary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, border-color 0.2s;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.10);
    padding: 0;
}

.action-btn svg {
    display: block;
}

.action-btn:hover {
    background: #fffbe6;
    border-color: var(--primary-color);
}

.edit-btn:hover svg path,
.view-btn:hover svg path,
.delete-btn:hover svg path {
    fill: var(--primary-color);
}

.card-content {
    padding: 1.2rem;
}

.world-name {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-family: 'STZhongsong', '华文中宋', serif;
}

.world-desc {
    color: var(--text-main);
    font-size: 0.98rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.world-tags {
    display: flex;
    gap: 0.5rem;
}

.custom-tag {
    display: inline-block;
    padding: 0.2em 0.9em;
    border-radius: 12px;
    font-size: 0.95rem;
    font-family: 'STZhongsong', '华文中宋', serif;
    background: #f9f6ef;
    color: var(--primary-color);
    border: 1.5px solid var(--secondary-color);
    margin-right: 0.3em;
}

.genre-tag {
    background: #f9f6ef;
    color: var(--primary-color);
}

.status-tag {
    background: #e6f9e6;
    color: #4caf50;
    border-color: #b2e6b2;
}

.create-card {
    position: relative;
    background: #f9f6f1;
    border: 2px dashed var(--secondary-color);
    overflow: hidden;
    border-radius: 20px;
}

.scroll-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
        linear-gradient(45deg, #e6dcbf 25%, transparent 25%),
        linear-gradient(-45deg, #e6dcbf 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #e6dcbf 75%),
        linear-gradient(-45deg, transparent 75%, #e6dcbf 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    opacity: 0.1;
}

.create-card .card-content {
    text-align: center;
}

.plus-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.create-card h3 {
    color: var(--primary-color);
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    font-family: 'STZhongsong', '华文中宋', serif;
}

.create-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.stats-panel {
    width: 320px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.stats-card {
    background: #fff;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.08);
    border: 2px solid #f5e6c8;
}

.stats-card h3 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    font-family: 'STZhongsong', '华文中宋', serif;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #f5e6c8;
}

.stat-icon-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f6ef;
    border-radius: 50%;
}

.stat-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.stat-label {
    color: var(--primary-color);
    font-size: 0.95rem;
    font-family: 'STZhongsong', '华文中宋', serif;
}

.stat-value {
    color: var(--primary-color);
    font-weight: bold;
    font-size: 1.1rem;
    font-family: 'STZhongsong', '华文中宋', serif;
}

.quick-edit-card {
    background: #fffbe6;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
    padding: 1.2rem 1.5rem 1.5rem 1.5rem;
    border: 2px solid #f5e6c8;
}

.quick-edit-card h3 {
    color: var(--primary-color);
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
    font-family: 'STZhongsong', '华文中宋', serif;
}

.quick-edit-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.quick-edit-title {
    font-size: 1.1rem;
    color: var(--primary-color);
    font-family: 'STZhongsong', '华文中宋', serif;
    font-weight: bold;
}

.quick-edit-desc {
    color: var(--text-main);
    font-size: 0.98rem;
    margin-bottom: 0.7rem;
}

.quick-edit-btn {
    background: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'STZhongsong', '华文中宋', serif;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5em 1.5em;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.10);
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    cursor: pointer;
}

.quick-edit-btn:hover {
    background: #fffbe6;
    color: var(--primary-color);
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
}

.quick-edit-content.empty {
    color: var(--text-secondary);
    text-align: center;
    font-size: 1rem;
    padding: 1.2rem 0;
}

@media (max-width: 1200px) {
    .world-display-content {
        flex-direction: column;
    }

    .stats-panel {
        width: 100%;
        flex-direction: row;
        gap: 2rem;
    }
}

@media (max-width: 768px) {
    .custom-select-group {
        flex-direction: column;
        gap: 0.7rem;
    }

    .stats-panel {
        flex-direction: column;
        gap: 1.2rem;
    }

    .stat-icon-wrapper {
        width: 32px;
        height: 32px;
    }

    .action-btn {
        width: 32px;
        height: 32px;
    }
}

.modal-overlay {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
}

.delete-modal {
    width: 90vw;
    max-width: 420px;
    min-width: 320px;
    border: 4px double #d2b48c;
    background: #FAF7F0;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(139, 69, 19, 0.13);
    position: relative;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-direction: column;
}

.delete-modal .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.3rem 1.5rem 0.7rem 1.5rem;
    border-bottom: none;
    background: transparent;
    z-index: 2;
}

.delete-modal .world-title {
    font-size: 2.1rem;
    font-family: 'STZhongsong', '华文中宋', serif;
    font-weight: bold;
    color: #8B4513;
    margin: 0;
    letter-spacing: 2px;
    text-shadow: 2px 2px 0 #f5e6c8, 0 1px 0 #fffbe6;
}

.delete-modal .close-btn {
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

.delete-modal .close-btn svg {
    width: 70%;
    height: 70%;
    display: block;
    vertical-align: middle;
    margin: auto;
}

.delete-modal .close-btn:hover {
    background: #f9f6ef;
    border-color: #8B4513;
    color: #c19a49;
}

.delete-modal .modal-body {
    padding: 1.5rem 2rem 2rem 2rem;
    background: transparent;
    z-index: 2;
    position: relative;
    text-align: center;
}

.delete-confirm-btn {
    background: #d9534f;
    color: #fff;
}

.delete-confirm-btn:hover {
    background: #b52a1d;
    color: #fff;
}

.delete-cancel-btn {
    background: #fffbe6;
    color: #8B4513;
    border: 1.5px solid #d2b48c;
}

.delete-cancel-btn:hover {
    background: #f9f6ef;
    color: #8B4513;
}

.logo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.logo h1 {
    font-family: var(--font-logo, 'STZhongsong', '华文中宋', serif);
    font-size: 4.5rem;
    color: var(--primary-color, #8B4513);
    margin: 0;
    text-shadow: 4px 4px 0 rgba(139, 69, 19, 0.2);
    transform: rotate(-2deg);
    transition: all 0.3s ease;
    letter-spacing: 2px;
}

.logo h1:hover {
    transform: rotate(0deg) scale(1.05);
    text-shadow: 5px 5px 0 rgba(139, 69, 19, 0.3);
}

@media (max-width: 768px) {
    .logo h1 {
        font-size: 3.5rem;
        text-align: center;
    }
}
</style>