import React from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { Navigate } from "react-router-dom";

import { graphQLRequest } from "../utils/request";

function Login() {
  const auth = getAuth();

  // const navigate = useNavigate();
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    console.log(uid, displayName);
    const { data } = await graphQLRequest({
      query: `mutation Mutation($uid: String!, $name: String!) {
        register(uid: $uid, name: $name) {
          name
          uid
        }
      }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("register", { data });
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Typography variant="h5">Welcome to Note App</Typography>
      <Button onClick={handleLoginWithGoogle} variant="outlined">
        Login With Google
      </Button>
    </>
  );
}

export default Login;
