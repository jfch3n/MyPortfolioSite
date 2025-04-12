import { useEffect, useState } from "react";

function useMediaQuery() {
  // check to see if windows object exist
  const isBrowserEnvironment = typeof window !== undefined;

  // initialize the size
  const [size, setSize] = useState(
    isBrowserEnvironment
      ? // if in browser environment use the current window size
        {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : // otherwse set initial height and width to 0
        { width: 0, height: 0 }
  );

  useEffect(() => {
    // "debounce" mechanism to make sure that the resize event is not constantly firing on resize.
    const debounce = (func, delay) => {
      // id to reference timeout
      let timeoutID = null;

      return (...args) => {
        // if timeout function exists
        if (timeoutID) {
          // clear the timeout
          clearTimeout(timeoutID);
        }

        // set timeout to a delay of a function call
        timeoutID = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    // resize function
    const resizeWindow = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    // add a resize event listener on mount
    window.addEventListener("resize", resizeWindow);

    // remove listener for clean up
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return {
    size: size, // size value
    isMobile: size.width <= 768, // mobile breakpoint
    isTablet: size.width > 768 && size.width <= 1024, // tablet breakpoint
    isDesktop: size.width > 1024, // desktop breakpoint
  };
}

export default useMediaQuery;
