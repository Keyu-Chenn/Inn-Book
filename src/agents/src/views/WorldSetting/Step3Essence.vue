<template>
  <div class="essence-container">
    <h2>生灵与传承</h2>
    <el-form :model="form" label-position="top" class="essence-form">
      <!-- 智慧族群部分 -->
      <el-form-item label="智慧族群" prop="hasOtherRaces" class="essence-label">
        <div class="race-container">
          <div class="race-header">
            <span class="race-title">除标准人类外，是否存在其他智慧种族或生理迥异的亚人种？</span>
            <el-switch v-model="form.hasOtherRaces" class="race-switch" active-text="启用" inactive-text="禁用" />
          </div>
          <div v-if="form.hasOtherRaces" class="races-list">
            <div v-for="(race, index) in form.races" :key="index" class="race-item">
              <el-input v-model="form.races[index].name" placeholder="种族名称" />
              <el-input v-model="form.races[index].description" placeholder="种族特点" />
              <el-button @click="removeRace(index)" :icon="Delete" />
            </div>
            <el-button type="primary" plain @click="addRace" class="add-race-button">
              添加种族
            </el-button>
          </div>
        </div>
      </el-form-item>

      <!-- 社会结构与主要势力部分 -->
      <el-form-item label="社会结构与主要势力" prop="societyStructure" class="essence-label">
        <div class="society-container">
          <el-input type="textarea" v-model="form.societyStructure" :rows="6"
            placeholder="描述主要的国家、政体、组织、宗教、派系等，以及它们之间的大致关系..." />
        </div>
      </el-form-item>

      <!-- 历史背景/未来转折点部分 -->
      <el-form-item label="历史背景/未来转折点" prop="historyEvents" class="essence-label">
        <div class="history-container">
          <div v-for="(event, index) in form.historyEvents" :key="index" class="event-item">
            <el-switch v-model="event.isFuture" active-text="未来" inactive-text="历史" class="event-switch" />
            <el-input type="textarea" v-model="event.description" :rows="3" placeholder="描述事件..." />
            <el-button @click="removeEvent(index)" :icon="Delete" />
          </div>
          <el-button type="primary" plain @click="addEvent" class="add-event-button">
            添加事件
          </el-button>
        </div>
      </el-form-item>

      <!-- 主要人物部分 -->
      <el-form-item label="主要人物" class="essence-label">
        <div class="character-select-container">
          <div class="character-filter-row">
            <el-input v-model="searchText" placeholder="搜索姓名、职业或种族..." clearable
              class="character-search-input custom-input" />
            <el-select v-model="selectedRace" placeholder="全部种族" clearable
              class="character-filter-select custom-select">
              <el-option v-for="race in raceOptions" :key="race" :label="race" :value="race" />
            </el-select>
          </div>
          <div class="character-list">
            <div v-for="character in filteredCharacters" :key="character.name" class="character-card"
              :class="{ selected: selectedCharacters.some(c => c.name === character.name) }"
              @click="addCharacter(character)">
              <img :src="character.portrait" class="character-avatar" />
              <div class="character-info">
                <div class="character-name">{{ character.name }}</div>
                <div class="character-occupation">{{ character.occupation }} · {{ character.race }}</div>
              </div>
              <div v-if="selectedCharacters.some(c => c.name === character.name)" class="selected-mark">✔</div>
            </div>
          </div>
          <div class="selected-characters" v-if="selectedCharacters.length">
            <div class="selected-title">已加入本世界：</div>
            <div class="selected-list">
              <div v-for="character in selectedCharacters" :key="character.name" class="selected-item">
                <img :src="character.portrait" class="selected-avatar" />
                <span class="selected-name">{{ character.name }}</span>
                <el-button size="small" type="danger" circle @click.stop="removeCharacter(character)"><template #icon>
                    <Delete />
                  </template></el-button>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <!-- 导航按钮 -->
    <div class="navigation-buttons">
      <el-button @click="goToPreviousStep" class="nav-button prev-button">
        上一步
      </el-button>
      <el-button type="primary" @click="goToNextStep" class="nav-button next-button">
        完成
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, inject, onMounted } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import presetCharacters from '@/views/CharacterSetting/presetCharacters.js'

const emit = defineEmits(['update:currentStep'])

const worldEditData = inject('worldEditData', null)

