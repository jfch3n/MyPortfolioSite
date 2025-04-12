import useMediaQuery from "./useMediaQuery.jsx";
import { useState, useEffect } from "react";

function useURLChange(titleRef, projectsRef, aboutRef, contactRef) {
  const [observer, setObserver] = useState(null);
  const [currentComp, setCurrComp] = useState(null);
  const mediaQuery = useMediaQuery(); // media query
  const threshold = mediaQuery.size.height <= 425 ? 0 : 0.75;

  useEffect(() => {
    // set initial url as the title
    const Url = new URL(window.location.href);
    Url.pathname = "./Title";

    // if observer does not exist
    if (!observer) {
      // create new observer
      const urlWatcher = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // create an instance of URL with the current href
              const newUrl = new URL(window.location.href);

              newUrl.pathname = `/home_${entry.target.id}`;

              // push url into the history stack
              window.history.pushState({}, "", newUrl);

              // store current component inside a variable to return later
              setCurrComp(newUrl.pathname);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: threshold,
        }
      );

      setObserver(urlWatcher);
    }

    // if observer and DOM element exists, have observer observe it
    if (observer && titleRef.current) {
      observer.observe(titleRef.current);
    }
    if (observer && projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    if (observer && aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (observer && contactRef.current) {
      observer.observe(contactRef.current);
    }

    // cleanup function
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, [
    observer,
    titleRef.current,
    aboutRef.current,
    projectsRef.current,
    contactRef.current,
  ]);

  return currentComp;
}

export default useURLChange;
