<template>
  <div class="world-creator-layout">
    <el-header class="header">
      <div class="logo">
        <h1>WORLD CRAFTER</h1>
      </div>
      <div class="nav-buttons">
        <el-button class="fancy-button" type="primary" @click="saveWorld">
          <el-icon><Download /></el-icon>
          保存世界
        </el-button>
        <el-button class="fancy-button" type="primary" @click="exportWorld">
          <el-icon><Share /></el-icon>
          导出世界
        </el-button>
      </div>
    </el-header>

    <el-main class="main-content">
      <div class="steps-container">
        <div class="steps-track" :style="{ '--progress-width': `${(currentStepValue / (steps.length - 1)) * 100}%` }">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step-item"
            :style="{ left: `${(index / (steps.length - 1)) * 100}%` }"
          >
            <div 
              class="step-marker"
              :class="{ 
                active: currentStepValue === index,
                completed: currentStepValue > index
              }"
              @click="setCurrentStep(index)"
            >
              <span v-if="currentStepValue > index" class="step-check">✓</span>
            </div>
            <div 
              class="step-label"
              :class="{ active: currentStepValue === index }"
            >
              {{ step }}
            </div>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <slot></slot>
      </div>
    </el-main>

    <el-footer class="footer">
      <div class="footer-content">
        <p>© 2024 WORLD CRAFTER - Where Imagination Meets AI</p>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Download, Share } from '@element-plus/icons-vue'

const props = defineProps({
  currentStep: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:currentStep'])

const currentStepValue = computed({
  get: () => props.currentStep,
  set: (val) => emit('update:currentStep', val)
})

const steps = [
  '准备开始',
  '世界精粹',
  '真实与奥秘',
  '生灵与传承'
]

const setCurrentStep = (index) => {
  currentStepValue.value = index
}

const saveWorld = () => {
  // 保存世界的逻辑
  console.log('保存世界')
}

const exportWorld = () => {
  // 导出世界的逻辑
  console.log('导出世界')
}
</script>

<style lang="scss" scoped>
.world-creator-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: auto;

  .logo {
    h1 {
      font-family: var(--font-logo);
      font-size: 4.5rem;
      color: var(--primary-color);
      margin: 0;
      text-shadow: 4px 4px 0 rgba(139, 69, 19, 0.2);
      transform: rotate(-2deg);
      transition: all 0.3s ease;
      letter-spacing: 2px;
      
      &:hover {
        transform: rotate(0deg) scale(1.05);
        text-shadow: 5px 5px 0 rgba(139, 69, 19, 0.3);
      }
    }
  }

  .nav-buttons {
    display: flex;
    gap: 1rem;
  }
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  background-color: #f9f3e5; /* 淡米色背景 */

  .steps-container,
  .content-wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    /* 保持透明背景 */
  }
  
  .steps-container {
    .step-marker {
      position: relative;
      
      .step-check {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-weight: bold;
        font-size: 0.9rem;
      }
    }
  }
}

.footer {
  background: transparent;
  padding: 1rem 2rem;
  text-align: center;

  .footer-content {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-family: var(--font-content);
  }
}

/* 响应式样式调整 */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    
    .logo h1 {
      font-size: 3.5rem;
      text-align: center;
    }
  }
  
  .main-content {
    padding: 1rem;
    
    .content-wrapper {
      padding: 1rem 0;
    }
    
    .steps-container {
      margin: 1rem auto 3rem auto;
      
      .step-label {
        font-size: 0.8rem;
      }
    }
  }
  
  .nav-buttons {
    width: 100%;
    justify-content: center;
  }
}
</style> 