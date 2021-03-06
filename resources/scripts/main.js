const WORD_LENGTH = 5;

const isCapitalLetter = (str) =>
  str.length === 1 && str >= "A" && str <= "Z";

const randomElement = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

const Translations = {
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
    }
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
    }
  },
}

const Keyboard = {
  AZERTY: [
    'AZERTYUIOP',
    'QSDFGHJKLM',
    'WXCVBN',
  ],
  QWERTY: [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM',
  ]
}

const Status = {
  ABSENT: "ABSENT",
  WRONG_POSITION: "WRONG_POSITION",
  RIGHT_POSITION: "RIGHT_POSITION",
};

class Letter {
  constructor(value) {
    this.value = value;
    this.status = Status.ABSENT;
  }
}

class Word {
  constructor(word = "") {
    this.update(word);
  }

  update(newWord) {
    newWord = newWord.toUpperCase();
    const newLetters = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (i < newWord.length) {
        newLetters.push(new Letter(newWord[i]));
      } else {
        newLetters.push(new Letter(" "));
      }
    }
    this.word = newWord;
    this.letters = newLetters;
  }

  get length() {
    return this.word.replace(" ", "").length;
  }

  addLetter(ch) {
    if (this.word.length < WORD_LENGTH && isCapitalLetter(ch)) {
      const newWord = this.word + ch;
      this.update(newWord);
    }
  }

  removeLastLetter() {
    if (this.word.length > 0) {
      const newWord = [...this.word]
        .slice(0, this.word.length - 1)
        .join("");
      this.update(newWord);
    }
  }
}

const app = new Vue({
  el: "#app",
  data: {
    dictionary: new Set(),
    wordToGuess: null,
    input: new Word(),
    attemps: [],
    badInput: false,
    settings: {
      open: false,
      language: "en",
      keyboardLayout: "AZERTY",
    }
  },
  methods: {
    removeLastLetter() {
      this.input.removeLastLetter();
    },
    submitWord() {
      if (
        this.input.length === WORD_LENGTH &&
        this.dictionary.has(this.input.word)
      ) {
        for (let i = 0; i < WORD_LENGTH; i++) {
          this.input.letters[i].status =
            this.input.word[i] === this.wordToGuess[i]
              ? Status.RIGHT_POSITION
              : this.wordToGuess.includes(this.input.word[i])
                ? Status.WRONG_POSITION
                : Status.ABSENT;
        }
        this.attemps.push(this.input);
        this.input = new Word();
      } else {
        this.badInput = true;
        setTimeout(() => this.badInput = false, 500);
      }
      this.$nextTick(() => this.scrollToEnd());
    },
    scrollToEnd() {
      const wordList = this.$el.querySelector("#word-list");
      wordList.scrollTop = wordList.scrollHeight;
    },
    inputLetter(ch) {
      if (isCapitalLetter(ch)) {
        this.input.addLetter(ch);
      }
    },
    i18n(property) {
      const lang = this.settings.language;
      if (!property || typeof property != "string") {
        console.warn("Wrong i18n parameter: " + property);
        return property;
      }
      if (!(lang in Translations)) {
        console.warn(`Missing language '${lang}'`);
        return property;
      }
      const parts = property.split(".");
      let result = Translations[lang];
      for (let part of parts) {
        if (result && part in result) {
          result = result[part];
        } else {
          console.warn(`Missing property '${property}' for language '${lang}'`);
          return property;
        }
      }
      return result ? result : property;
    },
    reloadWords: async function() {
      if (!['fr', 'en'].includes(this.settings.language)) {
        console.log(`Cannot load words for unsuported language: '${this.settings.language}'`);
        return;
      }
      const response = await fetch(`./resources/words/words-${this.settings.language}-5.txt`);
      const text = await response.text();
      const words = text.toUpperCase().split("\n");
      this.dictionary = new Set(words);
      console.log(`${words.length} words loaded for language '${this.settings.language}'`);
      this.wordToGuess = randomElement(words);
      this.attemps = [];
      this.input = new Word();
    }
  },
  computed: {
    keyboard() {
      return Keyboard[this.settings.keyboardLayout];
    }
  },
  mounted: async function () {
    // Load user preferences
    const language = localStorage.getItem("userSettings.language");
    const keyboardLayout = localStorage.getItem("userSettings.keyboardLayout");
    this.settings.language = language in Translations ? language : "fr";
    this.settings.keyboardLayout = keyboardLayout in Keyboard ? keyboardLayout : "AZERTY";

    // Init dictionary
    await this.reloadWords();

    // Init keyboard events
    window.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        this.removeLastLetter();
      } else if (event.key === "Enter") {
        this.submitWord();
      } else if (event.key.length === 1) {
        this.inputLetter(event.key.toUpperCase());
      }
    });
  },
});

app.$watch('settings.language', (newVal) => {
  localStorage.setItem("userSettings.language", newVal);
  app.reloadWords();
});
app.$watch('settings.keyboardLayout', (newVal) => {
  localStorage.setItem("userSettings.keyboardLayout", newVal);
});