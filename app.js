/* Language switch. The page ships in English so it still reads fine
   with JavaScript off; Russian is swapped in from this dictionary. */

const STRINGS = {
  en: {
    "doc.title": "Kristina Stupnikova — Indie iOS developer",
    "nav.apps": "Apps",
    "nav.about": "About",
    "nav.contact": "Contact",
    "lang.group": "Language",
    "hero.note": "Hi, glad you're here",
    "hero.role": "Indie iOS developer",
    "hero.tagline": "I make iPhone apps in my free time, outside my day job.",
    "social.contact": "Contact",
    "apps.title": "My apps",
    "formora.sub": "Measurements, weight and photos",
    "formora.note": "Weight isn't the whole story",
    "formora.text": "If you want to track more than the weight — the measurements too, and compare by photo — this one is for you. Formora records chest, waist, hips and the rest, draws a graph for each, and shows two photos side by side so the difference is visible. There is a weight goal, and a men's profile.",
    "formora.legalAria": "Formora — privacy policy and terms",
    "medistory.sub": "Everything you need to tell the doctor",
    "medistory.note": "Ten minutes with the doctor",
    "medistory.text": "If you leave the doctor's office remembering what you forgot to say — this one is for you. Medistory asks short questions beforehand and collects the answers into a single page: complaints, chronic conditions, medications, allergies. Show it on your phone or print it. It all stays on the phone.",
    "medistory.siteAria": "Medistory — website",
    "cta.download": "Download on the",
    "about.title": "About me",
    "about.text": "I'm Kristina. Everything in these apps was made by one person: the design, the code, the App Store page, the replies to support mail. If something is broken, you are writing to the person who broke it.",
    "connect.title": "Come say hi",
    "connect.sub": "I post what I'm working on there.",
    "foot": "Made by Kristina Stupnikova"
  },
  ru: {
    "doc.title": "Кристина Ступникова — инди iOS-разработчик",
    "nav.apps": "Приложения",
    "nav.about": "Обо мне",
    "nav.contact": "Контакты",
    "lang.group": "Язык",
    "hero.note": "Привет, рада вас видеть",
    "hero.role": "Инди iOS-разработчик",
    "hero.tagline": "Делаю приложения для айфона в свободное от работы время.",
    "social.contact": "Написать",
    "apps.title": "Мои приложения",
    "formora.sub": "Замеры, вес и фотографии",
    "formora.note": "Весы — это ещё не всё",
    "formora.text": "Если хочется следить не только за весом, но и за обхватами, и сравнивать результат по фото — это сюда. Formora записывает грудь, талию, бёдра и остальное, рисует по ним графики и показывает два снимка рядом, чтобы разница была видна. Есть цель по весу и мужской профиль.",
    "formora.legalAria": "Formora — политика конфиденциальности и условия",
    "medistory.sub": "Всё, что нужно рассказать врачу",
    "medistory.note": "На приёме десять минут",
    "medistory.text": "Если после приёма вы вспоминаете, что забыли сказать, — это сюда. Medistory задаёт короткие вопросы заранее и собирает ответы в листок на одну страницу: жалобы, хронические, лекарства, аллергии. Показать с телефона или распечатать. Всё лежит на телефоне.",
    "medistory.siteAria": "Medistory — сайт приложения",
    "cta.download": "Загрузить в",
    "about.title": "Обо мне",
    "about.text": "Я Кристина. Всё в этих приложениях сделано одним человеком: дизайн, код, страница в App Store, ответы в поддержке. Если что-то сломалось — вы пишете прямо тому, кто это сломал.",
    "connect.title": "Заходите в гости",
    "connect.sub": "Показываю там, над чем работаю.",
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
  // Instagram and the App Store links differ per language: a separate
  // account, and a ct= campaign token so App Store Connect can tell the
  // two audiences apart. The English URL stays in href so the links
  // still work with JavaScript off.
  for (const el of document.querySelectorAll("[data-href-ru]")) {
    const url = lang === "ru" ? el.dataset.hrefRu : el.dataset.hrefEn;
    if (url) el.setAttribute("href", url);
  }

  // Screenshots follow the language too — a Russian visitor should see
  // the Russian app. Both sets are cropped to the same shape, so the
  // swap cannot shift the layout.
  for (const img of document.querySelectorAll("[data-src-ru]")) {
    const src = lang === "ru" ? img.dataset.srcRu : img.dataset.srcEn;
    if (src && img.getAttribute("src") !== src) img.setAttribute("src", src);
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
