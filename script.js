const questions = [
  {
    text: "У кого был недавно день рождения?",
    options: [
      { text: "У моего любимого мальчика 😎", correct: true },
      { text: "У маминой кошки 🐱", correct: false },
      { text: "У моей подруги 🌷", correct: false },
      { text: "У мамы 👩", correct: false }
    ]
  },
  {
    text: "Как зовут твоего парня?",
    options: [
      { text: "Илман.", correct: false },
      { text: "Зая 🤮", correct: false },
      { text: "Кот 💩", correct: false },
      { text: "Мой любимый маленький мальчик 💕", correct: true }
    ]
  },
  {
    text: "Сколько пальцев у него на правой руке? (на руку запрещено подсматривать)",
    options: [
      { text: "5", correct: true },
      { text: "6", correct: false },
      { text: "3", correct: false },
      { text: "1", correct: false }
    ]
  },
  {
    text: "Какое твоё блюдо для него самое любимое?",
    options: [
      { text: "Макароны по-французски 🍝", correct: false },
      { text: "Шаверма 🥙", correct: false },
      { text: "Рис с яйцом и фаршем 🍛", correct: false },
      { text: "Всё, что приготовила ты ❤️", correct: true }
    ]
  },
  {
    text: "Чему равен период полураспада химического элемента Уран-238?",
    options: [
      { text: "4,5 миллиарда лет", correct: true },
      { text: "700 миллионов лет", correct: false },
      { text: "500 тысяч лет", correct: false },
      { text: "87 лет", correct: false }
    ]
  },
  {
    text: "Ты — капитан космического корабля. На борту 1000 бутылок воды, одна из них отравлена. Яд действует через 24 часа. У тебя 10 заключённых и ровно 24 часа до прибытия на станцию. Как за одно тестирование гарантированно найти отравленную бутылку?",
    options: [
      { text: "Дать каждому заключённому по 100 бутылок", correct: false },
      { text: "Пронумеровать бутылки в двоичной системе и давать каждому заключённому пить по битам", correct: true },
      { text: "Дать всем всё подряд — кто умрёт, тот и покажет", correct: false },
      { text: "Это невозможно с 10 заключёнными", correct: false }
    ]
  },
  {
    text: "У кого сегодня День рождения?",
    options: [
      { text: "У меня, любимой! 💖", correct: true },
      { text: "У моего парня 🎂", correct: false },
      { text: "У всех 🥳", correct: false },
      { text: "У тортика 🍰", correct: false }
    ]
  },
  {
    text: "Ты вела себя хорошо в этом году?\n(подумай очень хорошо, прежде чем отвечать)",
    options: [
      { text: "Да!", correct: true }
    ],
    special: true
  }
];

const correctMessages = [
  "Правильно! Ты умничка! 🥰",
  "Верно! Дальше! 💕",
  "Именно так! Ты моя самая умная девочка! 😍",
  "Супер! Продолжаем! ✨"
];

const wrongMessages = [
  "Ой-ой! Попробуй ещё раз 💔",
  "Почти... но нет. Подумай ещё 😅",
  "Не-а! Так не пойдёт, попробуй снова 💗",
  "Хм, не то. Не сдавайся! 🌸"
];

let current = 0;
let answers = [];
let jumpAttempts = 0;
let giveUp = false;
const MAX_JUMP_ATTEMPTS = 5;

const introScreen = document.getElementById('introScreen');
const quizScreen = document.getElementById('quizScreen');
const congratScreen = document.getElementById('congratScreen');
const finishScreen = document.getElementById('finishScreen');
const startBtn = document.getElementById('startBtn');
const giftBtn = document.getElementById('giftBtn');
const kissScreen = document.getElementById('kissScreen');
const kiss2Screen = document.getElementById('kiss2Screen');
const kissBtn1 = document.getElementById('kissBtn1');
const kissBtn2 = document.getElementById('kissBtn2');
const videoGiftLink = document.getElementById('videoGiftLink');
const videoModal = document.getElementById('videoModal');
const giftVideo = document.getElementById('giftVideo');
const videoCloseBtn = document.getElementById('videoCloseBtn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const jumpArea = document.getElementById('jumpArea');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const heartsContainer = document.getElementById('heartsContainer');
const toastWrap = document.getElementById('toastWrap');

function generateFloatingHearts() {
  const hearts = ['💗', '💖', '💕', '💘', '🩷', '💓'];
  const count = window.innerWidth < 600 ? 28 : 45;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'float-heart';
    span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const size = Math.round(16 + Math.random() * 30);
    span.style.fontSize = size + 'px';
    span.style.left = Math.random() * 100 + 'vw';
    span.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    span.style.setProperty('--opacity', (0.35 + Math.random() * 0.45).toFixed(2));
    span.style.animationDuration = (9 + Math.random() * 10) + 's';
    span.style.animationDelay = (-Math.random() * 12) + 's';
    span.style.animationName = 'floatUp';
    heartsContainer.appendChild(span);
  }
}

