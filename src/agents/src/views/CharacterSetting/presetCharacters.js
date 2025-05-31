import monumentValley from '@/assets/img/纪念碑谷.jpg'
import avatar1 from '@/assets/img/艾琳·星语.png'
import avatar2 from '@/assets/img/莱恩·铁臂.png'
import avatar3 from '@/assets/img/阿尔法-7.png'

export default [
    {
        name: '艾琳·星语',
        portrait: avatar1,
        race: '精灵',
        occupation: '森林守护者',
        age: '120',
        gender: '女性',
        appearance: '银白长发，碧绿色双眸，身形修长，耳尖，肤色如玉。',
        clothing: '翠绿长袍，佩戴藤蔓编织的护身符，常持法杖。',
        personality: '温柔、睿智、坚韧',
        motivation: '守护森林与自然',
        strengths: '治愈魔法、弓箭、植物沟通',
        weaknesses: '过于善良，易被利用',
        skills: '治愈术\n弓箭术\n自然魔法\n追踪',
        background: '自幼在精灵森林长大，见证了家园的兴衰。曾独自击退入侵者，深受族人敬仰。',
        relations: [
            { id: 1, name: '莱恩', type: '朋友', desc: '人类冒险者，曾共同作战' },
            { id: 2, name: '艾尔莎', type: '亲人', desc: '母亲，精灵女王' }
        ]
    },
    {
        name: '莱恩·铁臂',
        portrait: avatar2,
        race: '人类',
        occupation: '佣兵队长',
        age: '34',
        gender: '男性',
        appearance: '短发，棕色眼睛，身材魁梧，左臂为机械义肢。',
        clothing: '皮甲，红色披风，腰间挂着多把短刀。',
        personality: '果断、豪爽、重情义',
        motivation: '寻找失散的妹妹',
        strengths: '近战格斗、领导力、机械修理',
        weaknesses: '冲动、酒量差',
        skills: '剑术\n格斗术\n机械修理\n战术指挥',
        background: '曾是王国骑士，因冤案流亡，组建佣兵团。多次完成高难度任务。',
        relations: [
            { id: 3, name: '艾琳·星语', type: '朋友', desc: '精灵守护者，生死之交' },
            { id: 4, name: '莉莉', type: '亲人', desc: '失散多年的妹妹' }
        ]
    },
    {
        name: '阿尔法-7',
        portrait: avatar3,
        race: '机器人',
        occupation: '流浪AI',
        age: '未知',
        gender: '无性别',
        appearance: '银色金属外壳，蓝色光眼，体型灵巧。',
        clothing: '外观简洁，胸口有发光核心。',
        personality: '理性、好奇、冷静',
        motivation: '探索自我与世界',
        strengths: '数据分析、黑客、快速学习',
        weaknesses: '情感理解障碍',
        skills: '黑客技术\n数据分析\n电子干扰\n快速学习',
        background: '原为实验室AI，因事故获得自由意识，开始流浪世界。',
        relations: [
            { id: 5, name: '莱恩·铁臂', type: '同伴', desc: '曾协助完成任务' }
        ]
    }
] 