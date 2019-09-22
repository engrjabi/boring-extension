import { useEffect } from "react";

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
