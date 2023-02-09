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
import ForgotPassword from "./UpdateProfile/UpdateProfile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import NotFound from "./NotFound/NotFound";
import Guide from "./Guide/Guide";
import Contact from "./Contact/Contact";
import StandFor from "./StandFor/StandFor";
import Terms from "./Terms/Terms";
import Jobs from "./Jobs/Jobs";
import "./App.scss";

import { StateContext } from "../contexts/StateProvider/StateProvider";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  useEffect(() => {
    document.title = "Sparhinken";
  }, []);

  const context = useContext(StateContext);

  // if user is logged in, access to these routes is enabled
  if (context.currentUser) {
    return (
      <div className="appWraper">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/guide" element={<Guide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/bucket/:bucketId" element={<Bucket />} />

            <Route path="/register" element={<Register />} />
            <Route path="/passwordReset" element={<PasswordReset />} />

            <Route path="/update-profile" element={<UpdateProfile />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/what-do-we-stand-for" element={<StandFor />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/jobs" element={<Jobs />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  // If not logged in these routes is open
  return (
    <>
      <div className="appWraper">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/guide" element={<Guide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/register" element={<Register />} />
            <Route path="/passwordReset" element={<PasswordReset />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/what-do-we-stand-for" element={<StandFor />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/jobs" element={<Jobs />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
