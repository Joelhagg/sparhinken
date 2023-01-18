import { onAuthStateChanged, UserInfo } from "firebase/auth";
import React, { useState, createContext, useEffect } from "react";
import { auth } from "../../firebase";

export const StateContext = createContext({
  isLoggedin: false,
  currentUser: {
    email: "",
    displayName: "",
    uid: "",
  },
});

const StateProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();

  const contextValue = {
    isLoggedin: false,
    currentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
