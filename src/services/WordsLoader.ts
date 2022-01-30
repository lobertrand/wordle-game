export const loadWords = async (language: "fr" | "en") => {
  const response = await fetch(
    `${process.env.BASE_URL}data/words-${language}-5.txt`
  );
  if (!response.ok) {
    console.warn(`Could not fetch words for language '${language}'`);
    return [];
  }
  const text = await response.text();
  const words = text.toUpperCase().split("\n");
  return words;
};
