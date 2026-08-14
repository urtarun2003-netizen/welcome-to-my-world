// ===============================
// MY WORLD - MAIN JAVASCRIPT
// ===============================

// CHANGE YOUR PIN HERE
const SECRET_PIN = "8431";

// Add your own music files inside the "music" folder,
// then add their paths here.
const songs = [
  // { name: "My Song", file: "music/my-song.mp3" },
];

const quotes = [
  "Believe in yourself. You are capable of more than you think. ✨",
  "Small progress is still progress. 🌱",
  "Your story is still being written. Make it beautiful. 📖",
  "Do something today that your future self will thank you for. 🚀",
  "Keep going. Your best moments may still be ahead. 🌎",
  "A little happiness can change the whole day. 💖"
];

const funnyMessages = [
  "Nice try! 😜 That PIN is hiding from you.",
  "Nope! 😂 The secret door stays closed.",
  "Almost... or maybe not! 👀",
  "Access denied by the tiny security guard 🧑‍✈️😂",
  "Hmm... my world says: TRY AGAIN! 🚫"
];

let currentPin = "";
let currentSong = 0;
let isPlaying = false;

const $ = id => document.getElementById(id);
const lockScreen = $("lockScreen");
const welcomeScreen = $("welcomeScreen");
const worldScreen = $("worldScreen");
const pinMessage = $("pinMessage");
const modal = $("modal");
const audio = $("audioPlayer");

function showScreen(screen) {
  [lockScreen, welcomeScreen, worldScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function updateDots() {
  [...$("pinDots").children].forEach((dot, i) => dot.classList.toggle("filled", i < currentPin.length));
}

function submitPin() {
  if (currentPin.length !== 4) return;

  if (currentPin === SECRET_PIN) {
    lockScreen.querySelector(".lock-card").classList.add("success");
    pinMessage.textContent = "Access granted! Welcome ✨";
    pinMessage.style.color = "#b8ffcf";
    setTimeout(() => {
      lockScreen.querySelector(".lock-card").classList.remove("success");
      currentPin = "";
      updateDots();
      showScreen(welcomeScreen);
    }, 900);
  } else {
    lockScreen.querySelector(".lock-card").classList.remove("shake");
    void lockScreen.offsetWidth;
    lockScreen.querySelector(".lock-card").classList.add("shake");
    pinMessage.textContent = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    pinMessage.style.color = "#ffd0e0";
    currentPin = "";
    updateDots();
  }
}

document.querySelectorAll(".key").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.key;
    if (key === "clear") currentPin = "";
    else if (key === "back") currentPin = currentPin.slice(0, -1);
    else if (currentPin.length < 4) currentPin += key;

    updateDots();
    pinMessage.textContent = currentPin.length ? `${currentPin.length}/4 digits entered` : "Hint: make it something memorable ✨";
    pinMessage.style.color = "";
    if (currentPin.length === 4) setTimeout(submitPin, 180);
  });
});

document.addEventListener("keydown", e => {
  if (!lockScreen.classList.contains("active")) return;
  if (/^[0-9]$/.test(e.key) && currentPin.length < 4) currentPin += e.key;
  if (e.key === "Backspace") currentPin = currentPin.slice(0, -1);
  if (e.key === "Escape") currentPin = "";
  updateDots();
  if (currentPin.length === 4) setTimeout(submitPin, 180);
});

$("enterWorld").addEventListener("click", () => showScreen(worldScreen));

$("lockAgain").addEventListener("click", () => {
  closeModal();
  currentPin = "";
  updateDots();
  pinMessage.textContent = "Hint: make it something memorable ✨";
  showScreen(lockScreen);
});

document.querySelectorAll(".feature-card").forEach(card => {
  card.addEventListener("click", () => openPanel(card.dataset.panel));
});

function openPanel(id) {
  modal.classList.add("open");
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  $(id).classList.add("active");
  if (id === "musicPanel") renderPlaylist();
}

function closeModal() {
  modal.classList.remove("open");
}

$("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

function renderPlaylist() {
  const playlist = $("playlist");
  if (!songs.length) {
    playlist.innerHTML = `<div class="message-card">🎧 No songs added yet.<br><br>
      Put MP3 files in the <b>music</b> folder and add them to the <b>songs</b> array in script.js.</div>`;
    return;
  }
  playlist.innerHTML = songs.map((song, i) =>
    `<button class="song" data-index="${i}"><span>🎵 ${song.name}</span><span>▶</span></button>`
  ).join("");
  playlist.querySelectorAll(".song").forEach(btn => {
    btn.addEventListener("click", () => playSong(Number(btn.dataset.index)));
  });
}

function playSong(index) {
  currentSong = index;
  audio.src = songs[index].file;
  $("trackName").textContent = songs[index].name;
  $("trackStatus").textContent = "Now playing";
  audio.play().then(() => {
    isPlaying = true;
    $("miniPlay").textContent = "⏸";
  }).catch(() => {});
}

$("miniPlay").addEventListener("click", () => {
  if (!audio.src) {
    showToast("Open Music World and add a song first 🎵");
    return;
  }
  if (audio.paused) {
    audio.play();
    $("miniPlay").textContent = "⏸";
  } else {
    audio.pause();
    $("miniPlay").textContent = "▶";
  }
});

$("musicToggle").addEventListener("click", () => openPanel("musicPanel"));
$("volume").addEventListener("input", e => audio.volume = Number(e.target.value));
audio.addEventListener("ended", () => {
  if (songs.length > 1) playSong((currentSong + 1) % songs.length);
});

$("newQuote").addEventListener("click", () => {
  $("quoteBox").textContent = quotes[Math.floor(Math.random() * quotes.length)];
});

document.querySelectorAll(".guess").forEach(button => {
  button.addEventListener("click", () => {
    const answer = Math.floor(Math.random() * 5) + 1;
    const guess = Number(button.dataset.number);
    $("gameResult").textContent = guess === answer
      ? `🎉 Correct! The number was ${answer}. You win!`
      : `😂 Not this time! I picked ${answer}. Try again!`;
  });
});

$("surpriseBtn").addEventListener("click", () => {
  const surprises = [
    "You are doing better than you think. 💖",
    "Today is a good day for a new memory. 📸",
    "Random happiness unlocked! 🎉",
    "Keep going — something great can start with one small step. 🚀",
    "You found a secret message: YOU MATTER. ✨"
  ];
  showToast(surprises[Math.floor(Math.random() * surprises.length)]);
});

function showToast(text) {
  const toast = $("toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// Background stars
for (let i = 0; i < 70; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = (8 + Math.random() * 18) + "s";
  p.style.animationDelay = (-Math.random() * 20) + "s";
  p.style.opacity = (0.2 + Math.random() * 0.7).toFixed(2);
  $("particles").appendChild(p);
}