function showScreen(screen) {
  [introScreen, quizScreen, congratScreen, finishScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function showToast(text, emoji, type) {
  toastWrap.innerHTML = '';
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML =
    '<span class="toast-emoji">' + emoji + '</span>' +
    '<span class="toast-text">' + text + '</span>';
  toastWrap.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toastWrap.innerHTML = '', 350);
  }, 1600);
}

function renderQuestion() {
  const q = questions[current];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = '';
  jumpArea.innerHTML = '';
  toastWrap.innerHTML = '';
  progressBar.style.width = ((current) / questions.length * 100) + '%';
  progressText.textContent = 'Вопрос ' + (current + 1) + ' из ' + questions.length;

  if (q.special) {
    jumpAttempts = 0;
    const btn = document.createElement('button');
    btn.className = 'jump-btn';
    btn.textContent = 'Да!';
    btn.addEventListener('click', () => {
      if (giveUp) {
        showScreen(congratScreen);
      } else {
        handleJump(btn);
      }
    });
    jumpArea.appendChild(btn);
    return;
  }

  const shuffled = q.options.slice().sort(() => Math.random() - 0.5);
  shuffled.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = option.text;
    btn.addEventListener('click', () => handleAnswer(btn, option));
    optionsEl.appendChild(btn);
  });
}

function handleJump(btn) {
  jumpAttempts++;
  if (jumpAttempts >= MAX_JUMP_ATTEMPTS) {
    giveUp = true;
    showGiveUpIntermission();
    return;
  }
  const areaWidth = jumpArea.clientWidth;
  const areaHeight = jumpArea.clientHeight;
  const btnWidth = btn.offsetWidth;
  const btnHeight = btn.offsetHeight;
  const maxLeft = Math.max(areaWidth - btnWidth, 0);
  const maxTop = Math.max(areaHeight - btnHeight, 0);
  btn.style.left = Math.random() * maxLeft + 'px';
  btn.style.top = Math.random() * maxTop + 'px';
  btn.style.transform = 'none';
}

function handleAnswer(btn, option) {
  if (btn.classList.contains('disabled')) return;

  document.querySelectorAll('.option').forEach(b => b.classList.add('disabled'));

  if (option.correct) {
    btn.classList.add('correct');
    answers.push(true);
    showToast(correctMessages[Math.floor(Math.random() * correctMessages.length)], '💕', 'good');
    setTimeout(nextQuestion, 1400);
  } else {
    btn.classList.add('wrong');
    answers.push(false);
    showToast(wrongMessages[Math.floor(Math.random() * wrongMessages.length)], '🙈', 'meh');
    setTimeout(() => {
      document.querySelectorAll('.option').forEach(b => {
        b.classList.remove('disabled', 'wrong');
      });
    }, 1000);
  }
}

function nextQuestion() {
  current++;
  if (current === 4) {
    showIntermission();
    return;
  }
  if (current === 7) {
    showIntermission3();
    return;
  }
  if (current < questions.length) {
    renderQuestion();
  } else {
    showScreen(finishScreen);
  }
}

function showIntermission() {
  const overlay = document.getElementById('intermissionScreen');
  overlay.classList.add('visible');
  setTimeout(() => {
    overlay.classList.remove('visible');
    renderQuestion();
  }, 2600);
}

function showIntermission3() {
  const overlay = document.getElementById('intermission3Screen');
  overlay.classList.add('visible');
  setTimeout(() => {
    overlay.classList.remove('visible');
    renderQuestion();
  }, 2600);
}

function showGiveUpIntermission() {
  const overlay = document.getElementById('intermission2Screen');
  overlay.classList.add('visible');
  setTimeout(() => {
    overlay.classList.remove('visible');
    renderQuestion();
  }, 2600);
}

startBtn.addEventListener('click', () => {
  showScreen(quizScreen);
  renderQuestion();
});

giftBtn.addEventListener('click', () => {
  kissScreen.classList.add('visible');
});

kissBtn1.addEventListener('click', () => {
  kissScreen.classList.remove('visible');
  kiss2Screen.classList.add('visible');
});

kissBtn2.addEventListener('click', () => {
  kiss2Screen.classList.remove('visible');
  showScreen(finishScreen);
});

videoGiftLink.addEventListener('click', (e) => {
  e.preventDefault();
  videoModal.classList.add('visible');
  giftVideo.currentTime = 0;
  giftVideo.play().catch(() => {});
});

videoCloseBtn.addEventListener('click', () => {
  giftVideo.pause();
  videoModal.classList.remove('visible');
});

videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    giftVideo.pause();
    videoModal.classList.remove('visible');
  }
});

generateFloatingHearts();