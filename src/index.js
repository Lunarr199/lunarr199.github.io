particlesJS("particles-js", {
  particles: {
    number: { value: 40 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: true },
  },
});

const sound_path = 'src/assets/click_1.mp3';

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const clickSound = new Audio(sound_path);
    clickSound.play();
    clickSound.remove;
  })
})

function toggleTheme() {
  document.body.classList.toggle("dark");

  const root = document.documentElement;
  root.style.setProperty(
    "--bg",
    document.body.classList.contains("dark") ? "#111" : "#f9f9f9"
  );

  const btn = document.querySelector('.btns button');
  if (btn) {
    btn.textContent = document.body.classList.contains("dark")
      ? "🌞 Light Mode"
      : "🌙 Dark Mode";
  }
}

const light_colors = ["#ffbbcc", "#ccffbb", "#bbddff", "#ffeecc", "#ddccff"];
const dark_colors = ["#222233", "#332233", "#113344", "#223322", "#331122"];

function vibeChange() {
  const isDark = document.body.classList.contains("dark");

  document.documentElement.style.setProperty(
    "--bg",
    isDark
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

const emojiMap = ["🌧", "🌫", "🌤", "☀️", "🌈"];
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