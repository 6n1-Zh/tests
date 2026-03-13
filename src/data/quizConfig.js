const QUESTION_MAP = [
  { A: "aries", B: "cancer", C: "gemini", D: "virgo" },      // 题1
  { A: "leo", B: "pisces", C: "libra", D: "taurus" },        // 题2
  { A: "aries", B: "scorpio", C: "libra", D: "capricorn" },  // 题3
  { A: "leo", B: "cancer", C: "aquarius", D: "capricorn" },  // 题4
  { A: "leo", B: "scorpio", C: "aquarius", D: "capricorn" }, // 题5
  { A: "aries", B: "pisces", C: "aquarius", D: "taurus" },   // 题6
  { A: "aries", B: "scorpio", C: "aquarius", D: "virgo" },   // 题7
  { A: "sagittarius", B: "pisces", C: "gemini", D: "capricorn" }, // 题8
  { A: "aries", B: "cancer", C: "libra", D: "taurus" },      // 题9
  { A: "aries", B: "cancer", C: "aquarius", D: "capricorn" }, // 题10
  { A: "sagittarius", B: "pisces", C: "gemini", D: "virgo" }, // 题11
  { A: "leo", B: "cancer", C: "libra", D: "virgo" },         // 题12
  { A: "leo", B: "scorpio", C: "gemini", D: "virgo" },       // 题13
  { A: "sagittarius", B: "pisces", C: "libra", D: "taurus" }, // 题14
  { A: "sagittarius", B: "cancer", C: "libra", D: "taurus" } // 题15
];

const SIGN_INFO = {
  aries: {
    name: "白羊座",
    description: "您适配白羊座伴侣。白羊座热情直接、敢爱敢恨，充满行动力，能带您一起冒险。您的独立和直率与白羊的坦诚相配，两人在一起充满活力与激情，TA会用最直接的方式表达爱意。"
  },
  leo: {
    name: "狮子座",
    description: "您适配狮子座伴侣。狮子座自信大方、重情重义，喜欢被崇拜也愿意付出。您的欣赏能让狮子更有动力，而狮子的保护欲和浪漫仪式感会给您足够的安全感与惊喜。"
  },
  sagittarius: {
    name: "射手座",
    description: "您适配射手座伴侣。射手座乐观开朗、热爱自由，追求新鲜体验。您与射手都是行动派，能一起探索世界，像最佳玩伴一样享受人生，TA会带您不断拓展生活的边界。"
  },
  cancer: {
    name: "巨蟹座",
    description: "您适配巨蟹座伴侣。巨蟹座情感细腻、重视家庭，能敏锐察觉您的情绪变化。您的感性需要被温柔对待，而巨蟹正是那个愿意默默陪伴、给您归属感的人，让您感受到家的温暖。"
  },
  scorpio: {
    name: "天蝎座",
    description: "您适配天蝎座伴侣。天蝎座深情专注、洞察力强，追求灵魂深处的连接。您的真诚能打动天蝎，而天蝎的忠诚和专一正是您所期待的安全感，TA会用深刻的方式爱您。"
  },
  pisces: {
    name: "双鱼座",
    description: "您适配双鱼座伴侣。双鱼座浪漫温柔、富有想象力，懂得用感性的方式回应您的情感。您与双鱼能在情感上相互滋养，共同编织美好生活，TA会给您无尽的温柔与幻想。"
  },
  gemini: {
    name: "双子座",
    description: "您适配双子座伴侣。双子座思维活跃、好奇心强，总能带来新鲜话题和体验。您的独立思想与双子的灵活多变相得益彰，是精神层面的最佳拍档，永远不会无聊。"
  },
  libra: {
    name: "天秤座",
    description: "您适配天秤座伴侣。天秤座优雅温和、追求平衡，懂得在关系中营造和谐。您欣赏有思想的人，而天秤的沟通能力和审美品味正好满足您的期待，TA会让生活充满美感。"
  },
  aquarius: {
    name: "水瓶座",
    description: "您适配水瓶座伴侣。水瓶座独立创新、思想前卫，尊重彼此的个人空间。您需要不被束缚的关系，而水瓶正好能给您自由的同时保持精神共鸣，TA会带您看到更广阔的世界。"
  },
  taurus: {
    name: "金牛座",
    description: "您适配金牛座伴侣。金牛座稳重踏实、享受生活，能给您最实在的关怀。您重视生活品质，而金牛愿意用时间和耐心陪伴您慢慢经营，TA是您最可靠的港湾。"
  },
  virgo: {
    name: "处女座",
    description: "您适配处女座伴侣。处女座细致周到、追求完美，能把生活安排得井井有条。您的规划意识与处女的条理性高度契合，一起构建有序的生活，TA会在细节中体现关爱。"
  },
  capricorn: {
    name: "摩羯座",
    description: "您适配摩羯座伴侣。摩羯座目标明确、责任感强，是值得信赖的人生伙伴。您的务实态度与摩羯的进取心一致，能并肩朝着共同目标稳步前行，TA会给您最坚实的支持。"
  }
};

export function calculateQuizResult(answers) {
  const scores = {
    aries: 0, leo: 0, sagittarius: 0,
    cancer: 0, scorpio: 0, pisces: 0,
    gemini: 0, libra: 0, aquarius: 0,
    taurus: 0, virgo: 0, capricorn: 0
  };

  answers.forEach((answer, index) => {
    if (index < QUESTION_MAP.length) {
      const question = QUESTION_MAP[index];
      const sign = question[answer];
      if (sign) scores[sign] += 1;
    }
  });

  let maxScore = -1, bestSign = null;
  for (const [sign, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestSign = sign;
    }
  }

  const result = SIGN_INFO[bestSign];
  const scoreText = Object.entries(scores)
    .map(([sign, score]) => `${SIGN_INFO[sign].name}: ${score}分`)
    .join("\n");

  const text = `您的选择结果分析：\n${scoreText}\n\n✨ 根据您的答题，您最适配的星座是：${result.name}\n\n${result.description}`;

  return {
    scores,
    bestSign,
    bestName: result.name,
    description: result.description,
    text
  };
}
