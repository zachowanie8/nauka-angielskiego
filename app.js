// ===============================
// PODSTAWOWE SŁÓWKA (NA START)
// ===============================

const DEFAULT_WORDS = [
  { en: "apple", pl: "jabłko", level: 0, correct: 0, wrong: 0 },
  { en: "house", pl: "dom", level: 0, correct: 0, wrong: 0 },
  { en: "book", pl: "książka", level: 0, correct: 0, wrong: 0 },
  { en: "dog", pl: "pies", level: 0, correct: 0, wrong: 0 },
  { en: "cat", pl: "kot", level: 0, correct: 0, wrong: 0 }
];

// ===============================
// LOCAL STORAGE
// ===============================

const STORAGE_KEY = "english-quiz-progress";

function loadWords() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return [...DEFAULT_WORDS];
}

function saveWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

// ===============================
// ZMIENNE
// ===============================

let words = loadWords();
let currentWord = null;
let score = 0;
let total = 0;

// ===============================
// LOSOWANIE SŁÓWKA (SŁABE CZĘŚCIEJ)
// ===============================

function getNextWord() {
  const pool = [];

  words.forEach(word => {
    const weight = Math.max(1, 5 - word.level);
    for (let i = 0; i < weight; i++) {
      pool.push(word);
    }
  });

  return pool[Math.floor(Math.random() * pool.length)];
}

// ===============================
// QUIZ
// ===============================

function showNextQuestion() {
  currentWord = getNextWord();

  if (!currentWord) {
    document.getElementById("question").innerText =
      "Brak słówek do nauki";
    return;
  }

  document.getElementById("question").innerText =
    "Przetłumacz: " + currentWord.en;

  document.getElementById("answer").value = "";
  document.getElementById("answer").focus();
  document.getElementById("result").innerText = "";
}

function checkAnswer() {
  if (!currentWord) return;

  const input = document
    .getElementById("answer")
    .value
    .trim()
    .toLowerCase();

  if (input === "") return;

  total++;

  if (input === currentWord.pl.toLowerCase()) {
    currentWord.correct++;
    currentWord.level = Math.min(5, currentWord.level + 1);
    score++;
    document.getElementById("result").innerText = "✅ Dobrze!";
  } else {
    currentWord.wrong++;
    currentWord.level = Math.max(0, currentWord.level - 1);
    document.getElementById("result").innerText =
      "❌ Źle! Poprawnie: " + currentWord.pl;
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
  if (!confirm("Czy na pewno zresetować postępy?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ===============================
// START APLIKACJI
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  showNextQuestion();
});

// ENTER = sprawdź odpowiedź
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});
