import useMediaQuery from "./useMediaQuery.jsx";
import { useEffect, useRef, useState } from "react";

function useLazyLoad(route, prop1, ref, arrRefs) {
  const components = useRef(route); // have components initialize to all component's paths of the webpage
  const [observer, setObserver] = useState(null); // initialize an observer
  const observerIsActive = useRef(true); // flag to make sure observer is not active when link is clicked
  const [currComponents, setCurrComponents] = useState([]); // tracks all current components rendered on webpage
  const [scroll, setScroll] = useState(false); // scroll function when a link is clicked
  const mediaQuery = useMediaQuery(); // media query for threshold of observer API
  const threshold = mediaQuery.size.height >= 320 ? 0.5 : 0.01; // threshold for observer API

  // helper function when called imports the path to a compoenent and then calls the component
  const importComponents = async (path, prop1, ref, urlRef, clickEl = null) => {
    const componentToImport = await import(path);
    let importHappened = false;
    let currComp = null;

    if (componentToImport) {
      // indicate that an import was made
      importHappened = true;

      // call the component
      currComp = (
        <componentToImport.default
          hrefs={prop1}
          HandleClick={clickEl}
          key={componentToImport.default.name}
          ref={ref}
          urlRef={urlRef}
          arrRefs={arrRefs}
        />
      );

      // remove the component from the stack
      const newRoute = components.current.slice(
        0,
        components.current.length - 1
      );

      // update the component to reflect change
      components.current = newRoute;

      // track current component
      setCurrComponents((prev) => [...prev, currComp]);
    }

    return [importHappened, currComp];
  };

  // helper function that checks to see if a nested array has an element
  const checkSubArrays = (arrWithNesteds, element) => {
    return arrWithNesteds.some((subArr) => {
      return Array.isArray(subArr) && subArr.includes(element); // nested array is an array and has the target element
    });
  };

  // helper function that returns the index of the nested array taht contains the targeted element
  const findTargetElementIndex = (arrWithNesteds, element) => {
    // loop through each nested array to see if targeted element is there
    for (let i = 0; i < arrWithNesteds.length; i++) {
      for (let j = 0; j < arrWithNesteds[i].length; j++) {
        if (arrWithNesteds[i][j] == element) {
          // return index
          return arrWithNesteds.indexOf(arrWithNesteds[i]);
        }
      }
    }

    // return -1 if an element is not there
    return -1;
  };

  // call components not already on page when clicking a link
  const callFunctionNotOnPage = async (e) => {
    e.preventDefault();

    // if Contact Information link is clicked and Contact component has not mounted (fixed issue where useUrl hook does work with COntact Information Link)
    if (
      e.target.textContent === "Contact Information" &&
      checkSubArrays(components.current, "./Contact.jsx")
    ) {
      // modify url
      const url = new URL(window.location.href);
      url.pathname = "home_Contact";
      window.history.pushState({}, "", url);
    }

    observerIsActive.current = false;

    let counter = 0;

    // create a copy of the current path array to get the position of the component in the array
    const copy = [...components.current];

    // the component that was clicked
    const clickedComponent = `./${e.target.hash.slice(1)}.jsx`;

    // get index of component
    const componentLength = findTargetElementIndex(
      copy.reverse(),
      clickedComponent
    );

    // only run if route is in the stack
    if (checkSubArrays(components.current, clickedComponent)) {
      while (counter <= componentLength) {
        const [importHappened, componentToLoad] = await importComponents(
          components.current[components.current.length - 1][0],
          prop1,
          ref,
          components.current[components.current.length - 1][1]
        );

        // if the import was succesful
        if (importHappened) {
          // set scroll to true so that when link is clicked it scrolls to the correct section
          setScroll(true);
          // increase counter
          counter++;
        } else {
          break;
        }
      }
    }

    observerIsActive.current = true;
  };

  // set up Observer Intersection API
  useEffect(() => {
    // if nothing is currently being observed
    if (!observer) {
      const IO = new IntersectionObserver(
        (entries) => {
          // loop through each entry value
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && observerIsActive.current) {
              // only import if there is anything left in the stack
              if (components.current.length > 0) {
                // import component
                await importComponents(
                  components.current[components.current.length - 1][0],
                  prop1,
                  ref,
                  components.current[components.current.length - 1][1],
                  callFunctionNotOnPage
                );
              }
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: threshold }
      );

      // have observer keep track of currently called component
      setObserver(IO);
    }

    // observe if and only if there is an observer and elementRef.current is attached to a DOM element
    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    // clean up if there exists an observer
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, components.current]);

  // scroll to area of webpage dictated by linked clicked in the NavBar initially when component is not rendered
  useEffect(() => {
    if (scroll) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setScroll(false);
    }
  }, [scroll]);

  // return a loading screen if no current component
  if (currComponents.length === 0) {
    return <div ref={ref}>Loading...</div>;
  }

  const showAllElements = currComponents.map((portion) => {
    return portion;
  });

  return showAllElements;
}

export default useLazyLoad;
