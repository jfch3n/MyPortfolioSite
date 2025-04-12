import useHover from "./useHover.jsx";
import { useState, useEffect } from "react";

function Link({
  Anchor, // href
  Cln, // className
  Col, // Color
  NewTab, // Boolean indicating if you should open in new tab
  Text, // text to display
  Ref, // ref to attach to DOM
  Sty, // Styles
  Func, // Function to pass into Link
  HandleClick, // custom handle click function
  Icon, // Icon to use with Link
  urlRef, // ref to use to scroll to areas of the page
}) {
  const [href, setHref] = useState({
    link: null,
    text: null,
  });

  const [hover, setHoverEffect, removeHoverEffect] = useHover();

  const spanStyle = {
    marginRight: "10px",
    textAlign: "left",
  };

  useEffect(() => {
    setHref((prevHref) => ({
      ...prevHref,
      link: Anchor,
      text: Text,
    }));
  }, []);

  // prevent default behavior of target element and scroll to it
  const scroll = (e) => {
    e.preventDefault();

    if (urlRef) {
      if (urlRef.current) {
        urlRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Scroll on to target element on click and call passed in Func
  const handleClick = (e) => {
    Func(e);
    scroll(e);
  };

  return (
    <a
      className={Cln}
      href={href.link}
      onClick={Func ? handleClick : HandleClick} // if Func is passed down give it the handleClick property
      onMouseEnter={setHoverEffect}
      onMouseLeave={removeHoverEffect}
      style={hover ? { ...Sty, color: Col } : Sty}
      target={NewTab ? "_blank" : null}
    >
      {Icon && (
        <span className={Cln} ref={Ref} style={spanStyle}>
          {Icon}
        </span>
      )}
      {href.text && href.link && href.text}
    </a>
  );
}

export default Link;
