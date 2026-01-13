// ===============================
// KONFIGURACJA
// ===============================
const STORAGE_KEY = "english-quiz-abcd";
const ACTIVE_SETS = ["conversation", "car"]; // ← tu wybierasz kategorie

// ===============================
// ŁADOWANIE DANYCH
// ===============================
function buildWordList() {
  let list = [];
  ACTIVE_SETS.forEach(set => {
    list = list.concat(WORD_SETS[set]);
  });
  return list;
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);

  return {
    words: buildWordList(),
    score: 0,
    streak: 0
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let data = loadData();
let currentWord = null;

// ===============================
// LOSOWANIE (SŁABE WRACAJĄ)
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
    data.score = Math.max(0, data.score - 5);
    data.streak = 0;
    currentWord.level = Math.max(0, currentWord.level - 1);

    buttons.forEach(b => {
      if (b.innerText === currentWord.pl) b.classList.add("correct");
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
