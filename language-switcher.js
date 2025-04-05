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
  pt: { name: "Portuguese", flag: "https://flagcdn.com/w40/pt.png", googleCode: "pt" },
  nl: { name: "Dutch", flag: "https://flagcdn.com/w40/nl.png", googleCode: "nl" },
  tr: { name: "Turkish", flag: "https://flagcdn.com/w40/tr.png", googleCode: "tr" },
  ko: { name: "Korean", flag: "https://flagcdn.com/w40/kr.png", googleCode: "ko" },
  pl: { name: "Polish", flag: "https://flagcdn.com/w40/pl.png", googleCode: "pl" },
  sv: { name: "Swedish", flag: "https://flagcdn.com/w40/se.png", googleCode: "sv" },
  no: { name: "Norwegian", flag: "https://flagcdn.com/w40/no.png", googleCode: "no" }
};

const jsCookies = `/*! js-cookie v3.0.5 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}var t=function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});return t}));`

  const pageLanguage = "en"

let currentLang = pageLanguage;
const translationTimeout = 5000
const mustTranslate = true

const TRANSLATION_COMPLETE_ELEMENT_ID = "TRANSLATION_COMPLETE_ELEMENT_ID"
const defaultLangLoadCompleteCheckerText = "Hello! How're is everyone over there?"

  function getLanguages() {
      if(window.onGetLanguages) {
          return window.onGetLanguages(languages)

      } else { return languages }
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

  function getLastSegment(text, delimeter="/") {
      if(!text) return null
      const parts = text.split(delimeter);
      return parts[parts.length - 1];
  }

function detectUserLanguage(container) {
  const langs = getLanguages()
  console.log("detectUserLanguage.languages", langs)
  const attrLang = container[0].dataset.lang;
  if (attrLang && langs[attrLang]) {
      console.log("lang: ", attrLang, langs[attrLang])
      return attrLang;
  }

  const browserLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    pageLanguage;

  const shortLang = browserLang.split("-")[0]; // "en-US" → "en"
  var lang = langs[shortLang] ? shortLang : pageLanguage;
  
  const googt = Cookies.get("googtrans")
  if(googt) lang = getLastSegment(googt) || lang

  lang = langs[lang]? lang : pageLanguage
  console.log("lang:none ", lang, googt)
  return lang
}

function createLanguageButton() {
  const button = document.createElement("button");
  button.className = "language-button";
  button.innerHTML = `<img src="..." alt="..." />`; // your full button HTML

  // Add event listener if needed
  button.addEventListener("click", () => {
    // translation logic here
  });

  return button;
}

const boxes = document.querySelectorAll(".g-translate-box");
boxes.forEach(box => {
  const button = createLanguageButton();
  box.appendChild(button);
});

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelectorAll(".g-translate-box");
  if (!container) return;

  addScriptWithContent(jsCookies)

  currentLang = detectUserLanguage(container);

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
        pageLanguage: pageLanguage,
        autoDisplay: false
      },
      'google_translate_element'
    );

    // Wait until Google injects the select, then apply language
    waitForTranslateSelect(() => {
      selectLanguage(currentLang);
    });
  };

  // Create translated indicator
  const done = document.createElement("div");
  done.innerHTML = `<div id="${TRANSLATION_COMPLETE_ELEMENT_ID}" style="display:none!important">${defaultLangLoadCompleteCheckerText}</div>`;
  document.body.appendChild(done);

  function createLanguageButton() {
      // Create UI button
      const button = document.createElement("button");
      button.className = "language-button";
  
      const flagImg = document.createElement("img");
      const label = document.createElement("span");
      button.appendChild(flagImg);
      button.appendChild(label);
    
      // Add event listener if needed
      button.addEventListener("click", () => modal.style.display = "flex");
    
      return button;
  }
    
  
  //container.appendChild(button);
  container.forEach(box => box.appendChild(createLanguageButton()));
  
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
    option.className = "language-option";
    option.innerHTML = `<img src="${flag}" alt="${name}" /><span>${name}</span>`;
    option.onclick = () => {
      selectLanguage(code);
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
  
  function selectLanguage(code) {
      console.log("selectLanguage.code:", code)
      setTranslating(true)
      const { name, flag, googleCode } = getLanguages()[code];

      container.forEach(box => {
          box.querySelector("img").src = flag;
          box.querySelector("span").textContent = name;
      });
      
      currentLang = code;
      localStorage.setItem("selectedLang", code);
      translatePage(googleCode);
      pollTranslateComplete((new Date()).getTime(), googleCode)
  }

  function translatePage(langCode) {
    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      // Simulate user interaction for Google Translate to respond
      select.value = langCode;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      console.log("translatePage:", langCode)

    } else {
      console.log("translatePage:noSelect ", langCode)
    }
  }

  const pollTranslateComplete = (startTimeMillis, lng) => {
      setTimeout(() => {
          if(document && 
              (
                  document.querySelector(`#${TRANSLATION_COMPLETE_ELEMENT_ID}`)?.textContent 
                  != defaultLangLoadCompleteCheckerText || lng == pageLanguage
              )) {
              setTranslating(false)
  
          } else if((new Date()).getTime() - startTimeMillis >= translationTimeout) {
              if(mustTranslate) {
                  location.reload();
  
              } else {
                  setTranslating(false)
              }
  
          } else {
              pollTranslateComplete(startTimeMillis, lng)
          }
      }, 100)
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
});