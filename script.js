const startOverlay = document.getElementById("startOverlay");
const startButton = document.getElementById("startButton");
const playMusic = document.getElementById("playMusic");
const openLetter = document.getElementById("openLetter");
const letterPaper = document.getElementById("letterPaper");
const bgMusic = document.getElementById("bgMusic");
const toast = document.getElementById("toast");

let musicStarted = false;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4200);
}

async function startMusic() {
  if (musicStarted) return;

  try {
    bgMusic.volume = 0.85;
    await bgMusic.play();
    musicStarted = true;
    showToast("Música activada 💗");
    heartBurst();
  } catch (error) {
    showToast("Toca otra vez para activar la música 💗");
  }
}

function unlock() {
  startOverlay.classList.add("hide");
  startMusic();
}

function focusLetter() {
  letterPaper.scrollIntoView({ behavior: "smooth", block: "center" });
  letterPaper.animate(
    [
      { transform: "scale(1)", boxShadow: "0 24px 70px rgba(153,63,100,.19)" },
      { transform: "scale(1.025)", boxShadow: "0 34px 96px rgba(201,77,118,.34)" },
      { transform: "scale(1)", boxShadow: "0 24px 70px rgba(153,63,100,.19)" }
    ],
    { duration: 900, easing: "ease-in-out" }
  );
}

startButton.addEventListener("click", unlock);

openLetter.addEventListener("click", () => {
  startOverlay.classList.add("hide");
  startMusic();
  focusLetter();
  showToast("Carta abierta para More 💌");
});

playMusic.addEventListener("click", () => {
  startOverlay.classList.add("hide");
  startMusic();
});

window.addEventListener("load", () => {
  bgMusic.volume = 0.85;
  bgMusic.play()
    .then(() => {
      musicStarted = true;
      startOverlay.classList.add("hide");
      showToast("Música activada 💗");
    })
    .catch(() => {
      // El navegador puede bloquear autoplay. El botón inicial lo activa.
    });
});

function createHeart() {
  const heart = document.createElement("div");
  heart.textContent = ["💗", "💕", "💖", "♡"][Math.floor(Math.random() * 4)];
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-40px";
  heart.style.zIndex = "100";
  heart.style.pointerEvents = "none";
  heart.style.fontSize = 16 + Math.random() * 24 + "px";
  heart.style.opacity = "0.86";
  heart.style.filter = "drop-shadow(0 8px 14px rgba(201,77,118,.25))";
  heart.style.animation = `riseHeart ${5 + Math.random() * 4}s linear forwards`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 9500);
}

function heartBurst() {
  for (let i = 0; i < 24; i++) {
    setTimeout(createHeart, i * 75);
  }
}

const style = document.createElement("style");
style.textContent = `
  @keyframes riseHeart {
    from { transform: translateY(0) rotate(0deg) scale(.9); opacity: .9; }
    to { transform: translateY(-112vh) rotate(32deg) scale(1.25); opacity: 0; }
  }
`;
document.head.appendChild(style);

setInterval(createHeart, 1300);
