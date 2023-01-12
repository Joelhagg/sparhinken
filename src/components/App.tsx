import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./About/About";
import Bucket from "./Bucket/Bucket";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Nav from "./Nav/Nav";
import PasswordReset from "./PasswordReset/PasswordReset";
import Register from "./Register/Register";
import Settings from "./Settings/Settings";
import { Cookies } from "./Cookies/Cookies";
import "./App.css";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute";
import NotFound from "./NotFound/notFound";
import ForgotPassword from "./UpdateProfile/UpdateProfile";
import { AuthContext } from "../contexts/AuthContext";
import { StateContext } from "../contexts/StateProvider/StateProvider";
import UpdateProfile from "./UpdateProfile/UpdateProfile";

function App() {
  // const context = useContext(AuthContext);
  // console.log(context);

  // const contextState = useContext(StateContext);
  // console.log(contextState);

  // if (contextState.isLoggedin) {
  //   <Routes>
  //     <Route path="/" element={<About />} />
  //   </Routes>;
  // }
  return (
    <>
      <Nav />
      <AuthProvider>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/settings" element={<PrivateRoute />}>
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/bucket" element={<PrivateRoute />}>
              <Route path="/bucket" element={<Bucket />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/passwordReset" element={<PasswordReset />} />

            <Route path="/update-profile" element={<PrivateRoute />}>
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthProvider>
      <Footer />
      <Cookies />
    </>
  );
}

export default App;
