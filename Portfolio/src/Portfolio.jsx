import BackToTop from "./BackToTop.jsx";
import useURLChange from "./useURLChange.jsx";
import useLazyLoad from "./useLazyLoad.jsx";
import { useState, useEffect, useRef } from "react";

function Portfolio({ hrefs }) {
  // refs used to keep track of what url should be displayed
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const NavBarRef = useRef(null);

  const arrRef = [titleRef, projectsRef, aboutRef, contactRef, NavBarRef];

  const route = [
    ["./Contact.jsx", contactRef],
    ["./About.jsx", aboutRef],
    ["./Projects.jsx", projectsRef],
    ["./Title.jsx", titleRef],
    ["./NavBar.jsx", NavBarRef],
  ];

  const elementRef = useRef(null); // a ref to keep track of element currently on screen

  const urlCurrentComp = useURLChange(
    titleRef,
    projectsRef,
    aboutRef,
    contactRef
  ); // change url pathname based on section of page user is on

  const viewPort = useLazyLoad(route, hrefs, elementRef, arrRef); // lazy load elements onto page

  // styles
  const backToTopBtn = {
    position: "fixed",
    bottom: "0px",
    left: "0vw",
    color: "black",
    textDecoration: "underline",
  };

  const footer = {
    position: "relative",
  };

  // useEffect(() => {
  //   // console.log(urlCurrentComp);
  //   // console.log(window.innerWidth, window.innerHeight);
  // });

  return (
    <>
      {viewPort}
      {/*only render back to top button as long as the current component is not title*/}
      {urlCurrentComp !== "/home_Title" && (
        <footer style={footer}>
          <BackToTop hrefs={hrefs} sty={backToTopBtn} urlRef={NavBarRef} />
        </footer>
      )}
    </>
  );
}

export default Portfolio;
