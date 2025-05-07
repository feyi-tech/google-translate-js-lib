const defaultLang = "en";
const translationTimeout = 10000;
const TRANSLATION_COMPLETE_ELEMENT_ID = "TRANSLATION_COMPLETE_ELEMENT_ID"
const defaultLangLoadCompleteCheckerText = "Hello! How're is everyone over there?"

const languages = {
  en: { name: "English", flag: "https://flagcdn.com/w40/gb.png", googleCode: "en" },
  fr: { name: "French", flag: "https://flagcdn.com/w40/fr.png", googleCode: "fr" },
  es: { name: "Spanish", flag: "https://flagcdn.com/w40/es.png", googleCode: "es" },
  de: { name: "German", flag: "https://flagcdn.com/w40/de.png", googleCode: "de" },
  it: { name: "Italian", flag: "https://flagcdn.com/w40/it.png", googleCode: "it" },
  zh: { name: "Chinese", flag: "https://flagcdn.com/w40/cn.png", googleCode: "zh-CN" },
  ja: { name: "Japanese", flag: "https://flagcdn.com/w40/jp.png", googleCode: "ja" },
  ar: { name: "Arabic", flag: "https://flagcdn.com/w40/sa.png", googleCode: "ar" },
  ru: { name: "Russian", flag: "https://flagcdn.com/w40/ru.png", googleCode: "ru" },
  hi: { name: "Hindi", flag: "https://flagcdn.com/w40/in.png", googleCode: "hi" },
  bn: { name: "Bengali", flag: "https://flagcdn.com/w40/bd.png", googleCode: "bn" },
  iw: { name: "Hebrew", flag: "https://flagcdn.com/w40/il.png", googleCode: "iw" },
  tl: { name: "Filipino", flag: "https://flagcdn.com/w40/ph.png", googleCode: "tl" },
  vi: { name: "Vietnamese", flag: "https://flagcdn.com/w40/vn.png", googleCode: "vi" },
  th: { name: "Thai", flag: "https://flagcdn.com/w40/th.png", googleCode: "th" },
  pt: { name: "Portuguese", flag: "https://flagcdn.com/w40/pt.png", googleCode: "pt" },
  nl: { name: "Dutch", flag: "https://flagcdn.com/w40/nl.png", googleCode: "nl" },
  tr: { name: "Turkish", flag: "https://flagcdn.com/w40/tr.png", googleCode: "tr" },
  ko: { name: "Korean", flag: "https://flagcdn.com/w40/kr.png", googleCode: "ko" },
  pl: { name: "Polish", flag: "https://flagcdn.com/w40/pl.png", googleCode: "pl" },
  sv: { name: "Swedish", flag: "https://flagcdn.com/w40/se.png", googleCode: "sv" },
  no: { name: "Norwegian", flag: "https://flagcdn.com/w40/no.png", googleCode: "no" }
};

function getLanguages() {
  if(window.onGetLanguages) {
      return window.onGetLanguages(languages)

  } else { return languages }
}

function getTimeout() {
  if(window.onGetTranslateTimeout) {
    return window.onGetTranslateTimeout()

  } else { 
    return translationTimeout 
  }
}

function addScriptWithContent(scriptContent) {
  // Create a script element
  const script = document.createElement('script');

  // Set the type attribute to JavaScript
  script.type = 'text/javascript';

  // Set the script content
  script.text = scriptContent;

  // Append the script to the document's head
  document.body.appendChild(script);
}

// 🍪 Cookie helpers
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 86400000);
    expires = "; expires=" + date.toUTCString();
  }

  const encoded = value//encodeURIComponent(value || "");

  // Set for current domain (no explicit domain)
  //document.cookie = `${name}=${encoded}${expires}; path=/`;

  // Set for exact domain
  //document.cookie = `${name}=${encoded}${expires}; path=/; domain=${location.hostname}`;

  // Set for wildcard domain
  document.cookie = `${name}=${encoded}${expires}; path=/; domain=.${location.hostname}`;
}

