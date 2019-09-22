import { toDataURL } from "./imageManipulation";
import { useState } from "react";

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export const getRandomImage = () => {
  const imageRepoURL = "https://picsum.photos/240/180";
  return `${imageRepoURL}?sig=${getRandomInt(1, 10000)}`;
};

export function useGetImageData() {
  const [loading, setLoading] = useState(false);

  const getImageData = async url => {
    setLoading(true);

    try {
      const dataUrl = await toDataURL(url);
      setLoading(false);
      return dataUrl;
    } catch (e) {
      setLoading(false);
      return url;
    }
  };

  return [loading, getImageData];
}
