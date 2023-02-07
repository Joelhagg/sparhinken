import React, { useContext, useEffect } from "react";
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
import "./App.scss";
// import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute";
import ForgotPassword from "./UpdateProfile/UpdateProfile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import NotFound from "./NotFound/NotFound";
import Guide from "./Guide/Guide";
import Contact from "./Contact/Contact";
import StandFor from "./StandFor/StandFor";
import Terms from "./Terms/Terms";
import Jobs from "./Jobs/Jobs";

import "react-tooltip/dist/react-tooltip.css";

function App() {
  useEffect(() => {
    document.title = "Sparhinken";
  }, []);

  return (
    <>
      <div className="appWraper">
        <Nav />
        {/* <AuthProvider> */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/settings" element={<PrivateRoute />}>
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/guide" element={<Guide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/bucket" element={<PrivateRoute />}>
              <Route path="/bucket/:bucketId" element={<Bucket />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/passwordReset" element={<PasswordReset />} />

            <Route path="/update-profile" element={<PrivateRoute />}>
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/what-do-we-stand-for" element={<StandFor />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/jobs" element={<Jobs />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </main>
        {/* </AuthProvider> */}
        <Footer />
      </div>
    </>
  );
}

export default App;
