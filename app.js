// ===============================
// SŁÓWKA
// ===============================
const DEFAULT_WORDS = [
  { en: "apple", pl: "jabłko", level: 0, correct: 0, wrong: 0 },
  { en: "house", pl: "dom", level: 0, correct: 0, wrong: 0 },
  { en: "book", pl: "książka", level: 0, correct: 0, wrong: 0 }
];

// ===============================
// STORAGE
// ===============================
const STORAGE_KEY = "english-quiz-progress";

function loadWords() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [...DEFAULT_WORDS];
}

function saveWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

// ===============================
let words = [];
let currentWord = null;
let score = 0;
let total = 0;

// ===============================
// QUIZ
// ===============================
function getNextWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function showNextQuestion() {
  currentWord = getNextWord();
  document.getElementById("question").innerText =
    "Przetłumacz: " + currentWord.en;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
}

function checkAnswer() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  if (!input) return;

  total++;

  if (input === currentWord.pl.toLowerCase()) {
    score++;
    document.getElementById("result").innerText = "✅ Dobrze!";
  } else {
    document.getElementById("result").innerText =
      "❌ Źle! Poprawnie: " + currentWord.pl;
  }

  updateStats();
  saveWords();

  setTimeout(showNextQuestion, 800);
}

function updateStats() {
  document.getElementById("stats").innerText =
    `Wynik: ${score}/${total}`;
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ===============================
// START
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  words = loadWords();
  updateStats();
  showNextQuestion();
});
