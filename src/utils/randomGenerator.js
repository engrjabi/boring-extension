export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export const getRandomImage = () => {
  const imageRepoURL = "https://robohash.org";
  return `${imageRepoURL}/${getRandomInt(1, 100000)}?size=140x140&set=any`;
};
