<template>
  <div class="word-list" id="word-list" ref="wordListElement">
    <div class="word" v-for="word in attemps" v-bind:key="word.id">
      <span
        class="letter-wrapper"
        v-for="letter in word.letters"
        :key="letter.id"
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
        :key="letter.id"
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
          v-for="keyboardKey in [...keyboardRow]"
          :key="keyboardKey"
          @click="inputLetter(keyboardKey)"
        >
          {{ keyboardKey }}
        </button>
      </div>
    </div>
    <div class="game-controls">
      <button
        class="btn settings-btn"
        :title="i18n('game.settings')"
        @click="settingsPanelOpen = true"
      >
        <img src="@/assets/icons/settings.svg" aria-hidden="true" />
      </button>
      <button
        class="btn submit-btn"
        :title="i18n('game.submit')"
        @click="submitWord()"
        :disabled="input.length !== 5"
      >
        <span>{{ i18n("game.submit") }}</span>
        <img src="@/assets/icons/check.svg" aria-hidden="true" />
      </button>
      <button
        class="btn erase-btn"
        :title="i18n('game.erase')"
        @click="removeLastLetter()"
        :disabled="input.length === 0"
      >
        <img src="@/assets/icons/backspace.svg" aria-hidden="true" />
      </button>
    </div>
  </div>

  <div class="settings-overlay" :class="settingsPanelOpen ? 'open' : ''">
    <SettingsPanel>
      <template v-slot:bottomSection>
        <button
          class="btn"
          :title="i18n('settings.close')"
          @click="settingsPanelOpen = false"
        >
          <span>{{ i18n("settings.close") }}</span>
          <img src="@/assets/icons/close.svg" aria-hidden="true" />
        </button>
      </template>
    </SettingsPanel>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";

import { loadWords } from "@/services/WordsLoader";
import { i18n } from "@/services/Languages";
import { isCapitalLetter, randomElement } from "@/model/util";
import { Word, WORD_LENGTH, KEYBOARDS } from "@/model/model";
import { userSettings } from "@/services/UserSettings";
import SettingsPanel from "./SettingsPanel.vue";

// Variables
const state = reactive({
  input: new Word(),
  attemps: [] as Word[],
  badInput: false,
  settingsPanelOpen: false,
});
const { input, attemps, badInput, settingsPanelOpen } = toRefs(state);
const keyboard = computed(() => KEYBOARDS[userSettings.keyboardLayout]);
const wordListElement = ref<HTMLElement | null>(null);

let dictionary = new Set();
let wordToGuess = "happy"; // TODO: change default ?

// Life cycle
onMounted(async () => {
  const language = localStorage.getItem("userSettings.language");
  const keyboardLayout = localStorage.getItem("userSettings.keyboardLayout");
  if (language === "en" || language === "fr") {
    userSettings.language = language;
  }
  if (keyboardLayout === "AZERTY" || keyboardLayout === "QWERTY") {
    userSettings.keyboardLayout = keyboardLayout;
  }
  reloadWords();
  window.addEventListener("keydown", keyDownListener);
});
watch(
  () => userSettings.language,
  () => reloadWords()
);
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
  if (state.input.length === WORD_LENGTH && dictionary.has(state.input.word)) {
    for (let i = 0; i < WORD_LENGTH; i++) {
      state.input.letters[i].status =
        state.input.word[i] === wordToGuess.charAt(i)
          ? "RIGHT_POSITION"
          : wordToGuess.includes(state.input.word[i])
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
const reloadWords = async () => {
  const words = await loadWords(userSettings.language);
  console.log(
    `${words.length} words loaded for language '${userSettings.language}'`
  );
  dictionary = new Set(words);
  wordToGuess = randomElement(words);
  state.attemps = [];
  state.input = new Word();
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
