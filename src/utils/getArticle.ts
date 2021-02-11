function capitalizeArticle(article: string): string {
  return article.charAt(0).toUpperCase() + article.slice(1);
}

export default function (word: string, capitalize: boolean = false): string {
  const [firstLetter] = word;
  const article = /[a,e,i,o,u,h]/i.test(firstLetter) ? "an" : "a";

  return capitalize ? capitalizeArticle(article) : article;
}
