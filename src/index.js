const playSound = (id, vol = 0.3) => {
  const audio = document.getElementById(id);
  if (audio) {
    audio.volume = vol;
    audio.currentTime = 0;
    audio.play();
  }
};

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
} else if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.remove("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleDark");
  const html = document.documentElement;

  toggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");

    playSound("sfx-open", 1.0);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // open
  document.querySelectorAll(".open-window").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      playSound("sfx-open", 1.0);
      const id = btn.getAttribute("data-window");
      const win = document.getElementById(`window-${id}`);
      if (win) {
        win.classList.remove("hidden");
        win.classList.remove("animate-window-out");
        win.classList.add("animate-window-in");
      }
    });
  });

  // close
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      playSound("sfx-close", 0.5);
      const win = btn.closest(".window");
      win.classList.remove("animate-window-in");
      win.classList.add("animate-window-out");

      setTimeout(() => {
        win.classList.add("hidden");
      }, 100);
    });
  });

  // dragging
  let dragged = null,
    offsetX = 0,
    offsetY = 0;

  document.querySelectorAll(".title-bar").forEach((bar) => {
    bar.addEventListener("mousedown", (e) => {
      dragged = bar.closest(".window");
      const rect = dragged.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      dragged.style.zIndex = `${Date.now()}`;
      e.preventDefault();
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (dragged) {
      const win = dragged;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;

      const maxLeft = viewportWidth - win.offsetWidth;
      const maxTop = viewportHeight - win.offsetHeight;

      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      win.style.left = `${newLeft}px`;
      win.style.top = `${newTop}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    dragged = null;
  });
});

const musicBtn = document.getElementById("musicToggle");
const music = document.getElementById("bgMusic");
const noteParticles = document.getElementById("noteParticles");

let musicPlaying = false;
let particleInterval = null;

const createNote = () => {
  const note = document.createElement("div");
  note.className = "music-note";
  note.textContent = "🎵";

  note.style.left = `${Math.random() * 80 + 10}%`;
  note.style.fontSize = `${Math.random() * 8 + 12}px`;

  noteParticles.appendChild(note);

  setTimeout(() => {
    note.remove();
  }, 1200);
};

musicBtn.addEventListener("click", () => {
  musicPlaying = !musicPlaying;
  playSound("sfx-open", 1.0);

  if (musicPlaying) {
    music.play();
    particleInterval = setInterval(createNote, 1000);
  } else {
    music.pause();
    clearInterval(particleInterval);
  }
});

particlesJS("particles-js", {
  particles: {
    number: { value: 40 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: true },
  },
});
