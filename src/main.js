import './style.css';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/',
});

const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
const lightIcon = document.querySelector('[data-theme-icon="light"]');
const darkIcon = document.querySelector('[data-theme-icon="dark"]');

function isDark() {
  return root.classList.contains('dark');
}

function syncThemeButton() {
  const dark = isDark();
  lightIcon?.classList.toggle('hidden', !dark);
  darkIcon?.classList.toggle('hidden', dark);
  themeButton?.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  themeButton?.setAttribute('title', dark ? 'Use light theme' : 'Use dark theme');
}

themeButton?.addEventListener('click', () => {
  const nextDark = !isDark();
  root.classList.toggle('dark', nextDark);
  localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  syncThemeButton();
});

syncThemeButton();

const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function closeMenu() {
  mobileMenu?.classList.add('hidden');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  mobileMenu?.classList.toggle('hidden', expanded);
  menuButton.setAttribute('aria-expanded', String(!expanded));
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();
