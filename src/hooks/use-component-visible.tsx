import { useState, useEffect, useRef } from "react";

export const useComponentVisible = (initialVisible: boolean) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (ref.current?.contains(event.target as Node)) {
        return;
      }

      setIsVisible(false);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isVisible]);

  return { ref, isVisible, setIsVisible };
};
