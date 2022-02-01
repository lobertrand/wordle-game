import { reactive, watch } from "vue";
import { KeyboardLayout } from "@/model/model";
import { Language } from "./Languages";

export const userSettings = reactive({
  language: "en" as Language,
  keyboardLayout: "AZERTY" as KeyboardLayout,
});

// Watchers
watch(
  () => userSettings.language,
  (newValue) => {
    localStorage.setItem("userSettings.language", newValue);
  }
);
watch(
  () => userSettings.keyboardLayout,
  (newValue) => {
    localStorage.setItem("userSettings.keyboardLayout", newValue);
  }
);
