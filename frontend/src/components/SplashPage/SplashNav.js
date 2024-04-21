import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginForm";
import SignupFormModal from "../SignupForm";

function SplashNav({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [ hide, setHide ] = useState(false)


  window.addEventListener('scroll', function() {
    const element = document.getElementById('head-nav-two');
    const scrollAmount = 600; // Adjust this value as needed

    // Check if the user has scrolled past the specified amount
    if (window.scrollY > scrollAmount) {
        setHide(true);
    } else {
        setHide(false);
    }
  });

  let navTwo = hide ? "head-nav-two" : "hidden"

  return (
    <>
    <div id={navTwo}>
        <div>
            <img src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
            <h1 style={{ fontSize: "18px"}}>Doordart</h1>
        </div>
        <div>
            <div id="user-one">
            <OpenModalButton
            buttonText="Sign In"
            modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
            />
            </div>
        </div>
    </div>
    </>
  );
}

export default SplashNav;
