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

function HomeNav({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { cartItem, shoppingCarts }  = useSelector((state) => state.cart);
  const history = useHistory()
  const [drop, setDrop] = useState(false)
  const { location } = useFilters()
  const [ lMenu, setLMenu ] = useState(false)
  const targetRef = useRef()
  const { setModalContent } = useModal()
  const { setLocation } = useFilters()
  const autocompleteRef = useRef(null);
  const dispatch = useDispatch()
  const [dropTwo, setDropTwo] = useState(false)
  const [search, setSearch] = useState("")
  const locations = useLocation();
  const currentPage = locations.pathname;


  useEffect(() => {
    async function fetchData() {
      const address = localStorage.getItem('place');
        if ( location ) {
          let data = {
            address
          };

          await dispatch(restaurantActions.thunkGetRestaurants(data));
        }
       }
    fetchData()

 }, [dispatch, location])


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


  const handleSearch = async (event) => {
    let data = []
      if (event.key === 'Enter') {
        data = await dispatch(restaurantActions.thunkGetSearch(search));

        if (!currentPage.includes("search")) {
          if (data.length == 1) {
            history.push(`/restaurant/${data[0].id}`)
          }
          else {
            history.push(`restaurants/search`)

          }
        }
      }


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
    <ProfileButton user={sessionUser} d={drop} />
    <ShoppingCarts user={sessionUser} d={dropTwo} />
    <div id="nav">
        <div className="navi">
        <button onClick={(() => setDrop(!drop))} id ="menu">
        <i class="fi fi-br-menu-burger"></i>
         </button>
        <div id="icon">
        <img src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
          <span>DOORDART</span>
        </div>
        <div id="pick">
            <button>
                Delivery
            </button>
            <button onClick={(() => window.alert("Feature coming soon!"))}>
                Pickup
            </button>
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <div id="line"></div>
        <div ref={targetRef} onClick={(() => setLMenu(!lMenu))} id="my-address">
        <h1 style={{ fontSize: "14px" }}>{location ? location?.split(',')[0] : sessionUser?.address }</h1>
        <i class="fi fi-rr-angle-small-down"></i>
        </div>
          { lMenu &&
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
          }
        </div>

        </div>
        <div className="search">
        <div id="search">
            <i class="fi fi-rr-search"></i>
            <input
            value={search}
            onChange={((e) => setSearch(e.target.value))}
            onKeyDown={handleSearch}
            placeholder="Search stores, dishes, products"></input>
        </div>
        {/* <i style={{ fontSize: "18px"}} id="notify" class="fi fi-rr-cowbell"></i> */}
        <i style={{ fontSize: "16px"}} onClick={(() => setDropTwo(!dropTwo))} id={Object.values(shoppingCarts).length == 0 ? "cart-two" : "cart"} class="fi fi-rr-shopping-cart">
        <p>{Object.values(shoppingCarts).length}</p>
        </i>
        <button onClick={(() => setModalContent(<LoginForm />))} style={{ backgroundColor: "transparent"}} id="si-butt">Sign In</button>
        <button onClick={(() => setModalContent(<SignupForm />))} id="su-butt">Sign Up</button>
        </div>
    </div>
    </>
  );
}

export default HomeNav;
