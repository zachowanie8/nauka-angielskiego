// ===============================
// SŁÓWKA STARTOWE
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
const STORAGE_KEY = "english-quiz-data";

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);

  return {
    words: DEFAULT_WORDS,
    score: 0,
    total: 0,
    streak: 0
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ===============================
// ZMIENNE
// ===============================
let data = loadData();
let currentWord = null;

// ===============================
// LOSOWANIE (SŁABE CZĘŚCIEJ)
// ===============================
function getNextWord() {
  const pool = [];

  data.words.forEach(word => {
    const weight = Math.max(1, 6 - word.level);
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

  document.getElementById("question").innerText =
    "Przetłumacz: " + currentWord.en;

  document.getElementById("answer").value = "";
  document.getElementById("answer").focus();
  document.getElementById("result").innerText = "";
}

function checkAnswer() {
  const input = document
    .getElementById("answer")
    .value
    .trim()
    .toLowerCase();

  if (!input) return;

  data.total++;

  if (input === currentWord.pl.toLowerCase()) {
    // ✅ DOBRZE
    data.score += 10;
    data.streak++;
    currentWord.level = Math.min(5, currentWord.level + 1);

    document.getElementById("result").innerText =
      "✅ Dobrze! +" + 10;
  } else {
    // ❌ ŹLE
    data.score = Math.max(0, data.score - 5);
    data.streak = 0;
    currentWord.level = Math.max(0, currentWord.level - 1);

    document.getElementById("result").innerText =
      "❌ Źle! Poprawnie: " + currentWord.pl;
  }

  saveData();
  updateStats();

  setTimeout(showNextQuestion, 900);
}

// ===============================
// STATYSTYKI
// ===============================
function updateStats() {
  const mastered = data.words.filter(w => w.level >= 3).length;

  document.getElementById("stats").innerText =
    `🏆 Punkty: ${data.score}
     | 🔥 Seria: ${data.streak}
     | 📊 Postęp: ${mastered}/${data.words.length}`;
}

// ===============================
// RESET
// ===============================
function resetProgress() {
  if (!confirm("Zresetować cały postęp?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ===============================
// START
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  showNextQuestion();
});

// ENTER = sprawdź
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});
