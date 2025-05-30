let dark_mode = localStorage.getItem("user_theme") === "dark";
if (dark_mode === null) dark_mode = false;
handleMode();

particlesJS("particles-js", {
  particles: {
    number: { value: 40 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: true },
  },
});

const sound_path = "src/assets/click_1.mp3";

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const clickSound = new Audio(sound_path);
    clickSound.play();
    clickSound.remove;
  });
});

function handleMode() {
  dark_mode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");

  const root = document.documentElement;
  root.style.setProperty("--bg", dark_mode ? "#111" : "#f9f9f9");

  const btn = document.querySelector(".btns button");
  if (btn) {
    btn.textContent = dark_mode ? "🌞 Light Mode" : "🌙 Dark Mode";
  }
}

function toggleTheme() {
  dark_mode = !dark_mode;
  localStorage.setItem("user_theme", dark_mode ? "dark" : "light");

  handleMode();
}

const light_colors = ["#ffbbcc", "#ccffbb", "#bbddff", "#ffeecc", "#ddccff"];
const dark_colors = ["#222233", "#332233", "#113344", "#223322", "#331122"];

function vibeChange() {
  document.documentElement.style.setProperty(
    "--bg",
    dark_mode
      ? dark_colors[Math.floor(Math.random() * dark_colors.length)]
      : light_colors[Math.floor(Math.random() * light_colors.length)]
  );
}

const about = document.getElementById("aboutContent");
const aboutToggle = document.querySelector(".about-toggle");
let isAboutOpen = false;

function toggleAbout() {
  isAboutOpen = !isAboutOpen;
  if (isAboutOpen) {
    aboutToggle.textContent = "⤴ Hide details";
  } else {
    aboutToggle.textContent = "⤵ Learn more about me";
  }
  about.classList.toggle("show");
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.add("hidden");
  });
  document.getElementById(tabId).classList.remove("hidden");
}

const emojiMap = ["🌧 (introspective)", "🌫 (unsure)", "🌤 (optimism)", "☀️ (energized)", "🌈 (aligned)"];
const slider = document.getElementById("moodSlider");
const emojiDisplay = document.getElementById("moodEmoji");

if (slider && emojiDisplay) {
  slider.addEventListener("input", () => {
    emojiDisplay.textContent = emojiMap[slider.value];
  });
}

const toast = document.getElementById("toast");

function closeToast() {
  toast.classList.add("hidden");
}
