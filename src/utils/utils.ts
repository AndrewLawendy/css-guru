export function capitalizePhrase(word: string): string {
  const firstLetter = word.charAt(0);
  if (firstLetter !== "{") {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else {
    return word.slice(0, 9) + word.charAt(9).toUpperCase() + word.slice(10);
  }
}

export function getArticle(
  word: string,
  capitalize = false,
  isCompound: boolean
): string {
  let article;
  if (word === "*") {
    article = isCompound ? "an" : "any";
  } else {
    const [firstLetter] = word;
    article = /[a,e,i,o,u,h]/i.test(firstLetter) ? "an" : "a";
  }

  return capitalize ? capitalizePhrase(article) : article;
}

export function assertString(str: unknown): asserts str is string {
  if (typeof str !== "string") {
    throw new Error(`${str} is not a string`);
  }
}

export function findLastIndex<T>(
  arr: T[],
  validateExpression: (el: T) => boolean
): number {
  for (let index = arr.length - 1; index >= 0; index--) {
    const element = arr[index];
    if (validateExpression(element)) {
      return index;
    }
  }

  return -1;
}
