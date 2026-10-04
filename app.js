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
    "hero.tagline": "I make small iPhone apps. Usually so you don't have to keep things in your head.",
    "social.contact": "Contact",
    "apps.title": "My apps",
    "formora.sub": "Measurements, weight and photos",
    "formora.note": "Weight isn't the whole story",
    "formora.text": "The scale says one thing and the tape measure says another. Formora keeps measurements, weight and photos in one place, draws the graphs, and puts two photos side by side so the change is actually visible. I made it for myself; there is a men's profile in there too.",
    "formora.legalAria": "Formora — privacy policy and terms",
    "medistory.sub": "Everything you need to tell the doctor",
    "medistory.note": "Ten minutes with the doctor",
    "medistory.text": "An appointment is ten minutes, and there is a lot to say. Medistory asks short questions beforehand and turns the answers into a one-page summary — show it on your phone or print it. Everything stays on the phone.",
    "medistory.siteAria": "Medistory — website",
    "cta.download": "Download on the",
    "about.title": "About me",
    "about.text": "I'm Kristina. I do all of it myself — the idea, the design, the code, the App Store listing, the support emails. That is why the apps are small. It is also why, when something breaks, the person who fixes it is me.",
    "connect.title": "Come say hi",
    "connect.sub": "On Instagram and TikTok I show how the apps get made.",
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
    "hero.tagline": "Делаю маленькие приложения для айфона. Обычно — чтобы не держать важное в голове.",
    "social.contact": "Написать",
    "apps.title": "Мои приложения",
    "formora.sub": "Замеры, вес и фотографии",
    "formora.note": "Весы — это ещё не всё",
    "formora.text": "Весы показывают одно, а сантиметр — другое. Formora держит рядом обхваты, вес и фотографии, рисует графики и складывает два снимка в сравнение «было — стало». Делала для себя; мужской профиль в ней тоже есть.",
    "formora.legalAria": "Formora — политика конфиденциальности и условия",
    "medistory.sub": "Всё, что нужно рассказать врачу",
    "medistory.note": "На приёме десять минут",
    "medistory.text": "На приёме десять минут, а рассказать нужно многое. Medistory заранее задаёт короткие вопросы и собирает из ответов одностраничное резюме — его можно показать с телефона или распечатать. Всё хранится только на телефоне.",
    "medistory.siteAria": "Medistory — сайт приложения",
    "cta.download": "Загрузить в",
    "about.title": "Обо мне",
    "about.text": "Я Кристина. Делаю всё сама: придумываю, рисую, пишу код, оформляю страницу в App Store, отвечаю на письма. Поэтому приложения маленькие. И поэтому, если что-то сломается, чинить буду тоже я.",
    "connect.title": "Заходите в гости",
    "connect.sub": "В инстаграме и тиктоке показываю, как всё это делается.",
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
