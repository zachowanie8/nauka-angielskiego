const STORAGE_KEY = "english-quiz-advanced";

// ===============================
// STAN APLIKACJI
// ===============================
let data = {
  progress: {},   // { "conv_hello": 3, "car_engine": 1 }
  score: 0,
  streak: 0
};

let currentWord = null;
let mode = "abcd";              // aktualny tryb
let activeCategories = ["conversation", "car"]; // aktywne kategorie

// ===============================
// POMOCNICZE FUNKCJE
// ===============================
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);

  // inicjalizacja progress dla wszystkich słów
  const allWords = buildWordList();
  const progress = {};
  allWords.forEach(w => progress[w.id] = 0);

  return {
    progress,
    score: 0,
    streak: 0
  };
}

function buildWordList() {
  let list = [];
  activeCategories.forEach(cat => {
    if (!WORD_SETS[cat]) return;
    list = list.concat(
      WORD_SETS[cat].map(w => ({ ...w })) // kopiujemy słowo, nie referencję
    );
  });

  // przypisanie id jeśli go nie ma
  list.forEach((w, i) => {
    if (!w.id) w.id = `${catPrefix(w)}_${i}`;
  });

  return list;
}

function catPrefix(word) {
  for (const cat in WORD_SETS) {
    if (WORD_SETS[cat].includes(word)) return cat;
  }
  return "misc";
}

// ===============================
// LOSOWANIE SŁÓW (WIĘKSZA SZANSA DLA NISKICH LEVELI)
// ===============================
function getNextWord() {
  const allWords = buildWordList();

  const pool = [];
  allWords.forEach(w => {
    const lvl = data.progress[w.id] || 0;
    const weight = Math.max(1, 6 - lvl);
    for (let i = 0; i < weight; i++) pool.push(w);
  });

  return pool[Math.floor(Math.random() * pool.length)];
}

// ===============================
// USTAWIENIA TRYBU I KATEGORII
// ===============================
function readSettings() {
  // tryb losowy dla mix
  const selectedMode = document.querySelector('input[name="mode"]:checked').value;
  mode = selectedMode === "mix"
    ? (Math.random() < 0.5 ? "abcd" : "typing")
    : selectedMode;

  // aktywne kategorie
  activeCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.value);

  if (activeCategories.length === 0) {
    alert("Wybierz przynajmniej jedną kategorię!");
    return false;
  }

  return true;
}

// ===============================
// WYŚWIETLANIE PYTANIA
// ===============================
function showNextQuestion() {
  if (!readSettings()) return;

  currentWord = getNextWord();

  const qEl = document.getElementById("question");
  const answersEl = document.querySelector(".answers");
  const typingEl = document.querySelector(".typing");

  answersEl.innerHTML = "";
  typingEl.classList.add("hidden");

  if (mode === "abcd") {
    qEl.innerText = "Przetłumacz: " + currentWord.en;
    showABCD();
  } else {
    qEl.innerText = "Jak jest po angielsku: " + currentWord.pl;
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
  const allWords = buildWordList();
  const options = [word.pl];

  while (options.length < 4) {
    const r = allWords[Math.floor(Math.random() * allWords.length)].pl;
    if (!options.includes(r)) options.push(r);
  }

  return options.sort(() => Math.random() - 0.5);
}

function checkABCD(answer, button) {
  document.querySelectorAll(".answers button").forEach(b => (b.disabled = true));

  if (answer === currentWord.pl) {
    success(button);
  } else {
    fail(button, currentWord.pl);
  }

  setTimeout(showNextQuestion, 1200);
}

// ===============================
// TRYB WPISYWANIA (PL → EN)
function showTyping() {
  const box = document.querySelector(".typing");
  box.classList.remove("hidden");
  document.getElementById("typingAnswer").value = "";
  document.getElementById("typingResult").innerText = "";
}

function checkTyping() {
  const input = document.getElementById("typingAnswer").value.trim().toLowerCase();
  if (!input) return;

  if (input === currentWord.en.toLowerCase()) {
    success();
    document.getElementById("typingResult").innerText = "✅ Dobrze!";
  } else {
    fail();
    document.getElementById("typingResult").innerText = "❌ Poprawnie: " + currentWord.en;
  }

  setTimeout(showNextQuestion, 1200);
}

// ===============================
// SYSTEM OCENIANIA
function success(button) {
  if (button) button.classList.add("correct");
  data.score += 10;
  data.streak++;
  data.progress[currentWord.id] = Math.min(5, (data.progress[currentWord.id] || 0) + 1);
  saveData();
}

function fail(button, correct) {
  if (button) button.classList.add("wrong");
  data.score = Math.max(0, data.score - 5);
  data.streak = 0;
  data.progress[currentWord.id] = Math.max(0, (data.progress[currentWord.id] || 0) - 1);

  if (correct) {
    document.querySelectorAll(".answers button").forEach(b => {
      if (b.innerText === correct) b.classList.add("correct");
    });
  }

  saveData();
}

// ===============================
// STATYSTYKI
function updateStats() {
  const mastered = Object.values(data.progress).filter(lvl => lvl >= 3).length;
  const total = Object.keys(data.progress).length;
  document.getElementById("stats").innerText =
    `🏆 ${data.score} pkt | 🔥 ${data.streak} | 📘 ${mastered}/${total}`;
}

// ===============================
// RESET
function resetProgress() {
  if (!confirm("Zresetować postęp?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ===============================
// LIVE SWITCHING TRYB / KATEGORIA
function setupLiveSwitching() {
  document.querySelectorAll('input[name="mode"]').forEach(radio =>
    radio.addEventListener("change", showNextQuestion)
  );

  document.querySelectorAll('input[type="checkbox"]').forEach(cb =>
    cb.addEventListener("change", showNextQuestion)
  );
}

// ===============================
// START
document.addEventListener("DOMContentLoaded", () => {
  data = loadData();
  setupLiveSwitching();
  showNextQuestion();
});
