// ===============================
// DANE + ZAPIS POSTĘPÓW
// ===============================

const STORAGE_KEY = "english-quiz-progress";

function loadWords() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return DEFAULT_WORDS;
}

function saveWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

let words = loadWords();
let currentWord = null;
let score = 0;
let total = 0;

// ===============================
// LOSOWANIE (SŁABE SŁOWA CZĘŚCIEJ)
// ===============================

function getNextWord() {
  const pool = [];

  words.forEach(w => {
    const weight = Math.max(1, 5 - w.level);
    for (let i = 0; i < weight; i++) {
      pool.push(w);
    }
  });

  return pool[Math.floor(Math.random() * pool.length)];
}

// ===============================
// QUIZ
// ===============================

function showNextQuestion() {
  currentWord = getNextWord();

  document.getElementById("question").innerText =
    `Przetłumacz: ${currentWord.en}`;

  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
}

function checkAnswer() {
  const userAnswer = document
    .getElementById("answer")
    .value.trim()
    .toLowerCase();

  if (!userAnswer) return;

  total++;

  if (userAnswer === currentWord.pl.toLowerCase()) {
    currentWord.correct++;
    currentWord.level = Math.min(5, currentWord.level + 1);
    score++;
    document.getElementById("result").innerText = "✅ Dobrze!";
  } else {
    currentWord.wrong++;
    currentWord.level = Math.max(0, currentWord.level - 1);
    document.getElementById("result").innerText =
      `❌ Źle! Poprawnie: ${currentWord.pl}`;
  }

  saveWords();
  updateStats();

  setTimeout(showNextQuestion, 1000);
}

// ===============================
// STATYSTYKI
// ===============================

function updateStats() {
  const known = words.filter(w => w.level >= 3).length;

  document.getElementById("stats").innerText =
    `Wynik: ${score}/${total} | Opanowane: ${known}/${words.length}`;
}

// ===============================
// RESET
// ===============================

function resetProgress() {
  if (!confirm("Na pewno chcesz zresetować postępy?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

const DEFAULT_WORDS = [
  { en: "apple", pl: "jabłko", level: 0, correct: 0, wrong: 0 }
];


// ===============================
// START
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  showNextQuestion();
  updateStats();
});
