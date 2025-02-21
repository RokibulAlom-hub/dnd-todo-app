import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../Firebase.init";

export const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const [laoding, setLoading] = useState(true);
     // google login
  const googlelogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // user logout function
  const userLogout = () => {
    return signOut(auth);
  };
    // observer settings
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        // console.log("observer is watching you", currentuser);
        setUser(currentuser);
        setLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  const authData = {
    name: "shuvo",
    googlelogin,
    userLogout,
    laoding,
    user
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
