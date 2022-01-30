import { isCapitalLetter } from "./util";

export const WORD_LENGTH = 5;

export const KEYBOARDS = {
  AZERTY: ["AZERTYUIOP", "QSDFGHJKLM", "WXCVBN"],
  QWERTY: ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"],
};
export type KeyboardLayout = keyof typeof KEYBOARDS;

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

  update(newWord: string): void {
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

  get length(): number {
    return this.word.replace(" ", "").length;
  }

  addLetter(ch: string): void {
    if (this.word.length < WORD_LENGTH && isCapitalLetter(ch)) {
      const newWord = this.word + ch;
      this.update(newWord);
    }
  }

  removeLastLetter(): void {
    if (this.word.length > 0) {
      const newWord = [...this.word].slice(0, this.word.length - 1).join("");
      this.update(newWord);
    }
  }
}
