<template>
    <div class="character-details-content">
        <!-- 版块一：核心身份 -->
        <section class="details-section">
            <div class="identity-header">
                <input v-model="model.name" class="editable-title" :placeholder="'未命名角色'" />
            </div>
            <h3>核心身份</h3>
            <div class="form-row">
                <div class="form-col portrait-col">
                    <div class="portrait-uploader">
                        <div v-if="!model.portrait" class="portrait-placeholder" @click="triggerUpload">
                            <svg width="64" height="64" viewBox="0 0 64 64">
                                <circle cx="32" cy="32" r="30" fill="#e0e0e0" />
                                <path d="M32 18v28M18 32h28" stroke="#c19a49" stroke-width="3" stroke-linecap="round" />
                            </svg>
                            <span>上传肖像</span>
                        </div>
                        <div v-else class="portrait-img-wrapper">
                            <img :src="model.portrait" alt="角色肖像" />
                            <button class="portrait-remove" @click="removePortrait">移除</button>
                        </div>
                        <button class="portrait-generate simple-btn" @click="generatePortrait">自动生成肖像</button>
                        <input ref="fileInput" type="file" accept="image/*" style="display:none"
                            @change="onPortraitChange" />
                    </div>
                </div>
                <div class="form-col info-col">
                    <div class="form-group">
                        <label>角色名称</label>
                        <input v-model="model.name" type="text" placeholder="请输入角色名称" />
                    </div>
                    <div class="form-group">
                        <label>种族/物种</label>
                        <CustomSelect v-model="model.race" :options="raceOptions" placeholder="请选择或输入种族/物种" />
                    </div>
                    <div class="form-group">
                        <label>职业/身份</label>
                        <input v-model="model.occupation" type="text" placeholder="请输入职业或身份" />
                    </div>
                    <div class="form-group">
                        <label>年龄</label>
                        <input v-model="model.age" type="text" placeholder="请输入年龄" />
                    </div>
                    <div class="form-group">
                        <label>性别/代称</label>
                        <CustomSelect v-model="model.gender" :options="genderOptions" placeholder="请选择或输入性别/代称" />
                    </div>
                </div>
            </div>
            <div class="form-row column-layout">
                <div class="form-col">
                    <div class="form-group">
                        <label>主要外貌特征</label>
                        <textarea v-model="model.appearance" rows="2" placeholder="如发色、瞳色、身形、肤色、特殊标记等"></textarea>
                    </div>
                </div>
                <div class="form-col">
                    <div class="form-group">
                        <label>着装风格/标志性物品</label>
                        <textarea v-model="model.clothing" rows="2" placeholder="如服饰风格、常带物品、饰品等"></textarea>
                    </div>
                </div>
            </div>
        </section>

        <!-- 版块二：性格与内心 -->
        <section class="details-section">
            <h3>性格与内心</h3>
            <div class="form-row column-layout">
                <div class="form-col">
                    <div class="form-group">
                        <label>核心性格</label>
                        <input v-model="model.personality" type="text" placeholder="如：开朗、冷静、谨慎等" />
                    </div>
                </div>
                <div class="form-col">
                    <div class="form-group">
                        <label>角色理念/驱动力/目标</label>
                        <input v-model="model.motivation" type="text" placeholder="如：守护家人、追求自由等" />
                    </div>
                </div>
                <div class="form-col">
                    <div class="form-group">
                        <label>优点/长处</label>
                        <input v-model="model.strengths" type="text" placeholder="如：勇敢、聪明、善良等" />
                    </div>
                </div>
                <div class="form-col">
                    <div class="form-group">
                        <label>缺点/弱点</label>
                        <input v-model="model.weaknesses" type="text" placeholder="如：冲动、固执、胆小等" />
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <div class="form-group">
                        <label>能力与技艺</label>
                        <el-input v-model="model.skills" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }"
                            placeholder="如：剑术、魔法、谈判、烹饪等，建议分条填写"></el-input>
                    </div>
                </div>
            </div>
        </section>

        <!-- 版块三：背景与羁绊 -->
        <section class="details-section">
            <h3>背景与羁绊</h3>
            <div class="form-group">
                <label>背景故事</label>
                <el-input v-model="model.background" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }"
                    placeholder="请描述角色的成长经历、重要事件等"></el-input>
            </div>
            <div class="form-group">
                <label>重要人际关系</label>
                <div class="relations-list">
                    <div v-for="(rel, idx) in model.relations" :key="rel.id" class="relation-item">
                        <input v-model="rel.name" type="text" placeholder="关系人名称" class="relation-input" />
                        <input v-model="rel.type" type="text" placeholder="关系类型" class="relation-input" />
                        <input v-model="rel.desc" type="text" placeholder="关系描述" class="relation-input" />
                        <el-button class="relation-remove simple-btn" type="danger" size="small"
                            @click="removeRelation(idx)">删除</el-button>
                    </div>
                </div>
                <el-button class="relation-add simple-btn" type="primary" size="small" @click="addRelation">+
                    添加关系</el-button>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch } from 'vue'
import { ElInput, ElSelect, ElOption, ElButton } from 'element-plus'
import CustomSelect from '../../components/CustomSelect.vue'

const props = defineProps({
    modelValue: Object
})
const emit = defineEmits(['update:modelValue'])

const model = reactive(props.modelValue || {
    name: '',
    portrait: '',
    race: '',
    occupation: '',
    age: '',
    gender: '',
    appearance: '',
    clothing: '',
    personality: '',
    motivation: '',
    strengths: '',
    weaknesses: '',
    skills: '',
    background: '',
    relations: []
})

// 保证relations始终为数组
watch(model, (val) => {
    if (!Array.isArray(model.relations)) {
        model.relations = []
    }
})

