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
import SideBar from "./index2";
import RestaurantsTwo from "./RestaurantsTwo";


function HomePage({ isLoaded }) {
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
    position: "relative"
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
    <div style={{ position: "relative"}}>
    {user ? <HomeNavTwo /> : <HomeNav /> }

    <div style={{ display: "flex"}} >
    { user && <SideBar />}
    <div style={{ display: "flex", flexDirection: "column", width: user ? "84%" : "100%" }}>
    <div style={{ margin: "0.4% 3% 0px", overflow: "hidden" }} >
    <div style={{ overflow: "hidden"}} className="food-type">
    { length > 0 && <i id="gotobutt" style={{ left: "0"}} onClick={goToPrev} class="fi fi-sr-angle-circle-left"></i>}
    <div style={sliderStyle} id="food-type">
    <span onMouseEnter={(() => setIndex(1))} onClick={(() => setCatOne("Breakfast"))} id="categories">
    <img style={{ transform: category == "Breakfast" ? "rotate(20deg)": "" }}className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={egg}></img>
    <p style={{ color: category == "Breakfast" ? "red" : "" }} >Breakfast</p>
    </span>
    <span onMouseEnter={(() => setIndex(2))} onClick={(() => setCatOne("Coffee"))} id="categories">
    <img style={{ transform: category == "Coffee" ? "rotate(-20deg)": "" }}className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={coffee}></img>
    <p style={{ color: category == "Coffee" ? "red" : "" }} >Coffee</p>
    </span>
    <span  onMouseEnter={(() => setIndex(3))} onClick={(() => setCatOne("Fast Food"))} id="categories">
    <img style={{ transform: category == "Fast Food" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={onions}></img>
    <p style={{ color: category == "Fast Food" ? "red" : ""  }} >Fast Food</p>
    </span>
    <span onMouseEnter={(() => setIndex(4))} onClick={(() => setCatOne("Vegan"))} id="categories">
    <img  style={{ transform: category == "Vegan" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={vegies}></img>
    <p style={{ color: category == "Vegan" ? "red" : ""  }} >Vegan</p>
    </span>
    <span onMouseEnter={(() => setIndex(5))} onClick={(() => setCatOne("Smoothie"))} id="categories">
    <img  style={{ transform: category == "Smoothies" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={smoothie}></img>
    <p style={{ color: category == "Smoothies" ? "red" : ""  }} >Smoothie</p>
    </span>
    <span onMouseEnter={(() => setIndex(6))} onClick={(() => setCatOne("Mexican"))} id="categories">
    <img style={{ transform: category == "Mexican" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={taco}></img>
    <p style={{ color: category == "Mexican" ? "red" : "" }} >Mexican</p>
    </span>
    <span onMouseEnter={(() => setIndex(7))} onClick={(() => setCatOne("Desserts"))} id="categories">
    <img style={{ transform: category == "Desserts" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={cake}></img>
    <p style={{ color: category == "Desserts" ? "red" : "" }} >Desserts</p>
    </span>
    <span onMouseEnter={(() => setIndex(8))} onClick={(() => setCatOne("Sandwiches"))} id="categories">
    <img style={{ transform: category == "Sandwhiches" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={sandwich}></img>
    <p style={{ color: category == "Sandwiches" ? "red" : ""  }}  >Sandwiches</p>
    </span>
    <span onMouseEnter={(() => setIndex(9))} onClick={(() => setCatOne("Chicken"))} id="categories">
    <img style={{ transform: category == "Chicken" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={chicken}></img>
    <p style={{ color: category == "Chicken" ? "red" : "" }}  >Chicken</p>
    </span>
    <span onMouseEnter={(() => setIndex(10))} onClick={(() => setCatOne("Bakery"))}id="categories">
    <img style={{ transform: category == "Bakery" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={croissant}></img>
    <p style={{ color: category == "Bakery" ? "red" : ""  }}  >Bakery</p>
    </span>
    <span onMouseEnter={(() => setIndex(11))} onClick={(() => setCatOne("Healthy"))}id="categories">
    <img style={{ transform: category == "Healthy" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={salad}></img>
    <p style={{ color: category == "Healthy" ? "red" : ""  }}  >Healthy</p>
    </span>
    <span onMouseEnter={(() => setIndex(12))} onClick={(() => setCatOne("American"))}id="categories">
    <img style={{ transform: category == "American" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={american}></img>
    <p style={{ color: category == "American" ? "red" : ""  }}  >American</p>
    </span>
    <span onMouseEnter={(() => setIndex(13))} onClick={(() => setCatOne("Pizza"))}id="categories">
    <img style={{ transform: category == "Pizza" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={pizza}></img>
    <p style={{ color: category == "Pizza" ? "red" : ""  }}  >Pizza</p>
    </span>
    <span onMouseEnter={(() => setIndex(14))} onClick={(() => setCatOne("Burgers"))} id="categories">
    <img style={{ transform: category == "Burgers" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={burger}></img>
    <p style={{ color: category == "Burgers" ? "red" : ""  }} >Burgers</p>
    </span>
    <span onMouseEnter={(() => setIndex(15))} onClick={(() => setCatOne("Steak"))} id="categories">
    <img style={{ transform: category == "Steak" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={steak}></img>
    <p style={{ color: category == "Steak" ? "red" : ""  }} >Steak</p>
    </span>
    <span onMouseEnter={(() => setIndex(16))} onClick={(() => setCatOne("Seafood"))} id="categories">
    <img style={{ transform: category == "Seafood" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={salmon}></img>
    <p style={{ color: category == "Seafood" ? "red" : ""  }} >Seafood</p>
    </span>
    <span onMouseEnter={(() => setIndex(17))} onClick={(() => setCatOne("Italian"))} id="categories">
    <img style={{ transform: category == "Italian" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={pizzaTwo}></img>
    <p style={{ color: category == "Italian" ? "red" : ""  }} >Italian</p>
    </span>
    <span onMouseEnter={(() => setIndex(18))} onClick={(() => setCatOne("Southern"))} id="categories">
    <img style={{ transform: category == "Southern" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={south}></img>
    <p style={{ color: category == "Southern" ? "red" : ""  }} >Southern</p>
    </span>
    </div>
    { length == 0 && <i id="gotobutt" style={{ right: "0"}} onClick={goToNext} class="fi fi-sr-angle-circle-right"></i>}
    </div>
    </div>
    <div style={{borderBottom: hide && "1px solid rgb(231, 231, 231)", padding: "1% 3%"}} id="filterings">
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
                    handleResults()
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
                    handleResults()
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
                    handleResults()
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
    { (category || Object.values(catTwo).length > 0) && <div className="types">
     <div id="results">
    <h1 style={{ fontSize: "26px"}}>{results} results</h1>
    <button onClick={handleReset}>Reset</button>
    </div>
    </div> }
    </div>
    <div style={{ padding: "0.4% 3%"}} className="hp">
    { (saved.length > 0 || ordered.length > 0)  && <div className="types">
    { saved.length > 0 && <Restaurants arr={saved} title={"Saved stores"} />}
    { ordered.length > 0 && <Restaurants arr={ordered} title={"Order it again"} />}
    </div> }
    {category || Object.values(catTwo).length ? null : <div style={{ width: "100%", fontSize: "30px"}}><h1 style={{fontSize: "30px"}}>All Stores</h1></div>}
    <RestaurantsTwo category={catOne} filter={catTwo} restaurants={franchises} />
    { !user?.id && <HomeFoot />}
    { user?.id && <HomeFoot />}
    </div>
    </div>
    </div>
    </div>
  );
}

export default HomePage;
