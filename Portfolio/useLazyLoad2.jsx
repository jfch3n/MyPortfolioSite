import { useEffect, useRef, useState } from "react";

function useLazyLoad(route, prop1, ref) {
  const components = useRef(route); // have components initialize to all component's paths of the webpage
  const [observer, setObserver] = useState(null); // initialize an observer
  const observerIsActive = useRef(true);
  const [currComponents, setCurrComponents] = useState([]);
  const [scroll, setScroll] = useState(false);

  // call components not already on page when clicking a link
  const callFunctionNotOnPage = async (e) => {
    observerIsActive.current = false;

    let counter = 0;
    const componentLength = components.current.indexOf(
      `./${e.target.hash.slice(1)}.jsx`
    );

    if (route.includes(`./${e.target.hash.slice(1)}.jsx`)) {
      // console.log("From onClick");

      while (counter < componentLength) {
        const loadComponent = await import(
          components.current[components.current.length - 1]
        );

        if (loadComponent) {
          // call the next compnent in the stack
          const currComp = (
            <loadComponent.default
              hrefs={prop1}
              key={loadComponent.default.name}
              ref={ref}
            />
          );

          // // increase the key
          // newKey++;

          // remove the component from the stack
          const newRoute = components.current.slice(
            0,
            components.current.length - 1
          );

          // update the component to reflect change
          components.current = newRoute;

          // track current component
          setCurrComponents((prev) => [...prev, currComp]);

          // set scroll to true so that when lin is clicked it scrolsl to the correct section
          setScroll(true);

          // increase counter
          counter++;

          // console.log("components from onClick: ", components.current);
          console.log(
            "counter: ",
            counter,
            "componentLength: ",
            componentLength
          );
        } else {
          break;
        }
      }
    }

    observerIsActive.current = true;
  };

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
                console.log("From IO");

                const loadComponent = await import(
                  components.current[components.current.length - 1]
                );

                if (loadComponent) {
                  // call the next compnent in the stack
                  const currComp = (
                    <loadComponent.default
                      hrefs={prop1}
                      HandleClick={callFunctionNotOnPage}
                      key={loadComponent.default.name}
                      ref={ref}
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
              }
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.5 }
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

  // scroll to area of webpage dictated by linked clicked in the NavBar
  useEffect(() => {
    if (scroll) {
      ref.current.scrollIntoView();
      setScroll(false);
    }
  }, [scroll]);

  useEffect(() => {
    console.log(
      "currComponents: ",
      currComponents,
      "VS components.current: ",
      components.current
    );
  });

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
