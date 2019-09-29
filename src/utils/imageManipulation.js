import _debounce from "lodash/debounce";
import { useState } from "react";
import _includes from "lodash/includes";
import _first from "lodash/first";
import _get from "lodash/get";
import { extractHostname } from "./extractor";

export const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export const getFavico = url =>
  fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const resultDocument = new DOMParser().parseFromString(
              reader.result,
              "text/html"
            );

            const favico = resultDocument.querySelector(
              "link[rel='shortcut icon'], link[rel='icon']"
            );

            const favicoHref = _get(favico, "attributes.href.value");

            if (favicoHref && !_includes(favicoHref, "://")) {
              const hostNameUrl = extractHostname(url);
              resolve(
                `${hostNameUrl}${
                  _first(favicoHref) === "/" ? "" : "/"
                }${favicoHref}`
              );
            }

            resolve(favicoHref);
          };
          reader.onerror = reject;
          reader.readAsText(blob);
        })
    );

export const debouncedSetImageData = _debounce(
  async (url, getImageData, formikSetFieldValue) => {
    const imgData = await getImageData(url);
    formikSetFieldValue("img", url);
    formikSetFieldValue("imgData", imgData);
  },
  500
);

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

export function useGetFavico() {
  const [loading, setLoading] = useState(false);

  const getFavicoCaller = async url => {
    setLoading(true);

    try {
      const dataUrl = await getFavico(url);
      setLoading(false);
      return dataUrl;
    } catch (e) {
      setLoading(false);
      return url;
    }
  };

  return [loading, getFavicoCaller];
}
