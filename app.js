console.log("✅ app.js załadowany");

// ===============================
// SŁÓWKA
// ===============================
const DEFAULT_WORDS = [
  { en: "apple", pl: "jabłko", level: 0, correct: 0, wrong: 0 },
  { en: "house", pl: "dom", level: 0, correct: 0, wrong: 0 }
];

// ===============================
// STORAGE
// ===============================
const STORAGE_KEY = "english-quiz-progress";

let words = [];
let currentWord = null;

// ===============================
// START
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM załadowany");

  words = DEFAULT_WORDS;

  showNextQuestion();
});

// ===============================
// QUIZ
// ===============================
function showNextQuestion() {
  console.log("➡️ showNextQuestion()");

  currentWord = words[Math.floor(Math.random() * words.length)];

  const questionEl = document.getElementById("question");

  if (!questionEl) {
    alert("❌ Brak elementu #question w HTML");
    return;
  }

  questionEl.innerText = "Przetłumacz: " + currentWord.en;
}

function checkAnswer() {
  alert("checkAnswer działa");
}