// 表单数据
const form = ref({
  hasOtherRaces: false,
  races: [{ name: '', description: '' }],
  societyStructure: '',
  historyEvents: [{ isFuture: false, description: '' }]
})

// 主要人物选择
const selectedCharacters = ref([])
const searchText = ref('')
const selectedRace = ref('')

// 获取所有种族选项
const raceOptions = computed(() => Array.from(new Set(presetCharacters.map(c => c.race))))

const filteredCharacters = computed(() => {
  return presetCharacters.filter(c => {
    const matchName = c.name.includes(searchText.value) || c.race.includes(searchText.value)
    const matchRace = !selectedRace.value || c.race === selectedRace.value
    return matchName && matchRace
  })
})

function addCharacter(character) {
  if (!selectedCharacters.value.find(c => c.name === character.name)) {
    // console.log('添加角色:', character.name, '头像:', character.portrait);
    selectedCharacters.value.push({ ...character });
  }
}
function removeCharacter(character) {
  selectedCharacters.value = selectedCharacters.value.filter(c => c.name !== character.name)
}

onMounted(() => {
  if (worldEditData && worldEditData.value && worldEditData.value.life) {
    // 智慧族群
    if (Array.isArray(worldEditData.value.life.races) && worldEditData.value.life.races.length > 1) {
      form.value.hasOtherRaces = true
      form.value.races = worldEditData.value.life.races.slice(1).map(r => ({ name: r, description: '' }))
    } else {
      form.value.hasOtherRaces = false
      form.value.races = [{ name: '', description: '' }]
    }
    // 社会结构
    form.value.societyStructure = worldEditData.value.life.society || ''
    // 历史背景
    form.value.historyEvents = [
      { isFuture: false, description: worldEditData.value.life.history || '' }
    ]
  }
  // 保持主要人物选中
  if (worldEditData && worldEditData.value && Array.isArray(worldEditData.value.characters)) {
    selectedCharacters.value = [...worldEditData.value.characters]
  }
  // console.log('已选择角色:', selectedCharacters.value.map(c => ({ name: c.name, portrait: c.portrait })));
  // console.log('所有角色:', filteredCharacters.value.map(c => ({ name: c.name, portrait: c.portrait })));
})

// 添加种族
const addRace = () => {
  form.value.races.push({ name: '', description: '' })
}

// 移除种族
const removeRace = (index) => {
  form.value.races.splice(index, 1)
  if (form.value.races.length === 0) {
    form.value.races.push({ name: '', description: '' })
  }
}

// 添加事件
const addEvent = () => {
  form.value.historyEvents.push({ isFuture: false, description: '' })
}

// 移除事件
const removeEvent = (index) => {
  form.value.historyEvents.splice(index, 1)
  if (form.value.historyEvents.length === 0) {
    form.value.historyEvents.push({ isFuture: false, description: '' })
  }
}

// 表单验证
const isFormValid = computed(() => {
  return form.value.societyStructure.trim() !== '' &&
    (!form.value.hasOtherRaces || form.value.races.some(race => race.name.trim() !== '' && race.description.trim() !== '')) &&
    form.value.historyEvents.some(event => event.description.trim() !== '')
})

// 上一步
const goToPreviousStep = () => {
  emit('update:currentStep', 2)
}

