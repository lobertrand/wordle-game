<template>
  <div class="word-list" id="word-list" ref="wordListElement">
    <div class="word" v-for="word in attemps" v-bind:key="word.word">
      <span class="letter-wrapper" v-for="letter in word.letters" :key="letter"
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
        :key="letter"
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
        :disabled="input.length !== 5"
      >
        <span>{{ i18n("game.submit") }}</span>
        <img src="@/assets/icons/check.svg" aria-hidden="true" />
      </button>
      <button
        class="btn erase-btn"
        :title="i18n('game.erase')"
        v-on:click="removeLastLetter()"
        :disabled="input.length === 0"
      >
        <img src="@/assets/icons/backspace.svg" aria-hidden="true" />
      </button>
    </div>
  </div>

  <!-- SETTINGS OVERLAY -->
  <!-- TODO: Move to a new component -->

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
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from "vue";

import { loadWords } from "@/services/WordsLoader";
import { Language, translate } from "@/services/Languages";
import { isCapitalLetter, randomElement } from "@/model/util";
import { Word, WORD_LENGTH, KEYBOARDS, KeyboardLayout } from "@/model/word";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    // Variables
    const state = reactive({
      dictionary: new Set(),
      wordToGuess: "happy", // TODO: change default ?
      input: new Word(),
      attemps: [] as Word[],
      badInput: false,
      settings: {
        open: false,
        language: "en" as Language,
        keyboardLayout: "AZERTY" as KeyboardLayout,
      },
    });
    const keyboard = computed(() => {
      return KEYBOARDS[state.settings.keyboardLayout];
    });
    const wordListElement = ref<HTMLElement | null>(null);

    // Life cycle
    onMounted(async () => {
      // Load user preferences
      const language = localStorage.getItem("userSettings.language");
      const keyboardLayout = localStorage.getItem(
        "userSettings.keyboardLayout"
      );
      if (language === "en" || language === "fr") {
        state.settings.language = language;
      }
      if (keyboardLayout === "AZERTY" || keyboardLayout === "QWERTY") {
        state.settings.keyboardLayout = keyboardLayout;
      }

      // Init keyboard events
      window.addEventListener("keydown", keyDownListener);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", keyDownListener);
    });

    // Methods
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        removeLastLetter();
      } else if (event.key === "Enter") {
        submitWord();
      } else if (event.key.length === 1) {
        inputLetter(event.key.toUpperCase());
      }
    };
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
      nextTick(() => {
        if (wordListElement.value) {
          wordListElement.value.scrollTop = wordListElement.value.scrollHeight;
        }
      });
    };
    const inputLetter = (ch: string) => {
      if (isCapitalLetter(ch)) {
        state.input.addLetter(ch);
      }
    };
    const i18n = (property: string) =>
      translate(property, state.settings.language);
    const reloadWords = async () => {
      const words = await loadWords(state.settings.language);
      console.log(
        `${words.length} words loaded for language '${state.settings.language}'`
      );
      state.dictionary = new Set(words);
      state.wordToGuess = randomElement(words);
      state.attemps = [];
      state.input = new Word();
    };

    // Watchers
    watchEffect(() => {
      // Runs when component is mounted too
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
