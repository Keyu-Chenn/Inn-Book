<template>
  <div class="essence-container">
    <h2>世界精粹</h2>
    <el-form :model="form" label-position="top" class="essence-form">
      <el-form-item label="世界名称" prop="name" class="essence-label">
        <el-input v-model="form.name" class="essence-input" placeholder="请输入你的世界名称" />
      </el-form-item>
      <el-form-item label="核心吸引点" prop="attraction" class="essence-label">
        <el-input type="textarea" v-model="form.attraction" class="essence-textarea" :rows="3"
          placeholder="简要描述世界的独特魅力..." />
      </el-form-item>
      <el-form-item label="题材风格" prop="genre" class="essence-label">
        <div class="card-radio-group">
          <div v-for="(item, index) in genres" :key="item.value" class="card-radio" :class="{
            selected: form.genre === item.value,
            'showing-popup': hoveredGenre === item.value
          }" :style="{ zIndex: hoveredGenre === item.value ? '20' : 10 - index }" @click="form.genre = item.value"
            @mouseenter="startHoverTimer(item)" @mouseleave="clearHoverTimer">
            <div class="card-content">
              <div class="card-icon-container" :id="`icon-${item.value}`">
                <img :src="item.icon" class="card-icon" />
              </div>
              <span class="card-title" :class="{ 'title-enlarged': hoveredGenre === item.value }">
                {{ item.label }}
              </span>
            </div>

            <!-- 详情悬浮窗 -->
            <transition name="fade-in">
              <div v-if="hoveredGenre === item.value" class="genre-detail-popup">
                <div class="genre-detail-content">
                  <div class="genre-detail-image">
                    <img :src="item.image" alt="" />
                  </div>
                  <div class="genre-detail-text">
                    <h3>{{ item.label }}</h3>
                    <p>{{ item.description }}</p>
                  </div>
                  <div class="genre-detail-icon" :id="`detail-icon-${item.value}`">
                    <img :src="item.icon" class="detail-icon" />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="世界基调" prop="tones" class="essence-label">
        <div class="card-checkbox-group">
          <div v-for="item in tones" :key="item.value" class="card-checkbox" :class="{
            selected: form.tones.includes(item.value),
            disabled: !form.tones.includes(item.value) && form.tones.length >= 3
          }" @click="toggleTone(item.value)">
            <div class="card-content">
              <img :src="item.icon" class="card-icon" />
              <span class="card-title">{{ item.label }}</span>
            </div>
            <el-tooltip :content="item.description" placement="top" :show-after="300" effect="light"
              class="info-tooltip">
              <el-icon class="info-icon">
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="tone-selection-hint">
          <span>已选择：{{ form.tones.length }}/3</span>
          <span class="hint-text">选择体现世界氛围的基调（最多选择3项）</span>
        </div>
      </el-form-item>
    </el-form>

    <!-- 下一步按钮 -->
    <div class="next-step-container">
      <el-button type="primary" class="next-step-button" :disabled="!isFormValid" @click="goToNextStep">
        下一步
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted, computed, inject, onMounted } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

// 路由器
const router = useRouter()

// 直接通过CDN引入动画库
const animeScript = document.createElement('script')
animeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
document.head.appendChild(animeScript)

// 确保anime在使用前已加载
const getAnime = () => window.anime

const form = ref({
  name: '',
  attraction: '',
  genre: '',
  tones: []
})

// 表单验证
const isFormValid = computed(() => {
  return form.value.name.trim() !== '' &&
    form.value.genre !== '' &&
    form.value.tones.length > 0
})

// 定义emit
const emit = defineEmits(['update:currentStep'])

// 下一步
const goToNextStep = () => {
  if (isFormValid.value) {
    // 可以在这里存储数据或者发送到服务器
    // 在实际项目中可能会使用Vuex或Pinia存储状态
    emit('update:currentStep', 2)
  }
}

const hoveredGenre = ref(null)
const hoverTimer = ref(null)
const iconAnimationInstance = ref(null)
const titleAnimationInstance = ref(null)

