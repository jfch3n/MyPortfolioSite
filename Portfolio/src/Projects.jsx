import Project from "./Project.jsx";
import useMediaQuery from "./useMediaQuery.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faListCheck,
  faRoute,
  faFileCode,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Projects({ hrefs, ref, urlRef }) {
  const [refChange, setRefChange] = useState(false); //  change ref of component

  // media queries
  const mediaQuery = useMediaQuery();

  // styles
  const grandParent = {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    height: "110vh",
    width: "100vw",
    backgroundColor: "#050A30",
    minWidth: "320px",
    minHeight: "640px",
    overflow: "hidden",
  };

  const parent = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    justifyItems: "center",
    alignItems: "center",
    gap: "20px 0px",
    marginTop:
      mediaQuery.size.width > 633 && mediaQuery.size.height > 430
        ? "4.7em"
        : "0px",
  };

  const projectCard = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    cursor: "pointer",
    width: "10vw",
    height: mediaQuery.isDesktop ? "25vh" : "20vh",
    minHeight: "100px",
    color: "white",
  };

  // determine row for the last item
  let rowOfGrid = null;

  if (
    (mediaQuery.size.width >= 633 && mediaQuery.size.height <= 430) ||
    (mediaQuery.size.width >= 634 && mediaQuery.size.height > 430)
  ) {
    rowOfGrid = "1";
  } else {
    rowOfGrid = "2";
  }

  const firstItem = {
    ...projectCard,
    gridRow: "1",
    gridColumn: "1 / 1",
  };

  const secondItem = {
    ...projectCard,
    gridRow: "1",
    gridColumn: mediaQuery.size.width < 633 ? "3 / 4" : "2 / 2",
  };

  const thirdItem = {
    ...projectCard,
    gridColumn:
      mediaQuery.isDesktop || mediaQuery.size.width > 633 ? "3 / 4" : "1 / 1",
    gridRow: rowOfGrid,
    marginLeft: "5px",
    marginTop: mediaQuery.isMobile ? "55px" : "100px",
  };

  const lastitem = {
    ...projectCard,
    gridRow: rowOfGrid,
    gridColumn: mediaQuery.size.width < 633 ? "3 / 4" : "4 / 4",
  };

  const title = {
    margin: "30px 0px 30px 20px",
    textAlign: "start",
  };

  // style for fonts
  let sizeOfIcon = null;
  let sizeOfTitle = null;
  let sizeOfColDesc = null;
  let sizeOfColTitle = null;

  if (mediaQuery.isMobile) {
    sizeOfIcon = "1rem";
    sizeOfTitle = "0.7rem";
    sizeOfColDesc = "0.4rem";
    sizeOfColTitle = "0.35rem";
  } else if (mediaQuery.isTablet) {
    sizeOfIcon = "2rem";
    sizeOfTitle = "1rem";
    sizeOfColDesc = "0.55rem";
    sizeOfColTitle = "0.8rem";
  } else if (mediaQuery.isDesktop) {
    sizeOfIcon = "3rem";
    sizeOfTitle = "1.35rem";
    sizeOfColDesc = "0.7rem";
    sizeOfColTitle = "1rem";
  }

  const projectIcon = {
    fontSize: sizeOfIcon,
    width: "10em",
  };

  const projectTitle = {
    fontSize: sizeOfTitle,
  };

  const projectDescription = {
    fontSize: mediaQuery.isMobile ? "0.5rem" : "1rem",
    width: "10em",
    marginBottom: "10px",
  };

  useEffect(() => {
    if (ref.current && ref.current.id === "Projects") {
      setRefChange(true);
    }
  });

  return (
    <div
      id={hrefs.projects.slice(1)}
      style={grandParent}
      ref={refChange ? urlRef : ref}
    >
      <h1 className="headings" style={title}>
        My Projects
      </h1>
      <div style={parent}>
        <Project
          description="A to do list to keep track what needs to be done"
          icon={<FontAwesomeIcon icon={faListCheck} />}
          logoSty={projectIcon}
          titleSty={projectTitle}
          descSty={projectDescription}
          sty={firstItem}
          project="To Do List"
        />
        <Project
          description="Sample React router to simulate a website"
          icon={<FontAwesomeIcon icon={faRoute} />}
          logoSty={projectIcon}
          titleSty={projectTitle}
          descSty={projectDescription}
          sty={secondItem}
          project="Browser Router"
        />
        <Project
          description="A peer's portfolio page made with React adapted from traditional html/CSS/JS"
          icon={<FontAwesomeIcon icon={faCode} />}
          href={"https://elements6007.com/home"}
          logoSty={projectIcon}
          titleSty={projectTitle}
          descSty={projectDescription}
          sty={thirdItem}
          project="Colleague's Portfolio Site"
        />
        <Project
          description="My portfolio's source code"
          icon={<FontAwesomeIcon icon={faFileCode} />}
          href=""
          logoSty={projectIcon}
          titleSty={projectTitle}
          descSty={projectDescription}
          sty={lastitem}
          project="This Site"
        />
      </div>
      {/* <InvisibleURLTracker parentId={hrefs.projects.slice(1)} ref={urlRef} /> */}
    </div>
  );
}

export default Projects;
