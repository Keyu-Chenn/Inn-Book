<template>
    <div class="custom-select-wrapper" :class="{ focused: isOpen }">
        <div class="custom-select-display" @click="toggleDropdown">
            <span v-if="selectedLabel">{{ selectedLabel }}</span>
            <span v-else class="placeholder">{{ placeholder }}</span>
            <svg class="arrow" width="18" height="18" viewBox="0 0 18 18">
                <path d="M4 7l5 5 5-5" stroke="#a67c3c" stroke-width="2" fill="none" />
            </svg>
        </div>
        <div v-if="isOpen" class="custom-select-dropdown">
            <div class="custom-select-option" :class="{ selected: isCustom }" @click="selectCustom">
                <span>自定义</span>
            </div>
            <div v-if="isCustom" class="custom-input-row">
                <input v-model="customValue" class="custom-input" placeholder="请输入自定义内容"
                    @keydown.enter.stop.prevent="confirmCustom" />
                <button class="portrait-generate simple-btn" @click="confirmCustom">确定</button>
            </div>
            <div v-for="(option, idx) in options" :key="option" class="custom-select-option"
                :class="{ selected: value === option }" @click="selectOption(option)">
                <span>{{ option }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
    modelValue: String,
    options: Array,
    placeholder: String
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const isCustom = ref(false)
const customValue = ref('')
const value = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})
const selectedLabel = computed(() => {
    if (isCustom.value) return customValue.value || '自定义'
    if (props.options.includes(value.value)) return value.value
    return value.value || ''
})
function toggleDropdown() {
    isOpen.value = !isOpen.value
}
function selectCustom() {
    isCustom.value = true
    isOpen.value = true
    customValue.value = value.value && !props.options.includes(value.value) ? value.value : ''
}
function confirmCustom() {
    if (customValue.value) {
        value.value = customValue.value
        isOpen.value = false
    }
}
function selectOption(option) {
    value.value = option
    isCustom.value = false
    isOpen.value = false
}
watch(() => props.modelValue, v => {
    if (!props.options.includes(v) && v) {
        isCustom.value = true
        customValue.value = v
    } else {
        isCustom.value = false
        customValue.value = ''
    }
})
</script>

<style scoped>
.custom-select-wrapper {
    position: relative;
    width: 100%;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.custom-select-display {
    background: transparent;
    border: 1.5px solid #c19a49;
    border-radius: 12px;
    padding: 0.5em 0.9em;
    font-size: 1rem;
    color: #6b4c1b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border 0.2s;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.custom-select-wrapper.focused .custom-select-display {
    border: 2px solid #a67c3c;
    background: #fff;
}

.placeholder {
    color: #bfc3c9;
    font-size: 0.98rem;
    font-family: 'SimSun', '宋体', serif;
}

.arrow {
    margin-left: 0.5em;
    transition: transform 0.2s;
}

.custom-select-wrapper.focused .arrow {
    transform: rotate(180deg);
}

.custom-select-display::placeholder {
    color: #bfc3c9;
    font-size: 0.98rem;
    font-family: 'SimSun', '宋体', serif;
    opacity: 1;
}

.custom-select-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 110%;
    min-width: 180px;
    background: #fff;
    border: 1.5px solid #c19a49;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(193, 154, 73, 0.10);
    z-index: 9999;
    padding: 0.3em 0;
    max-height: 12.5rem;
    overflow-y: auto;
    font-size: 0.95rem;
}

.custom-select-option {
    padding: 0.5em 1em;
    cursor: pointer;
    color: #6b4c1b;
    font-size: 0.95rem;
    transition: background 0.2s, color 0.2s;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.custom-select-option.selected,
.custom-select-option:hover {
    background: #f5e6c8;
    color: #a67c3c;
}

.custom-input-row {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em 1em;
}

.custom-input {
    flex: 1;
    border: 1px solid #e6dcbf;
    border-radius: 6px;
    padding: 0.3em 0.7em;
    font-size: 1rem;
    color: #6b4c1b;
    background: #fcfaf6;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.custom-input:focus {
    border: 1.5px solid #c19a49;
    background: #fff;
}

.custom-input::placeholder {
    color: #bfc3c9;
    font-size: 0.98rem;
    font-family: 'SimSun', '宋体', serif;
    opacity: 1;
}

.custom-confirm {
    margin-top: 0;
    background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
    color: #6b4c1b;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
    padding: 0.5em 1.2em;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    cursor: pointer;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.custom-confirm:hover {
    background: linear-gradient(90deg, #c19a49 0%, #e6dcbf 100%);
    color: #6b4c1b;
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
}


.portrait-generate {
    margin-top: 0.5rem;
    background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
    color: #6b4c1b;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
    padding: 0.5em 1.2em;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    cursor: pointer;
}

.portrait-generate:hover {
    background: linear-gradient(90deg, #c19a49 0%, #e6dcbf 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
}


.simple-btn {
    background: #e6dcbf;
    color: #6b4c1b;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    box-shadow: none;
    padding: 0.5em 1.2em;
    transition: background 0.2s;
    cursor: pointer;
}

.simple-btn:hover {
    background: #c19a49;
    color: #6b4c1b;
}
</style>