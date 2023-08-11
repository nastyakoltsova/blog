import {Sidebar} from "./components/SideBar/Sidebar";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Registration} from "./components/Auth/Registration";
import {Login} from "./components/Auth/Login";
import {News} from "./components/News/News";
import {MySubscriptions} from "./components/MySubscribtions/MySubscriptions";
import {EditProfile} from "./components/EditProfile/EditProfile";
import {ListOfSubscriptions} from "./components/ListOfSubscriptions/ListOfSubscriptions";
import {ListOfSubscribers} from "./components/ListOfSubscribers/ListOfSubscribers";
import {NavBar} from "./components/Navbar/NavBar";
import {useState} from "react";

function App(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    return (
        <>
            <NavBar/>
            <Sidebar isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} user = {user} setUser={setUser}/>
            <Routes>
                <Route path="/registration" element={<Registration setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}/>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/mysubscriptions" element={<MySubscriptions/>}/>
                <Route path="/subscriptions/list/:id" element={<ListOfSubscriptions/>}/>
                <Route path="/subscribers/list/:id" element={<ListOfSubscribers/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="profile/edit" element={<EditProfile/>}/>
            </Routes>
        </>
    );
}

export default App;
