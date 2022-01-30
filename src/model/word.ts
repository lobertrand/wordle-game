export const WORD_LENGTH = 5;

export const isCapitalLetter = (str: string): boolean =>
  str.length === 1 && str >= "A" && str <= "Z";

export const randomElement = function <T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const Translations = {
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

export const Keyboard = {
  AZERTY: ["AZERTYUIOP", "QSDFGHJKLM", "WXCVBN"],
  QWERTY: ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"],
} as const;

export type Status = "ABSENT" | "WRONG_POSITION" | "RIGHT_POSITION";

export class Letter {
  value: string;
  status: Status;

  constructor(value: string) {
    this.value = value;
    this.status = "ABSENT";
  }
}

export class Word {
  word = "";
  letters: Letter[] = [];
  constructor(word = "") {
    this.update(word);
  }

  update(newWord: string) {
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

  addLetter(ch: string) {
    if (this.word.length < WORD_LENGTH && isCapitalLetter(ch)) {
      const newWord = this.word + ch;
      this.update(newWord);
    }
  }

  removeLastLetter() {
    if (this.word.length > 0) {
      const newWord = [...this.word].slice(0, this.word.length - 1).join("");
      this.update(newWord);
    }
  }
}