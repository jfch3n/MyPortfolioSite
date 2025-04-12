import useMediaQuery from "./useMediaQuery.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3,
  faHtml5,
  faJs,
  faPython,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function About({ hrefs, ref, urlRef }) {
  const [refChange, setRefChange] = useState(false);

  // media queries
  const mediaQuery = useMediaQuery();

  // styles
  const parent = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    minWidth: "320px",
    minHeight: "600px",
    backgroundColor: "#2E8BC0",
  };

  const text = {
    color: "#050A30",
  };

  const info = {
    textAlign: "justify",
    padding: "14px",
  };

  const skillsContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "space-between",
    width: "100%",
  };

  // icon sizes
  let iconSize = null;

  if (mediaQuery.isMobile) {
    iconSize = "25px";
  } else if (mediaQuery.isTablet) {
    iconSize = "64px";
  } else {
    iconSize = "5em";
  }

  const heading = {
    textAlign: "start",
    padding: "14px",
  };

  const skills = {
    textAlign: "start",
    marginLeft: "14px",
    color: "#050A30",
  };

  const icon = {
    margin: "0px",
    fontSize: iconSize,
  };

  const iconContainer = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    justifyItems: "center",
    margin: "20px 0px 30px 0px",
  };

  useEffect(() => {
    if (ref.current && ref.current.id === "About") {
      setRefChange(true);
    }
  });

  return (
    <div
      id={hrefs.aboutMe.slice(1)}
      style={parent}
      ref={refChange ? urlRef : ref}
    >
      <div style={text}>
        <h1 className="headings" style={heading}>
          About Me
        </h1>
        <p className="text_info" style={info}>
          As many of you may know, life is full of twists and turns. Sometimes
          you discover passions early on in life and other times passions may
          find you later down the road. The latter has happened to me with
          coding. My name is Johnny. I am currently aspiring to become a
          software developer with a concentration in web development. Web
          development not only satisfies my persistent desire to learn but also
          allows me to stay connected with my creative roots. When I am not
          coding, I enjoy working out, exploring nature, and - admittedly -
          playing the occasional video games. Please feel free to explore my
          portfolio. If you would like to collaborate, please reach out!
        </p>
      </div>
      <div style={skillsContainer}>
        <h1 className="headings" style={skills}>
          Technologies
        </h1>
        <div style={iconContainer}>
          <FontAwesomeIcon icon={faJs} style={{ ...icon, color: "#F1DD4E" }} />
          <FontAwesomeIcon
            icon={faPython}
            style={{ ...icon, color: "black" }}
          />
          <FontAwesomeIcon
            icon={faHtml5}
            style={{ ...icon, color: "#F06423" }}
          />
          <FontAwesomeIcon
            icon={faCss3}
            style={{ ...icon, color: "#EAEAEB" }}
          />
          <FontAwesomeIcon
            icon={faReact}
            style={{ ...icon, color: "#60D8F9" }}
          />
        </div>
      </div>
      {/* <InvisibleURLTracker parentId={hrefs.aboutMe.slice(1)} ref={urlRef} /> */}
    </div>
  );
}

export default About;
