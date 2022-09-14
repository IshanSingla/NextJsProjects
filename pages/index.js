import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/configrate";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { fetchUser, userAccessToken } from "../utils/fetch";
const axios = require("axios");

export default function Home() {
  const provider = new GoogleAuthProvider();
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState("");
  const [UserNames, setUserNames] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(null); // Local signed-in state.

  useEffect(() => {
    try {
      const accessToken = userAccessToken();
      if (!accessToken) return setIsSignedIn(null);
      else {
        const [userInfo] = fetchUser();
        if (userInfo.email.includes("@chitkara.edu.in")) {
          setIsSignedIn(userInfo[0]);
        } else {
          localStorage.clear();
          setMessage("Please Login with Chitkara University Email");
          setShowModal(true);
        }
      }
    } catch (error) {
      setMessage(error.message);
      setShowModal(true);
    }
  }, []);

  const signIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const { refreshToken, providerData } = user;
      localStorage.setItem("user", JSON.stringify(providerData));
      localStorage.setItem("accessToken", JSON.stringify(refreshToken));
      if (providerData[0].email.includes("@chitkara.edu.in")) {
        setIsSignedIn(providerData[0]);
      } else {
        localStorage.clear();
        setMessage("Please Login with Chitkara University Email");
        setShowModal(true);
      }
    } catch (error) {
      setMessage(error.message);
      setShowModal(true);
    }
  };

  // Create document function
  const addUserNamesDocument = async () => {
    try {
      if (isSignedIn) {
        await setDoc(doc(db, "UserNames", isSignedIn.uid), { UserNames });
        setShowModal(true);
        setMessage("Data Added Successfully");
        const response = await axios.get(
          `https://education.github.com/student/verify/generate?school_id=${process.env.SCHOOLID}&student_id=${UserNames}&secret_key=${process.env.SECRETKEY}`
        );
        setMessage(
          `Application Submitted Successfully \n Check your Email\n ${response.data}`
        );
      }
    } catch (error) {
      if (error.message == "Missing or insufficient permissions.") {
        setMessage("You Already has Submited One Response");
        setShowModal(true);
      } else {
        setMessage(error.message);
        setShowModal(true);
      }
    }
  };

  return (
    <section className="text-white body-font mt-2 mx-2">
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex items-center justify-center">
                  <div className="mt-2 text-center">
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      {Message}
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-500 rounded-md outline-none "
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">
            Chitkara University Github Education Pro Portal
          </h1>
          <p className="leading-relaxed mt-4">
            Chitkara University Github Education Pro Portal
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 border-blue-500 border-2">
          <h2 className="text-black text-lg font-medium title-font mb-5 text-center">
            Apply For Github Education Pro
          </h2>
          <div className="flex flex-row items-center justify-center self-center lg:justify-start">
            <p className="text-base mb-0 mr-4 bg-blue-500 rounded-sm py-2 px-3 ">
              {isSignedIn ? (
                "Welcome " + isSignedIn.displayName
              ) : (
                <button
                  onClick={signIn}
                  className="text-white flex items-center justify-center bg-blue-500 border-0 py-2 px-3 focus:outline-none  rounded text-base"
                >
                  <img
                    className="w-1/6  mr-4"
                    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                  ></img>
                  <a className="flex row gap-3">Connect With College Mail</a>
                </button>
              )}
            </p>
          </div>
          <div className="relative mb-4 mt-2">
            <label className="leading-7 text-sm text-gray-600">
              GitHub Username
              <a className="ml-2" style={{ fontSize: "10px", color: "red" }}>
                (Account on College Mail*)
              </a>
            </label>
            <input
              value={UserNames}
              type="text"
              onChange={(e) => setUserNames(e.target.value)}
              placeholder="eg: IshanSingla"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
            type="submit"
            onClick={addUserNamesDocument}
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}
