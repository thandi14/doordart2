import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css"
import egg from "./images/egg.png"
import coffee from "./images/drinkThree.png"
import smoothie from "./images/drinkTwo.png"
import drink from "./images/drinkOne.png"
import onions from "./images/onionRings.png"
import vegies from "./images/spinach.png"
import taco from "./images/taco.png"
import cake from "./images/cake.png"
import sandwich from "./images/sandwich.png"
import chicken from "./images/chickenBucket.png"
import american from "./images/hotDog.png"
import croissant from "./images/croissant.png"
import salad from "./images/salad.png"
import pizza from "./images/pizza.png"
import burger from "./images/burger.png"
import salmon from "./images/salmon.png"
import steak from "./images/meat.png"
import pizzaTwo from "./images/pizzaTwo.png"
import south from "./images/chicken.png"
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import HomeNav from "./HomeNav";
import HomeFoot from "./HomeFoot";
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HomeNavTwo from "./HomeNavTwo";
import ProfileButton from "./ProfileButton";
import Profile from "./Profile";
import Restaurants from "./Restaurants";
import RestaurantsTwo from "./RestaurantsTwo";


function SideBar({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants, saves, orders } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ index, setIndex ] = useState(0)
  const [ fee, setFee ] = useState(3)
  const [ stars, setStars ] = useState(4.5)
  const [ price, setPrice ] = useState(2)
  const [ fMenu, setFMenu ] = useState("")
  const [ category, setCategory ] = useState("")
  const [ filter, setFilter ] = useState({})
  const [ catOne, setCatOne ] = useState("")
  const [ catTwo, setCatTwo ] = useState({})
  const [ hide, setHide ] = useState(false)
  const dispatch = useDispatch()
  const { location, setProfile, profile, setLocation, results } = useFilters()
  const history = useHistory()
  const targetRef = useRef()
  const targetRef2 = useRef(null)
  const targetRef3 = useRef(null)
  const targetRef4 = useRef(null)




 useEffect(() => {
     async function fetchData() {
         if (!location && user?.id ) await dispatch(restaurantActions.thunkGetUserRestaurants())
         dispatch(cartActions.thunkGetCarts())
         if (user?.id) dispatch(restaurantActions.thunkGetSaves())
         if (user?.id) dispatch(restaurantActions.thunkGetOrders())
        }
     fetchData()

  }, [dispatch, location, user])

  useEffect(() => {

    const handleDocumentClick = (event) => {
        if (targetRef2.current && !targetRef2.current.contains(event.target) &&
        targetRef3.current && !targetRef3.current.contains(event.target) &&
        targetRef4.current && !targetRef4.current.contains(event.target)) {
            setFMenu(false);

        }

      };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
      };

    }, []);


  useEffect(() => {
    const place = localStorage.getItem('place');
    if (place) {
      setLocation(place);
    }
  }, [location]);


  useEffect(() => {
    setCategory(catOne)
  }, [catOne]);


  const goToNext = (e) => {
      e.stopPropagation()
      setLength(length + 1)

    };

    const handleResults = (e) => {
        setCatOne(category)
        setCatTwo(filter)
    };


    const goToPrev = (e) => {
        e.stopPropagation();
        setLength(length - 1)
    };

  const sliderStyle = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${length * 50}%)`,
    marginBottom: "10px"
  };

  let franchises = Object.values(restaurants).sort((a, b) => a.miles - b.miles)

  let saved = []

  if (Object.values(saves).length) {
    for (let save of Object.values(saves)) {
        saved.push(save.Restaurant)
    }
  }

  let ordered = []
  let set = new Set()

  if (Object.values(orders).length) {
    for (let order of Object.values(orders)) {
        if (!set.has(order.Restaurant.name)) {
            ordered.push(order.Restaurant)
            set.add(order.Restaurant.name)
        }
    }
  }

  const handleReset = () => {
    setCatOne("")
    setCatTwo({})
  };


  window.addEventListener('scroll', function() {
    const element = document.getElementById('types');
    const scrollAmount = 150;

    if (window.scrollY > scrollAmount) {
        setHide(true);
    } else {
        setHide(false);
    }
  });

  console.log(category)

  return (

    <div className="side-bar" style={{ position: "sticky", height: "100vh", top: "64px", zIndex: 14}}>

    { user?.id && <div onClick={(() => window.alert("Feature coming soon!"))} id="side-bar">
        <span onClick={((e) => e.stopPropagation())} className="page">
            <i class="fi fi-rs-house-chimney"></i>
            <p>Home</p>
        </span>
        <span >
            <i class="fi fi-rr-apple-whole"></i>
            <p>Grocery</p>
        </span>
        <span>
            <i class="fi fi-rr-shopping-bag"></i>
            <p>Retail</p>
        </span>
        <span>
             <i class="fi fi-rr-hamburger-soda"></i>
            <p>Convenience</p>
        </span>
        <span>
            <i class="fi fi-rr-glass-cheers"></i>
            <p>Alcohol</p>
        </span>
        <span>
        <i class="fi fi-rr-tags"></i>
            <p>Offers</p>
        </span>
        <span>
        <i class="fi fi-rr-lipstick"></i>
            <p>Beauty</p>
        </span>
        <span>
            <i class="fi fi-rr-paw"></i>
            <p>Pets</p>
        </span>
        <span>
        <i class="fi fi-rr-search-alt"></i>
        <p>Browse All</p>
        </span>
        <div id="line-bar"></div>
        <span>
            <i id="notify" class="fi fi-rr-cowbell"></i>
            <p>Notifications</p>
        </span>
        <span>
            <i class="fi fi-rr-receipt"></i>
            <p>Orders</p>
        </span>
        <span onClick={((e) => {
            e.stopPropagation()
            setProfile(true)
        })} >
            <i class="fi fi-rr-user"></i>
            <p>Account</p>
        </span>
        { profile && <div ref={targetRef} style={{ left: "220px"}}  id="profile-modal">
            <Profile user={user} d={profile} />
        </div>}
    </div>}
        </div>

  );
}

export default SideBar;