const raceOptions = [
    '人类', '精灵', '兽人', '矮人', '龙裔', '吸血鬼', '天使', '恶魔', '哥布林', '巨人', '半身人', '侏儒', '狼人', '动物', '机器人', 'AI智能体', '外星人', '幽灵', '元素生物', '魔法生物', '神明', '半精灵', '半兽人', '自定义'
]
const genderOptions = [
    '男性', '女性', '非二元', '变性', '无性别', '自定义'
]
const relationTypeOptions = [
    '朋友', '亲人', '同伴', '敌人', '导师', '学生', '恋人', '前任', '仆人', '主子', '同事', '竞争者', '盟友', '死敌', '救命恩人', '宿敌', '偶像', '粉丝', '邻居', '自定义'
]

const fileInput = ref(null)
function triggerUpload() {
    fileInput.value && fileInput.value.click()
}
function onPortraitChange(e) {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => {
            model.portrait = ev.target.result
            emit('update:modelValue', model)
        }
        reader.readAsDataURL(file)
    }
}
function removePortrait() {
    model.portrait = ''
    emit('update:modelValue', model)
}
function addRelation() {
    if (!Array.isArray(model.relations)) model.relations = []
    model.relations.push({ id: Date.now() + Math.random(), name: '', type: '', desc: '' })
    emit('update:modelValue', model)
}
function removeRelation(idx) {
    model.relations.splice(idx, 1)
    emit('update:modelValue', model)
}
function generatePortrait() {
    alert('正在产生肖像...')
}
</script>

<style scoped>
.character-details-content {
    width: 100%;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(193, 154, 73, 0.08);
    padding: 2.5rem 2.2rem 2.2rem 2.2rem;
    box-sizing: border-box;
}

.details-section {
    margin-bottom: 2.5rem;
}

.identity-header {
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
}

.editable-title {
    font-size: 2rem;
    font-family: 'Bangers', 'STZhongsong', '华文中宋', serif;
    color: #a67c3c;
    font-weight: bold;
    border: none;
    background: transparent;
    outline: none;
    text-align: center;
    width: 100%;
    margin-bottom: 0.2rem;
    transition: box-shadow 0.2s;
    border-radius: 6px;
}

.editable-title:focus {
    box-shadow: 0 2px 8px #e6dcbf;
    background: #f9f6f1;
}

.form-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.2rem;
}

.form-col {
    flex: 1;
}

.portrait-col {
    max-width: 160px;
    flex: none;
}

.portrait-uploader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.portrait-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #f5e6c8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(193, 154, 73, 0.10);
    transition: background 0.2s;
    color: #a67c3c;
    font-size: 1.1rem;
}

.portrait-placeholder:hover {
    background: #e6dcbf;
}

.portrait-img-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(193, 154, 73, 0.10);
}

.portrait-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.portrait-remove {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    color: #a67c3c;
    border: 1px solid #e6dcbf;
    border-radius: 8px;
    font-size: 0.9rem;
    padding: 2px 10px;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(193, 154, 73, 0.10);
    transition: background 0.2s, color 0.2s, opacity 0.3s;
    opacity: 0;
    /* 初始状态隐藏 */
}

.portrait-img-wrapper:hover .portrait-remove {
    opacity: 1;
    /* 悬停时显示 */
}

.portrait-remove:hover {
    background: #e6dcbf;
    color: #fff;
}

.form-group {
    margin-bottom: 1.1rem;
}

.form-group label {
    font-weight: 500;
    color: #a67c3c;
    margin-bottom: 0.3rem;
    display: block;
}

input[type="text"],
textarea,
.el-input__inner {
    width: 100%;
    border: 1.5px solid #c19a49;
    border-radius: 12px;
    padding: 0.5em 0.9em;
    font-size: 1rem;
    color: #6b4c1b;
    background: transparent;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
    transition: border 0.2s;
    box-sizing: border-box;
}

input[type="text"]:focus,
textarea:focus,
.el-input__inner:focus {
    border: 2px solid #a67c3c;
    background: #fff;
}

input[type="text"]::placeholder,
textarea::placeholder,
.el-input__inner::placeholder {
    color: #bfc3c9;
    font-size: 0.98rem;
    font-family: 'SimSun', '宋体', serif;
    opacity: 1;
}

.el-select,
.el-input {
    width: 100%;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.relations-list {
    margin-bottom: 0.7rem;
}

.relation-item {
    display: flex;
    gap: 0.7rem;
    align-items: center;
    margin-bottom: 0.5rem;
}

.relation-input {
    flex: 1;
    min-width: 80px;
}

.relation-input:nth-child(3) {
    flex: 6;
    /* 第三栏更宽 */
}

.relation-remove {
    background: #f9f6f1;
    color: #a67c3c;
    border: 1px solid #e6dcbf;
    border-radius: 7px;
    font-size: 0.95rem;
    padding: 2px 10px;
    margin-left: 0.2rem;
    transition: background 0.2s, color 0.2s;
}

.relation-remove:hover {
    background: #e6dcbf;
    color: #fff;
}

.relation-add {
    background: linear-gradient(90deg, #e6dcbf 0%, #c19a49 100%);
    color: #6b4c1b;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
    padding: 0.5em 1.2em;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

.relation-add:hover {
    background: linear-gradient(90deg, #c19a49 0%, #e6dcbf 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.13);
}

.form-row.column-layout {
    flex-direction: column;
    gap: 0.5rem;
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

.el-input,
.el-input__inner,
.el-textarea__inner {
    font-family: 'Microsoft YaHei', Arial, sans-serif !important;
    font-size: 2rem !important;
    color: #6b4c1b !important;
    background: transparent !important;
}
</style>
