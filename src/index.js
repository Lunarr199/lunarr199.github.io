// utility
const playSound = (id, vol = 0.3) => {
  const audio = document.getElementById(id);
  if (audio) {
    audio.volume = vol;
    audio.currentTime = 0;
    audio.play().catch(console.warn); // autoplay restrictions,,,, why :((((
  }
};

const createNote = () => {
  const noteParticles = document.getElementById("noteParticles");
  if (!noteParticles) return;

  const note = document.createElement("div");
  note.className = "music-note";
  note.textContent = "🎵";
  note.style.left = `${Math.random() * 80 + 10}%`;
  note.style.fontSize = `${Math.random() * 8 + 12}px`;
  noteParticles.appendChild(note);

  setTimeout(() => note.remove(), 1200);
};

// theme
const ThemeManager = {
  init() {
    this.applyStoredTheme();
    this.bindToggle();
  },

  applyStoredTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  },

  bindToggle() {
    const toggle = document.getElementById("toggleDark");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      toggle.classList.add("animate-squish");

      setTimeout(() => {
        toggle.classList.remove("animate-squish");
      }, 300);

      const html = document.documentElement;
      const isDark = html.classList.toggle("dark");
      playSound("sfx-open", 1.0);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  },
};

// windows
const WindowManager = {
  init() {
    this.bindOpenButtons();
    this.bindCloseButtons();
    this.initDragging();
  },

  bindOpenButtons() {
    document.querySelectorAll(".open-window").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        playSound("sfx-open", 1.0);

        const id = btn.getAttribute("data-window");
        const win = document.getElementById(`window-${id}`);

        if (win) {
          win.classList.remove("hidden", "animate-window-out");
          win.classList.add("animate-window-in");
        }
      });
    });
  },

  bindCloseButtons() {
    document.querySelectorAll(".close-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        playSound("sfx-close", 0.5);

        const win = btn.closest(".window");
        if (win) {
          win.classList.remove("animate-window-in");
          win.classList.add("animate-window-out");

          setTimeout(() => {
            win.classList.add("hidden");
          }, 400);
        }
      });
    });
  },

  initDragging() {
    let dragged = null;
    let offsetX = 0;
    let offsetY = 0;

    // bind drag events to titlebars
    document.querySelectorAll(".title-bar").forEach((bar) => {
      bar.addEventListener("mousedown", (e) => {
        dragged = bar.closest(".window");
        if (!dragged) return;

        const rect = dragged.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        dragged.style.zIndex = Date.now();
        dragged.classList.add("dragging");
        e.preventDefault();
      });
    });

    // handle drag movement
    document.addEventListener(
      "mousemove",
      (e) => {
        if (!dragged) return;

        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        requestAnimationFrame(() => {
          if (dragged) {
            dragged.style.left = `${newLeft}px`;
            dragged.style.top = `${newTop}px`;
          }
        });
      },
      { passive: false }
    );

    // drag ended
    document.addEventListener("mouseup", () => {
      if (dragged) {
        dragged.classList.remove("dragging");
        dragged = null;
      }
    });
  },
};

// peak music
const MusicManager = {
  musicPlaying: false,
  particleInterval: null,

  init() {
    const musicBtn = document.getElementById("musicToggle");
    const music = document.getElementById("bgMusic");

    if (!musicBtn || !music) return;

    musicBtn.addEventListener("click", () => {
      musicBtn.classList.add("animate-squish");

      setTimeout(() => {
        musicBtn.classList.remove("animate-squish");
      }, 300);

      this.musicPlaying = !this.musicPlaying;
      playSound("sfx-open", 1.0);

      if (this.musicPlaying) {
        music.play().catch(console.warn);
        this.startParticles();
      } else {
        music.pause();
        this.stopParticles();
      }
    });
  },

  startParticles() {
    if (this.particleInterval) return;
    this.particleInterval = setInterval(createNote, 1000);
  },

  stopParticles() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
      this.particleInterval = null;
    }
  },
};

// particles js
const ParticlesManager = {
  init() {
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: { value: 40 },
          size: { value: 3 },
          move: { speed: 1 },
          line_linked: { enable: true },
        },
      });
    }
  },
};

// init
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  WindowManager.init();
  MusicManager.init();
  ParticlesManager.init();
});

// apply theme
ThemeManager.applyStoredTheme();
