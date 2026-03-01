import { useCallback, useEffect, useRef } from "react";

export const useDebounce = <T,>(
  callback: (arg: T) => void,
  delay: number
): [(arg: T) => void, () => void] => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  const debounced = useCallback(
    (arg: T) => {
      cancel();
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        callbackRef.current(arg);
      }, delay);
    },
    [delay, cancel]
  );

  return [debounced, cancel];
};
