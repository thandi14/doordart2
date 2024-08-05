import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import "./Navigation.css";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupForm";
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import * as restaurantActions from "../../store/restaurants"
import ShoppingCart from "../RestaurantPage/ShoppingCart";
import ShoppingCarts from "../RestaurantPage/ShoppingCarts";
import Profile from "./Profile";

function HomeNavTwo({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { cartItem, shoppingCarts }  = useSelector((state) => state.cart);
  const { restaurants, saves, orders, wallets } = useSelector((state) => state.restaurants);
  const history = useHistory()
  const [drop, setDrop] = useState(false)
  const { location } = useFilters()
  const [ lMenu, setLMenu ] = useState(false)
  const [ sMenu, setSMenu ] = useState(false)
  const targetRef = useRef()
  const targetRef2 = useRef()
  const targetRef3 = useRef()
  const { setModalContent } = useModal()
  const { setLocation } = useFilters()
  const autocompleteRef = useRef(null);
  const dispatch = useDispatch()
  const [dropTwo, setDropTwo] = useState(false)
  const locations = useLocation();
  const [ searching, setSearching ] = useState(false)
  const [ search, setSearch ] = useState("")
  const [ search2, setSearch2 ] = useState("")
  const currentPage = locations.pathname;


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
      if (place) {
        setLocation(place);
      }
      else {
        setLocation("")
      }

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

            const isClickOutsideTarget2 = targetRef2.current && !targetRef2.current.contains(event.target);
            const isClickOutsideTarget3 = targetRef3.current && !targetRef3.current.contains(event.target);

            if ((isClickOutsideTarget2 && isClickOutsideTarget3)) {
              setSearching(false);
            }
            console.log("isClickOutsideTarget2:", isClickOutsideTarget2, "isClickOutsideTarget3", isClickOutsideTarget3)

        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

  }, []);

  const handleSearch = async (event) => {
    let data = []
      if (event.key === 'Enter') {
        data = await dispatch(restaurantActions.thunkGetSearch(search));

        if (!currentPage.includes("search")) {
          if (data.length == 1) {
            history.push(`/restaurant/${data[0].id}`)
          }
          else {
            history.push(`/restaurants/search`)

          }
        }
      }


  };

  let stores = Object.values(stores)

  console.log(restaurants)

  return (
    <>
    {/* <Profile user={sessionUser} d={true} /> */}
    <ShoppingCarts user={sessionUser} d={dropTwo} />
    <div id="nav-two">
        <div style={{ padding: "0% 2%" }} id="icon">
        <img src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
          <span>DOORDART</span>
        </div>
        <div style={{ width: "100%", position: "relative" }} className="navi">
       <div style={{ border: "2px solid transparent", margin: "16px", width: "100%" }} ref={targetRef2} id={ searching ? "hidden" : "search"}>
            <i class="fi fi-rr-search"></i>
            <input
            value={search}
            onClick={((e) => setSearching(!searching))}
            placeholder="Search DoorDart"></input>
        </div>
        <div className={!searching ? "hidden" : "s-menu"}>
          <div id="s-menu">
        <div style={{ border:  "2px solid black" }}  ref={targetRef3}  id={ !searching ? "hidden" : "searchTwo"}>
            <i class=" fi fi-rr-arrow-small-left"></i>
            <input
            value={search}
            onChange={((e) => setSearch(e.target.value))}
            onKeyDown={handleSearch}
            placeholder="Search DoorDart"></input>
             { search && <i onClick={((e) => {
              e.stopPropagation()
                  setSearch("")
                  setSearch2("")
              })} style={{ cursor: "pointer", width: "20px", height: "20px", fontSize: "20px" }} class="fi fi-sr-cross-circle"></i>}
        </div>
        <div>
          {/* <h1>Recent Searches</h1> */}

        </div>
          </div>
        </div>
          { lMenu &&
        <div style={{ position: "relative" }}>
          <div style={{ left: "0" }} onClick={((e) => e.stopPropagation())} id="addy-menu">
            <div id="a-menu" style={{ padding: "16px" }}>
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
        </div>
          }

        </div>
        <div style={{ width: "40%" }} className="search">
        <div style={{ position: "relative" }}>
        <div ref={targetRef} onClick={(() => setLMenu(!lMenu))} id="my-address-two">
        <i class="fi fi-rs-marker"></i>
        <h1 style={{ fontSize: "14px", whiteSpace: "nowrap" }}>{location ? location?.split(',')[0] : sessionUser?.address}</h1>
        <i class="fi fi-rr-angle-small-down"></i>
        </div>
        </div>
        <div id="pick">
            <button>
                Delivery
            </button>
            <button onClick={(() => window.alert("Feature coming soon!"))}>
                Pickup
            </button>
        </div>
        <i style={{ fontSize: "16px"}} onClick={(() => setDropTwo(!dropTwo))} id={Object.values(shoppingCarts).length  == 0 ? "cart-three" : "cart-two"} class="fi fi-rr-shopping-cart">
        {Object.values(shoppingCarts).length  > 0 && <p>{Object.values(shoppingCarts).length}</p>}
        </i>

        </div>
        {/* <div className="search">
        <div id="search">
            <i class="fi fi-rr-search"></i>
            <input defaultValue="Search stores, dishes, products"></input>
        </div>

        <i style={{ fontSize: "18px"}} id="notify" class="fi fi-rr-cowbell"></i>
        <div id="pick">
            <button>
                Delivery
            </button>
            <button>
                Pickup
            </button>
        </div>
        <i style={{ fontSize: "16px"}} onClick={(() => setDropTwo(!dropTwo))} id={Object.values(shoppingCarts).length  > 0 ? "cart-two" : "cart"} class="fi fi-rr-shopping-cart">
        <p>{Object.values(shoppingCarts).length}</p>
        </i>
        </div> */}
    </div>
    </>
  );
}

export default HomeNavTwo;
