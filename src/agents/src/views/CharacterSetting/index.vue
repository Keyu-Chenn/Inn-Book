<template>
  <div class="character-archives-layout">
    <!-- 全局页眉 -->
    <header class="global-header">
      <div class="header-left">
        <span class="logo-title">
          <svg class="logo-icon" viewBox="0 0 32 32" width="36" height="36">
            <circle cx="16" cy="16" r="14" fill="#c19a49" opacity="0.25" />
            <path d="M8 16a8 8 0 1 1 16 0 8 8 0 1 1-16 0" fill="#fff" />
            <path d="M16 10a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" fill="#c19a49" />
          </svg>
          Character Archives
        </span>
      </div>
      <div class="header-actions">
        <el-button class="fancy-button" type="primary" @click="saveAll">保存所有角色</el-button>
        <el-button class="fancy-button" type="primary" @click="exportAll">导出角色数据</el-button>
      </div>
    </header>

    <!-- 主标题 -->
    <div class="main-title-wrapper">
      <h1 class="main-title">
        <svg class="title-icon" viewBox="0 0 32 32" width="32" height="32">
          <path d="M16 2L20 12H12L16 2Z" fill="#c19a49" />
          <circle cx="16" cy="24" r="6" fill="#fff" stroke="#c19a49" stroke-width="2" />
        </svg>
        角色档案室
      </h1>
      <div class="title-underline"></div>
    </div>

    <div class="character-setting-layout">
      <!-- 左侧角色档案索引区 -->
      <aside class="character-roster-panel">
        <div class="roster-header">
          <button class="new-character-btn" @click="addCharacter">
            <span class="plus">＋</span> 新建角色档案
          </button>
        </div>
        <ul class="character-list">
          <li v-for="(character, idx) in characters" :key="character.id"
            :class="['character-list-item', { selected: idx === selectedIdx }]" @click="selectCharacter(idx)">
            <div class="avatar-placeholder" v-if="!character.portrait">
              <svg viewBox="0 0 48 48" width="44" height="44">
                <circle cx="24" cy="24" r="22" fill="#e0e0e0" />
                <ellipse cx="24" cy="20" rx="9" ry="9" fill="#c19a49" opacity="0.3" />
                <ellipse cx="24" cy="36" rx="13" ry="7" fill="#c19a49" opacity="0.15" />
              </svg>
            </div>
            <div class="avatar-image" v-else>
              <img :src="character.portrait" alt="角色头像" />
            </div>
            <span class="character-name">{{ character.name || '未命名角色' }}</span>
            <el-icon class="delete-icon" @click.stop="deleteCharacter(idx)">
              <Delete />
            </el-icon>
          </li>
        </ul>
      </aside>

      <!-- 右侧角色详细档案区 -->
      <main class="character-details-panel">
        <template v-if="selectedIdx === null">
          <div class="empty-details">
            <h2>欢迎来到角色档案室</h2>
            <p>请从左侧选择一个角色档案进行查看与编辑，<br>或点击"新建角色档案"来开始塑造你的传奇人物吧！</p>
          </div>
        </template>
        <template v-else>
          <Details v-if="selectedIdx !== null" :key="characters[selectedIdx]?.id || selectedIdx"
            v-model="characters[selectedIdx]" />
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import Details from './Details.vue'
import presetCharacters from './presetCharacters.js'

let idSeed = 1
const characters = ref([])
const selectedIdx = ref(null)

onMounted(() => {
  if (characters.value.length === 0) {
    characters.value = presetCharacters.map(c => ({ ...c }))
    idSeed = Math.max(...characters.value.flatMap(c => c.relations?.map(r => r.id) || [0]), 0) + 1
    selectedIdx.value = 0
  }
})

function addCharacter() {
  characters.value.push({
    id: idSeed++,
    name: ''
  })
  selectedIdx.value = characters.value.length - 1
}

function selectCharacter(idx) {
  selectedIdx.value = idx
}

function deleteCharacter(idx) {
  characters.value.splice(idx, 1)
  if (selectedIdx.value === idx) {
    selectedIdx.value = null
  } else if (selectedIdx.value > idx) {
    selectedIdx.value--
  }
}

function saveAll() {
  // 保存所有角色逻辑
  alert('保存所有角色（示例）')
}
function exportAll() {
  // 导出角色数据逻辑
  alert('导出角色数据（示例）')
}
</script>

<style scoped>
.character-archives-layout {
  min-height: 100vh;
  background: #f8f5ef;
  display: flex;
  flex-direction: column;
}

.global-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem 1.2rem 2.5rem;
  background: transparent;
}

.logo-title {
  display: flex;
  align-items: center;
  font-family: 'Bangers', 'STZhongsong', '华文中宋', serif;
  font-size: 3.5rem;
  color: #a67c3c;
  letter-spacing: 2px;
  font-weight: bold;
  text-shadow: 2px 2px 0 rgba(193, 154, 73, 0.12);
  transition: all 0.3s cubic-bezier(.4, 1.5, .5, 1.1);
  transform: rotate(-2deg);
}

