import { QUESTIONS } from '../data/questions.js';
import { calculateQuizResult, SIGN_INFO } from '../data/quizConfig.js';  // 添加 SIGN_INFO

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const backToStartBtn = document.getElementById('back-to-start-btn');

const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const progressLabelEl = document.getElementById('progress-label');
const progressBarInnerEl = document.getElementById('progress-bar-inner');

const resultSignEl = document.getElementById('result-sign');
const resultTypeEl = document.getElementById('result-type');
const resultTextEl = document.getElementById('result-text');
const scoreListEl = document.getElementById('score-list');

const restartBtnTop = document.getElementById('restart-btn-top');
const restartBtnBottom = document.getElementById('restart-btn-bottom');

let currentIndex = 0;
let answers = [];
const totalQuestions = QUESTIONS.length;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => {
    if (!s) return;
    if (s === screen) {
      s.classList.add('screen--active');
    } else {
      s.classList.remove('screen--active');
    }
  });
}

function updateProgress() {
  const currentNum = currentIndex + 1;
  progressLabelEl.textContent = `第 ${currentNum} / ${totalQuestions} 题`;
  const percent = (currentNum / totalQuestions) * 100;
  progressBarInnerEl.style.width = `${percent}%`;
}

function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  if (!q) return;

  questionTextEl.textContent = q.text;

  optionsContainer.innerHTML = '';

  const options = q.options;

  Object.entries(options).forEach(([key, value]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn option-btn';
    btn.dataset.option = key;
    btn.innerHTML = `<span class="option-key">${key}</span><span class="option-text">${value}</span>`;
    btn.addEventListener('click', () => handleAnswer(key));
    optionsContainer.appendChild(btn);
  });

  updateProgress();
}

function handleAnswer(optionLetter) {
  answers[currentIndex] = optionLetter;

  if (currentIndex < totalQuestions - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    handleFinish();
  }
}

function handleFinish() {
  const finalAnswers = answers.slice(0, totalQuestions);

  const result = calculateQuizResult(finalAnswers);
  
  // 显示最佳星座
  resultSignEl.textContent = result.bestName;
  
  // 清空类型显示（新逻辑没有type字段）
  resultTypeEl.textContent = '';
  
  // 构建分数列表
  scoreListEl.innerHTML = '';
  
  // 将星座分数转换为数组
  const scoreEntries = Object.entries(result.scores).map(([sign, score]) => ({
    sign,
    name: SIGN_INFO[sign].name,
    score
  }));
  
  // 按分数从高到低排序
  scoreEntries.sort((a, b) => b.score - a.score);
  
  // 计算最高分用于进度条比例
  const maxScore = Math.max(...scoreEntries.map(item => item.score)) || 1;
  
  // 渲染每个星座的分数
  scoreEntries.forEach(item => {
    const li = document.createElement('li');
    li.className = 'score-item';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'score-label';
    labelSpan.textContent = item.name;

    const barOuter = document.createElement('div');
    barOuter.className = 'score-bar';

    const barInner = document.createElement('div');
    barInner.className = 'score-bar__inner';
    const widthPercent = (item.score / maxScore) * 100;
    barInner.style.width = `${widthPercent}%`;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'score-value';
    valueSpan.textContent = item.score;

    barOuter.appendChild(barInner);

    li.appendChild(labelSpan);
    li.appendChild(barOuter);
    li.appendChild(valueSpan);

    scoreListEl.appendChild(li);
  });

  // 显示完整结果文本
  resultTextEl.textContent = result.text || '';

  showScreen(resultScreen);
}

function resetQuiz() {
  currentIndex = 0;
  answers = [];
  showScreen(startScreen);
}

function startQuiz() {
  currentIndex = 0;
  answers = [];
  showScreen(quizScreen);
  renderQuestion();
}

// 绑定事件监听器
if (startBtn) {
  startBtn.addEventListener('click', startQuiz);
}

if (backToStartBtn) {
  backToStartBtn.addEventListener('click', resetQuiz);
}

if (restartBtnTop) {
  restartBtnTop.addEventListener('click', resetQuiz);
}

if (restartBtnBottom) {
  restartBtnBottom.addEventListener('click', resetQuiz);
}
