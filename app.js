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
    "hero.tagline": "I make iPhone apps. Two so far.",
    "social.contact": "Contact",
    "apps.title": "My apps",
    "formora.sub": "Measurements, weight and photos",
    "formora.note": "Weight isn't the whole story",
    "formora.text": "The scale doesn't move but the jeans fit differently. I wanted to see that in numbers instead of guessing. Formora keeps the measurements, draws the graphs, and puts two photos side by side so the difference shows. There's a men's profile in it too.",
    "formora.legalAria": "Formora — privacy policy and terms",
    "medistory.sub": "Everything you need to tell the doctor",
    "medistory.note": "Ten minutes with the doctor",
    "medistory.text": "I walk into the room and forget half of it. Medistory asks beforehand, one short question at a time, and collects the answers into a single page. Show it on your phone or print it. Nothing gets sent anywhere; it stays on the phone.",
    "medistory.siteAria": "Medistory — website",
    "cta.download": "Download on the",
    "about.title": "About me",
    "about.text": "I'm Kristina. I build the apps alone — the design, the code, the App Store screenshots. The support mail comes to me as well, so if something's broken, you're writing to the person who broke it.",
    "connect.title": "Come say hi",
    "connect.sub": "I post what I'm working on, and complain about Apple now and then.",
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
    "hero.tagline": "Делаю приложения для айфона. Пока два.",
    "social.contact": "Написать",
    "apps.title": "Мои приложения",
    "formora.sub": "Замеры, вес и фотографии",
    "formora.note": "Весы — это ещё не всё",
    "formora.text": "Вес стоит на месте, а джинсы сидят иначе. Мне хотелось видеть это в цифрах, а не догадываться. Formora записывает обхваты, рисует по ним графики и ставит две фотографии рядом, чтобы разница была видна. Мужской профиль в ней тоже есть.",
    "formora.legalAria": "Formora — политика конфиденциальности и условия",
    "medistory.sub": "Всё, что нужно рассказать врачу",
    "medistory.note": "На приёме десять минут",
    "medistory.text": "Захожу в кабинет — и половину забываю. Medistory спрашивает заранее, по одному короткому вопросу, и собирает ответы в листок на одну страницу. Показать с телефона или распечатать. Никуда не отправляется, лежит на телефоне.",
    "medistory.siteAria": "Medistory — сайт приложения",
    "cta.download": "Загрузить в",
    "about.title": "Обо мне",
    "about.text": "Я Кристина. Приложения делаю одна — и дизайн, и код, и скриншоты для App Store. Письма в поддержку тоже читаю я, так что если что-то сломалось, вы пишете прямо тому, кто это сломал.",
    "connect.title": "Заходите в гости",
    "connect.sub": "Там я показываю, что делаю, и иногда жалуюсь на Apple.",
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
