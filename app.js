/* Language switch. The page ships in English so it still reads fine
   with JavaScript off; Russian is swapped in from this dictionary. */

const STRINGS = {
  en: {
    "doc.title": "Kristina Stupnikova — Indie iOS developer",
    "nav.apps": "Apps",
    "nav.about": "About",
    "nav.contact": "Contact",
    "lang.group": "Language",
    "hero.note": "Thanks for being here!",
    "hero.role": "Indie iOS developer",
    "hero.tagline": "I build simple, thoughtful apps for health & everyday life.",
    "social.contact": "Contact",
    "apps.title": "My apps",
    "formora.sub": "Body measurements & progress tracker",
    "formora.note": "Track. See progress. Feel good.",
    "formora.text": "Track your measurements, see your progress over time and stay motivated. Designed for real life — for women, by a woman. Men can use it too.",
    "formora.legalAria": "Formora — privacy policy and terms",
    "medistory.sub": "Your medical history, organized",
    "medistory.note": "All your health info in one place.",
    "medistory.text": "Keep your medical records, track appointments and medications, and never lose important information. Export to PDF and keep your data private — on your device.",
    "medistory.siteAria": "Medistory — website",
    "cta.download": "Download on the",
    "about.title": "About me",
    "about.text": "I'm Kristina. I design, build and support my apps on my own — from the first sketch to the App Store. I like small tools that respect your time and don't ask for more than they need.",
    "connect.title": "Let's connect",
    "connect.sub": "Follow for updates, app news and more.",
    "foot": "Made by Kristina Stupnikova"
  },
  ru: {
    "doc.title": "Кристина Ступникова — инди iOS-разработчик",
    "nav.apps": "Приложения",
    "nav.about": "Обо мне",
    "nav.contact": "Контакты",
    "lang.group": "Язык",
    "hero.note": "Спасибо, что заглянули!",
    "hero.role": "Инди iOS-разработчик",
    "hero.tagline": "Делаю простые и продуманные приложения для здоровья и повседневной жизни.",
    "social.contact": "Написать",
    "apps.title": "Мои приложения",
    "formora.sub": "Замеры тела и трекер прогресса",
    "formora.note": "Замеряй. Смотри прогресс. Радуйся.",
    "formora.text": "Записывайте замеры, следите за прогрессом во времени и не теряйте мотивацию. Сделано под реальную жизнь — для женщин, женщиной. Мужчинам тоже подойдёт.",
    "formora.legalAria": "Formora — политика конфиденциальности и условия",
    "medistory.sub": "Ваша история болезни — в порядке",
    "medistory.note": "Вся история здоровья в одном месте.",
    "medistory.text": "Храните медицинские записи, ведите приёмы и лекарства и не теряйте важное. Выгрузка в PDF, а данные остаются приватными — на вашем телефоне.",
    "medistory.siteAria": "Medistory — сайт приложения",
    "cta.download": "Загрузить в",
    "about.title": "Обо мне",
    "about.text": "Я Кристина. Делаю свои приложения сама — от первого наброска до App Store: дизайн, код, поддержка. Люблю маленькие инструменты, которые уважают ваше время и не просят лишнего.",
    "connect.title": "Давайте на связи",
    "connect.sub": "Подписывайтесь: апдейты, новости приложений и закулисье.",
    "foot": "Сделано Кристиной Ступниковой"
  }
};

const STORAGE_KEY = "ks-lang";

function pickInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && STRINGS[saved]) return saved;
  } catch (e) { /* private mode — fall through to the browser's guess */ }
  return (navigator.language || "en").toLowerCase().startsWith("ru") ? "ru" : "en";
}

function applyLang(lang) {
  const dict = STRINGS[lang] || STRINGS.en;

  document.documentElement.lang = lang;
  document.title = dict["doc.title"];

  for (const el of document.querySelectorAll("[data-i18n]")) {
    const value = dict[el.dataset.i18n];
    if (value != null) el.textContent = value;
  }
  for (const el of document.querySelectorAll("[data-i18n-label]")) {
    const value = dict[el.dataset.i18nLabel];
    if (value != null) el.setAttribute("aria-label", value);
  }
  for (const btn of document.querySelectorAll(".lang__btn")) {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  }

  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* nothing to do */ }
}

for (const btn of document.querySelectorAll(".lang__btn")) {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
}

applyLang(pickInitialLang());
