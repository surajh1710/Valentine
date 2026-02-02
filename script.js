const panels = Array.from(document.querySelectorAll(".panel"));
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const bigYesBtn = document.getElementById("bigYesBtn");
const summary = document.getElementById("summary");
const replayBtn = document.getElementById("replayBtn");

let currentStep = 0;
const totalSteps = panels.length;
let dodgeCount = 0;
let noUnlocked = false;
let dodgeEnabled = false;

const showStep = (index) => {
  panels.forEach((panel) => panel.classList.remove("active"));
  panels[index].classList.add("active");
  currentStep = index;
};

const reset = () => {
  showStep(0);
};

const createHearts = () => {
  const hearts = ["💖", "💘", "💝", "💕", "💗"];
  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = "-10px";
    heart.style.animationDelay = `${Math.random() * 0.3}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2500);
  }
};

if (noBtn) {
  const container = document.querySelector(".card");
  const repositionNo = (containerRect, noRect) => {
    const padding = 16;
    const maxX = containerRect.width - noRect.width - padding;
    const maxY = containerRect.height - noRect.height - padding;
    const newX = Math.max(padding, Math.min(Math.random() * maxX, maxX));
    const newY = Math.max(padding, Math.min(Math.random() * maxY, maxY));
    noBtn.style.position = "absolute";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    container.classList.add("wiggle");
    setTimeout(() => container.classList.remove("wiggle"), 250);
  };

  const moveAway = (event) => {
    if (!container || noUnlocked || !dodgeEnabled) return;
    const containerRect = container.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const noCenterX = noRect.left + noRect.width / 2;
    const noCenterY = noRect.top + noRect.height / 2;
    const distance = Math.hypot(mouseX - noCenterX, mouseY - noCenterY);
    if (distance > 170) return;

    repositionNo(containerRect, noRect);

    dodgeCount += 1;
    if (dodgeCount >= 5) {
      noUnlocked = true;
      noBtn.textContent = "No (okay, you got me)";
    }
  };

  container.addEventListener("mousemove", moveAway);
  container.addEventListener("touchmove", (event) => {
    if (event.touches.length) {
      moveAway(event.touches[0]);
    }
  });

  noBtn.addEventListener("click", () => {
    if (!container) return;
    if (!dodgeEnabled) {
      dodgeEnabled = true;
      noBtn.style.position = "absolute";
      const containerRect = container.getBoundingClientRect();
      const noRect = noBtn.getBoundingClientRect();
      repositionNo(containerRect, noRect);
      dodgeCount += 1;
      if (dodgeCount >= 5) {
        noUnlocked = true;
        noBtn.textContent = "No (okay, you got me)";
      }
      return;
    }
    if (!noUnlocked) return;
    showStep(Math.min(1, totalSteps - 1));
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    createHearts();
    summary.textContent = "I promise to be extra sweet (and only medium annoying). 🌻";
    showStep(Math.min(2, totalSteps - 1));
  });
}

if (bigYesBtn) {
  bigYesBtn.addEventListener("click", () => {
    createHearts();
    summary.textContent = "You are my whole world. Thank you for being my sunshine. 🌻";
    showStep(Math.min(2, totalSteps - 1));
  });
}

if (replayBtn) {
  replayBtn.addEventListener("click", reset);
}
