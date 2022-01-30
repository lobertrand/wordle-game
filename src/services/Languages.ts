export const TRANSLATIONS = {
  en: {
    game: {
      settings: "Settings",
      submit: "Submit",
      erase: "Erase",
    },
    settings: {
      language: "Language",
      keyboardLayout: "Keyboard layout",
      close: "Close settings",
    },
  },
  fr: {
    game: {
      settings: "Paramètres",
      submit: "Envoyer",
      erase: "Effacer",
    },
    settings: {
      language: "Langue",
      keyboardLayout: "Disposition du clavier",
      close: "Fermer les paramètres",
    },
  },
};
export type Language = keyof typeof TRANSLATIONS;

export const translate = (property: string, lang: Language): string => {
  if (!property || typeof property != "string") {
    console.warn("Wrong i18n parameter: " + property);
    return property;
  }
  if (!(lang in TRANSLATIONS)) {
    console.warn(`Missing language '${lang}'`);
    return property;
  }
  const parts = property.split(".");
  let result: any = TRANSLATIONS[lang];
  for (const part of parts) {
    if (result && part in result) {
      result = result[part];
    } else {
      console.warn(`Missing property '${property}' for language '${lang}'`);
      return property;
    }
  }
  return result ? result : property;
};
