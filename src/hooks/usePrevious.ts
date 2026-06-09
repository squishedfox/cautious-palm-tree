import { useRef } from "react";

export const usePrevous = <T>(value: T) => {
  const current = useRef<T>(value);
  const prev = useRef<T | null>(null);

  if (current.current !== value) {
    prev.current = current.current;
    current.current = value;
  }

  return prev.current;
};
