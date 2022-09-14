import React from 'react'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {auth} from "../firebase/configrate";
const uiConfig = {
    // signInSuccessUrl: "/",
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
      },
    signInFlow: 'popup',
    signInOptions: [auth.GithubAuthProvider.PROVIDER_ID, auth.GoogleAuthProvider.PROVIDER_ID],
  };
export default function Login() {

  return (
    <div><StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /></div>
  )
}
