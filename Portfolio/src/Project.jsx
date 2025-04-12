import useHover from "./useHover.jsx";
import useMediaQuery from "./useMediaQuery.jsx";

function Project({
  description,
  href,
  icon,
  project,
  sty,
  logoSty,
  titleSty,
  descSty,
}) {
  // create hovering effect
  const [hover, setHoverEffect, removeHoverEffect] = useHover();

  // animation when hovering project
  const hoverProject = () => {
    setHoverEffect();
  };

  // animation when leaving project element
  const unhoverProject = () => {
    removeHoverEffect();
  };

  return (
    <a
      href={href}
      onMouseEnter={hoverProject}
      onMouseLeave={unhoverProject}
      style={
        hover
          ? {
              ...sty,
              transform: "scale(1.2)",
              transition: "transform 0.5s ease",
            }
          : { ...sty, transform: "scale(1)", transition: "transform 0.5s ease" }
      }
      target="_blank"
    >
      {icon && <h1 style={logoSty}>{icon}</h1>}
      <h3 style={titleSty}>{project}</h3>
      <p style={descSty}>{description}</p>
    </a>
  );
}

export default Project;
