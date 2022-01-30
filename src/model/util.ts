export const isCapitalLetter = (str: string): boolean =>
  str.length === 1 && str >= "A" && str <= "Z";

export const randomElement = function <T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
