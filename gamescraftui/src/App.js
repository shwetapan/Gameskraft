import { Route, Routes, useLocation } from "react-router";
import Sidebar from "./components/Pages/Sidebar";
import Home from "./components/Pages/Sidebar/Home";
import Community from "./components/Pages/Sidebar/Coomunity";
import NewsFeed from "./components/Pages/Sidebar/NewsFeed";
import UserProfile from "./components/Pages/Sidebar/UserProfile";
import Connections from "./components/Pages/Sidebar/Connections";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/Pages/Navbar/NavBar";
// import About from "./components/Pages/About"
// import Blog from './components/Pages/Blog'; 
// import Contact from './components/Pages/Contact'; // Assuming 'Contact' component is in a file named Contact.jsimport Contact from './Contact'; // Assuming 'Contact' component is in a file named Contact.js

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function App() {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <Sidebar />
      <Pages>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/newsfeed" element={<NewsFeed />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/connections" element={<Connections />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </AnimatePresence>
      </Pages>
    </>
  );
}

export default App;
