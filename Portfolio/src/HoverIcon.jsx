import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHover from "./useHover.jsx";

function HoverIcon({ cln, icon, sty }) {
  const [hover, setHoverEffect, removeHoverEffect] = useHover(); // create hover effect

  return (
    <div
      className={cln}
      onMouseEnter={setHoverEffect}
      onMouseLeave={removeHoverEffect}
      style={sty}
    >
      <FontAwesomeIcon icon={icon} {...(hover ? { beatFade: true } : {})} />
    </div>
  );
}

export default HoverIcon;
