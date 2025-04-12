import useMediaQuery from "./useMediaQuery.jsx";
import { useEffect, useState } from "react";

function Title({ hrefs, ref, urlRef }) {
  const [refChange, setRefChange] = useState(false); // change ref of component
  const [mounted, setMounted] = useState(false); // has component mounted

  // media queries
  const mediaQuery = useMediaQuery();

  // determine image size and margin bottom of name element
  let imageSize = null;

  if (mediaQuery.size.width > 425 && mediaQuery.size.height > 430) {
    imageSize = "250px";
  } else if (mediaQuery.size.width > 425 && mediaQuery.size.height <= 430) {
    imageSize = "150px";
  } else if (mediaQuery.size.width <= 425 && mediaQuery.size.height > 430) {
    imageSize = "200px";
  } else if (mediaQuery.size.width <= 425 && mediaQuery.size.height <= 430) {
    imageSize = "130px";
  }

  // styles
  const image = {
    border: "solid white", // remove once you get image
    borderRadius: "50%",
    width: imageSize,
    height: imageSize,
    boxShadow: "100px 50px 0px #5885AF",
    marginBottom: "20px",
  };

  // Determine margin top based on screen size for the name text
  let nameMargin = null;

  if (mediaQuery.size.width > 1023 && mediaQuery.size.height > 430) {
    nameMargin = "100px";
  } else if (mediaQuery.size.height <= 430) {
    nameMargin = "10px";
  }

  const name = {
    marginRight: mediaQuery.isTablet || mediaQuery.isMobile ? "0px" : "150px",
    marginBottom: mediaQuery.size.height > 430 ? "80px" : "10px",
    marginTop: nameMargin,
  };

  const nameIntro = {
    fontSize: mediaQuery.isDesktop ? "3.2em" : "2.25em",
    color: "#274472",
  };

  const nameTitle = {
    fontSize: mediaQuery.isDesktop || mediaQuery.isTablet ? "1.17em" : "1em",
    color: "#274472",
  };

  const parent = {
    display: "flex",
    flexDirection: mediaQuery.size.width > 1023 ? "row" : "column",
    justifyContent: mediaQuery.size.width > 1023 ? "space-evenly" : "center",
    alignItems: "center",
    backgroundColor: "#C3E0E5",
    height: mediaQuery.size.height > 430 ? "100vh" : "125vh",
    width: "100vw",
    minWidth: "320px",
    minHeight: "550px",
    position: "relative",
  };

  // animation effect
  useEffect(() => {
    setMounted(true); // component has mounted -> fade in
  }, []);

  // change ref of this component
  useEffect(() => {
    if (ref.current && ref.current.id === "Title") {
      setRefChange(true);
    }
  });

  return (
    <div
      style={parent}
      id={hrefs.title.slice(1)}
      ref={refChange ? urlRef : ref}
    >
      <div className={mounted ? "fade" : ""} style={name}>
        <h1 style={nameIntro}>Hi, I'm Johnny</h1>
        <h3 style={nameTitle}>Aspiring Web Developer</h3>
      </div>
      <img
        className={mounted ? "fade" : ""}
        src={null}
        style={image}
        alt="selfPortrait"
      />
    </div>
  );
}

export default Title;