// 开始悬停计时器
const startHoverTimer = (item) => {
  clearHoverTimer() // 先清除之前的计时器

  hoverTimer.value = setTimeout(() => {
    hoveredGenre.value = item.value

    // 在悬浮窗显示后，启动动画
    nextTick(() => {
      const sourceIconElement = document.getElementById(`icon-${item.value}`)
      const targetIconElement = document.getElementById(`detail-icon-${item.value}`)
      const anime = getAnime()

      if (sourceIconElement && targetIconElement && anime) {
        // 获取元素位置
        const sourceRect = sourceIconElement.getBoundingClientRect()
        const targetRect = targetIconElement.getBoundingClientRect()

        // 计算移动距离
        const deltaX = targetRect.left - sourceRect.left
        const deltaY = targetRect.top - sourceRect.top

        // 创建图标动画
        iconAnimationInstance.value = anime({
          targets: `#icon-${item.value}`,
          translateX: deltaX,
          translateY: deltaY,
          scale: 1.2,
          opacity: 0,
          duration: 500,
          easing: 'easeOutQuad'
        })

        // 创建标题动画 - 放大并上移
        const titleElement = sourceIconElement.nextElementSibling
        if (titleElement) {
          titleAnimationInstance.value = anime({
            targets: titleElement,
            translateY: -20, // 上移
            scale: 1.2, // 放大
            fontWeight: 700, // 加粗
            duration: 500,
            easing: 'easeOutQuad'
          })
        }
      }
    })
  }, 300) // 300ms 延迟显示
}

// 清除悬停计时器
const clearHoverTimer = () => {
  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }

  // 如果存在动画实例，停止它
  if (iconAnimationInstance.value) {
    iconAnimationInstance.value.pause()
  }

  if (titleAnimationInstance.value) {
    titleAnimationInstance.value.pause()
  }

  // 重置所有图标和标题的位置和样式
  const anime = getAnime()
  if (anime) {
    document.querySelectorAll('.card-icon-container').forEach(element => {
      anime({
        targets: element,
        translateX: 0,
        translateY: 0,
        scale: 1,
        opacity: 1,
        duration: 300,
        easing: 'easeOutQuad'
      })
    })

    document.querySelectorAll('.card-title').forEach(element => {
      anime({
        targets: element,
        translateY: 0,
        scale: 1,
        fontWeight: 400,
        duration: 300,
        easing: 'easeOutQuad'
      })
    })
  }

  hoveredGenre.value = null
}

// 组件卸载时清理计时器
onUnmounted(() => {
  clearHoverTimer()
})

const genres = [
  {
    label: '奇幻',
    value: 'fantasy',
    icon: 'https://img.icons8.com/color/48/000000/fantasy.png',
    image: 'https://img.freepik.com/free-photo/fantasy-castle-surrounded-by-mysterious-foggy-landscape-generative-ai_188544-12530.jpg',
    description: '存在魔法、神话生物、架空的古代或中世纪背景、史诗般的正邪对抗等。可以是高魔或低魔，剑与魔法是常见元素。'
  },
  {
    label: '科幻',
    value: 'scifi',
    icon: 'https://img.icons8.com/color/48/000000/sci-fi.png',
    image: 'https://img.freepik.com/free-photo/futuristic-city-with-neon-lights-generative-ai_169016-29375.jpg',
    description: '基于科学（或伪科学）的幻想，涉及未来科技、太空探索、外星文明、人工智能、基因工程、平行宇宙等。'
  },
  {
    label: '武侠/仙侠',
    value: 'wuxia',
    icon: 'https://img.icons8.com/color/48/000000/samurai.png',
    image: 'https://img.freepik.com/free-photo/pavilion-with-pagoda-mountains-sunset-asian-landscape-generative-ai_188544-12325.jpg',
    description: '源于中国文化背景，强调个体通过武功或修仙追求力量、道义或长生。江湖恩怨、门派纷争、法宝秘籍、天地灵气等是核心。'
  },
  {
    label: '现代都市',
    value: 'modern',
    icon: 'https://img.icons8.com/color/48/000000/city.png',
    image: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-city-night-with-colorful-lights_181624-24544.jpg',
    description: '背景设定在与现实世界相似的现代（或近未来）城市与社会。故事可能完全写实，或融入都市传说、隐秘的超自然力量（都市奇幻）、略微超前的科技等。'
  },
  {
    label: '历史架空',
    value: 'historical',
    icon: 'https://img.icons8.com/color/48/000000/treasure-map.png',
    image: 'https://img.freepik.com/free-photo/old-street-with-buildings-ancient-european-city-generative-ai_188544-9634.jpg',
    description: '以真实历史的某个时期为蓝本，但允许虚构人物、事件或对历史走向进行改动。也包括完全虚构的、但科技与社会形态类似古代/近代的非奇幻世界。'
  },
  {
    label: '末世废土',
    value: 'postapocalyptic',
    icon: 'https://img.icons8.com/color/48/000000/nuclear-plant.png',
    image: 'https://img.freepik.com/free-photo/post-apocalyptic-survivor-gas-mask-standing-abandoned-building-digital-art-style-illustration-painting_456031-118.jpg',
    description: '文明经历巨大灾难（战争、瘟疫、自然灾害、丧尸等）后崩溃的世界。资源匮乏，秩序崩坏，生存是首要主题。'
  },
  {
    label: '赛博朋克',
    value: 'cyberpunk',
    icon: 'https://img.icons8.com/color/48/000000/cyberpunk.png',
    image: 'https://img.freepik.com/free-photo/futuristic-cyber-digital-background-with-circuit-lines_23-2148844121.jpg',
    description: '"高科技，低生活"。通常描绘近未来反乌托邦的社会，信息技术高度发达，大型企业或组织掌控一切，社会阶级分化严重，个体在压抑的霓虹都市中挣扎。'
  },
  {
    label: '悬疑/恐怖',
    value: 'horror',
    icon: 'https://img.icons8.com/color/48/000000/haunted.png',
    image: 'https://img.freepik.com/free-photo/spooky-horror-woman-abandoned-house_53876-143292.jpg',
    description: '主要目标是营造紧张、不安、恐惧或毛骨悚然的氛围。可能涉及超自然现象、未知生物、心理惊悚、诡异谜团等。世界观本身可能平凡，但充满了不祥的秘密。'
  }
]

