<template>
  <div class="essence-container">
    <h2>真实与奥秘</h2>
    <el-form :model="form" label-position="top" class="essence-form">
      <!-- 科技水平部分 -->
      <el-form-item label="科技水平" prop="techLevel" class="essence-label">
        <div class="tech-level-container">
          <div class="custom-slider">
            <div class="slider-track">
              <div class="slider-progress" :style="{ width: `${(activeIndex / (sliderMarks.length - 1)) * 100}%` }">
              </div>
              <div v-for="(mark, idx) in sliderMarks" :key="mark.value" class="slider-mark"
                :class="{ active: form.techLevel === mark.value }"
                :style="{ left: `${(idx / (sliderMarks.length - 1)) * 100}%` }" @click="handleMarkClick(mark.value)">
                <span class="mark-icon">{{ mark.icon }}</span>
              </div>
            </div>
            <div class="slider-labels">
              <div v-for="(mark, idx) in sliderMarks" :key="'label-' + mark.value" class="slider-label"
                :style="{ left: `${(idx / (sliderMarks.length - 1)) * 100}%` }">
                {{ mark.label }}
              </div>
            </div>
          </div>
          <div class="tech-level-description">
            {{ getTechLevelDescription(form.techLevel) }}
          </div>
        </div>
      </el-form-item>

      <!-- 地理环境部分 -->
      <el-form-item label="地理环境" prop="geography" class="essence-label">
        <div class="geography-container">
          <div class="map-upload-area" @click="triggerMapUpload" :class="{ 'has-map': form.mapUrl }">
            <template v-if="!form.mapUrl">
              <el-icon class="upload-icon">
                <Plus />
              </el-icon>
              <span class="upload-text">点击上传世界地图</span>
              <span class="upload-hint">支持 JPG、PNG 格式，建议尺寸 1920x1080</span>
            </template>
            <img v-else :src="form.mapUrl" class="preview-image" />
            <input type="file" ref="mapInput" accept="image/jpeg,image/png" style="display: none"
              @change="handleMapUpload" />
          </div>
          <div class="map-description">
            <el-input type="textarea" v-model="form.geographyDescription" :rows="3"
              placeholder="描述这个世界的地理特征、气候、地形等..." />
          </div>
        </div>
      </el-form-item>

      <!-- 世界法则与神秘力量部分 -->
      <el-form-item label="世界法则与神秘力量" prop="worldRules" class="essence-label">
        <div class="world-rules-container">
          <!-- 特殊物理法则部分 -->
          <div class="rule-section">
            <div class="rule-header">
              <span class="rule-title">特殊物理法则</span>
              <el-switch v-model="form.hasSpecialPhysics" class="rule-switch" active-text="启用" inactive-text="禁用" />
            </div>

            <div v-if="form.hasSpecialPhysics" class="rules-list">
              <div v-for="(rule, index) in form.physicsRules" :key="index" class="rule-item">
                <el-input v-model="form.physicsRules[index]" placeholder="输入特殊物理法则...">
                  <template #append>
                    <el-button @click="removePhysicsRule(index)" :icon="Delete" />
                  </template>
                </el-input>
              </div>
              <el-button type="primary" plain @click="addPhysicsRule" class="add-rule-button">
                添加法则
              </el-button>
            </div>
          </div>

          <!-- 魔法/超自然力量部分 -->
          <div class="rule-section">
            <div class="rule-header">
              <span class="rule-title">魔法/超自然力量</span>
              <el-switch v-model="form.hasMagic" class="rule-switch" active-text="启用" inactive-text="禁用" />
            </div>

            <div v-if="form.hasMagic" class="magic-system-container">
              <el-input type="textarea" v-model="form.magicSystem" :rows="6"
                placeholder="详细描述这个世界的魔法/超自然力量体系，包括：&#10;1. 力量的来源&#10;2. 使用方式与限制&#10;3. 对世界的影响&#10;4. 特殊规则..." />
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
        下一步
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, inject, onMounted } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

const emit = defineEmits(['update:currentStep'])
const mapInput = ref(null)
const worldEditData = inject('worldEditData', null)

// 表单数据
const form = ref({
  techLevel: 5,
  mapUrl: '',
  geographyDescription: '',
  hasSpecialPhysics: false,
  physicsRules: [''],
  hasMagic: false,
  magicSystem: ''
})

// 滑块节点数据
const sliderMarks = [
  { value: 1, label: '原始', icon: '🌱' },
  { value: 3, label: '古代', icon: '🏺' },
  { value: 5, label: '近代', icon: '⚙️' },
  { value: 7, label: '现代', icon: '💻' },
  { value: 9, label: '未来', icon: '🚀' },
  { value: 10, label: '超未来', icon: '✨' }
]

const techLevelMarks = Object.fromEntries(sliderMarks.map(m => [m.value, { label: m.label, icon: m.icon }]))

const activeIndex = computed(() => sliderMarks.findIndex(m => m.value === form.value.techLevel))

// 获取科技水平描述
const getTechLevelDescription = (level) => {
  const descriptions = {
    1: '石器时代，人类刚刚掌握基本工具的使用',
    2: '青铜时代，开始使用金属工具和武器',
    3: '铁器时代，农业和手工业发展',
    4: '中世纪，手工业发达，开始出现简单机械',
    5: '工业革命时期，蒸汽机等机械广泛应用',
    6: '电气时代，电力开始普及',
    7: '信息时代，计算机和互联网改变世界',
    8: '智能时代，人工智能和自动化技术发达',
    9: '太空时代，星际旅行成为可能',
    10: '超未来，科技发展超出想象'
  }
  return descriptions[level] || ''
}

