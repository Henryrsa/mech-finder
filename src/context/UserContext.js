import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <UserContext.Provider value={[isSignedIn, setIsSignedIn]}>
      {props.children}
    </UserContext.Provider>
  );
};
