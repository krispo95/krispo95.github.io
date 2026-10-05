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
    "hero.first": "Kristina",
    "hero.role": "Indie iOS developer",
    "hero.tagline": "I build small apps that solve problems I actually care about.",
    "social.contact": "Contact",
    "apps.title": "My apps",
    "formora.sub": "A smart body tracker",
    "formora.note": "The scale isn't the whole story",
    "formora.text": "As a woman, I know how much our bodies can change over a month and how easy it is to get upset by a number on the scale.",
    "formora.text2": "Track your weight, measurements and progress photos, and see changes the scale doesn't always show. It works for men too. Just leave the cycle feature off.",
    "formora.legalAria": "Formora — privacy policy and terms",
    "medistory.sub": "Everything your doctor needs to know",
    "medistory.note": "And remember to ask",
    "medistory.text": "Have you ever gone to the doctor and forgotten to mention a medication or ask something important? That's why I made Medistory.",
    "medistory.text2": "Keep your health information and questions in one place, and come prepared. Show the summary on your phone or export it as a PDF in your doctor's language. Everything stays on your device.",
    "medistory.siteAria": "Medistory — website",
    "cta.download": "Download on the",
    "about.title": "About me",
    "about.text": "I'm Kristina. Everything in these apps was made by one person: the design, the code, the App Store page, the replies to support mail. If something is broken, you are writing to the person who broke it.",
    "connect.title": "Come say hi",
    "connect.sub": "I'd be really glad if you tried them and told me how it went.",
    "foot": "Made by Kristina Stupnikova"
  },
  ru: {
    "doc.title": "Кристина Ступникова — инди iOS-разработчик",
    "nav.apps": "Приложения",
    "nav.about": "Обо мне",
    "nav.contact": "Контакты",
    "lang.group": "Язык",
    "hero.note": "Привет, рада вас видеть",
    "hero.first": "Кристина",
    "hero.role": "Инди iOS-разработчик",
    "hero.tagline": "Делаю небольшие приложения для задач, которые мне правда важны.",
    "social.contact": "Написать",
    "apps.title": "Мои приложения",
    "formora.sub": "Умный трекер тела",
    "formora.note": "Не только цифра на весах",
    "formora.text": "Как женщина, я знаю, насколько сильно наше тело может меняться в течение месяца и как легко расстроиться из-за цифры на весах.",
    "formora.text2": "Следите за весом, объёмами и прогрессом на фото и замечайте изменения, которые весы не всегда показывают. Приложение подходит и мужчинам. Просто отключите учёт цикла.",
    "formora.legalAria": "Formora — политика конфиденциальности и условия",
    "medistory.sub": "Всё, что нужно рассказать врачу",
    "medistory.note": "И не забыть спросить",
    "medistory.text": "У вас бывало, что на приёме у врача вы забывали упомянуть принимаемое лекарство или задать важный вопрос? У меня такое случалось часто. Поэтому я сделала Medistory.",
    "medistory.text2": "Здесь можно хранить информацию о здоровье и вопросы к врачу в одном месте. На приёме можно показать готовую сводку на телефоне или сохранить её в PDF на языке врача. Все данные остаются на вашем устройстве.",
    "medistory.siteAria": "Medistory — сайт приложения",
    "cta.download": "Загрузить в",
    "about.title": "Обо мне",
    "about.text": "Я Кристина. Всё в этих приложениях сделано одним человеком: дизайн, код, страница в App Store, ответы в поддержке. Если что-то сломалось — вы пишете прямо тому, кто это сломал.",
    "connect.title": "Заходите в гости",
    "connect.sub": "Буду очень рада, если попробуете и поделитесь впечатлениями.",
    "foot": "Сделано Кристиной Ступниковой"
  }
};

const STORAGE_KEY = "ks-lang";

/* ?lang=ru in the address bar wins over everything else: it is the author
   of the link saying which language this visitor should land in, which is
   how the two Instagram profiles point here. */
function langFromUrl() {
  try {
    const raw = new URLSearchParams(location.search).get("lang");
    if (!raw) return null;
    const lang = raw.trim().toLowerCase().slice(0, 2);
    return STRINGS[lang] ? lang : null;
  } catch (e) {
    return null;
  }
}

function pickInitialLang() {
  const fromUrl = langFromUrl();
  if (fromUrl) return fromUrl;
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
  btn.addEventListener("click", () => {
    applyLang(btn.dataset.lang);
    // keep the address bar honest, so a copied link carries what is on screen
    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", btn.dataset.lang);
      history.replaceState(null, "", url);
    } catch (e) { /* nothing to do */ }
  });
}

applyLang(pickInitialLang());
