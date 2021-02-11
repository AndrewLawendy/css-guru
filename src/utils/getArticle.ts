function capitalizeArticle(article: string): string {
  return article.charAt(0).toUpperCase() + article.slice(1);
}

export default function (
  word: string,
  capitalize: boolean = false,
  isCompound: boolean
): string {
  let article;
  if (word === "*") {
    article = isCompound ? "an" : "any";
  } else {
    const [firstLetter] = word;
    article = /[a,e,i,o,u,h]/i.test(firstLetter) ? "an" : "a";
  }

  return capitalize ? capitalizeArticle(article) : article;
}
