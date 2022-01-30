<template>
  <div class="word-list" id="word-list" ref="wordListElement">
    <div class="word" v-for="word in attemps" v-bind:key="word.word">
      <span
        class="letter-wrapper"
        v-for="letter in word.letters"
        :key="letter.value"
        ><span
          class="letter"
          :class="
            letter.status === 'RIGHT_POSITION'
              ? 'right-pos'
              : letter.status === 'WRONG_POSITION'
              ? 'wrong-pos'
              : ''
          "
          >{{ letter.value }}</span
        ></span
      >
    </div>
    <div class="word" id="input-zone">
      <span
        class="letter-wrapper"
        v-for="letter in input.letters"
        :key="letter.value"
      >
        <span class="letter" :class="badInput ? 'bad-input' : ''">{{
          letter.value
        }}</span>
      </span>
    </div>
  </div>

  <div class="bottom-sheet">
    <div class="keyboard">
      <div
        class="keyboard-row"
        v-for="keyboardRow in keyboard"
        :key="keyboardRow"
      >
        <button
          class="btn"
          v-for="keyboardKey in keyboardRow"
          :key="keyboardKey"
          v-on:click="inputLetter(keyboardKey)"
        >
          {{ keyboardKey }}
        </button>
      </div>
    </div>
    <div class="game-controls">
      <button
        class="btn settings-btn"
        :title="i18n('game.settings')"
        v-on:click="settings.open = true"
      >
        <img src="@/assets/icons/settings.svg" aria-hidden="true" />
      </button>
      <button
        class="btn submit-btn"
        :title="i18n('game.submit')"
        v-on:click="submitWord()"
      >
        <span>{{ i18n("game.submit") }}</span>
        <img src="@/assets/icons/check.svg" aria-hidden="true" />
      </button>
      <button
        class="btn erase-btn"
        :title="i18n('game.erase')"
        v-on:click="removeLastLetter()"
      >
        <img src="@/assets/icons/backspace.svg" aria-hidden="true" />
      </button>
    </div>
  </div>

  <div class="settings-overlay" :class="settings.open ? 'open' : ''">
    <div class="settings-content">
      <section class="settings-section">
        <h2>{{ i18n("settings.language") }}</h2>
        <div class="radio-btn">
          <input
            id="language-english"
            type="radio"
            name="language"
            value="en"
            v-model="settings.language"
          />
          <label for="language-english">English</label>
        </div>
        <div class="radio-btn">
          <input
            id="language-french"
            type="radio"
            name="language"
            value="fr"
            v-model="settings.language"
          />
          <label for="language-french">Français</label>
        </div>
      </section>
      <section class="settings-section">
        <h2>{{ i18n("settings.keyboardLayout") }}</h2>
        <div class="radio-btn">
          <input
            id="keyboard-layout-qwerty"
            type="radio"
            name="keyboard-layout"
            value="QWERTY"
            v-model="settings.keyboardLayout"
          />
          <label for="keyboard-layout-qwerty">Qwerty</label>
        </div>
        <div class="radio-btn">
          <input
            id="keyboard-layout-azerty"
            type="radio"
            name="keyboard-layout"
            value="AZERTY"
            v-model="settings.keyboardLayout"
          />
          <label for="keyboard-layout-azerty">Azerty</label>
        </div>
      </section>
      <section class="settings-section mt-lg">
        <button
          class="btn"
          :title="i18n('settings.close')"
          v-on:click="settings.open = false"
        >
          <span>{{ i18n("settings.close") }}</span>
          <img src="@/assets/icons/close.svg" aria-hidden="true" />
        </button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from "vue";

const WORD_LENGTH = 5;

const isCapitalLetter = (str: string): boolean =>
  str.length === 1 && str >= "A" && str <= "Z";

