import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../HomePage/HomePage.css"
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HomeNav from "../HomePage/HomeNav";
import HomeFoot from "../HomePage/HomeFoot";
import Profile from "../HomePage/Profile";
import HomeNavTwo from "../HomePage/HomeNavTwo";
import "./SearchPage.css"
import HomePageThree from "../HomePage/RestaurantsTwo";

function milesToTime(miles, speed) {
    // Check if speed is greater than zero to avoid division by zero
    if (speed > 0) {
      const timeInHours = miles / speed;
      return Math.round(timeInHours); // Round to the nearest integer
    } else {
      return null; // Return null if speed is zero or negative
    }
  }


function SearchPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants, saves, searchs } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const [ mark, setMark ] = useState(0)
  const dispatch = useDispatch()
  const [ filter, setFilter ] = useState({})
  const [ hide, setHide ] = useState(false)
  const { location, setProfile, profile, setLocation, results } = useFilters()
  const history = useHistory()
  const targetRef = useRef()
  const targetRef2 = useRef(null)
  const targetRef3 = useRef(null)
  const targetRef4 = useRef(null)
  const [ fee, setFee ] = useState(3)
  const [ stars, setStars ] = useState(4.5)
  const [ price, setPrice ] = useState(2)
  const [ fMenu, setFMenu ] = useState("")

  let searched = Object.values(searchs)

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

        let filteredFranchises = [...searched]; // Initialize with all restaurants

        if (Object.values(filter).length) {
            if (filter.fees) {
                filteredFranchises = filteredFranchises.filter((f) => f.deliveryFee < filter.fee);
            }
            if (filter.star) {
                filteredFranchises = filteredFranchises.filter((f) => {
                    const averageRating = f.Reviews.reduce((accumulator, review) => accumulator + review.rating, 0) / f.Reviews.length;
                    return averageRating > filter.stars;
                });
            }
            if (filter.timing) {
                filteredFranchises = filteredFranchises.filter((f) => {
                    const timeAndFee = (milesToTime(f.miles, 60) || 0) + f.deliveryFee;
                    return timeAndFee > filter.time;
                });
            }
            if (filter.pricing) {
                filteredFranchises = filteredFranchises.filter((f) => f.level > filter.price);
            }
        }
        if (!Object.values(filter).length) {
            filteredFranchises = [...searched]; // Reset to all restaurants
        }

        searched = filteredFranchises



 useEffect(() => {
     async function fetchData() {
         if ( !location && user?.id ) await dispatch(restaurantActions.thunkGetUserRestaurants())
         dispatch(cartActions.thunkGetCarts())
         dispatch(restaurantActions.thunkGetSaves())
        }
     fetchData()

  }, [dispatch, location, user])

  const saveRestaurant = (id) => {
    dispatch(restaurantActions.thunkCreateSave(id))

  };

  const deleteSave = (saves, restaurantId) => {
    let save = saves.find((s) => s.userId == user.id)
    dispatch(restaurantActions.thunkDeleteSave(save.id, restaurantId))
  };

  let saved = []

  if (Object.values(saves).length) {
    for (let save of Object.values(saves)) {
        saved.push(save.Restaurant)
    }
  }

  const reviews = (reviews) => {

    if (!reviews.length) return 0

    let sum = 0
    for (let review of reviews) {
        sum += review.rating
    }

    let result = sum / reviews.length

    return result.toFixed(1)

  };

  return (
    <div style={{ position: "relative"}}>
    {user ? <HomeNavTwo /> : <HomeNav /> }
    <div style={{ display: "flex"}}>
    <div className="side-bar" style={{ position: "sticky", height: "100vh", top: "64px", zIndex: 10}}>

{ user?.id && <div id="side-bar">
    <span onClick={(() => history.push('/home'))} className="page">
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
    <span onClick={(() => setProfile(true))} >
        <i class="fi fi-rr-user"></i>
        <p>Account</p>
    </span>
    { profile && <div ref={targetRef} style={{ left: "220px"}}  id="profile-modal">
        <Profile user={user} d={profile} />
    </div>}
</div>}
    </div>
    <div className="search-page">

       { searched.length > 0 && <div style={{ position: "sticky", width: "100%", top: "64px"}} >
        <div id="sp-head">
            <div id="types-two">
                <p id="s-categories" onClick={(() => {
                    // setScroll(true)
                    setMark(0)
                    })}  style={{ position: "relative"}}>
                    <div id={mark == 0 ? "mark-two" : "hidden"}></div>
                    <p style={{ color: mark == 0 ? "black" : "rgb(73, 73, 73)"}}>All</p>
                </p>
                <p id="s-categories" onClick={(() => {
                    // setScroll(true)
                    setMark(1)
                    })}  style={{ position: "relative"}}>
                    <div id={mark == 1 ? "mark-two" : "hidden"}></div>
                    <p style={{ color: mark == 1 ? "black" : "rgb(73, 73, 73)"}}>Restaurant</p>
                </p>
                <p id="s-categories" onClick={(() => {
                    window.alert("Feature coming soon")
                    // setScroll(true)
                    // setMark(2)
                    })}  style={{ position: "relative"}}>
                    {/* <div id={mark == 2 ? "mark-two" : "hidden"}></div> */}
                    <p style={{ color: mark == 2 ? "black" : "rgb(73, 73, 73)"}}>Grocery</p>
                </p>
                <p id="s-categories" onClick={(() => {
                    window.alert("Feature coming soon")
                    // setScroll(true)
                    // setMark(3)
                    })}  style={{ position: "relative"}}>
                    {/* <div id={mark == 3 ? "mark-two" : "hidden"}></div> */}
                    <p style={{ color: mark == 3 ? "black" : "rgb(73, 73, 73)"}}>Retail</p>
                </p>
            </div>
            <div id="search-t">
                {/* <div id="types">
                <button>
                    Delivery Fees: Under $3
                    <div id="line-two"></div>
                    <i class="fi fi-rr-angle-small-down"></i>
                </button>
                <button>
                    <i style={{ fontSize: "14px"}} class="fi fi-sr-tags"></i>
                    Offers
                </button>
                <button>
                    Pickup
                </button>
                <button>
                    Over 4.5
                    <i style={{ fontSize: "14px"}} class="fi fi-sr-star"></i>
                    <div id="line-two"></div>
                    <i class="fi fi-rr-angle-small-down"></i>
                </button>
                <button>
                    Under 30 min
                </button>
                <button>
                    Price
                    <i class="fi fi-rr-angle-small-down"></i>
                </button>
                <button>
                    DashPass
                </button>
            </div> */}
                        <div style={{ backgroundColor: "white" }} id="types">
        <div ref={targetRef2}>
        <button onClick={(() => {
            let obj = {
                fees: true,
                fee
            }
            let updatedFilter = { ...filter, ...obj };
            setFilter(updatedFilter)
            setFMenu("Fees")
            })} >
            Delivery Fees: Under ${fee}
            <div id="line-two"></div>
            <i class="fi fi-rr-angle-small-down"></i>
        </button>
        { fMenu === "Fees" && <div id="filter-menu">
            <div style={{ padding: "16px 16px 0px"}} >
                <h1 style={{ color: "black", margin: "12px 0px", fontSize: "30px"}} >
                    Delivery Fees
                </h1>
                <p style={{ fontSize: "16px", margin: "12px 0px"}} >
                Delivery fees vary for each restaurant based on your location and other factors.
                </p>
                <h2 style={{ fontSize: "16px", margin: "12px 0px"}} >
                Under ${fee}
                </h2>
            </div>
            <div id="numbers">
                <div id="p-num">
                    <div>
                        <i onClick={(() => setFee(1))} style={{ left: "0", color: fee >= 1 && "black", fontSize: fee == 1 && "28px", top: fee == 1 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>$1</h2>

                        </i>
                        <div style={{ backgroundColor: fee > 1 && "black"}}  id="num-line">
                        </div>
                    </div>
                    <div>
                        <i onClick={(() => setFee(3))} style={{ left: "0", color: fee >= 3 && "black", fontSize: fee == 3 && "28px", top: fee == 3 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>$3</h2>

                        </i>
                        <div style={{ backgroundColor: fee > 3 && "black"}} id="num-line">
                        </div>
                    </div>
                    <div>
                        <i onClick={(() => setFee(5))} style={{ left: "0", color: fee >= 5 && "black", fontSize: fee == 5 && "28px", top: fee == 5 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>$5</h2>
                        </i>
                        <div style={{ backgroundColor: fee > 5 && "black"}}  id="num-line">
                        </div>
                        <i onClick={(() => setFee(6))} style={{ right: "0" , color: fee >= 6 && "black", fontSize: fee >= 6 && "28px", top: fee >= 6 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }} >$5+</h2>
                        </i>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: "1px solid rgb(231, 231, 231)", marginTop: "5px", padding: "16px 16px 16px 0px", display: "flex", gap: "5px", justifyContent: "flex-end"}}>
                <button style={{ backgroundColor: "transparent"}} onClick={(() => setFMenu(""))}>Cancel</button>
                <button style={{ color: "white"}} onClick={(() => {
                    let obj = {
                        fees: true,
                        fee
                    }
                    let updatedFilter = { ...filter, ...obj };
                    setFilter(updatedFilter)
                    // handleResults()
                    })} >View Results</button>
            </div>
        </div>}
        </div>
        <div>
        <button onClick={(() => {
            // let obj = {
            //     name: "Fees",
            //     num: 3
            // }
            // setFilter(obj)
            window.alert("Feature coming soon")
            })}>
            <i style={{ fontSize: "14px"}} class="fi fi-sr-tags"></i>
            Offers
        </button>
        </div>
        <div>
        <button onClick={(() => {
            // let obj = {
            //     name: "Fees",
            //     num: 3
            // }
            // setFilter(obj)
            window.alert("Feature coming soon")
            })}>
            Pickup
        </button>
        </div>
        <div ref={targetRef3}>
        <button  onClick={(() => {
            let obj = {
                star: true,
                stars
            }
            setFMenu("Stars")
            let updatedFilter = { ...filter, ...obj };
            setFilter(updatedFilter)})}>
            Over 4.5
            <i style={{ fontSize: "14px"}} class="fi fi-sr-star"></i>
            <div id="line-two"></div>
            <i class="fi fi-rr-angle-small-down"></i>
        </button>
        { fMenu === "Stars" &&  <div style={{ minWidth: "300%"}}  id="filter-menu">
            <div style={{ padding: "16px 16px 0px"}} >
                <h1 style={{ color: "black", margin: "12px 0px", fontSize: "30px"}} >
                    Ratings
                </h1>
                <h2 style={{ fontSize: "16px", margin: "12px 0px"}} >
                Over {stars}
                </h2>
            </div>
            <div id="numbers">
                <div id="s-num">
                    <div>
                        <i onClick={(() => setStars(3))} style={{ left: "0", color: stars >= 3 && "black", fontSize: stars == 3 && "28px", top: stars == 3 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>3</h2>
                        </i>
                        <div style={{ backgroundColor: stars > 3 && "black"}}  id="num-line">
                        </div>
                    </div>
                    <div>
                        <i onClick={(() => setStars(3.5))} style={{ left: "0", color: stars >= 3.5 && "black", fontSize: stars == 3.5 && "28px", top: stars == 3.5 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>3.5</h2>
                        </i>
                        <div style={{ backgroundColor: stars > 3.5 && "black"}}  id="num-line">
                        </div>
                    </div>
                    <div>
                        <i onClick={(() => setStars(4))} style={{ left: "0", color: stars >= 4 && "black", fontSize: stars == 4 && "28px", top: stars == 4 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>4</h2>
                        </i>
                        <div style={{ backgroundColor: stars > 4 && "black"}}  id="num-line">
                        </div>
                    </div>
                    <div>
                        <i onClick={(() => setStars(4.5))} style={{ left: "0", color: stars >= 4.5 && "black", fontSize: stars == 4.5 && "28px", top: stars == 4.5 && "-14px"}} class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>4.5</h2>
                        </i>
                        <div style={{ backgroundColor: stars > 4.5 && "black"}}  id="num-line">
                        </div>
                        <i onClick={(() => setStars(5))} style={{ right: "0", color: stars >= 5 && "black", fontSize: stars == 5 && "28px", top: stars == 5 && "-14px"}}class="fi fi-ss-circle">
                        <h2 style={{ fontSize:"15px" }}>5</h2>
                        </i>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: "1px solid rgb(231, 231, 231)", marginTop: "5px", padding: "16px 16px 16px 0px", display: "flex", gap: "5px", justifyContent: "flex-end"}}>
                <button style={{ backgroundColor: "transparent"}} onClick={(() => setFMenu(""))}>Cancel</button>
                <button style={{ color: "white"}} onClick={(() => {
                    let obj = {
                        star: true,
                        stars
                    }
                    // handleResults()
                    let updatedFilter = { ...filter, ...obj };
                    setFilter(updatedFilter)
                    })}  >View Results</button>
            </div>
        </div>}
        </div>
        <div>
        <button onClick={(() => {
            let obj = {
                timing: true,
                time: 30
            }
            setFMenu(true)
            let updatedFilter = { ...filter, ...obj };
            setFilter(updatedFilter)})}>
            Under 30 min
        </button>
        </div>
        <div ref={targetRef4}>
        <button onClick={(() => {
            let obj = {
                pricing: true,
                price
            }
            setFMenu("Price")
            let updatedFilter = { ...filter, ...obj };
            setFilter(updatedFilter)})}>
            Price
            <i class="fi fi-rr-angle-small-down"></i>
        </button>
        { fMenu === "Price" &&  <div style={{ width: "400%"}} id="filter-menu">
            <div style={{ padding: "16px 16px 0px"}} >
                <h1 style={{ color: "black", margin: "0px", fontSize: "30px"}} >
                    Price
                </h1>
            </div>
            <div style={{ margin: "0px"}} id="numbers">
                <div style={{ margin: "0px"}}  id="p-price">
                    <div  >
                        <button style={{ color: price >= 1 && "white", backgroundColor: price >= 1 && "black"}}  onClick={(() => setPrice(1))}>
                            $
                        </button>
                    </div>
                    <div >
                        <button style={{ color: price >= 2 && "white", backgroundColor: price >= 2 && "black"}}  onClick={(() => setPrice(2))}>
                            $$
                        </button>
                    </div>
                    <div>
                        <button style={{ color: price >= 3 && "white", backgroundColor: price >= 3 && "black"}}  onClick={(() => setPrice(3))}>
                            $$$
                        </button>
                    </div>
                    <div>
                        <button style={{ color: price >= 4 && "white", backgroundColor: price >= 4 && "black"}}  onClick={(() => setPrice(4))}>
                            $$$$
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: "1px solid rgb(231, 231, 231)", marginTop: "5px", padding: "16px 16px 16px 0px", display: "flex", gap: "5px", justifyContent: "flex-end"}}>
                <button style={{ backgroundColor: "transparent"}} onClick={(() => setFMenu(false))}>Cancel</button>
                <button style={{ color: "white"}} onClick={(() => {
                   let obj = {
                    pricing: true,
                    price
                    }
                    // handleResults()
                    let updatedFilter = { ...filter, ...obj };
                    setFilter(updatedFilter)
                    })}  >View Results</button>
            </div>
        </div>}
        </div>
        <div>
        <button onClick={(() => {
            // let obj = {
            //     name: "Fees",
            //     num: 3
            // }
            // setFilter(obj)
            window.alert("Feature coming soon")
            })}>
            DashPass
        </button>
        </div>

    </div>
                </div>
            </div>
        </div>}
    <div style={{ height: "100%", width: "100%", padding: "0px"}} className="hp">
    <div style={{ padding: "0.4% 2%"}} className="restaurants">
        {searched.length == 0 ? <div id="no-results">
            <img src="https://media3.giphy.com/media/Uj3qigQZ3aYkK1dbz4/giphy.gif?cid=6c09b9527rmk8o3ivw71840rvk02ag0e8vkvqgdbs3zosfb5&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"></img>
            <h1 style={{ margin: "0px 4px"}}>No Results</h1>
            <p>Try a different search or browse everything
                DoorDash offers in your area.</p>
            <button id="browse-again" onClick={(() => history.push('/home'))}>Browse DoorDart</button>
        </div> :
        <>
        {/* <HomePageThree filter={catOne} category={catTwo} restaurants={Object.values(restaurants)}/> */}
         {searched.map((f, id) =>
        <>
            <div onClick={(() => history.push(`/restaurant/${f.id}`))} className="restaurant" id={`r-${id}`}>
                <img style={{ marginBottom: "6px", height: "58%" }}src={f.RestaurantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{f.name} </h1>
                    { user && f.Saves.some((s) => s.userId == user?.id && s.restaurantId == f.id) ?
                    <i onClick={((e) => {
                        e.stopPropagation()
                        deleteSave(f.Saves, f.id)})} style={{ color: "red", fontSize: "16px", margin: "4px"}} class="fi fi-ss-heart"></i> :
                    <i onClick={((e) => {
                        e.stopPropagation()
                        saveRestaurant(f.id)})} style={{ color: "#767676", fontSize: "16px", margin: "4px"}} class="fi fi-rs-heart"></i>
                    }
                </div>
                <div id="r-info">
                    <h1 style={{ fontSize: "12px"}}>
                    <span style={{ color: "black"}}>{reviews(f.Reviews)}</span>
                    <i class="fi fi-sr-star" style={{ fontSize: "12px", color: "#e4e404" }}></i>
                    ({f.Reviews?.length})
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    {f.miles} mi
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    {f.mins + 10} mins
                    </h1>
                </div>
                <h1 style={{ fontSize: "12px", color: "#767676"}}>${f.deliveryFee} Delivery Fee</h1>
            </div>
        </>
    )}
        </>

        }
    </div>
    <HomeFoot />
    </div>
    </div>
    </div>
    </div>
  );
}

export default SearchPage;
