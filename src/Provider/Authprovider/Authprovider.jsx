import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createContext } from "react";
import auth from "../../Firebase.init";

export const AuthContext = createContext();

const Authprovider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
     // google login
  const googlelogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // user logout function
  const userLogout = () => {
    return signOut(auth);
  };
  const authData = {
    name: "shuvo",
    googlelogin,
    userLogout,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