const randomElement = function <T>(arr: T[]): T {
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

const Keyboard = {
  AZERTY: ["AZERTYUIOP", "QSDFGHJKLM", "WXCVBN"],
  QWERTY: ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"],
} as const;

type Status = "ABSENT" | "WRONG_POSITION" | "RIGHT_POSITION";

class Letter {
  value: string;
  status: Status;

  constructor(value: string) {
    this.value = value;
    this.status = "ABSENT";
  }
}

class Word {
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

export default defineComponent({
  name: "HelloWorld",
  // props: {
  //   msg: String,
  // },
  setup() {
    const state = reactive({
      dictionary: new Set(),
      wordToGuess: "happy", // TODO: change default ?
      input: new Word(),
      attemps: [] as Word[],
      badInput: false,
      settings: {
        open: false,
        language: "en",
        keyboardLayout: "AZERTY",
      },
    });

    const removeLastLetter = () => {
      state.input.removeLastLetter();
    };

    const submitWord = () => {
      if (
        state.input.length === WORD_LENGTH &&
        state.dictionary.has(state.input.word)
      ) {
        for (let i = 0; i < WORD_LENGTH; i++) {
          state.input.letters[i].status =
            state.input.word[i] === state.wordToGuess.charAt(i)
              ? "RIGHT_POSITION"
              : state.wordToGuess.includes(state.input.word[i])
              ? "WRONG_POSITION"
              : "ABSENT";
        }
        state.attemps.push(state.input);
        state.input = new Word();
      } else {
        state.badInput = true;
        setTimeout(() => (state.badInput = false), 500);
      }
      nextTick(scrollToEnd);
    };
    const wordListElement = ref<HTMLElement | null>(null);
    const scrollToEnd = () => {
      if (wordListElement.value) {
        wordListElement.value.scrollTop = wordListElement.value.scrollHeight;
      }
    };
    const inputLetter = (ch: string) => {
      if (isCapitalLetter(ch)) {
        state.input.addLetter(ch);
      }
    };
    const i18n = (property: string) => {
      const lang = state.settings.language as keyof typeof Translations;
      if (!property || typeof property != "string") {
        console.warn("Wrong i18n parameter: " + property);
        return property;
      }
      if (!(lang in Translations)) {
        console.warn(`Missing language '${lang}'`);
        return property;
      }
      const parts = property.split(".");
      let result = Translations[lang] as any;
      for (let part of parts) {
        if (result && part in result) {
          result = result[part];
        } else {
          console.warn(`Missing property '${property}' for language '${lang}'`);
          return property;
        }
      }
      return result ? result : property;
    };
    const reloadWords = async () => {
      if (!["fr", "en"].includes(state.settings.language)) {
        console.log(
          `Cannot load words for unsuported language: '${state.settings.language}'`
        );
        return;
      }
      const response = await fetch(
        `./assets/data/words-${state.settings.language}-5.txt`
      );
      const text = await response.text();
      const words = text.toUpperCase().split("\n");
      state.dictionary = new Set(words);
      console.log(
        `${words.length} words loaded for language '${state.settings.language}'`
      );
      state.wordToGuess = randomElement(words);
      state.attemps = [];
      state.input = new Word();
    };

    const keyboard = computed(() => {
      return (Keyboard as any)[state.settings.keyboardLayout];
    });

    onMounted(async () => {
      // Load user preferences
      const language = localStorage.getItem("userSettings.language");
      const keyboardLayout = localStorage.getItem(
        "userSettings.keyboardLayout"
      );
      state.settings.language =
        language && language in Translations ? language : "fr";
      state.settings.keyboardLayout =
        keyboardLayout && keyboardLayout in Keyboard
          ? keyboardLayout
          : "AZERTY";

      // Init dictionary
      await reloadWords();

      // Init keyboard events
      window.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
          removeLastLetter();
        } else if (event.key === "Enter") {
          submitWord();
        } else if (event.key.length === 1) {
          inputLetter(event.key.toUpperCase());
        }
      });
    });

    watchEffect(() => {
      localStorage.setItem("userSettings.language", state.settings.language);
      reloadWords();
    });

    watchEffect(() => {
      localStorage.setItem(
        "userSettings.keyboardLayout",
        state.settings.keyboardLayout
      );
    });

    return {
      ...toRefs(state),
      wordListElement,
      keyboard,
      removeLastLetter,
      submitWord,
      inputLetter,
      i18n,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
