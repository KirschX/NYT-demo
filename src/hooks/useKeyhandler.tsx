import { useEffect } from "react";

function useKeyHandler(handler: () => void, key: string = "Escape") {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler();
      }
    };

    window.addEventListener("keyup", handleKeyPress);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [handler, key]);
}

export default useKeyHandler;
