import { onAuthStateChanged } from "firebase/auth";
import React, { useState, createContext, useEffect } from "react";
import { auth } from "../../firebase";

export const StateContext = createContext({
  isLoggedin: false,
  currentUser: {
    email: "",
    displayName: "",
  },
  currentUserEmail: "",
});

const StateProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [currentUserEmail, setCurrentUserEmail] = useState<any>();

  const contextValue = {
    isLoggedin: false,
    currentUser,
    currentUserEmail: currentUserEmail,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email);

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
