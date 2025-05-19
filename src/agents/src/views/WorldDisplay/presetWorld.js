import presetCharacters from '@/views/CharacterSetting/presetCharacters.js'

const worldDetails = [
    {
        id: 1,
        name: '星辰大海',
        essence: {
            core: '一个充满未知与探索的科幻世界，人类文明已经发展到了星际时代。',
            genre: '科幻',
            tones: ['探索', '冒险', '未知']
        },
        reality: {
            techLevel: '高度发达，已实现星际旅行',
            geography: '宇宙中多个星系，每个星系都有独特的星球环境。',
            mapUrl: null,
            physicalLaws: ['引力可调节', '空间折叠技术'],
            magicSystem: '无'
        },
        life: {
            races: ['人类', '外星种族A', '外星种族B'],
            society: '星际联邦制，多个种族和平共处。',
            history: '人类首次发现外星文明，建立了星际联邦。'
        },
        characters: [presetCharacters[0], presetCharacters[2]]
    },
    {
        id: 2,
        name: '魔法学院',
        essence: {
            core: '在这个世界中，魔法是真实存在的，年轻的魔法师们在古老的学院中学习。',
            genre: '奇幻',
            tones: ['神秘', '魔法', '成长']
        },
        reality: {
            techLevel: '中世纪',
            geography: '一个被魔法笼罩的大陆，学院位于大陆中心。',
            mapUrl: null,
            physicalLaws: ['魔法能量流动', '元素法则'],
            magicSystem: '元素魔法，分为火、水、风、土四大系。'
        },
        life: {
            races: ['人类', '精灵', '矮人'],
            society: '魔法学院主导，各种族共同学习魔法。',
            history: '魔法学院成立，成为魔法研究的中心。'
        },
        characters: [presetCharacters[1]]
    },
    {
        id: 3,
        name: '末日求生',
        essence: {
            core: '一场突如其来的灾难改变了世界，幸存者们在这个残酷的新世界中挣扎求生。',
            genre: '末日',
            tones: ['生存', '绝望', '希望']
        },
        reality: {
            techLevel: '低科技',
            geography: '废墟城市，荒芜的荒野。',
            mapUrl: null,
            physicalLaws: ['辐射影响', '气候异常'],
            magicSystem: '无'
        },
        life: {
            races: ['人类', '变异生物'],
            society: '小型幸存者社区，资源争夺激烈。',
            history: '核战争爆发，世界陷入末日。'
        }
    },
    {
        id: 4,
        name: '江湖风云',
        essence: {
            core: '一个充满侠义与恩怨的武侠世界，各大门派之间的明争暗斗从未停歇。',
            genre: '武侠',
            tones: ['侠义', '恩怨', '江湖']
        },
        reality: {
            techLevel: '古代',
            geography: '山川河流，江湖门派遍布各地。',
            mapUrl: null,
            physicalLaws: ['内力运行', '轻功法则'],
            magicSystem: '无'
        },
        life: {
            races: ['人类'],
            society: '各大门派割据，江湖纷争不断。',
            history: '江湖门派成立，侠义精神传承。'
        }
    },
    {
        id: 5,
        name: '未来都市',
        essence: {
            core: '在科技高度发达的未来，人类与人工智能共同生活在这个充满可能性的城市中。',
            genre: '科幻',
            tones: ['科技', '未来', '共存']
        },
        reality: {
            techLevel: '超高科技',
            geography: '摩天大楼，空中交通，地下城市。',
            mapUrl: null,
            physicalLaws: ['量子计算', '人工智能法则'],
            magicSystem: '无'
        },
        life: {
            races: ['人类', '人工智能'],
            society: '人类与AI共存，共同发展。',
            history: '人工智能觉醒，与人类和平共处。'
        }
    }
];

export default worldDetails; 