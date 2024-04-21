import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SplashPage.css"

function SplashFoot({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);



  return (
    <>
    <div style={{ backgroundColor: "rgb(25, 25, 25)", gap: "0px"}} className="sp-foot">
        <div>
            <h1 style={{ fontSize: "16px", color: "white" }}>Popular Categories</h1>
        </div>
        <div onClick={(() => window.alert("Feature coming soon!"))} style={{ marginBottom: "40px"}}  id="foot-one">
            <span style={{ color: "rgb(196, 196, 196)"}}>
                <p>Alchol Delivery</p>
                <p>Back To School Delivery</p>
                <p>Beauty Stores</p>
                <p>Beauty Supplies</p>
                <p>Catering Near Me</p>
            </span>
            <span onClick={(() => window.alert("Feature coming soon!"))} style={{ color: "rgb(196, 196, 196)"}}>
                <p>Convenience Stores Canada</p>
                <p>Dashmart Near Me</p>
                <p>Deck The Doorstep</p>
                <p> Drugstores Canada</p>
                <p>Flower Delivery</p>
            </span>
            <span onClick={(() => window.alert("Feature coming soon!"))} style={{ color: "rgb(196, 196, 196)"}}>
                <p>Grocery Delivery Canada</p>
                <p>Halloween</p>
                <p>Medicine Delivery</p>
                <p>Pet Store Near Me</p>
                <p>Retail Stores Near Me</p>
            </span>
            <span onClick={(() => window.alert("Feature coming soon!"))} style={{ color: "rgb(196, 196, 196)"}}>
                <p>Seasonal Holidays </p>
                <p>Snap Ebt </p>
                <p>Valentines Day</p>
            </span>
        </div>
        <div>
{/*
        <div style={{ display: "flex", justifyContent: "space-between" }}>

        </div> */}
        <div onClick={(() => window.alert("Feature coming soon!"))} id="foot-two">
            <span>
                <h1 style={{ fontSize: "16px", color: "white" }}>Get To Know Us</h1>
                <p style={{ color: "rgb(196, 196, 196)"}}>About Us</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Careers</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Investors</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Company Blog</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Engineering Blog</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Merchant Blog</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Gift Cards</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Package Pickup</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Promotions</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Dasher Central</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>LinkedIn</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Glassdoor</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Accessibility</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Newsroom</p>
            </span>
            <span>
            <h1 style={{ fontSize: "16px", color: "white" }}>Let Us Help You</h1>
                <p style={{ color: "rgb(196, 196, 196)"}}>Account Details</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Order History</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Help</p>
            </span>
            <span>
            <h1 style={{ fontSize: "16px", color: "white" }}>Doing Businesses</h1>
                <p style={{ color: "rgb(196, 196, 196)"}}>Become a Dasher</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>List Your Business</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Get Dashers for Deliveries</p>
                <p style={{ color: "rgb(196, 196, 196)"}}>Get DoorDash for Business</p>
            </span>
        </div>
        <div onClick={(() => window.alert("Feature coming soon!"))} style={{ justifyContent: "flex-start"}} id="foot-three">
            <img src="https://www.pngall.com/wp-content/uploads/15/Door-Dash-Logo-PNG-Photo.png"></img>
            <span  style={{ color: "rgb(196, 196, 196)"}} id="ft-one">
            <p>Terms of Service</p>
            <p>Privacy</p>
            <p>Delivery Locations</p>
            <p>Do Not Sell or Share My Personal Information</p>
            <p>© 2024 DoorDash</p>
            </span>
            <button><i class="fi fi-rs-globe"></i>English (US)<i class="fi fi-rr-angle-small-down"></i></button>
            <span style={{ color: "rgb(196, 196, 196)"}} id="ft-two">
            <i class="fi fi-brands-facebook"></i>
            <i class="fi fi-brands-twitter"></i>
            <i class="fi fi-brands-instagram"></i>
            </span>
        </div>
        </div>
    </div>
    </>
  );
}

export default SplashFoot;
