import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "firebase-app/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState("");
  const values = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user?.uid)
      const colRef = doc(db,"users",user?.uid)
      getDoc(colRef).then((snapshot) => {
        setUserInfo({
          ...user,
          ...snapshot.data()
        });
      })
    });
  }, []);

  return (
    <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
