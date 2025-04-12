import { useState } from "react";

// custom hook to create hover effect
function useHover() {
  const [hover, setHover] = useState(false);

  // set hover state to true to indicate mouse is hovering a text
  const setHoverEffect = () => {
    setHover(true);
  };

  // set hover state to false to indicate mouse is not hovering text
  const removeHoverEffect = () => {
    setHover(false);
  };

  return [hover, setHoverEffect, removeHoverEffect];
}

export default useHover;
