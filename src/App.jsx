import { Route, Routes } from "react-router-dom"
import Pnf from "./pages/Pnf";
import Dashboard from "./pages/Dashboard";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import {useContext, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/Themes";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import PodcastDetails from "./pages/PodcastDetails";
import DisplayPodcast from "./pages/DisplayPodcast";
import TokenAuth, { tokenContext } from "./contexts/TokenAuth";



const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;
function App() {
  // const { userLogin, setUserLogin } = useContext(loginContext);
  const { authorisedUser, setAuthorisedUser } = useContext(tokenContext);
  const [darkMode, setDarkMode] = useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [mainTheme,setMainTheme] = useState(darkTheme)

  const setTheme = ()=>{
    if(darkMode){
      setMainTheme(lightTheme)
      console.log(mainTheme);
      
    }else{
      setMainTheme(darkTheme)
      console.log(mainTheme);
    }}

  
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            mainTheme={mainTheme}
            setTheme={setTheme}
          />
          <div className="flex flex-col flex-1">
            <Nav mainTheme={mainTheme} />
            <Routes>
              <Route path="/" element={<Dashboard mainTheme={mainTheme} />} />
              <Route
                path="/search"
                element={<Search mainTheme={mainTheme} />}
              />
              { authorisedUser &&
                <>
                  <Route
                    path="/favourites"
                    element={<Favourites mainTheme={mainTheme} />}
                  />
                  <Route
                    path="/profile"
                    element={<Profile mainTheme={mainTheme} />}
                  />
                  <Route
                    path="/podcast/:id"
                    element={<PodcastDetails mainTheme={mainTheme} />}
                  />
                  <Route
                    path="/showpodcasts/:type"
                    element={<DisplayPodcast mainTheme={mainTheme} />}
                  />
                </>
              }
              <Route path="/*" element={<Pnf />} />
            </Routes>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App
