import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SignupFormModal from "../SignupForm";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginForm";
import { useFilters } from "../../context/Filters";

function Profile({ user, d }) {
  const dispatch = useDispatch();
  const [ drop, setDrop ] = useState(d)
  const history = useHistory()
  const { setModalContent } = useModal()
  const { setProfile } = useFilters()
  const targetRef = useRef()

  useEffect(() => {

    const handleDocumentClick = (event) => {

        if ((targetRef.current && !targetRef.current.contains(event.target))) {
                    setProfile(false);
            }

        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };



    }, []);


  useEffect(() => {
      setDrop(d)
  }, [d])


  const logout = (e) => {
    e.stopPropagation();
    history.push('/')
    dispatch(sessionActions.logout());
  };



  const ulClassName = drop ? "" : "hidden";

  return (
    <div ref={targetRef} style={{ height: user.id ? "600" : "100%"}} className={ulClassName} id="profile-menu">
      <div style={{position: "absolute"}}>
      <div id="close-a">
      <h1 id="acc-sett">Account</h1>
      </div>
      <div className="profile">
        {/* <span>
        <i class="fi fi-rs-shopping-bag"></i>
        <p>Pickup</p>
        </span> */}
        <span>
        <i class="fi fi-sr-tags"></i>
        <p>Offers</p>
        </span>
        <div id="line-three"></div>
        <span>
        <i class="fi fi-rr-receipt"></i>
        <p>Orders</p>
        </span>
      { user &&
        <>
        <div id="line-three"></div>
        <span onClick={((e) => {
            e.stopPropagation()
            history.push(`/restaurants/saves`)})}>
           <i class="fi fi-rs-heart" ></i>
          <p>Saved Stores</p>
        </span>
        <div id="line-three"></div>
        <span>
        <i class="fi fi-rr-life-ring"></i>
        <p>Help</p>
        </span>
        <div id="line-three"></div>
        <span>
          <i class="fi fi-rr-credit-card"></i>
          <p>Gift Card</p>
        </span>
      </>
        }
        {/* <p>Get $0 delivery fees</p> */}
        {/* <p>DoorDash Rewards Mastercard®<br></br>
        Get 4% cash back and 1 year of DashPass</p> */}
        <div id="divider"></div>
        <h1 id="acc-sett">Account Settings</h1>
        <span>
        <div id="acc">
            <p style={{ fontSize: "16px", fontWeight: "500"}}>Account</p>
            <p style={{ fontSize: "12px", color: "#767676"}}>{user.firstName} {user.lastName}</p>
        </div>
        </span>
        <span>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Payment</p>
        </span>
        <span style={{ justifyContent: "space-between"}}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Language</p>
        <div>
        <button id="english"><i class="fi fi-rs-globe"></i>English (US)<i class="fi fi-rr-angle-small-down"></i></button>
        </div>
        </span>
        <span onClick={logout}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Sign Out</p>
        </span>
        {/* <span>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Engineering Blog</p>
        </span>
        <span>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Accessibility</p>
        </span>
        <span>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Be a Dasher</p>
        </span>
        <span>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Be a Partner Restaurant</p>
        </span>
        <span>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Dashers for Deliveries</p>
        </span>
        <span>
        <p style={{ fontSize: "16px"}}>////</p>
        </span> */}
      </div>
    </div>
      </div>
  );
}

export default Profile;
