// ===============================
// SŁÓWKA
// ===============================
const DEFAULT_WORDS = [
  { en: "apple", pl: "jabłko", level: 0 },
  { en: "house", pl: "dom", level: 0 },
  { en: "book", pl: "książka", level: 0 },
  { en: "dog", pl: "pies", level: 0 },
  { en: "cat", pl: "kot", level: 0 },
  { en: "car", pl: "samochód", level: 0 }
];

// ===============================
// STORAGE
// ===============================
const STORAGE_KEY = "english-quiz-abcd";

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved
    ? JSON.parse(saved)
    : { words: DEFAULT_WORDS, score: 0, streak: 0 };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let data = loadData();
let currentWord = null;

// ===============================
// LOSOWANIE
// ===============================
function getNextWord() {
  const pool = [];
  data.words.forEach(w => {
    const weight = Math.max(1, 6 - w.level);
    for (let i = 0; i < weight; i++) pool.push(w);
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

// ===============================
// QUIZ ABCD
// ===============================
function showNextQuestion() {
  currentWord = getNextWord();

  document.getElementById("question").innerText =
    "Przetłumacz: " + currentWord.en;

  const answers = generateAnswers(currentWord);
  const container = document.querySelector(".answers");
  container.innerHTML = "";

  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => checkAnswer(ans, btn);
    container.appendChild(btn);
  });

  updateStats();
}

function generateAnswers(correctWord) {
  const options = [correctWord.pl];

  while (options.length < 4) {
    const random =
      data.words[Math.floor(Math.random() * data.words.length)].pl;
    if (!options.includes(random)) options.push(random);
  }

  return options.sort(() => Math.random() - 0.5);
}

function checkAnswer(answer, button) {
  const buttons = document.querySelectorAll(".answers button");

  buttons.forEach(b => (b.disabled = true));

  if (answer === currentWord.pl) {
    button.classList.add("correct");
    data.score += 10;
    data.streak++;
    currentWord.level = Math.min(5, currentWord.level + 1);
  } else {
    button.classList.add("wrong");
    data.streak = 0;
    data.score = Math.max(0, data.score - 5);
    currentWord.level = Math.max(0, currentWord.level - 1);

    buttons.forEach(b => {
      if (b.innerText === currentWord.pl) {
        b.classList.add("correct");
      }
    });
  }

  saveData();
  setTimeout(showNextQuestion, 1200);
}

// ===============================
// STATYSTYKI
// ===============================
function updateStats() {
  const mastered = data.words.filter(w => w.level >= 3).length;
  document.getElementById("stats").innerText =
    `🏆 ${data.score} pkt | 🔥 ${data.streak} | 📘 ${mastered}/${data.words.length}`;
}

// ===============================
// RESET
// ===============================
function resetProgress() {
  if (!confirm("Zresetować postęp?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ===============================
// START
// ===============================
document.addEventListener("DOMContentLoaded", showNextQuestion);