function deleteCookie(name) {
  try{
    document.cookie = name + "=; Max-Age=0; path=/;";
  } catch(e) {}
  try{
    document.cookie = name + "=; Max-Age=0; path=/; domain=" + location.hostname + ";";
  } catch(e) {}
  try{
    document.cookie = name + "=; Max-Age=0; path=/; domain=." + location.hostname + ";";
  } catch(e) {}
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

const setTranslating = (translating) => {
  const loaders = document.querySelectorAll(".g-translate-loader");
  //console.log("loaders:", loaders)
  loaders.forEach(loader => {
      if (translating) {
          loader.classList.add("translating");
      } else {
          loader.classList.remove("translating");
      }
  });
}

const pollTranslateComplete = (startTimeMillis) => {
  setTimeout(() => {
      const lng = getPreferredLanguage();
      if(document && document.querySelector(`#${TRANSLATION_COMPLETE_ELEMENT_ID}`)?.textContent != defaultLangLoadCompleteCheckerText || lng == defaultLang) {
          setTranslating(false)
          updateButtonLang(lng)
      } else if((new Date()).getTime() - startTimeMillis >= getTimeout()) {
          if(window.onGetMustTranslate && window.onGetMustTranslate()) {
              location.reload();

          } else {
              setTranslating(false)
          }

      } else {
          pollTranslateComplete(startTimeMillis)
      }
  }, 100)
}

function createLanguageButton(modal) {
    // Create UI button
    const button = document.createElement("button");
    button.className = "language-button";

    const flagImg = document.createElement("img");
    const label = document.createElement("span");
    const arrow = document.createElement("div");/*
    arrow.classList.add("chevron-down")
    arrow.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    arrow.setAttribute("width", "14")
    arrow.setAttribute("height", "14")
    arrow.setAttribute("viewBox", "0 0 20 20")
    arrow.setAttribute("fill", "none")*/
    arrow.innerHTML = `<svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
  <path d="M5 7L10 12L15 7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

    button.appendChild(flagImg);
    button.appendChild(label);
    button.appendChild(arrow)
  
    // Add event listener if needed
    button.addEventListener("click", () => {
      modal.style.display = "flex"
    });
  
    return button;
}

function updateButtonLang(code) {
  const container = document.querySelectorAll(".g-translate-box");
  console.log("updateButtonLang:", getLanguages(), code)
  
  console.log("updateButtonLang2:", getLanguages()[code])
  const { name, flag } = getLanguages()[code];

  container.forEach(box => {
      box.querySelector("img").src = flag;
      const modalOption = document.getElementById(`modal_option_${code}`)
      box.querySelector("span").textContent = modalOption && code == getPreferredLanguage() && modalOption.textContent && modalOption.textContent.length > 0? modalOption.textContent : name;
  });
}

// 🧩 Insert language selector into target elements
function initLanguageSelectors() {
  const container = document.querySelectorAll(".g-translate-box");

  // Create translated indicator
  const done = document.createElement("div");
  done.innerHTML = `<div id="${TRANSLATION_COMPLETE_ELEMENT_ID}" class="load-detector">${defaultLangLoadCompleteCheckerText}</div>`;
  document.body.appendChild(done);

  // Create modal
  const modal = document.createElement("div");
  modal.className = "language-modal";
  modal.style.display = "none";
  //modal.innerHTML = `<div class="language-modal-content"></div>`;

  modal.innerHTML = `
  <div class="language-modal-overlay">
      <div class="language-modal-content">
          <div class="modal-header">
              <div class="title">Select Language</div>
              <button class="close-modal">&times;</button>
          </div>
          <div class="language-list"></div>
      </div>
  </div>
  `;

  document.body.appendChild(modal);

  const modalList = modal.querySelector(".language-list");

  Object.entries(getLanguages()).forEach(([code, { name, flag }]) => {
    const option = document.createElement("div");
    option.id = `modal_option_${code}`
    option.className = "language-option";
    option.innerHTML = `<img src="${flag}" alt="${name}" /><span>${name}</span>`;
    option.onclick = () => {
      changeLanguage(code);
      modal.style.display = "none";
    };
    modalList.appendChild(option);
  });

  modal.querySelector(".close-modal").onclick = () => (modal.style.display = "none");
  modal.querySelector(".language-modal-overlay").onclick = e => {
      if (e.target === modal.querySelector(".language-modal-overlay")) {
        modal.style.display = "none";
      }
  };

  container.forEach(box => box.appendChild(createLanguageButton(modal)));
}

function waitForTranslateSelect(callback) {
  const check = () => {
    const select = document.querySelector("select.goog-te-combo");
    if (select && select.options.length > 1) {
      callback();
    } else {
      setTimeout(check, 100);
    }
  };
  check();
}

function injectGoogleTranslate (cb) {
  // Inject Google Translate widget
  const googleTranslateDiv = document.createElement("div");
  googleTranslateDiv.id = "google_translate_element";
  googleTranslateDiv.style.display = "none";
  document.body.appendChild(googleTranslateDiv);

  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        defaultLang: defaultLang,
        autoDisplay: false
      },
      'google_translate_element'
    );

    // Wait until Google injects the select, then apply language
    waitForTranslateSelect(() => {
      if(cb) cb()
    });
  };
}


function getLastSegment(text, delimeter="/") {
  if(!text) return null
  const parts = text.split(delimeter);
  return parts[parts.length - 1].trim();
}

function getPreferredLanguage() {
  const googleSavedLanguage = getLastSegment(getCookie("googtrans"))
  // If google saved language is set, then the user chose the language previously. So respect that by returning it
  if(googleSavedLanguage) {
    console.log("getPreferredLanguage:", googleSavedLanguage.split("-")[0])
    return googleSavedLanguage.split("-")[0]
  }

  // Return the language enforced by the developer has the 2nd priotised language
  const langs = getLanguages()
  console.log("getPreferredLanguage.languages", langs)
  const container = document.querySelectorAll(".g-translate-box");
  const attrLang = container[0]?.dataset?.lang;
  if (attrLang && langs[attrLang]) {
    console.log("lang: ", attrLang, langs[attrLang])
    return attrLang;
  }

  // Return the language in the user's browser has the 3rd priotised language or fallback to the default language
  const browserLang =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  defaultLang;

  const shortLang = browserLang.split("-")[0]; // "en-US" → "en"
  var lang = langs[shortLang] ? shortLang : defaultLang;
  
  return lang
}

// 🌐 Language switch logic
function changeLanguage(langCode) {
  const langInfo = getLanguages()[langCode]
  if (!langInfo) return;
  
  const current = getPreferredLanguage();

  updateButtonLang(current)

  if(langCode.toLowerCase() != current) {
    setTranslating(true);

    try {
      deleteCookie("googtrans")
    } catch(e) {}
    setCookie("googtrans", `/${defaultLang}/${langInfo.googleCode}`, 365)
    location.reload();
  }
}

// 🚀 Load when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setTranslating(true);

  initLanguageSelectors();
  pollTranslateComplete((new Date()).getTime());

  injectGoogleTranslate(() => {
    //const current = getPreferredLanguage();
    //updateButtonLang(current)
  })
});

// Expose to global scope in case you want to call it manually
window.changeLanguage = changeLanguage;