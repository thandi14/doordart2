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

const filterCategories = (categories, search) => {
    const filteredCategories = {};
    Object.entries(categories).forEach(([category, items]) => {
      filteredCategories[category] = items.filter(item =>
        item.item?.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase())
      );
    });
    return filteredCategories;
};

function Franchise({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurant, orders } = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { id } = useParams();
  const [ length, setLength ] = useState(0)
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ selection, setSelection ] = useState("Reviews")
  const [ mark, setMark ] = useState(-1)
  const [ hide, setHide ] = useState(true)
  const [ bar, setBar ] = useState(false)
  const [ search, setSearch ] = useState("")
  const [ scroll, setScroll ] = useState(false)
  const dispatch = useDispatch()
  const { location, setRecentId, profile, setProfile } = useFilters()
  const { setModalContent } = useModal()
  const targetRef = useRef()
  const divRefs = useRef({});
  const history = useHistory()
  const [categories, setCategories] = useState({});
  const [unfilteredCategories, setUnfilteredCategories] = useState({});
  const [menu, setMenu] = useState([]);


  useEffect(() => {
    if (restaurant?.MenuItems?.length) {
      setMenu(restaurant.MenuItems);
    }
  }, [restaurant]);

  useEffect(() => {
    if (menu.length) {
      const cat = processCategories(menu);
      setCategories(cat);
      setUnfilteredCategories(cat);
    }
  }, [menu]);

  useEffect(() => {
    if (search) {
      const filteredCategories = filterCategories(unfilteredCategories, search);
      setCategories(filteredCategories);
    } else {
      setCategories(unfilteredCategories);
    }
  }, [search, unfilteredCategories]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
        dispatch(cartActions.thunkGetCart(id))
        setRecentId(id)
        if (user?.id) dispatch(restaurantActions.thunkGetOrders())
    }
    fetchData()

  }, []);

  const processCategories = (menu) => {
    const cat = {};
    menu.forEach(item => {
      const categories = item.category.includes(',') ? item.category.split(',').map(c => c.trim()) : [item.category.trim()];
      categories.forEach(category => {
        const key = category;
        if (!cat[key]) {
          cat[key] = [];
        }
        cat[key].push(item);
      });
    });
    return cat;
  };

  const saveRestaurant = (id) => {
    dispatch(restaurantActions.thunkCreateSave(id))

  };

  const deleteSave = (saves, restaurantId) => {
    let save = saves.find((s) => s.userId == user.id)
    dispatch(restaurantActions.thunkDeleteSave(save.id, restaurantId))
  };


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
      if (length == 2) {
        setLength(length)
      }
      else {
          setLength(length + 1)
      }

    };

    const goToPrev = (e) => {
        e.stopPropagation();
        if (length > 0) {
            setLength( length - 1)
        }
        else {
            setLength(0)

        }
    };

    const goToNextTwo = (e) => {
        e.stopPropagation()
        if (lengthTwo == ordered.length) {
            setLengthTwo(lengthTwo)
        }
        else {
            setLengthTwo( lengthTwo + 1)
        }
    };

      const goToPrevTwo = (e) => {
        e.stopPropagation();

        if (lengthTwo == 0) {
            setLengthTwo(0)
        }
        else {
            setLengthTwo(lengthTwo - 1)
        }


      };

      function getRandomColor() {
        // Generate random values for the RGB components
        const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        // Construct the RGB color string
        const color = `rgb(${red}, ${green}, ${blue})`;

        return color;
      }

  const sliderStyle = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${length * 50}%)`,
  };

  const sliderStyleTwo = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${lengthTwo * 50}%)`,
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

    if (times) {
        time = times.split(" - ")
        morning = time[0]
        night = time[1]
    }

    let or = Object.values(orders).filter((order) => order.restaurantId == restaurant.id)
    let cat = {};
    let catTwo = {};
    let set = new Set();

    if (or?.length) {
        for (const o of or) {
          for (const item of o.CartItems) {
            const name = item.MenuItem.item.toLowerCase(); // Ensure consistent case
            if (!set.has(name)) {
              cat[name] = [];
              cat[name].push(item);
              catTwo[name] = 0;
              set.add(name);
            }
            catTwo[name] += 1;
          }
        }
      }

    // if (or?.length) {
    //     for (let o of or) {
    //         for (let item of o.CartItems) {
    //         let name = item.MenuItem.item
    //             if (set.has(name.toLowerCase())) {
    //             }
    //         }
    //     }
    // }
    let ordered = []
    let arr = Object.values(cat)

    for (let o of arr) {
        for ( let ci of o) {
            ordered.push(ci)

        }
    }


    let keys = []

    for (let key of Object.keys(categories)) {
        if (categories[key].length) {
            keys.push(key)
        }
    };


    let reviews = []
    reviews = restaurant.Reviews
    let peakRev = reviews?.slice(0, 3)

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

        <div id="rp-st">

            <div id={ hide ? "hidden" : "rp-head-two"}>
                        <div style={{ width: "50%", display: "flex", gap: "5px", flexDirection: "column"}}>
                        <h1 style={{ margin: "0px", fontSize: "20px"}} >{restaurant.name}</h1>
                        <p style={{ width: "100%", gap: "4px", margin: "0px", color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
                        {allReviews(restaurant.Reviews)}
                        <i class="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}}></i>
                        {restaurant.Reviews?.length}+
                        ratings
                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                        {restaurant.type}
                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                        {restaurant.miles} mi
                        </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", width: "50%", alignItems: "flex-end"}}>
                        <div style={{ width: "45%" }} id="item-search">
                        <i class="fi fi-rr-search"></i>
                        <input
                        // value={search}
                        // onChange={((e) => setSearch(e.target.value))}
                        onKeyDown={((e) => {
                            if (e.key === 'Enter') {
                                setSearch(e.target.value);
                              }
                        })}
                        placeholder={`Search ${restaurant.name}`}></input>
                        </div>
                    </div>
            </div>
        <div className="rp">
            <div style={{ backgroundImage: `url(${restaurant.RestaurantImage?.bannerUrl})`}} id="rp-one">
                <div id="rp-ban">
                     <img src={restaurant.RestaurantImage?.iconUrl}></img>
                </div>
                <div id="rp-save">
                    {  restaurant.Saves?.some((s) => s.userId == user?.id && s.restaurantId == restaurant.id) ? <button><i style={{ color: "red" }} class="fi fi-ss-heart"></i>Unsave</button> : <button><i class="fi fi-rs-heart"></i>Save</button>}
                </div>
            </div>
            <div id="rp-two">
                <div style={{ paddingBottom: "8%"}} id="r-info">
                    <div id="info-one">
                        <h1 style={{ marginBottom: "36px"}} >{restaurant.name}</h1>
                        <h2 style={{ fontSize: "20px", whiteSpace: "nowrap"}}>Store Info</h2>
                        <p style={{ fontSize: "13px", color: "#767676"}}>
                             <i style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}} class="fi fi-rr-clock-three"></i>
                            <p style={{ fontSize: "13px", color: "green", margin: "0px"}}>Open now</p>
                            <i style={{ width: "8px", height: "8px", fontSize: "8px", color: "#767676" }} class="fi fi-sr-bullet"></i>
                            Closes at {night}
                        </p>
                        <p style={{ color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
                            {allReviews(restaurant.Reviews)}
                            <i class="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}}></i>
                            {restaurant.Reviews?.length}+
                            ratings
                            <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            {restaurant.miles} mi
                        </p>
                        <p style={{ color: "#767676", fontSize: "12px",}}>
                            $
                            <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            American
                        </p>
                        <p style={{ fontSize: "13px", color: "#767676", display: "flex", gap: "5px", alignItems: "center" }}>Pricing & Fees<i style={{ width: "10px", height: "10px", fontSize: "10px" }}  class="fi fi-rr-circle-i"></i></p>
                        <button onClick={(() => window.alert("Feature coming soon"))} id="more">See More</button>
                    </div>
                    <div id="line-five"></div>
                    <div id="info-two">
                            <h1 style={{ fontSize: "20px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Lunch Menu
                            {/* <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-rr-angle-small-down"></i> */}
                            </h1>
                            <p style={{ fontSize: "13px", color: "#767676"}}>{restaurant.RestaurantTime?.monday}</p>
                            <span style={{ fontSize: "13px", width: "100%", overflowY: "scroll"}}>
                            {/* <p onClick={(() => {
                                setScroll(true)
                                setMark(-5)
                                })} style={{ position: "relative"}}>
                                <div id={mark == -5 ? "mark" : "hidden"}></div>
                                <p style={{ color: mark == -1 ? "black" : "rgb(73, 73, 73)", marginLeft: "16px"}}>Order it again</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-4)
                                })}   style={{ position: "relative"}}>
                                <div id={mark == -4 ? "mark" : "hidden"}></div>
                                <p style={{ color: mark == -1 ? "black" : "rgb(73, 73, 73)", marginLeft: "16px"}}>Item Deals</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-3)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -3 ? "mark" : "hidden"}></div>
                                <p style={{ color: mark == -1 ? "black" : "rgb(73, 73, 73)", marginLeft: "16px"}}>Reviews</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-2)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -2 ? "mark" : "hidden"}></div>
                                <p style={{ color: mark == -1 ? "black" : "rgb(73, 73, 73)", marginLeft: "16px"}}>Most Ordered</p>
                            </p> */}
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-1)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -1 ? "mark" : "hidden"}></div>
                                <p style={{ color: mark == -1 ? "black" : "rgb(73, 73, 73)", marginLeft: "16px"}}>Reviews</p>
                            </p>
                            {keys.map((category, i) =>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(i)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == i ? "mark" : "hidden"}></div>
                                <p style={{ color: mark == i ? "black" : "rgb(73, 73, 73)", marginLeft: "16px"}}>{category}</p>
                            </p>
                            )}
                            </span>
                    </div>
                </div>
                <div id="r-items">
                    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%"}}>
                        <div id="item-search">
                        <i class="fi fi-rr-search"></i>
                        <input placeholder={`Search ${restaurant.name}`}></input>
                        </div>
                    </div>
                    <div id="group">
                        <button onClick={(() => window.alert("Feature coming soon"))} >Group Order</button>
                        <div>
                            <span>
                            <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", display: "flex", margin: "0px" }}>${restaurant.deliveryFee}</h1>
                            <h2 style={{ fontSize: "12px", color: "#767676", margin: "0px" }}>delivery fee</h2>
                            </span>
                            <div id="line-four"></div>
                            <span>
                            <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", display: "flex", margin: "0px" }}>{restaurant.mins + 10} min</h1>
                            <h2 style={{ fontSize: "12px", color: "#767676", margin: "0px"}}> delivery time</h2>
                            </span>
                        </div>
                    </div>
                    { ordered.length > 0 && <div ref={el => divRefs.current[`mi-${-1}`] = el} style={{ margin: "30px 0px"}} className="review">
                        <div id="review-one">
                            <div>
                                <h1 style={{ fontSize: "24px", whiteSpace: "nowrap", margin: "0px" }}>Order it again</h1>
                                <p style={{ gap: "3px", margin: "0px", color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
                                    Quickly add items from your past orders
                                </p>
                            </div>
                            <div id="add-r">
                                <span>
                                { <i id="gotobutt-two" style={{ cursor: lengthTwo == 0&& "not-allowed", left: "0", color: lengthTwo == 0 && "rgb(247, 247, 247)", backgroundColor: lengthTwo == 0 && "rgb(178, 178, 178)" }} onClick={goToPrevTwo} class="fi fi-sr-angle-circle-left"></i>}
                                { <i id="gotobutt-two" style={{ cursor: lengthTwo == ordered.length && "not-allowed", left: "0", color: lengthTwo == ordered.length && "rgb(247, 247, 247)", backgroundColor: lengthTwo == ordered.length && "rgb(178, 178, 178)", right: "0"}} onClick={goToNextTwo} class="fi fi-sr-angle-circle-right"></i>}
                                </span>
                            </div>
                        </div>
                        <div style={sliderStyleTwo} id="order-two">
                        { ordered?.map((item, i) =>
                                <>
                                <div onClick={(() => setModalContent(<ItemFormModal itemId={item.MenuItem.id}/>))} id="menu-item-two">
                                    <div id="item">
                                    <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", margin: "0" }}>{item.MenuItem.item}</h1>
                                    {/* { item.CartItemNotes?.map((selection, i) =>
                                    <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", margin: "0" }}>{selection.ItemSelection.selection}</h1>
                                    )} */}
                                    <div id="i-info">
                                    </div>
                                    <span style={{ fontSize: "12px"}}>
                                        <p style={{ fontWeight: "700"}}>${item.MenuItem.price}</p>
                                    </span>
                                    <span style={{ fontSize: "12px"}}>
                                        <p style={{ fontWeight: "700", color: "#00838aff"}}>Orderd {catTwo[item.MenuItem.item.toLowerCase()]} {catTwo[item.MenuItem.item.toLowerCase()] == 1 ? "time" : "times"}</p>
                                    </span>
                                    </div>
                                    <div id="i">
                                        <img src={item.MenuItem.imgUrl}></img>
                                        <i class="fi fi-sr-add"></i>
                                    </div>
                                </div>
                                </>
                            )}
                        </div>
                    </div>}
                    <div ref={el => divRefs.current[`mi-${-1}`] = el} className="review">
                        <div id="review-one">
                            <div>
                                <h1 style={{ fontSize: "24px", whiteSpace: "nowrap", margin: "0px" }}>Reviews</h1>
                                <p style={{ gap: "3px", margin: "0px", color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
                                    {allReviews(restaurant.Reviews)}
                                    <i class="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}}></i>
                                    {restaurant.Reviews?.length}+
                                    ratings ratings
                                    <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                                    {reviews?.length} public reviews
                                </p>
                            </div>
                            <div id="add-r">
                                <button onClick={(() => setModalContent(<ReviewFormModal />))}>Add Review</button>
                                <span>
                                { <i id="gotobutt-two" style={{ left: "0", color: length == 0 && "rgb(247, 247, 247)", backgroundColor: length == 0 && "rgb(178, 178, 178)" }} onClick={goToPrev} class="fi fi-sr-angle-circle-left"></i>}
                                { <i id="gotobutt-two"style={{ left: "0", color: length == 2 && "rgb(247, 247, 247)", backgroundColor: length == 2 && "rgb(178, 178, 178)", right: "0"}} onClick={goToNext} class="fi fi-sr-angle-circle-right"></i>}
                                </span>
                            </div>
                        </div>
                        <div style={sliderStyle} id="review-two">
                            <div  style={{ position: "relative" }}>
                                <div style={{ position: "relative", color: "rgb(118, 118, 118)" }} className="progress">
                                <i id="progress" class="fi fi-sr-circle-c"></i>
                                </div>
                                <div style={{ color: "rgb(118, 118, 118)" }}  id="p-info">
                                <p style={{ fontSize: "16px" }}>{allReviews(restaurant.Reviews)}</p>
                                <i class="fi fi-sr-star"></i>
                                <p style={{ fontSize: "11px" }}>of 5 stars</p>
                                </div>
                            </div>
                            { peakRev?.map((review, i) =>
                                <div onClick={(() => setModalContent(<ReviewFormThreeModal rev={review} />))} style={{ cursor: "pointer" }}>
                                    <span id="pp">
                                        <div id="profile-pic">
                                        {review.User.firstName[0]}
                                        </div>
                                        <h2 style={{ whiteSpace: "nowrap", width: "50%", fontSize: "14px" }}>{review.User.firstName} {review.User.lastName}</h2>
                                    </span>
                                    <p style={{ gap: "3px", margin: "0px", color: "#767676", fontSize: "12px", display: "flex", alignItems: "center"}}>
                                            {1 <= review.rating ? <i key={i} className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i> : <i key={i} className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i>}
                                            {2 <= review.rating ? <i key={i} className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i> : <i key={i} className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i>}
                                            {3 <= review.rating ? <i key={i} className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i> : <i key={i} className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i>}
                                            {4 <= review.rating ? <i key={i} className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i> : <i key={i} className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i>}
                                            {5 <= review.rating ? <i key={i} className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i> : <i key={i} className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "black"}}></i>}
                                        {formatTimestamp(review.createdAt)}
                                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                                        DoorDash Order
                                    </p>
                                    <p id="comment">{review.review}</p>
                                </div>
                                )}
                                 <div  style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}>
                                    <div>
                                        <p onClick={(() => history.push(`/restaurant/${id}/reviews`))} id="more-reviews" ><i style={{ width: "16px", height: "16px", fontSize: "16px", color: "black"}} class="fi fi-rr-arrow-small-right"></i> See All</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                    { keys.length == 0 ?
                            <>
                            <div style={{ textAlign: "center"}} id="no-results">
                            <img src="https://img.cdn4dd.com/s/managed/consumer/search/NoResult.svg"></img>
                            { !search ? <h1 style={{ margin: "0px 4px"}}>Menu Unavailable</h1> :
                                <>
                                <h1 style={{ margin: "0px 4px"}}>No Results</h1>
                            <p>There are no items that match your search. Try searching for a different item <br></br>
                                or use the section tabs to browse other menu items.</p>
                            <button style={{ margin: "40px 0px", justifyContent: "center", backgroundColor: "red", color: "white", width: "50%" }} id="browse-again" onClick={(() => setSearch(""))}>Reset Search</button>
                                </>
                            }
                            </div>
                            </>
                        :
                        <>
                    { keys.map((key, i) =>
                    <div ref={el => divRefs.current[`mi-${i}`] = el} style={{ margin: "20px 0px" }} id={`mi-${i}`} className="menu">
                        <h1 style={{ fontSize: "24px", whiteSpace: "nowrap" }}>{key}</h1>
                        <div className="item">
                            { categories[key]?.map((item, i) =>
                                <>
                                <div onClick={(() => setModalContent(<ItemFormModal itemId={item.id}/>))} id="menu-item">
                                    <div id="item">
                                    <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", margin: "0" }}>{item.item}</h1>
                                    <div id="i-info">
                                    <p style={{ fontSize: "13px", color: "#767676"}}>{item.description}</p>
                                    </div>
                                    <span style={{ fontSize: "12px"}}>
                                        <p style={{ fontWeight: "700"}}>${item.price}</p>
                                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                                        <i style={{ color: "#767676", width: "14px", height: "14px", fontSize: "14px" }}  class="fi fi-br-social-network"></i>
                                        <p style={{ color: "#767676"}}>92% (7)</p>
                                    </span>
                                    </div>
                                    <div id="i">
                                        <img src={item.imgUrl}></img>
                                        <i class="fi fi-sr-add"></i>
                                    </div>
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                        )}
                    </>}
                        <div id="print">
                        <p style={{ fontSize: "13px", color: "#767676", margin: "0px"}}> Prices on this menu are set directly by the Merchant.</p>
                        <p style={{ fontSize: "13px", color: "#767676", margin: "0px"}}>2,000 calories a day is used for general nutrition advice, but calorie needs vary. Additional nutrition information available here</p>
                        <p style={{ fontSize: "13px", color: "#767676", margin: "0px"}}>Prices may differ between Delivery and Pickup.</p>
                            <i style={{ width: "24px", height: "24px", fontSize: "24px", marginTop: "10px", marginBottom: "0px" }} class="fi fi-rs-marker"></i>
                        <h1 style={{  marginTop: "0px"}} id="r-addy">{restaurant.type} <h1 style={{ color: "#767676" }}>delivered from</h1> {restaurant.name}%#39;s <h1 style={{ color: "#767676" }}>at</h1> {restaurant.address}</h1>
                        </div>
                </div>
        </div>
    <RestaurantFoot />
            </div>
        </div>
  );
}

export default Franchise;
