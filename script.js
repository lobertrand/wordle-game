const WORD_LENGTH = 5;

const isCapitalLetter = (str) =>
  str.length === 1 && str >= "A" && str <= "Z";

const randomElement = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

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
    wordToGuess: null,
    input: new Word(),
    badInput: false,
    inputZoneFocused: false,
    attemps: [],
  },
  methods: {
    removeLastLetter() {
      this.input.removeLastLetter();
    },
    submitWord(dictionary) {
      if (
        this.input.length === WORD_LENGTH &&
        dictionary.has(this.input.word)
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
    },
    inputLetter(ch) {
      if (isCapitalLetter(ch)) {
        this.input.addLetter(ch);
      }
    },
  },
  mounted: async function () {
    // Init dictionary
    const response = await fetch("./dictionary.txt");
    const text = await response.text();
    const words = text.toUpperCase().split("\n");
    const dictionary = new Set(words);
    console.log(words.length + " english words loaded");
    this.wordToGuess = randomElement(words);

    // Init hidden input

    const inputZone = document.querySelector("#input-zone");
    const hiddenInput = document.querySelector("#hidden-input");
    inputZone.addEventListener("click", () => hiddenInput.focus());
    hiddenInput.addEventListener("focus", () => this.inputZoneFocused = true);
    hiddenInput.addEventListener("blur", () => this.inputZoneFocused = false);

    // Init keyboard events
    window.addEventListener("keydown", (event) => {      
      if (event.key === "Backspace") {
        this.removeLastLetter();
      } else if (event.key === "Enter") {
        this.submitWord(dictionary);
      } else if (event.key.length === 1) {
        this.inputLetter(event.key.toUpperCase());
      }
    });
  },
});