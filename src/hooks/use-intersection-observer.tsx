import { useEffect, useState, type RefObject } from "react";

type UseIntersectionObserverOptions = {
  root?: RefObject<Element | null>;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export const useIntersectionObserver = (
  elementRef: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {}
): boolean => {
  const { root, rootMargin = "50px", threshold = 0, once = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const rootElement = root?.current ?? null;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!once) {
            setIsIntersecting(false);
          }

          return;
        }
        setIsIntersecting(true);
        if (once) {
          observer.disconnect();
        }
      },
      { root: rootElement, rootMargin, threshold }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, root, rootMargin, threshold, once]);

  return isIntersecting;
};
