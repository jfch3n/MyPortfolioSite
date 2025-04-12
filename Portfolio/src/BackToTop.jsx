import Link from "./Link.jsx";

function BackToTop({ sty, urlRef }) {
  // scroll to top of page
  const scroll = (e) => {
    e.preventDefault();

    if (urlRef) {
      if (urlRef.current) {
        urlRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <Link
      Anchor="#NavBar"
      Col={"whitesmoke"}
      Text={"Back to Top"}
      Sty={sty}
      urlRef={urlRef}
      HandleClick={scroll}
    />
  );
}

export default BackToTop;
