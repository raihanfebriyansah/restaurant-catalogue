export default function cutDescription(description, wordCount) {
  const word = description.split(' ');
  if (word.length > wordCount) {
    return `${word.slice(0, wordCount).join(' ')}...`;
  }
  return description;
}
