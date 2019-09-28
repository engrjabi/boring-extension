import { useEffect, useLayoutEffect, useState } from "react";

export const DoSideEffectOnMount = ({ sideEffect }) => {
  useEffect(
    () => {
      (async () => {
        await sideEffect();
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

export function useWindowSize() {
  let [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([document.body.clientWidth, document.body.clientHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    setTimeout(updateSize, 50);
    setTimeout(updateSize, 100);
    setTimeout(updateSize, 150);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
