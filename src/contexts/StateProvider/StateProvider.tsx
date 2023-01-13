import { onAuthStateChanged, UserInfo } from "firebase/auth";
import React, { useState, createContext, useEffect } from "react";
import { auth } from "../../firebase";
import { User } from "firebase/auth";

export const StateContext = createContext({
  isLoggedin: false,
  currentUser: {
    email: "",
    displayName: "",
  },
});

const StateProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [currentUserEmail, setCurrentUserEmail] = useState<any>();

  const contextValue = {
    isLoggedin: false,
    currentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return unsubscribe;
  }, []);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