// 添加题材映射关系
const genreMapping = {
  '奇幻': 'fantasy',
  '科幻': 'scifi',
  '武侠/仙侠': 'wuxia',
  '现代都市': 'modern',
  '历史架空': 'historical',
  '末世废土': 'postapocalyptic',
  '赛博朋克': 'cyberpunk',
  '悬疑/恐怖': 'horror'
}

const tones = [
  {
    label: '史诗/宏大',
    value: 'epic',
    icon: 'https://img.icons8.com/color/48/000000/castle.png',
    description: '涉及广阔的地域、漫长的时间线、改变世界格局的重大事件和英雄人物。'
  },
  {
    label: '黑暗/冷峻',
    value: 'dark',
    icon: 'https://img.icons8.com/color/48/000000/moon-symbol.png',
    description: '世界观较为残酷，道德界限模糊，好人未必有好报，常伴有压抑、绝望或悲观的色彩。'
  },
  {
    label: '轻松/幽默',
    value: 'lighthearted',
    icon: 'https://img.icons8.com/color/48/000000/comedy.png',
    description: '整体氛围愉快、诙谐，可能包含喜剧、讽刺或戏谑元素，不追求过度的严肃与沉重。'
  },
  {
    label: '神秘/未知',
    value: 'mysterious',
    icon: 'https://img.icons8.com/color/48/000000/mystery.png',
    description: '充满了未解之谜、古老的秘密、难以捉摸的现象或力量，引人探索和遐想。'
  },
  {
    label: '希望/治愈',
    value: 'hopeful',
    icon: 'https://img.icons8.com/color/48/000000/sunrise.png',
    description: '即使面临困境，也总有光明和积极的可能，强调成长、救赎和人性的美好。'
  },
  {
    label: '严肃/写实',
    value: 'serious',
    icon: 'https://img.icons8.com/color/48/000000/scales.png',
    description: '注重逻辑的合理性和情节的真实感（即便在幻想题材中），探讨深刻的主题，情感表达克制而真挚。'
  },
  {
    label: '浪漫/诗意',
    value: 'romantic',
    icon: 'https://img.icons8.com/color/48/000000/novel.png',
    description: '强调情感的深度与强度，推崇理想主义，行文或意境富有美感和想象力。'
  },
  {
    label: '残酷/挣扎',
    value: 'gritty',
    icon: 'https://img.icons8.com/color/48/000000/fist.png',
    description: '直面生存的艰难、暴力的原始、人性的阴暗面，角色常在困境中艰难求生。'
  },
  {
    label: '温馨/日常',
    value: 'cozy',
    icon: 'https://img.icons8.com/color/48/000000/fireplace.png',
    description: '节奏较为平缓，侧重于角色间的互动、生活细节的描绘、平和温暖的情感体验。'
  },
  {
    label: '冒险/热血',
    value: 'adventurous',
    icon: 'https://img.icons8.com/color/48/000000/treasure-map.png',
    description: '充满探索未知、挑战强敌、追求目标的激情与活力，节奏通常较为明快。'
  },
  {
    label: '怪诞/荒谬',
    value: 'bizarre',
    icon: 'https://img.icons8.com/color/48/000000/tophat.png',
    description: '打破常规逻辑，充满奇特、荒诞不经的设定或事件，可能带有讽刺或黑色幽默。'
  }
]

