import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Registration} from "./components/Auth/Registration";
import {Login} from "./components/Auth/Login";
import {News} from "./components/News/News";
import {MySubscriptions} from "./components/MySubscribtions/MySubscriptions";
import {EditProfile} from "./components/EditProfile/EditProfile";

function App(): JSX.Element {
  return (
      <>
          <Navbar/>
          <Routes>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/news" element={<News/>}/>
              <Route path="/mysubscriptions" element={<MySubscriptions/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route path="profile/edit" element={<EditProfile/>}/>
          </Routes>
      </>
  );
}

export default App;
