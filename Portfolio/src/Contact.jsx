import Link from "./Link.jsx";
import useMediaQuery from "./useMediaQuery.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useRef, useState, useEffect } from "react";

function Contact({ hrefs, ref, urlRef }) {
  const [refChange, setRefChange] = useState(false); // change ref of the component when true
  const [mounted, setMounted] = useState(false); // has component mounted

  // used to click pop up
  const [popUp, setPopup] = useState(false);

  // ref to hook onto email popup in DOM
  const popUpRef = useRef(null);

  // open email popup when click google link
  const openEmail = (e) => {
    setPopup(true);
  };

  // close email
  const closeEmail = () => {
    setPopup(false);
  };

  // close email when clicking on anything that is not the pop screen
  useEffect(() => {
    if (popUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popUp]);

  // media queries
  const mediaQuery = useMediaQuery();

  //styles
  const parent = {
    width: "100vw",
    height: "100vh",
    minWidth: "320px",
    minHeight: "600px",
    backgroundColor: "#274472",
    position: "relative",
    overflow: "hidden",
  };

  const contactHeading = {
    textAlign: "start",
    marginTop: "0px",
    marginLeft: "14px",
    paddingTop: "55px",
    color: "#D4F1F4",
  };

  const info = {
    textAlign: "start",
    lineHeight: "4.5",
    marginLeft: "14px",
    color: "#D4F1F4",
  };

  let iconSize = null; // control size of icon
  let leftPosition = null; // control position of socials bar
  let topPosition = null; // control position of socials bar

  if (mediaQuery.size.width <= 320) {
    iconSize = "40px";
    leftPosition = "13vw";
    topPosition = "380px";
  } else if (mediaQuery.size.width <= 425) {
    iconSize = "40px";
    leftPosition = "18vw";
    topPosition = "380px";
  } else if (mediaQuery.size.width <= 520) {
    iconSize = "50px";
    leftPosition = "18vw";
    topPosition = "381px";
  } else if (mediaQuery.size.width <= 768) {
    iconSize = "50px";
    leftPosition = "26.5vw";
    topPosition = "381px";
  } else if (mediaQuery.size.width <= 1024) {
    iconSize = "50px";
    leftPosition = "30vw";
    topPosition = "400px";
  } else {
    iconSize = "60px";
    leftPosition = "35vw";
    topPosition = "400px";
  }

  const socials = {
    position: "absolute",
    top: topPosition,
    left: leftPosition,
    padding: "15px 30px",
    display: "flex",
    alignItems: "center",
  };
  const icon = {
    paddingTop: "0px",
    paddingRight: "30px",
    fontSize: iconSize,
    cursor: "pointer",
    color: "#D4F1F4",
  };

  const email = {
    display: popUp ? "block" : "none",
    border: "thick double #05445E",
    borderRadius: "15px",
    position: "fixed",
    padding: "5vw",
    left: "50%",
    top: "50%",
    color: "black",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(195, 224, 229)",
    fontSize: mediaQuery.isDesktop ? "25px" : "16px",
  };

  const popUpShield = {
    display: popUp ? "block" : "none",
    width: "110vw",
    height: "110vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "fixed",
    bottom: "1px",
    minWidth: "320px",
  };

  // animation effect for pop up email
  useEffect(() => {
    setMounted((prev) => !prev);
  }, [popUp]);

  // chage ref for component
  useEffect(() => {
    if (ref.current && ref.current.id === "Contact") {
      setRefChange(true);
    }
  });

  return (
    <div
      id={hrefs.contact.slice(1)}
      ref={refChange ? urlRef : ref}
      style={parent}
    >
      <h1 className="headings" style={contactHeading}>
        Contact Me
      </h1>
      <p className="text_info" style={info}>
        Please feel free to reach out whether if you have a question, discuss a
        project, or want to collaborate! Looking forward to hear from you!
      </p>
      <div style={socials}>
        <Link
          Cln="googlePopup"
          Col="#31AA52"
          HandleClick={openEmail}
          Icon={
            <FontAwesomeIcon
              onClick={openEmail}
              icon={faGoogle}
              className="googlePopup"
            />
          }
          Sty={icon}
        />
        <Link
          Anchor="https://www.instagram.com/jfchen_13/"
          Col="#5D52CA"
          Icon={<FontAwesomeIcon icon={faInstagram} />}
          NewTab={true}
          Sty={icon}
        />
        <Link
          Anchor="https://github.com/jfch3n"
          Col="#161313"
          Icon={<FontAwesomeIcon icon={faGithub} />}
          NewTab={true}
          Sty={icon}
        />
      </div>
      <div
        className={mounted ? "fade" : ""}
        style={popUpShield}
        onClick={closeEmail}
      ></div>
      <div className={mounted ? "fade" : ""} ref={popUpRef}>
        <h3 style={email} className="emailText">
          Email: jfchen13@gmail.com
          <span style={{ display: "block" }}>
            (Click - tap if on mobile - anywhere outside of this box to close)
          </span>
        </h3>
      </div>
      {/* <InvisibleURLTracker parentId={hrefs.contact.slice(1)} ref={urlRef} /> */}
    </div>
  );
}

export default Contact;
