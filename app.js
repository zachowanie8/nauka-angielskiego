const words = [
  { en: "apple", pl: "jabłko" },
  { en: "house", pl: "dom" },
  { en: "car", pl: "samochód" },
  { en: "book", pl: "książka" },
  { en: "water", pl: "woda" }
];

let currentWord = null;

function drawWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("word").textContent = currentWord.en;
  document.getElementById("translation").textContent = currentWord.pl;
  document.getElementById("translation").classList.add("hidden");
}

function showTranslation() {
  if (currentWord) {
    document.getElementById("translation").classList.remove("hidden");
  }
}

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
