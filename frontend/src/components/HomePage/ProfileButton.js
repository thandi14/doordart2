import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SignupFormModal from "../SignupForm";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginForm";
import { useFilters } from "../../context/Filters";

function ProfileButton({ user, d }) {
  const dispatch = useDispatch();
  const [ drop, setDrop ] = useState(d)
  const history = useHistory()
  const { setModalContent } = useModal()


  useEffect(() => {
      setDrop(d)
  }, [d])


  const logout = (e) => {
    e.preventDefault();
    history.push('/')
    dispatch(sessionActions.logout());
  };

  const ulClassName = drop ? "" : "hidden";

  return (
    <div className={ulClassName} id="profile-menu">
      <div style={{position: "absolute"}}>
      <div id="close">
      <i onClick={(() => {
        setDrop(false)
      })} class="fi fi-br-cross"></i>
      </div>
      <div onClick={(() => window.alert("Feature coming soon"))} style={{ height: user?.id ? "600px" : "100vh"}}  className="profile">
       <span onClick={((e) => {
        e.stopPropagation()
        history.push('/home')})}>
        <i class="fi fi-rs-house-chimney"></i>
        <p>Home</p>
        </span>
        <div id="line-three"></div>
        <span>
        <i class="fi fi-rs-shopping-bag"></i>
        <p>Pickup</p>
        </span>
        <div id="line-three"></div>
        <span>
        <i class="fi fi-sr-tags"></i>
        <p>Offers</p>
        </span>
        <div id="line-three"></div>
        <span>
        <i class="fi fi-rr-receipt"></i>
        <p>Orders</p>
        </span>
        <div id="line-three"></div>
        { !user &&
        <>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <i class="fi fi-rr-life-ring"></i>
        <p>Help</p>
        </span>
        <div id="line-three"></div>
        </>
        }
        <span>
        <i class="fi fi-br-clipboard-user"></i>
        <div id="acc">
        { !user && <p onClick={((e) => {
          e.stopPropagation()
                setModalContent(<LoginFormModal />)
              })}>Sign Up or Sign In</p>}
        { user &&
          <>
          <p>Account</p>
        <p style={{ fontSize: "14px", color: "#767676"}}>Thandi Mpofu</p>
          </>
        }
        </div>
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
        <span onClick={(() => window.alert("Feature coming soon"))}>
          <i class="fi fi-rs-money-bill-wave"></i>
          <p>Payment</p>
        </span>
        <div id="line-three"></div>
        <span onClick={(() => window.alert("Feature coming soon"))}>
          <i class="fi fi-rr-credit-card"></i>
          <p>Gift Card</p>
        </span>
        <div id="line-three"></div>
      </>
        }
        {/* <p>Get $0 delivery fees</p> */}
        {/* <p>DoorDash Rewards Mastercard®<br></br>
        Get 4% cash back and 1 year of DashPass</p> */}
        {user &&
        <>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <i class="fi fi-rr-life-ring"></i>
        <p>Help</p>
        </span>
        <div id="line-three"></div>
        <span onClick={logout}>
        <i class="fi fi-rr-cross-circle"></i>
        <p>Sign Out</p>
        </span>
        </>}
        <div id="divider"></div>
        <div onClick={(() => window.alert("Feature coming soon"))} style={{ padding: "16px"}}>
        <button id="english"><i class="fi fi-rs-globe"></i>English (US)<i class="fi fi-rr-angle-small-down"></i></button>
        </div>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>About Us</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Careers</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>DoorDash Newsroom</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>About Engineering</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Engineering Blog</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Accessibility</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Be a Dasher</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Be a Partner Restaurant</p>
        </span>
        <span onClick={(() => window.alert("Feature coming soon"))}>
        <p style={{ fontSize: "16px", fontWeight: "500"}}>Dashers for Deliveries</p>
        </span>
        <span>
        {/* <p style={{ fontSize: "16px"}}>////</p> */}
        </span>
      </div>
    </div>
      </div>
  );
}

export default ProfileButton;
