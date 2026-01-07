const words = [
  { en: "Being gay is easy.", pl: "Bycie gejem jest proste." },
  { en: "Straight guys fear gay men the way mirrors fear honesty.", pl: "Hetero boją się gejów tak jak lustra boją się prawdy." },
  { en: "I’m gay, horny, and full of bad ideas.", pl: "Jestem gejem, napalony i pełen złych pomysłów." },
  { en: "I don’t need love, I need dick and peace.", pl: "Nie potrzebuję miłości, potrzebuję penisa i spokoju." },
  { en: "My ass has better opinions than my brain.", pl: "Moja dupa ma lepsze opinie niż mój mózg." }
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