.logo-title:hover {
  transform: rotate(0deg) scale(1.05);
  text-shadow: 5px 5px 0 rgba(139, 69, 19, 0.3);
}

.logo-icon {
  margin-right: 0.7rem;
}

.header-actions {
  display: flex;
  gap: 1.2rem;
}

.fancy-button {
  background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
  color: #6b4c1b;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
  padding: 0.7em 1.8em;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

.fancy-button:hover {
  background: linear-gradient(90deg, #c19a49 0%, #e6dcbf 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
}

.main-title-wrapper {
  width: 100%;
  text-align: center;
  margin-bottom: 1.2rem;
}

.main-title {
  display: inline-flex;
  align-items: center;
  font-family: 'STZhongsong', '华文中宋', serif;
  font-size: 2.8rem;
  color: #a67c3c;
  letter-spacing: 3px;
  font-weight: bold;
  margin-bottom: 0.2rem;
  text-shadow: 3px 3px 0 rgba(193, 154, 73, 0.13);
}

.title-icon {
  margin-right: 0.7rem;
  vertical-align: middle;
}

.title-underline {
  width: 180px;
  height: 6px;
  margin: 0.2rem auto 0 auto;
  background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(193, 154, 73, 0.13);
}

.character-setting-layout {
  display: flex;
  flex: 1;
  min-height: 70vh;
  background: transparent;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(139, 69, 19, 0.08);
  overflow: hidden;
  margin: 0 3vw 2.5rem 3vw;
}

.character-roster-panel {
  width: 22%;
  min-width: 260px;
  max-width: 340px;
  background: #f9f6f1;
  border-right: 1.5px solid #e6dcbf;
  padding: 2rem 0.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(193, 154, 73, 0.04);
}

.roster-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.new-character-btn {
  width: 92%;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.08rem;
  background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
  color: #6b4c1b;
  border: none;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
  padding: 0.7em 1.2em;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  font-family: 'Bangers', 'STZhongsong', '华文中宋', serif;
  letter-spacing: 1px;
}

.new-character-btn:hover {
  background: linear-gradient(90deg, #c19a49 0%, #e6dcbf 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
}

.plus {
  font-size: 1.2em;
  font-weight: bold;
  color: #c19a49;
  margin-right: 0.2em;
}

.character-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.character-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 0.7rem;
  transition: background 0.2s, box-shadow 0.2s;
  position: relative;
  background: transparent;
}

.character-list-item.selected {
  background: #f5e6c8;
  box-shadow: 0 2px 8px rgba(193, 154, 73, 0.10);
}

.character-list-item:hover .delete-icon {
  opacity: 1;
  pointer-events: auto;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(193, 154, 73, 0.07);
}

.character-name {
  flex: 1;
  font-weight: 500;
  font-size: 1.18rem;
  color: #6b4c1b;
  font-family: 'STZhongsong', '华文中宋', 'Bangers', serif;
  letter-spacing: 0.5px;
}

.delete-icon {
  color: #a67c3c;
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: 0.5rem;
  opacity: 0.15;
  transition: opacity 0.2s, color 0.2s;
  pointer-events: none;
}

.character-list-item:hover .delete-icon {
  opacity: 0.85;
  color: #c0392b;
  pointer-events: auto;
}

.character-details-panel {
  flex: 1 1 0%;
  background: #fcfaf6;
  padding: 2.5rem 3rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empty-details {
  text-align: center;
  color: #bfa97a;
  margin-top: 6rem;
  font-size: 1.18rem;
  line-height: 2.1;
  font-family: 'STZhongsong', '华文中宋', serif;
}

.empty-details h2 {
  font-size: 2rem;
  color: #a67c3c;
  margin-bottom: 1.2rem;
  font-family: 'Bangers', 'STZhongsong', '华文中宋', serif;
}

.character-details-content h2 {
  font-size: 2rem;
  font-family: 'STZhongsong', '华文中宋', serif;
  color: #6b4c1b;
  margin-bottom: 2rem;
}

.details-section {
  margin-bottom: 2.2rem;
}

.details-section h3 {
  font-size: 1.2rem;
  color: #a67c3c;
  margin-bottom: 0.5rem;
}

.details-section p {
  color: #7c6a4a;
  font-size: 1rem;
  margin: 0;
}


.avatar-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(193, 154, 73, 0.10);
  border: 2px solid #e6dcbf;
}

.avatar-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .character-setting-layout {
    flex-direction: column;
    max-width: 100%;
    box-shadow: none;
    border-radius: 0;
    margin: 0;
  }

  .character-roster-panel {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee2d2;
    flex-direction: row;
    padding: 1rem;
    overflow-x: auto;
  }

  .character-details-panel {
    padding: 1.5rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .main-title-wrapper {
    margin-bottom: 0.7rem;
  }

}
</style>