// 处理滑块点击
const handleMarkClick = (mark) => {
  form.value.techLevel = mark
}

// 触发地图上传
const triggerMapUpload = () => {
  mapInput.value.click()
}

// 处理地图上传
const handleMapUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.mapUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 添加物理法则
const addPhysicsRule = () => {
  form.value.physicsRules.push('')
}

// 移除物理法则
const removePhysicsRule = (index) => {
  form.value.physicsRules.splice(index, 1)
  if (form.value.physicsRules.length === 0) {
    form.value.physicsRules.push('')
  }
}

// 表单验证
const isFormValid = computed(() => {
  return form.value.mapUrl !== '' &&
    form.value.geographyDescription.trim() !== '' &&
    (!form.value.hasSpecialPhysics || form.value.physicsRules.some(rule => rule.trim() !== '')) &&
    (!form.value.hasMagic || form.value.magicSystem.trim() !== '')
})

// 上一步
const goToPreviousStep = () => {
  emit('update:currentStep', 1)
}

// 下一步
const goToNextStep = () => {
  emit('update:currentStep', 3)
}

onMounted(() => {
  if (worldEditData && worldEditData.value && worldEditData.value.reality) {
    // 科技水平
    form.value.techLevel = worldEditData.value.reality.techLevel || 5
    // 地理环境
    form.value.mapUrl = worldEditData.value.reality.mapUrl || ''
    form.value.geographyDescription = worldEditData.value.reality.geography || ''
    // 特殊物理法则
    if (Array.isArray(worldEditData.value.reality.physicalLaws) && worldEditData.value.reality.physicalLaws.length) {
      form.value.hasSpecialPhysics = true
      form.value.physicsRules = [...worldEditData.value.reality.physicalLaws]
    } else {
      form.value.hasSpecialPhysics = false
      form.value.physicsRules = ['']
    }
    // 魔法体系
    if (worldEditData.value.reality.magicSystem && worldEditData.value.reality.magicSystem !== '无') {
      form.value.hasMagic = true
      form.value.magicSystem = worldEditData.value.reality.magicSystem
    } else {
      form.value.hasMagic = false
      form.value.magicSystem = ''
    }
  }
})
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

/* 科技水平样式 */
.tech-level-container,
.geography-container,
.world-rules-container {
  background: #f9f6ef;
  border: 2px solid #d2b48c;
  border-radius: 14px;
  padding: 2rem;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

/* 自定义滑块样式 */
.custom-slider {
  padding: 2rem 0 1.5rem 0;
  margin: 2rem 0 1rem 0;
  width: calc(100% - 2rem);
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.slider-track {
  position: relative;
  height: 8px;
  background: #e8e0d0;
  border-radius: 4px;
  margin: 2rem 0 0.5rem 0;
  width: 100%;
}

.slider-progress {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #d2b48c, #8B4513);
  border-radius: 4px;
  transition: width 0.3s ease;
  width: 0;
}

.slider-mark {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: #fff;
  border: 3px solid #d2b48c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    border-color: #8B4513;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.2);
  }

  &.active {
    background: #8B4513;
    border-color: #8B4513;
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);

    .mark-icon {
      color: #fff;
    }
  }

  .mark-icon {
    font-size: 1.2rem;
    margin-bottom: 0;
    color: #8B4513;
    transition: color 0.3s;
  }
}

.slider-labels {
  position: relative;
  width: 100%;
  height: 1.5rem;
  margin-top: 0.2rem;
}

.slider-label {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 0.9rem;
  color: #8B4513;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
}

.tech-level-description {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(210, 180, 140, 0.1);
  border-radius: 8px;
  line-height: 1.6;
}

/* 地理环境样式 */
.geography-container {
  background: #f9f6ef;
  border: 2px solid #d2b48c;
  border-radius: 14px;
  padding: 2rem;
  margin-top: 0.5rem;
  width: 100%;
}

.map-upload-area {
  border: 2px dashed #d2b48c;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: var(--primary-color);
    background: rgba(210, 180, 140, 0.05);
  }

  &.has-map {
    padding: 0;
    border: none;
  }

  .upload-icon {
    font-size: 2rem;
    color: #d2b48c;
    margin-bottom: 1rem;
  }

  .upload-text {
    font-size: 1.1rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .upload-hint {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .preview-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
  }
}

.map-description {
  margin-top: 1rem;
}

/* 世界法则与神秘力量样式 */
.world-rules-container {
  background: #f9f6ef;
  border: 2px solid #d2b48c;
  border-radius: 14px;
  padding: 2rem;
  margin-top: 0.5rem;
  width: 100%;
}

.rule-section {
  margin-bottom: 2rem;
}

.rule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.rule-title {
  font-family: 'STZhongsong', '华文中宋', serif;
  font-size: 1.1rem;
  color: #8B4513;
  font-weight: 600;
}

.rule-switch {
  --el-switch-on-color: var(--primary-color);
  --el-switch-off-color: #d2b48c;
  --el-switch-on-bg-color: #fff;
  --el-switch-off-bg-color: #fff;
  --el-switch-border-color: var(--primary-color);
  --el-switch-active-text-color: var(--primary-color);
  --el-switch-inactive-text-color: var(--text-secondary);
}

.rules-list {
  margin-top: 1rem;

  .rule-item {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.add-rule-button {
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

/* 魔法体系样式 */
.magic-system-container {
  margin-top: 1rem;
}

/* 导航按钮样式 */
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

/* 响应式设计 */
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