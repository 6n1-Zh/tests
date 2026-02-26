/*
========================================
伴侣星座匹配 · 完整本地算法版（无API）
直接调用：
calculateQuizResult(["A","B","C"...])
========================================
*/

/* ================================
1️⃣ 基础映射
================================ */

const ELEMENT_MAP = {
  A: "fire",
  B: "water",
  C: "air",
  D: "earth"
};

/* ================================
2️⃣ 星座锚点题规则
================================ */

const ANCHOR_RULES = {

  fire: {
    aries:  [3, 6, 8, 11, 15],
    leo:    [2, 4, 5, 10, 13, 14]
  },

  water: {
    cancer:  [2, 3, 6, 10],
    scorpio: [5, 7, 8, 12],
    pisces:  [4, 9, 11, 14]
  },

  air: {
    gemini:   [2, 8, 11, 13],
    libra:    [5, 7, 9, 12],
    aquarius: [3, 6, 10, 14]
  },

  earth: {
    taurus:     [2, 8, 12, 14],
    virgo:      [1, 4, 7, 13],
    capricorn:  [5, 6, 10, 11]
  }

};

/* ================================
3️⃣ 星座中文名
================================ */

const SIGN_NAME = {
  aries: "白羊座",
  leo: "狮子座",
  cancer: "巨蟹座",
  scorpio: "天蝎座",
  pisces: "双鱼座",
  gemini: "双子座",
  libra: "天秤座",
  aquarius: "水瓶座",
  taurus: "金牛座",
  virgo: "处女座",
  capricorn: "摩羯座"
};

/* ================================
4️⃣ 性格文案模板（可自行修改）
================================ */

const TEXT_TEMPLATE = {

  fire: "你偏好热情主动、有行动力、能带你冲向新世界的伴侣。",
  water: "你渴望细腻温柔、懂情绪价值、能提供安全感的关系。",
  air: "你喜欢聪明有趣、独立有思想、能和你精神共鸣的人。",
  earth: "你重视稳定踏实、有规划感、可靠长期主义的伴侣。"

};

/* ================================
5️⃣ 主函数 ⭐⭐⭐ 直接调用这个
================================ */

export function calculateQuizResult(answers) {

  /* ---------- Step1 象性计数 ---------- */

  const elementScore = {
    fire: 0,
    water: 0,
    air: 0,
    earth: 0
  };

  answers.forEach(a => {
    elementScore[ELEMENT_MAP[a]]++;
  });

  /* ---------- Step2 主导象判定 ---------- */

  const sorted = Object.entries(elementScore)
    .sort((a, b) => b[1] - a[1]);

  const [maxElement, max] = sorted[0];
  const second = sorted[1][1];

  let type = "均衡型";

  if (max >= 8 && max - second >= 3) {
    type = "单一主导";
  } else if (max >= 6 && max - second <= 2) {
    type = "双主导";
  }

  /* ---------- Step3 星座细分 ---------- */

  let finalSign = null;

  const optionLetterMap = {
    fire: "A",
    water: "B",
    air: "C",
    earth: "D"
  };

  const letter = optionLetterMap[maxElement];

  const ruleSet = ANCHOR_RULES[maxElement];

  function countAnchor(indices) {
    return indices.filter(i => answers[i - 1] === letter).length;
  }

  // 🔥 火象特殊规则（白羊/狮子）
  if (maxElement === "fire") {

    const ariesScore = countAnchor(ruleSet.aries);
    const leoScore = countAnchor(ruleSet.leo);

    if (ariesScore >= 4) finalSign = "白羊座";
    else if (leoScore >= 4) finalSign = "狮子座";
    else if (Math.abs(ariesScore - leoScore) <= 1 && elementScore.fire >= 9) {
      finalSign = "白羊 + 狮子混合";
    }
  }

  // 其他象
  else {
    for (const sign in ruleSet) {
      const score = countAnchor(ruleSet[sign]);
      if (score >= 3) {
        finalSign = SIGN_NAME[sign];
        break;
      }
    }
  }

  /* ---------- Step4 文案生成 ---------- */

  const text =
    `你的象性得分：🔥${elementScore.fire}  💧${elementScore.water}  🌪️${elementScore.air}  ⛰️${elementScore.earth}\n` +
    `判定结果：${type} ${maxElement}象\n\n` +
    `${TEXT_TEMPLATE[maxElement]}\n` +
    `最适合你的伴侣星座：${finalSign}`;

  return {
    elementScore,
    type,
    element: maxElement,
    sign: finalSign,
    text
  };
}

