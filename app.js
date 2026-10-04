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
    "formora.sub": "A smart body tracker",
    "formora.note": "The scale isn't the whole story",
    "formora.text": "I made it for women first. As a woman I know how much the body can change over a month, and how much it matters to take that into account — so as not to be upset by every new number on the scale.",
    "formora.text2": "You can track weight and measurements, keep progress photos and compare shots from different periods easily. And it helps you notice changes the scale does not always show: the weight barely moves while the volumes go down. Useful for men too — you can just leave the menstrual cycle feature off.",
    "formora.legalAria": "Formora — privacy policy and terms",
    "medistory.sub": "Everything you need to tell the doctor",
    "medistory.note": "And remember to ask",
    "medistory.text": "Have you ever got to the doctor and forgotten to mention some medication you are taking, or a chronic condition. Or forgotten to ask something important — then this app was made exactly for you.",
    "medistory.text2": "With it you can fill in your profile beforehand with everything about your health, write down all the questions you need, and arrive prepared. The summary can be shown on your phone or printed. Everything stays on the phone.",
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
    "hero.role": "Инди iOS-разработчик",
    "hero.tagline": "Делаю приложения для айфона в свободное от работы время.",
    "social.contact": "Написать",
    "apps.title": "Мои приложения",
    "formora.sub": "Умный трекер тела",
    "formora.note": "Не только цифра на весах",
    "formora.text": "Разрабатывала в первую очередь для женщин. Как женщина, я знаю, насколько тело может меняться в течение месяца и как важно учитывать эти изменения, чтобы не расстраиваться из-за каждой новой цифры на весах.",
    "formora.text2": "Можно отслеживать вес и замеры, хранить фотографии прогресса и удобно сравнивать снимки за разные периоды. А ещё приложение помогает замечать изменения, которые не всегда видны на весах: например, вес почти не меняется, а объёмы уменьшаются. Мужчинам тоже будет полезно, просто функцию, связанную с менструальным циклом, можно не включать.",
    "formora.legalAria": "Formora — политика конфиденциальности и условия",
    "medistory.sub": "Всё, что нужно рассказать врачу",
    "medistory.note": "И не забыть спросить",
    "medistory.text": "Если у вас когда-нибудь было такое, что приходите ко врачу и забываете упомянуть какое-то лекарство, которое принимаете, или хроническое заболевание. Или забываете спросить что-то важное — то это приложение создано как раз для вас.",
    "medistory.text2": "С ним вы сможете заранее заполнить свой профиль со всеми особенностями вашего здоровья, записать все нужные вопросы и прийти на приём подготовленными. Резюме можно показать с телефона или распечатать. Всё хранится на телефоне.",
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
