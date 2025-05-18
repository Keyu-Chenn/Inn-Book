<template>
  <div class="essence-container">
    <h2>生灵与传承</h2>
    <el-form :model="form" label-position="top" class="essence-form">
      <!-- 智慧族群部分 -->
      <el-form-item label="智慧族群" prop="hasOtherRaces" class="essence-label">
        <div class="race-container">
          <div class="race-header">
            <span class="race-title">除标准人类外，是否存在其他智慧种族或生理迥异的亚人种？</span>
            <el-switch
              v-model="form.hasOtherRaces"
              class="race-switch"
              active-text="启用"
              inactive-text="禁用"
            />
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
          <el-input
            type="textarea"
            v-model="form.societyStructure"
            :rows="6"
            placeholder="描述主要的国家、政体、组织、宗教、派系等，以及它们之间的大致关系..."
          />
        </div>
      </el-form-item>

      <!-- 历史背景/未来转折点部分 -->
      <el-form-item label="历史背景/未来转折点" prop="historyEvents" class="essence-label">
        <div class="history-container">
          <div v-for="(event, index) in form.historyEvents" :key="index" class="event-item">
            <el-switch
              v-model="event.isFuture"
              active-text="未来"
              inactive-text="历史"
              class="event-switch"
            />
            <el-input
              type="textarea"
              v-model="event.description"
              :rows="3"
              placeholder="描述事件..."
            />
            <el-button @click="removeEvent(index)" :icon="Delete" />
          </div>
          <el-button type="primary" plain @click="addEvent" class="add-event-button">
            添加事件
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <!-- 导航按钮 -->
    <div class="navigation-buttons">
      <el-button @click="goToPreviousStep" class="nav-button prev-button">
        上一步
      </el-button>
      <el-button
        type="primary"
        @click="goToNextStep"
        class="nav-button next-button"
      >
        完成
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const emit = defineEmits(['update:currentStep'])

// 表单数据
const form = ref({
  hasOtherRaces: false,
  races: [{ name: '', description: '' }],
  societyStructure: '',
  historyEvents: [{ isFuture: false, description: '' }]
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
</style> 