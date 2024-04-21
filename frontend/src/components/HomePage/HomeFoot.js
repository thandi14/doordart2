import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function HomeFoot({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);



  return (
    <>
    <div style={{ width: !sessionUser && "110%" }} className="sp-foot">
        <div>
        <div onClick={(() => window.alert("Feature coming soon!"))} id="foot-four">
            <span>
            <h1 style={{ fontSize: "16px", color: "black" }}>Get To Know Us</h1>
                <p>About Us</p>
                <p>Careers</p>
                <p>Investors</p>
                <p>Company Blog</p>
                <p>Engineering Blog</p>
                <p>Merchant Blog</p>
                <p>Gift Cards</p>
                <p>Package Pickup</p>
                <p>Promotions</p>
                <p>Dasher Central</p>
                <p>LinkedIn</p>
                <p>Glassdoor</p>
                <p>Accessibility</p>
                <p>Newsroom</p>
            </span>
            <span>
            <h1 style={{ fontSize: "16px", color: "black" }}>Let Us Help You</h1>
                <p>Account Details</p>
                <p>Order History</p>
                <p>Help</p>
            </span>
            <span>
            <h1 style={{ fontSize: "16px", color: "black" }}>Doing Businesses</h1>
                <p>Become a Dasher</p>
                <p>List Your Business</p>
                <p>Get Dashers for Deliveries</p>
                <p>Get DoorDash for Business</p>
            </span>
        </div>
        <div onClick={(() => window.alert("Feature coming soon!"))} id="foot-three">
            <div>
            <img src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
            <span id="ft-one">
            <p>Terms of Service</p>
            <p>Privacy</p>
            <p>Delivery Locations</p>
            <p>Do Not Sell or Share My Personal Information</p>
            <p>© 2024 DoorDash</p>
            </span>
            </div>
            <div style={{ justifyContent: "flex-end" }} >
            <span id="ft-two">
            <i class="fi fi-brands-facebook"></i>
            <i class="fi fi-brands-twitter"></i>
            <i class="fi fi-brands-instagram"></i>
            </span>
            </div>
        </div>
        </div>
    </div>
    </>
  );
}

export default HomeFoot;
