import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Registration} from "./components/Auth/Registration";
import {Login} from "./components/Auth/Login";

function App(): JSX.Element {
  return (
      <>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Profile/>}/>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
      </>
  );
}

export default App;
