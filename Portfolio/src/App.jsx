import Portfolio from "./Portfolio.jsx";

import "./App.css";

function App() {
  // hrefs for each link in NavBar and id for each element
  const hrefs = {
    aboutMe: "#About",
    contact: "#Contact",
    projects: "#Projects",
    title: "#Title",
  };

  return (
    <>
      <Portfolio hrefs={hrefs} />
    </>
  );
}

export default App;
