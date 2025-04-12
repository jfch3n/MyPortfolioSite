import Link from "./Link.jsx";
import HoverIcon from "./hoverIcon.jsx";
import useMediaQuery from "./useMediaQuery.jsx";
import useHover from "./useHover.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCodeBranch,
  faEnvelope,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

function NavBar({ arrRefs, hrefs, ref, HandleClick }) {
  const [hover, setHoverEffect, removeHoverEffect] = useHover(); // hover effect for hamburger menu
  const [isVisible, setIsVisible] = useState(false); // visible state for hamburger menu
  const visibilityRef = useRef(isVisible); // visibility ref to aid changing state of hamburger menu
  const menuRef = useRef(null); // ref for the hamburger menu popup
  const [refChange, setRefChange] = useState(false); // use to change Ref for NavBar component
  const [mounted, setMounted] = useState(false); // did component mount

  // media queries
  const mediaQuery = useMediaQuery();

  // styles
  const grandParent = {
    display: "flex",
    width: "100vw",
    justifyContent: "end",
    alignItems: "end",
    backgroundColor: "white",
    borderRadius: "2.5px",
    boxShadow: "2px 1px 0px",
    rowGap: "100px",
    minWidth: "320px",
  };

  const parent = {
    display: "flex",
    alignItems: "stretch",
  };

  const logo = {
    color: "black",
    fontSize: "2.5rem",
    marginLeft: mediaQuery.size.width > 768 ? "90px" : "25px",
    marginRight: "auto",
    marginBottom: mediaQuery.isDesktop || mediaQuery.isTablet ? ".5px" : "15px",
    cursor: "pointer",
  };

  const linksNH = {
    marginLeft: "15px",
    fontSize: "20px",
    padding: "40px 5px 0px 30px",
    color: "#41729F",
  };

  const linksHM = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "2.5",
    color: "#41729F",
  };

  const hamburgerMenu = {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "end",
    margin: "20px 40px 20.105px 0px",
    border: "solid gray",
    borderRadius: "5px",
    padding: "0px 5px",
    position: "relative",
  };

  const hamburgerMenuHover = {
    ...hamburgerMenu,
    backgroundColor: "blue",
    cursor: "pointer",
    userSelect: "none",
  };

  const line = {
    color: "black",
    padding: "0px",
  };

  const topLine = {
    ...line,
    marginBottom: "-33.97px",
    marginTop: "-14.97px",
    paddingTop: "2px",
  };

  const bottomLine = {
    ...line,
    marginTop: "-33.97px",
    marginBottom: "2px",
    paddingBottom: "2px",
  };

  let options = {
    display: isVisible ? "flex" : "none",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    border: "solid black",
    position: "absolute",
    top: "35.75px",
    listStyle: "none",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "5px 10px 15px 10px",
    height: "150px",
    lineHeight: "2.75",
    zIndex: "5",
  };

  // toggle the hamburger menu
  const removeVisibility = (e) => {
    const menuChildren = menuRef.current ? [...menuRef.current.children] : null;

    // if the item clicked on is the hamburger menu
    if (
      e.target === menuRef.current ||
      (menuChildren && menuChildren.includes(e.target))
    ) {
      // make the hamburger menu visible
      setIsVisible((prev) => !prev);
    }

    // if the item clicked on is not the hamburger menu
    if (
      menuRef.current &&
      menuChildren &&
      !menuChildren.includes(e.target) &&
      e.target !== menuRef.current
    ) {
      // if the menu is visible
      if (visibilityRef.current) {
        // make the menu disappear
        setIsVisible((prev) => !prev);
      }
    }
  };

  //  change value of  the visibility Ref to the state of isVisible any time isVisible changes
  useEffect(() => {
    visibilityRef.current = isVisible;
  }, [isVisible]);

  // add removeVisibility onMount
  useEffect(() => {
    window.addEventListener("click", removeVisibility);
    setMounted(true);

    // clean up function
    return () => window.removeEventListener("click", removeVisibility);
  }, []);

  // reset isVisible to false whenever the window resizes
  useEffect(() => {
    if (mediaQuery.isTablet || mediaQuery.isDesktop) {
      setIsVisible(false);
    }
  }, [mediaQuery.size]);

  // change ref when elementRef is off of nav bar
  useEffect(() => {
    if (ref.current && ref.current.id === "NavBar") {
      setRefChange(true);
    }
  });

  return (
    <nav id="NavBar" style={grandParent} ref={refChange ? arrRefs[4] : ref}>
      {mediaQuery.isTablet || mediaQuery.isDesktop ? (
        <>
          <HoverIcon
            cln={mounted ? "fade" : ""}
            icon={faCodeBranch}
            sty={logo}
          />
          <div className={mounted ? "fade" : ""} style={parent}>
            <Link
              Anchor={hrefs.projects}
              Func={HandleClick}
              Sty={linksNH}
              Text="Projects"
              urlRef={arrRefs[1]}
            />
            <Link
              Anchor={hrefs.aboutMe}
              Func={HandleClick}
              Sty={linksNH}
              Text="About me"
              urlRef={arrRefs[2]}
            />
            <Link
              Anchor={hrefs.contact}
              Func={HandleClick}
              Sty={linksNH}
              Text="Contact Information"
              urlRef={arrRefs[3]}
            />
          </div>
        </>
      ) : (
        <>
          <HoverIcon
            cln={mounted ? "fade" : ""}
            icon={faCodeBranch}
            sty={logo}
          />
          <div
            className={mounted ? "fade" : ""}
            style={hover ? hamburgerMenuHover : hamburgerMenu}
            ref={menuRef}
            onMouseEnter={setHoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            <p style={topLine}>___</p>
            <p style={line}>___</p>
            <p style={bottomLine}>___</p>
          </div>
          <menu style={options}>
            <li>
              <Link
                Anchor={hrefs.projects}
                Func={HandleClick}
                Icon={<FontAwesomeIcon icon={faFolder} />}
                Sty={linksHM}
                Text="Projects"
                urlRef={arrRefs[1]}
              />
            </li>
            <li>
              <Link
                Anchor={hrefs.aboutMe}
                Func={HandleClick}
                Icon={<FontAwesomeIcon icon={faCircleInfo} />}
                Sty={linksHM}
                Text="About me"
                urlRef={arrRefs[2]}
              />
            </li>
            <li>
              <Link
                Anchor={hrefs.contact}
                Func={HandleClick}
                Icon={<FontAwesomeIcon icon={faEnvelope} />}
                Sty={linksHM}
                Text={"Contact Information"}
                urlRef={arrRefs[3]}
              />
            </li>
          </menu>
        </>
      )}
    </nav>
  );
}

export default NavBar;
