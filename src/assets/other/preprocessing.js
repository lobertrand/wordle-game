/*
  Collecting words in a given language :
    
  fr : - French words by order of frequency
         https://fr.wiktionary.org/wiki/Utilisateur:Darkdadaah/Listes/Mots_dump/frwiki/2016-02-03
       - All French words
         https://www.freelang.com/dictionnaire/dic-francais.php
       - ~336000 French words [currently used (filtered)]
         https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json

  en : - Most frequently used words
         https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english.txt
       - All English words [currently used (filtered)]
         https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt
*/

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log(`Expected arguments: input.txt output.txt`);
  process.exit(1);
}
const inputPath = args[0];
const outputPath = args[1];

const cleanWord = (word) => {
  return word
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Reading input file
const fs = require('fs');
const content = fs.readFileSync(inputPath).toString();

// Cleaning words (selecting five letter words only)
const words = content.split(/\r?\n/)
  .map(w => cleanWord(w))
  .filter(w => w.match(/^[A-Z]{5}$/));
const uniqueWords = [...new Set(words)];
console.log(`${uniqueWords.length} unique words: ${uniqueWords.slice(0, 10).join(', ')}...`)

// Writing resulting words to disk
const fileContent = uniqueWords.join('\n');
fs.writeFileSync(outputPath, fileContent);
