import React, { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import { CircularProgress } from "@mui/material";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
        if(user?.uid) {
          setUser(user);
          if(user.accessToken !== localStorage.getItem('accessToken')) {
            localStorage.setItem('accessToken',user.accessToken);
            window.location.reload();
          }
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setUser({})
        localStorage.clear();
        navigate('/login')
    }) 

    return () => {
        unsubcribed();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth])
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress/> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
