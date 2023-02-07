// import { onAuthStateChanged } from "firebase/auth";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase";

// const user = auth.currentUser;

// interface ContextProps {
//   user: object;
//   currentUser: any;
// }

// export const AuthContext = createContext<Partial<ContextProps>>({});

export const useAuth = () => {
  // return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  // const [currentUser, setCurrentUser] = useState(null as typeof user);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  // const value = {
  //   currentUser,
  // };

  return (
    <></>
    // <AuthContext.Provider value={value}>
    //   {!loading && children}
    // </AuthContext.Provider>
  );
};
