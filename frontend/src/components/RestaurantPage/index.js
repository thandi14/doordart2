import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import { useFilters } from "../../context/Filters";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./RestaurantPage.css"
import RestaurantNav from "./RestaurantNav";
import RestaurantFoot from "./RestaurantFoot";
import { useModal } from "../../context/Modal";
import ItemFormModal from "../ItemForm";
import ReviewFormModal from "../ReviewForm";
import ReviewFormThreeModal from "../ReviewForm/index3";
import Profile from "../HomePage/Profile";
import ProfileButton from "../HomePage/ProfileButton";
import HomeNav from "../HomePage/HomeNav";
import Franchise from "./index2";
import FranchiseTwo from "./index3";
import RestaurantNavTwo from "./RestaurantNavTwo";

function RestaurantPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurant } = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { id } = useParams();
  const [ length, setLength ] = useState(0)
  const [ selection, setSelection ] = useState("Reviews")
  const [ mark, setMark ] = useState(-1)
  const [ hide, setHide ] = useState(true)
  const [ bar, setBar ] = useState(false)
  const [ scroll, setScroll ] = useState(false)
  const dispatch = useDispatch()
  const { location, setRecentId, profile, setProfile } = useFilters()
  const { setModalContent } = useModal()
  const targetRef = useRef()
  const divRefs = useRef({});
  const history = useHistory()


  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
        const sessionId = localStorage.getItem('sessionId');
        let data = {
            sessionId
        }
        dispatch(cartActions.thunkGetCart(id, data))
        setRecentId(id)
    }
    fetchData()

  }, []);



  const checkInCenter = (id) => {
    if (divRefs.current[id]) {
            const element = divRefs.current[id];

            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const viewportCenterY = window.scrollY + viewportHeight / 2;
            const isInCenter = elementTop <= viewportCenterY && elementBottom >= viewportCenterY;

            if (isInCenter) {
                const number = parseInt(id.split('-')[1])
                setMark(number);
            }
        }
    }

    useEffect(() => {
        // Attach scroll event listener when component mounts
        const handleScroll = () => {
            // Loop through each div ref and check if it's in the center
            Object.keys(divRefs.current).forEach(id => {
            checkInCenter(id);
        });
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };

    }, [mark]);

   useEffect(() => {
     async function fetchData() {
            let data = {
                address: location
            }
          await dispatch(restaurantActions.thunkGetRestaurant(id, data))
        }
     fetchData()

  }, [dispatch, location, id])


  window.addEventListener('scroll', function() {
    const element = document.getElementById('head-nav-two');
    const scrollAmount = 550;

    if (window.scrollY > scrollAmount) {
        setHide(false);
    } else {
        setHide(true);
    }
  });

    useEffect(() => {

        const scrollToTarget = () => {
            const handleScrollOrNavigate = () => {
                const targetElement = document.getElementById(`mi-${mark}`);
                if (targetElement && scroll) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    setScroll(false)
                }
            };

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                handleScrollOrNavigate();
            } else {
                document.addEventListener('DOMContentLoaded', handleScrollOrNavigate);
            }
        };

        scrollToTarget();

    }, [scroll]);



  const goToNext = (e) => {
      e.stopPropagation()
      setLength(length + 1)

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
  };

//   const franchises = Object.values(restaurants).sort((a, b) => a.miles - b.miles)

  const allReviews = (reviews) => {

    if (!reviews?.length) return 0

    let sum = 0
    for (let review of reviews) {
        sum += review.rating
    }

    let result = sum / reviews.length

    return result.toFixed(1)

  };

  let times = restaurant.RestaurantTime?.monday
  let time = ""
  let morning = ""
  let night = ""

    if (time) {
        time = times.split(" - ")
        morning = time[0]
        night = time[1]
    }

    let menu = restaurant.MenuItems
    let categories = {};
    let set = new Set();

if (menu?.length) {
    for (let item of menu) {
        let category = item.category.trim();
        let cs = category.includes(',') ? category.split(",").map(c => c.trim()) : [category];
        for (let c of cs) {
            if (!set.has(c.toLowerCase())) {
                categories[c] = [];
                set.add(c.toLowerCase());
            }
        }
    }

    for (let item of menu) {
        let category = item.category.trim();
        let cs = category.includes(',') ? category.split(",").map(c => c.trim()) : [category];
        for (let c of cs) {
            categories[c].push(item);
        }
    }
}
    let keys = Object.keys(categories);

    let items = []

    if (menu?.length) items = menu.filter((i) => i.category == selection)

    let reviews = []
    reviews = restaurant.Reviews

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        // Extract components
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
        const year = date.getFullYear().toString().slice(-2); // Extract last two digits

        // Format into MM/DD/YY
        return `${month}/${day}/${year}`;
    }


  return (
    <div id="restaurant-p" style={{ position: "relative"}}>
    {user ? <RestaurantNav /> : <RestaurantNavTwo />}

    <div style={{ display: "flex"}} >
    <div className="side-bar" onMouseEnter={(() => setBar(true))} onMouseLeave={(() => {
        setProfile(false)
        setBar(false)})}  style={{ position: "sticky", height: "100vh", top: "64px", zIndex: 10}}>

    { user?.id && <div style={{ width: "auto"}} id="side-bar">
        <span onClick={(() => history.push('/home'))} className="page">
            <i class="fi fi-rs-house-chimney"></i>
        </span>
        <span>
            <i class="fi fi-rr-apple-whole"></i>
        </span>
        <span>
            <i class="fi fi-rr-shopping-bag"></i>
        </span>
        <span>
             <i class="fi fi-rr-hamburger-soda"></i>
        </span>
        <span>
            <i class="fi fi-rr-glass-cheers"></i>
        </span>
        <span>
        <i class="fi fi-rr-tags"></i>
        </span>
        <span>
        <i class="fi fi-rr-lipstick"></i>
        </span>
        <span>
            <i class="fi fi-rr-paw"></i>
        </span>
        <span>
        <i class="fi fi-rr-search-alt"></i>
        </span>
        <div id="line-bar"></div>
        <span>
            <i id="notify" class="fi fi-rr-cowbell"></i>
        </span>
        <span>
            <i class="fi fi-rr-receipt"></i>
        </span>
        <span>
            <i class="fi fi-rr-user"></i>
        </span>
    </div>}
    { bar && <div  onClick={(() => window.alert("Feature coming soon!"))} style={{ position: "absolute", backgroundColor:"white", height: "100vh", top: "0", boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2) " }} id="side-bar">
        <span onClick={((e) => {
            e.stopPropagation()
            history.push('/home')})} className="page">
            <i class="fi fi-rs-house-chimney"></i>
            <p>Home</p>
        </span>
        <span>
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
            setProfile(true)})} >
            <i class="fi fi-rr-user"></i>
            <p>Account</p>
        </span>
        { user?.id && profile ? <div ref={targetRef} style={{ left: "220px"}} id="profile-modal">
            <Profile user={user} d={profile} />
        </div> : null}
    </div>}
        </div>
        { user ? <Franchise /> : <FranchiseTwo />}
    </div>
    </div>
  );
}

export default RestaurantPage;
