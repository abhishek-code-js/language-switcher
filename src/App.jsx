// B5 · P2 — Language Switcher (English / Hindi / Marathi)
// Concept: Context can hold any data — strings, objects, arrays, functions.
// Here it holds a translations map and the active language.
// Any consumer can call setLang() to update the whole app's language.

import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    greeting: "Hello!",
    tagline: "Learn React the right way.",
    btn_change: "Change Language",
    lang_label: "Language",
    welcome: "Welcome",
    items: ["Dashboard", "Profile", "Settings", "Logout"],
  },
  hi: {
    greeting: "नमस्ते!",
    tagline: "सही तरीके से React सीखें।",
    btn_change: "भाषा बदलें",
    lang_label: "भाषा",
    welcome: "स्वागत है",
    items: ["डैशबोर्ड", "प्रोफ़ाइल", "सेटिंग्स", "लॉगआउट"],
  },
  mr: {
    greeting: "नमस्कार!",
    tagline: "योग्य प्रकारे React शिका.",
    btn_change: "भाषा बदला",
    lang_label: "भाषा",
    welcome: "स्वागत आहे",
    items: ["डॅशबोर्ड", "प्रोफाइल", "सेटिंग्ज", "लॉगआउट"],
  },
};

const LangContext = createContext();

function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

function LangSwitcher() {
  const { lang, setLang, t } = useContext(LangContext);
  const s = {
    wrap: { display: "flex", gap: 8, marginBottom: 16 },
    btn: (active) => ({
      padding: "6px 16px",
      fontSize: 13,
      borderRadius: 20,
      cursor: "pointer",
      border: "1px solid",
      borderColor: active ? "#111" : "#ddd",
      background: active ? "#111" : "#fff",
      color: active ? "#fff" : "#666",
    }),
    lbl: {
      fontSize: 11,
      color: "#aaa",
      marginBottom: 8,
      display: "block",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
  };
  return (
    <div>
      <span style={s.lbl}>{t.lang_label}</span>
      <div style={s.wrap}>
        {["en", "hi", "mr"].map((l) => (
          <button key={l} style={s.btn(lang === l)} onClick={() => setLang(l)}>
            {{ en: "English", hi: "हिंदी", mr: "मराठी" }[l]}
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const { t } = useContext(LangContext);
  const s = {
    h1: {
      fontSize: 26,
      fontWeight: 700,
      margin: "0 0 6px",
      letterSpacing: -0.5,
    },
    tag: { fontSize: 14, color: "#666", margin: 0 },
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={s.h1}>{t.greeting}</p>
      <p style={s.tag}>{t.tagline}</p>
    </div>
  );
}

function NavMenu() {
  const { t } = useContext(LangContext);
  const s = {
    lbl: {
      fontSize: 11,
      color: "#aaa",
      marginBottom: 8,
      display: "block",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    list: { border: "1px solid #eee", borderRadius: 8, overflow: "hidden" },
    item: {
      padding: "11px 16px",
      fontSize: 14,
      borderBottom: "1px solid #f0f0f0",
      color: "#333",
    },
  };
  return (
    <div>
      <span style={s.lbl}>{t.welcome}</span>
      <div style={s.list}>
        {t.items.map((item, i) => (
          <div
            key={i}
            style={{
              ...s.item,
              borderBottom:
                i < t.items.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LanguageSwitcher() {
  const s = {
    page: {
      fontFamily: "monospace",
      maxWidth: 480,
      margin: "40px auto",
      padding: "0 24px",
      color: "#111",
    },
    tag: { fontSize: 12, color: "#aaa", marginBottom: 16 },
  };
  return (
    <div style={s.page}>
      <p style={s.tag}>Language Switcher via useContext</p>
      <LangProvider>
        <LangSwitcher />
        <HeroSection />
        <NavMenu />
      </LangProvider>
    </div>
  );
}
