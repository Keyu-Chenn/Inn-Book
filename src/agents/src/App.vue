<script setup>
import { ref, watch } from 'vue'
import WorldCreatorLayout from './components/WorldCreatorLayout.vue'
import Step1Essence from './components/Step1Essence.vue'
import Step2Essence from './components/Step2Essence.vue'
import Step3Essence from './components/Step3Essence.vue'
import { Star } from '@element-plus/icons-vue'

const started = ref(false)
const currentStep = ref(0) // 默认在"准备开始"

// 处理开始创造按钮点击事件
const startCreating = () => {
  started.value = true
  currentStep.value = 1 // 跳到"世界精粹"（第二个节点）
}

// 监听步骤变化，在步骤改变时设置started状态
watch(currentStep, (newStep) => {
  // 如果从0到其他步骤，自动设置started为true
  if (newStep !== 0 && !started.value) {
    started.value = true
  }
  // 如果回到步骤0，且已经开始，则不要回到欢迎界面
  if (newStep === 0 && started.value) {
    currentStep.value = 1 // 保持在"世界精粹"
  }
})
</script>

<template>
  <WorldCreatorLayout v-model:currentStep="currentStep">
    <!-- 欢迎页面 - 仅在初始状态显示 -->
    <div v-if="!started" class="fancy-card welcome-card">
      <h2>欢迎来到世界创造者</h2>
      <p>在这里，你可以创造属于你的独特世界。让我们一起开启这段奇妙的创作之旅，用AI的力量，让想象变为现实。</p>
      <div class="card-actions">
        <el-button class="fancy-button" type="primary" size="large" @click="startCreating">
          <el-icon><Star /></el-icon>
          开始创造
        </el-button>
      </div>
    </div>

    <!-- 步骤内容 - 仅在已开始状态显示 -->
    <template v-else>
      <!-- 步骤一：世界精粹 -->
      <div v-if="currentStep === 1" class="fancy-card content-card">
        <Step1Essence v-model:currentStep="currentStep" />
      </div>

      <!-- 步骤二：真实与奥秘 -->
      <div v-else-if="currentStep === 2" class="fancy-card content-card">
        <Step2Essence v-model:currentStep="currentStep" />
      </div>

      <!-- 步骤三：生灵与传承 -->
      <div v-else-if="currentStep === 3" class="fancy-card content-card">
        <Step3Essence v-model:currentStep="currentStep" />
      </div>
    </template>
  </WorldCreatorLayout>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  /* 移除flex布局 */
}

.card-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* 主要内容容器样式 */
.fancy-card, .welcome-card {
  max-width: 900px;
  margin: 2rem auto;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(139, 69, 19, 0.08);
  transition: all 0.3s ease;
  width: 100%;
}

/* 内容卡片特殊样式 */
.content-card {
  width: 100%;
  overflow: hidden;
}

/* 添加悬浮效果 */
.fancy-card:hover, .welcome-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(139, 69, 19, 0.12);
}

/* 标题样式 */
.welcome-card h2, .fancy-card h2 {
  font-family: 'STZhongsong', '华文中宋', serif !important;
  font-size: 2rem !important;
  color: #000000 !important;
  text-align: center;
  margin-bottom: 1.5rem;
}

.welcome-card p {
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  color: var(--text-secondary);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .fancy-card, .welcome-card {
    padding: 1.5rem;
  }
  
  .welcome-card h2, .fancy-card h2 {
    font-size: 1.8rem !important;
  }
  
  .welcome-card p {
    font-size: 1rem;
  }
}
</style>
