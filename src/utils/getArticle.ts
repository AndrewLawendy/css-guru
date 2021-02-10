export default function (word: string): "a" | "an" {
  const [firstLetter] = word;

  return /[a,e,i,o,u]/i.test(firstLetter) ? "an" : "a";
}