// 添加基调映射关系
const toneMapping = {
  '史诗/宏大': 'epic',
  '黑暗/冷峻': 'dark',
  '轻松/幽默': 'lighthearted',
  '神秘/未知': 'mysterious',
  '希望/治愈': 'hopeful',
  '严肃/写实': 'serious',
  '浪漫/诗意': 'romantic',
  '残酷/挣扎': 'gritty',
  '温馨/日常': 'cozy',
  '冒险/热血': 'adventurous',
  '怪诞/荒谬': 'bizarre'
}

function toggleTone(val) {
  const idx = form.value.tones.indexOf(val)
  if (idx === -1) {
    // 如果未选中且未超过最大数量3个，则添加
    if (form.value.tones.length < 3) {
      form.value.tones.push(val)
    }
  } else {
    // 如果已选中，则移除
    form.value.tones.splice(idx, 1)
  }
}

const worldEditData = inject('worldEditData', null)

onMounted(() => {
  if (worldEditData && worldEditData.value && worldEditData.value.essence) {
    form.value.name = worldEditData.value.name || ''
    form.value.attraction = worldEditData.value.essence.core || ''
    // 题材风格映射
    const genreText = worldEditData.value.essence.genre || ''
    form.value.genre = genreMapping[genreText] || ''
    // 基调映射
    const toneTexts = Array.isArray(worldEditData.value.essence.tones) ? worldEditData.value.essence.tones : []
    const mappedTones = toneTexts.map(t => toneMapping[t]).filter(Boolean)
    form.value.tones = mappedTones.length ? mappedTones : []
  }
})
</script>

<style lang="scss">
/* 使用非scoped样式确保可以覆盖Element Plus的默认样式 */
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
  /* 透明背景 */
  width: 100%;
}

.essence-label {
  margin-bottom: 1.5rem;

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

/* 输入框样式 */
.el-input__wrapper {
  background: transparent !important;
  /* 透明背景 */
  border: 2px solid #d2b48c !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  /* 无阴影 */
  padding: 8px 12px !important;
}

.el-input__wrapper.is-focus {
  border-color: #8B4513 !important;
  border-width: 2.5px !important;
  box-shadow: none !important;
  /* 无阴影 */
}

.el-textarea__inner {
  background: transparent !important;
  /* 透明背景 */
  border: 2px solid #d2b48c !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  /* 无阴影 */
  padding: 8px 12px !important;
}

.el-textarea__inner:focus {
  border-color: #8B4513 !important;
  border-width: 2.5px !important;
  box-shadow: none !important;
  /* 无阴影 */
}
</style>

<style lang="scss" scoped>
/* 题材风格卡片 - 新的小卡片样式 */
.card-radio-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 0.5rem;
  position: relative;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  justify-items: center; // 新增：让每个卡片居中
  max-width: 600px; // 新增：限制最大宽度
  margin-left: auto; // 新增：整体居中
  margin-right: auto; // 新增：整体居中
}

.card-checkbox-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 0.5rem;
  position: relative;
  z-index: 5;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  justify-items: center; // 新增
  max-width: 600px; // 新增
  margin-left: auto; // 新增
  margin-right: auto; // 新增
}

