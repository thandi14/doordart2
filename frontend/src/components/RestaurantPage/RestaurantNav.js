import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import "../HomePage/Navigation.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupForm";
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import * as restaurantActions from "../../store/restaurants"
import ProfileButton from "../HomePage/ProfileButton";
import ShoppingCart from "./ShoppingCart";

function RestaurantNav() {
  const sessionUser = useSelector((state) => state.session.user);
  const { restaurant } = useSelector((state) => state.restaurants);
  const { shoppingCart } = useSelector((state) => state.cart);
  const history = useHistory()
  const [drop, setDrop] = useState(false)
  const [dropTwo, setDropTwo] = useState(false)
  const { location, item, setItem, count } = useFilters()
  const [ lMenu, setLMenu ] = useState(false)
  const [ cMenu, setCMenu ] = useState(false)
  const [ sc, setSc ] = useState([])
  const targetRef = useRef()
  const { setModalContent } = useModal()
  const { setLocation } = useFilters()
  const autocompleteRef = useRef(null);
  const dispatch = useDispatch()
  const [ cartItem, setCartItem ] = useState({})



    useEffect(() => {

        if (Object.values(item).length) {
            setCMenu(true)
            setCartItem(item)
            setItem({})
            setTimeout(() =>{
                setCMenu(false)
            }, 2500)
        }

    }, [item]);

    useEffect(() => {
      if (shoppingCart.message) {
          setSc([])
      }
      else {
          let cart = shoppingCart.CartItems;
          setSc(cart);
      }
  }, [shoppingCart]);

  console.log(sc);

  const handlePlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (autocomplete) {
      const place = autocomplete.state.autocomplete.getPlace()
      if (place) {
          submitPlaceChanged(place.formatted_address);
      }
    }
  };

  const submitPlaceChanged = async (place) => {
      localStorage.setItem('place', place);
      setLocation(place);

      let data = {
        address: place
      };

      await dispatch(restaurantActions.thunkGetRestaurants(data));

  };

  useEffect(() => {

      const handleDocumentClick = (event) => {
          if ((targetRef.current && !targetRef.current.contains(event.target))) {
              setLMenu(false);

            }

        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

  }, []);

  return (
    <>
    {/* <ProfileButton user={sessionUser} d={drop} /> */}
    <ShoppingCart user={sessionUser} d={dropTwo}/>
    <div id="nav">
        <div className="navi-two">
        <button style={{ left: "2%" }}  onClick={(() => setDrop(!drop))} id ="menu">
        <i class="fi fi-br-menu-burger"></i>
         </button>
        <div id="icon">
        <img src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
          <span>DOORDART</span>
        </div>
        <div style={{ width: "82%" }} className="search">
        <div style={{ position: "relative" }}>
        <div ref={targetRef} onClick={(() => setLMenu(!lMenu))} id="my-address-two">
        <i class="fi fi-rs-marker"></i>
        <h1 style={{ fontSize: "14px" }}>{location ? location?.split(',')[0] : sessionUser?.address}</h1>
        <i class="fi fi-rr-angle-small-down"></i>
        </div>
        </div>

        </div>
        {/* <div className="search"> */}
        <i style={{ width: sc?.length == 0 && "30px" }} onClick={(() => setDropTwo(!dropTwo))} id={sc?.length == 0 ? "cart-three" : "cart-two"} class="fi fi-rr-shopping-cart">
          { lMenu &&
          <div style={{ right: "0" }}  onClick={((e) => e.stopPropagation())} id="addy-menu">
            <div id="a-menu" style={{ padding: "16px", color: "black" }}>
              <h1>Enter Your Address</h1>
              <div>
              <i class="fi fi-rs-marker"></i>
              <LoadScript
                googleMapsApiKey="AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k"
                libraries={['places']}
              >
              <Autocomplete
                      onPlaceChanged={handlePlaceChanged}
                      ref={autocompleteRef}
                      fields={['formatted_address', 'geometry']}
                >
                <input
                  id="location-two"
                  type="text"
                  placeholder="Address"
                  style={{ width: '100%' }}
                />
              </Autocomplete>
            </LoadScript>
              {/* <input placeholder="Address" id="location-two"></input> */}
              </div>
              <button onClick={(() => {
                setModalContent(<SignupFormModal />)
              })} ><i class="fi fi-br-user"></i> Sign in for saved address</button>
            </div>
            <div id="divider"></div>
            <div style={{ padding: "16px" }} id="a-recent">
            <i class="fi fi-bs-dot-circle"></i>
            <div>
           { location &&
           <>
            <h1 style={{ fontSize: "16px", margin: "0px" }}>{location.split(',')[0]}</h1>
            <p style={{ fontSize: "12px", margin: "0px" }}>{location.split(',')[1]}, {location.split(',')[2]}, {location.split(',')[3]}</p>
           </>
            }
            { !location &&
           <>
            <h1 style={{ fontSize: "16px", margin: "0px" }}>{sessionUser?.address}</h1>
            <p style={{ fontSize: "12px", margin: "0px" }}>{sessionUser?.city}, {sessionUser?.state}, {sessionUser?.zipCode}</p>
           </>
            }
            </div>
            </div>
          </div>
          }

        { cMenu &&
          <div style={{ right: "0" }}  onClick={((e) => e.stopPropagation())} id="cart-menu">
            <div style={{ cursor: "default" }} id="c-menu">
                <div  style={{ padding: "10px", borderBottom: "1px solid rgb(231, 231, 231)" }}>
                <h1 style={{ fontSize: "18px", marginBottom: "0px", color: "black"}}>{restaurant.name}</h1>
                <p style={{ fontSize: "10px", color: "black"}}>{count} item</p>
                </div>
                <div id="cart-m">
                <div style={{ padding: "8px", boxSizing: "border-box" }} id="cart-pic">
                    <img style={{ width: "30%"}} src={cartItem.imgUrl}></img>
                    <span style={{ width: "70%"}}>
                        <h2 style={{ fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cartItem.item}</h2>
                        <p style={{ fontSize: "12px", margin: "0px" }}> {cartItem.price}</p>
                    </span>
                </div>
                <div style={{backgroundColor: "rgb(231, 231, 231)", height: "1px", width: "100%"}} id="divider-two"></div>
                <button onClick={(() => setDropTwo(!dropTwo))} style={{ display: "flex", justifyContent: "center" }}><p>Go to cart</p></button>
                <button onClick={(() => setDropTwo(!dropTwo))}  id="cart-c" style={{ backgroundColor: "red", color: "white" }}><p>Checkout</p> {cartItem.price * count}</button>
                </div>
            </div>
          </div>
          }
          { sc?.length > 0 && <p>{sc?.length}</p>}
        </i>
        </div>
    </div>
    </>
  );
}

export default RestaurantNav;
