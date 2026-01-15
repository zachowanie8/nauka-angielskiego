const STORAGE_KEY = "english-quiz-advanced";

// ===============================
// STAN APLIKACJI
// ===============================
let data = {
  words: [],
  score: 0,
  streak: 0
};

let currentWord = null;
let mode = "abcd";
let activeCategories = ["conversation", "car"];

// ===============================
// POMOCNICZE
// ===============================
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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

function buildWordList() {
  let list = [];
  activeCategories.forEach(cat => {
    list = list.concat(
      WORD_SETS[cat].map(w => ({ ...w }))
    );
  });
  return list;
}

function getNextWord() {
  const pool = [];
  data.words.forEach(w => {
    const weight = Math.max(1, 6 - w.level);
    for (let i = 0; i < weight; i++) pool.push(w);
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

// ===============================
// UI – ZMIANY TRYBU / KATEGORII
// ===============================
function readSettings() {
  mode = document.querySelector('input[name="mode"]:checked').value;

  activeCategories = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  if (activeCategories.length === 0) {
    alert("Wybierz przynajmniej jedną kategorię!");
    return false;
  }

  data.words = buildWordList();
  saveData();
  return true;
}

// ===============================
// QUIZ
// ===============================
function showNextQuestion() {
  if (!readSettings()) return;

  currentWord = getNextWord();

  document.getElementById("question").innerText =
    mode === "abcd"
      ? "Przetłumacz: " + currentWord.en
      : "Jak jest po angielsku: " + currentWord.pl;

  document.querySelector(".answers").innerHTML = "";
  document.querySelector(".typing").classList.add("hidden");

  if (mode === "abcd") {
    showABCD();
  } else {
    showTyping();
  }

  updateStats();
}

// ===============================
// TRYB ABCD
// ===============================
function showABCD() {
  const answers = generateAnswers(currentWord);
  const container = document.querySelector(".answers");

  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => checkABCD(ans, btn);
    container.appendChild(btn);
  });
}

function generateAnswers(word) {
  const options = [word.pl];
  while (options.length < 4) {
    const r = data.words[Math.floor(Math.random() * data.words.length)].pl;
    if (!options.includes(r)) options.push(r);
  }
  return options.sort(() => Math.random() - 0.5);
}

function checkABCD(answer, button) {
  document.querySelectorAll(".answers button")
    .forEach(b => (b.disabled = true));

  if (answer === currentWord.pl) {
    success(button);
  } else {
    fail(button, currentWord.pl);
  }

  setTimeout(showNextQuestion, 1200);
}

// ===============================
// TRYB WPISYWANIA (PL → EN)
// ===============================
function showTyping() {
  const box = document.querySelector(".typing");
  box.classList.remove("hidden");
  document.getElementById("typingAnswer").value = "";
  document.getElementById("typingResult").innerText = "";
}

function checkTyping() {
  const input = document
    .getElementById("typingAnswer")
    .value.trim().toLowerCase();

  if (!input) return;

  if (input === currentWord.en.toLowerCase()) {
    success();
    document.getElementById("typingResult").innerText = "✅ Dobrze!";
  } else {
    fail();
    document.getElementById("typingResult").innerText =
      "❌ Poprawnie: " + currentWord.en;
  }

  setTimeout(showNextQuestion, 1200);
}

// ===============================
// OCENIANIE
// ===============================
function success(button) {
  if (button) button.classList.add("correct");
  data.score += 10;
  data.streak++;
  currentWord.level = Math.min(5, currentWord.level + 1);
  saveData();
}

function fail(button, correct) {
  if (button) button.classList.add("wrong");
  data.score = Math.max(0, data.score - 5);
  data.streak = 0;
  currentWord.level = Math.max(0, currentWord.level - 1);

  if (correct) {
    document.querySelectorAll(".answers button").forEach(b => {
      if (b.innerText === correct) b.classList.add("correct");
    });
  }

  saveData();
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
document.addEventListener("DOMContentLoaded", () => {
  data = loadData();
  showNextQuestion();
});
