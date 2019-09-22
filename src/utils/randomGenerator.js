import { toDataURL } from "./imageManipulation";

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export async function getRandomImage() {
  const imageRepoURL = "https://picsum.photos/240/180";
  const url = `${imageRepoURL}?sig=${getRandomInt(1, 10000)}`;
  const dataUrl = await toDataURL(url);

  return {
    url,
    dataUrl
  };
}
