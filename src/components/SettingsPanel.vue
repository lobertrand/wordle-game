<template>
  <div class="settings-content">
    <section>
      <h2>{{ i18n("settings.language") }}</h2>
      <div class="radio-btn">
        <input
          id="language-english"
          type="radio"
          name="language"
          value="en"
          v-model="userSettings.language"
        />
        <label for="language-english">English</label>
      </div>
      <div class="radio-btn">
        <input
          id="language-french"
          type="radio"
          name="language"
          value="fr"
          v-model="userSettings.language"
        />
        <label for="language-french">Français</label>
      </div>
    </section>
    <section>
      <h2>{{ i18n("settings.keyboardLayout") }}</h2>
      <div class="radio-btn">
        <input
          id="keyboard-layout-qwerty"
          type="radio"
          name="keyboard-layout"
          value="QWERTY"
          v-model="userSettings.keyboardLayout"
        />
        <label for="keyboard-layout-qwerty">Qwerty</label>
      </div>
      <div class="radio-btn">
        <input
          id="keyboard-layout-azerty"
          type="radio"
          name="keyboard-layout"
          value="AZERTY"
          v-model="userSettings.keyboardLayout"
        />
        <label for="keyboard-layout-azerty">Azerty</label>
      </div>
    </section>
    <section v-if="$slots.bottomSection">
      <slot name="bottomSection" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { i18n } from "@/services/Languages";
import { userSettings } from "@/services/UserSettings";
</script>

<style scoped lang="scss">
.settings-content {
  width: 100%;
  max-width: var(--max-content-width);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.2);
  background-color: var(--bg-color);
}

section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h2 {
  margin-bottom: 4px;
  text-align: center;
  font-weight: bold;
  font-size: var(--btn-font-size);
}

.radio-btn {
  input {
    display: none;
  }
  label {
    display: block;
    position: relative;
    font-size: var(--btn-font-size);
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 100px;
    border: 1px solid var(--default-color);
    text-align: center;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  input:checked + label {
    background-color: white;
    color: var(--default-pressed-color);
    border-color: white;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
