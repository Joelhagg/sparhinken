import { onAuthStateChanged } from "firebase/auth";
import React, { useState, createContext, useEffect } from "react";
import { auth } from "../../firebase";

export const StateContext = createContext({
  currentUser: {
    email: "",
    displayName: "",
    uid: "",
  },
});

const StateProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const contextValue = {
    currentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <StateContext.Provider value={contextValue}>
      {!loading && children}
    </StateContext.Provider>
  );
};

export default StateProvider;