.card-radio,
.card-checkbox {
  min-width: 140px; // 新增：保证每个卡片宽度一致
  max-width: 180px;
  width: auto;
  max-width: 180px;
  background: #f9f6ef;
  border: 2.5px solid #d2b48c;
  border-radius: 14px;
  padding: 1rem 1.2rem;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.06);
  position: relative;
  /* 确保相对定位 */
  user-select: none;

  &:hover:not(.disabled) {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
  }

  &.selected {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(139, 69, 19, 0.10);
    background: linear-gradient(135deg, #fffbe6 70%, #f5f5dc 100%);
    transform: scale(1.03);
  }

  &.showing-popup {
    /* 确保当前卡片位于其他卡片之上 */
    z-index: 50 !important;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    /* 用于标题的定位 */

    .card-icon-container {
      position: relative;
      width: 48px;
      height: 48px;
      margin-bottom: 0.5rem;
      will-change: transform;

      .card-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .card-title {
      font-family: var(--font-heading);
      font-size: 1.1rem;
      color: var(--primary-color);
      text-align: center;
      transition: transform 0.5s, font-weight 0.5s;
      will-change: transform, font-weight;

      &.title-enlarged {
        font-weight: 700;
        transform: translateY(-20px) scale(1.2);
      }
    }
  }
}

/* 题材风格的详情悬浮窗 */
.genre-detail-popup {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 380px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  z-index: 100;
  /* 确保悬浮窗位于所有内容之上 */
  overflow: hidden;
  pointer-events: none;
  /* 防止悬浮窗拦截鼠标事件 */

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }

  .genre-detail-content {
    display: flex;
    padding: 15px;
    position: relative;
    align-items: stretch;
    /* 确保图片和文字高度一致 */

    .genre-detail-image {
      width: 160px;
      /* 增宽图片区域 */
      flex-shrink: 0;
      /* 防止图片被压缩 */
      border-radius: 8px;
      overflow: hidden;
      margin-right: 15px;
      /* 增加与文字的间距 */

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .genre-detail-text {
      flex: 1;
      display: flex;
      flex-direction: column;

      h3 {
        font-family: var(--font-heading);
        font-size: 1.2rem;
        color: var(--primary-color);
        margin-top: 0;
        margin-bottom: 10px;
      }

      p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.5;
        margin: 0;
        flex-grow: 1;
        /* 让文本区域填充剩余空间 */
      }
    }

    .genre-detail-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;

      .detail-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

/* 淡入动画 */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

/* 世界基调卡片 */
.card-checkbox-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 0.5rem;
  position: relative;
  z-index: 5;
  /* 确保基调卡片层级低于题材风格悬浮窗 */
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  justify-items: center; // 新增
  max-width: 600px; // 新增
  margin-left: auto; // 新增
  margin-right: auto; // 新增
}

.card-checkbox {
  background: #f9f6ef;
  border: 2.5px solid #d2b48c;
  border-radius: 14px;
  padding: 1rem 1.2rem;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.06);
  position: relative;
  user-select: none;

  &:hover:not(.disabled) {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
  }

  &.selected {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(139, 69, 19, 0.10);
    background: linear-gradient(135deg, #fffbe6 70%, #f5f5dc 100%);
    transform: scale(1.03);
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(139, 69, 19, 0.06);
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .card-icon {
      width: 40px;
      height: 40px;
      margin-bottom: 0.5rem;
    }
  }

  .info-icon {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    color: var(--primary-color);
    font-size: 1.1rem;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--primary-color);
  font-weight: 400;
  /* 添加默认字重以便动画 */
  text-align: center;
}

.tone-selection-hint {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  position: relative;
  z-index: 5;

  span {
    font-size: 0.9rem;
    color: var(--text-secondary);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    background: rgba(210, 180, 140, 0.2);

    &.hint-text {
      color: #888;
      font-size: 0.85rem;
      background: transparent;
    }
  }
}

/* 下一步按钮容器 */
.next-step-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  position: relative;
  z-index: 5;
}

/* 下一步按钮样式 */
.next-step-button {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: white !important;
  font-family: var(--font-heading) !important;
  font-size: 1.1rem !important;
  padding: 0.7rem 2rem !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2) !important;
  transition: all 0.3s ease !important;

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 69, 19, 0.25) !important;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@media (max-width: 768px) {

  .card-radio-group,
  .card-checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); // 修改这里
    gap: 1.2rem;
    margin-top: 0.5rem;
    position: relative;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    justify-items: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 480px) {

  .card-radio-group,
  .card-checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); // 修改这里
    gap: 1.2rem;
    margin-top: 0.5rem;
    position: relative;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    justify-items: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .next-step-button {
    width: 100%;
    /* 按钮占满整行 */
  }

  .next-step-container {
    justify-content: center;
    /* 按钮居中 */
  }
}
</style>