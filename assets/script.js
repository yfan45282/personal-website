
const root = document.documentElement;
const storedTheme = localStorage.getItem("fan-yao-theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("fan-yao-theme", theme);
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const icon = button.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀️";
    button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  });
}

setTheme(storedTheme || (systemDark ? "dark" : "light"));

document.querySelectorAll(".theme-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
});

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