// 下一步（完成）
const goToNextStep = () => {
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.essence-container {
  width: 100%;
}

.essence-container h2 {
  font-family: 'STZhongsong', '华文中宋', serif !important;
  font-size: 2rem !important;
  color: #000000 !important;
  text-align: center;
  margin-bottom: 1.5rem;
}

.essence-form {
  background: transparent;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.essence-label {
  margin-bottom: 2rem;

  .el-form-item__label {
    font-family: 'STZhongsong', '华文中宋', serif !important;
    font-size: 1.4rem !important;
    color: #000000 !important;
    font-weight: 600 !important;
    margin-bottom: 0.8rem !important;
    letter-spacing: 1px !important;
    line-height: 1.4 !important;
  }
}

.race-container,
.society-container,
.history-container {
  background: #f9f6ef;
  border: 2px solid #d2b48c;
  border-radius: 14px;
  padding: 2rem;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.race-header,
.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.race-title,
.event-switch {
  font-family: 'STZhongsong', '华文中宋', serif;
  font-size: 1.1rem;
  color: #8B4513;
  font-weight: 600;
}

.race-switch,
.event-switch {
  --el-switch-on-color: var(--primary-color);
  --el-switch-off-color: #d2b48c;
  --el-switch-on-bg-color: #fff;
  --el-switch-off-bg-color: #fff;
  --el-switch-border-color: var(--primary-color);
  --el-switch-active-text-color: var(--primary-color);
  --el-switch-inactive-text-color: var(--text-secondary);
}

.races-list,
.history-container {
  margin-top: 1rem;
}

.race-item,
.event-item {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.add-race-button,
.add-event-button {
  width: 100%;
  margin-top: 1rem;
  background: rgba(139, 69, 19, 0.1) !important;
  border-color: #d2b48c !important;
  color: #8B4513 !important;
  font-weight: 500 !important;

  &:hover {
    background: rgba(139, 69, 19, 0.15) !important;
    border-color: #8B4513 !important;
  }
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
  width: 100%;
}

.nav-button {
  min-width: 120px;
  font-family: var(--font-heading) !important;
  font-size: 1.1rem !important;
  padding: 0.7rem 2rem !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;

  &.next-button {
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2) !important;

    &:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(139, 69, 19, 0.25) !important;
    }
  }

  &.prev-button {
    border-color: var(--primary-color) !important;
    color: var(--primary-color) !important;

    &:hover {
      background-color: rgba(139, 69, 19, 0.05) !important;
    }
  }
}

@media (max-width: 768px) {
  .essence-container {
    padding: 1rem;
  }

  .navigation-buttons {
    flex-direction: column;
  }

  .nav-button {
    width: 100%;
  }
}

.character-select-container {
  background: #f9f6ef;
  border: 2px solid #d2b48c;
  border-radius: 14px;
  padding: 2rem;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.character-filter-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  align-items: center;
}

.character-search-input {
  flex: 2;
}

.character-filter-select {
  flex: 1;
}

.character-list {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-bottom: 1.2rem;
}

.character-card {
  background: #fffbe6;
  border: 2px solid #d2b48c;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  min-width: 180px;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
  position: relative;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.character-card.selected {
  border-color: #8B4513;
  background: linear-gradient(135deg, #fffbe6 70%, #f5f5dc 100%);
  box-shadow: 0 0 0 4px rgba(139, 69, 19, 0.10);
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

.selected-mark {
  position: absolute;
  top: 8px;
  right: 12px;
  color: #4caf50;
  font-size: 1.3rem;
  font-weight: bold;
}

.selected-characters {
  margin-top: 1.2rem;
}

.selected-title {
  font-size: 1rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-family: 'STZhongsong', '华文中宋', serif;
}

.selected-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.selected-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fffbe6;
  border: 1.5px solid #d2b48c;
  border-radius: 10px;
  padding: 0.3rem 0.8rem;
}

.selected-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #d2b48c;
}

.selected-name {
  color: #8B4513;
  font-size: 1rem;
  font-family: 'STZhongsong', '华文中宋', serif;
}
</style>

<style lang="scss">
/* 下拉菜单样式 - 全局样式 */
.el-select-dropdown.el-popper {
  border-radius: 12px !important;
  font-family: 'STZhongsong', '华文中宋', serif !important;
  font-size: 1rem !important;
  border: 2px solid #d2b48c !important;
}

.el-select-dropdown__item {
  font-family: 'STZhongsong', '华文中宋', serif !important;
  font-size: 1rem !important;
  color: #8B4513 !important;
}

/* 可以通过自定义类名限制范围 */
.essence-container .el-select-dropdown__item.selected {
  color: #8B4513 !important;
  font-weight: bold !important;
}

.custom-select .el-input__wrapper {
  background: transparent !important;
  border: 2px solid #d2b48c !important;
  border-radius: 12px !important;
  font-family: 'STZhongsong', '华文中宋', serif !important;
  font-size: 1rem !important;
  color: #8B4513 !important;
  box-shadow: none !important;
}

.custom-select .el-input__wrapper.is-focus {
  border-color: #8B4513 !important;
  background: #fff !important;
}

/* 输入框内部文字的样式 */
.custom-select .el-input__inner {
  font-family: 'STZhongsong', '华文中宋', serif !important;
  font-size: 1rem !important;
  color: #8B4513 !important;
}

/* 占位符文字样式 */
.custom-select .el-input__inner::placeholder {
  color: #bfc3c9 !important;
  font-size: 0.98rem !important;
  font-family: 'SimSun', '宋体', serif !important;
  opacity: 1 !important;
}
</style>