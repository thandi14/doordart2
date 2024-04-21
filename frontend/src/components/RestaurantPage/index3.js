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

function calculateRatingPercentages(reviews) {
    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    reviews.forEach(review => {
      const rating = review.rating;
      ratingCounts[rating]++;
    });

    const totalReviews = reviews.length;

    const ratingPercentages = {};
    for (const rating in ratingCounts) {
      const count = ratingCounts[rating];
      const percentage = (count / totalReviews) * 100;
      ratingPercentages[rating] = percentage.toFixed(0);
    }

    return ratingPercentages;
}


function FranchiseTwo({ isLoaded }) {
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
  const [ roll, setRoll ] = useState(false)
  const [ search, setSearch ] = useState("")
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



  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
        dispatch(cartActions.thunkGetCart(id))
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

    let result = sum / reviews?.length

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


    let keys = []

    for (let key of Object.keys(categories)) {
        if (categories[key].length) {
            keys.push(key)
        }
    };



    let items = []

    if (menu?.length) items = menu.filter((i) => i.category == selection)

    let reviews = []
    reviews = restaurant.Reviews
    let peakR = []
    peakR = reviews?.slice(0, 2)

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        // Extract components
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
        const year = date.getFullYear().toString().slice(-2); // Extract last two digits

        // Format into MM/DD/YY
        return `${month}/${day}/${year}`;
    }

    useEffect(() => {

        const rollToTarget = () => {
            const handleScrollOrNavigate = () => {
                const targetElement = document.getElementById(`grid`);
                if (targetElement && roll) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    setRoll(false)
                }
            };

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                handleScrollOrNavigate();
            } else {
                document.addEventListener('DOMContentLoaded', handleScrollOrNavigate);
            }
        };

        rollToTarget();

    }, [roll]);

    let revCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };

    if (reviews?.length) {
       revCount = calculateRatingPercentages(reviews)
    }


    console.log(revCount, reviews)



  return (

        <div style={{ width: "100%"}} id="rp-st">

            <div className="rp-h" id={"hidden"}>
                        <div id="rp-h-one">

                            <div style={{ width: "50%", display: "flex", gap: "5px", flexDirection: "column"}}>
                            <h1 style={{ gap: "10px", fontSize: "20px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Lunch Menu <i style={{ width: "20px", height: "20px", fontSize: "20px" }} class="fi fi-rr-angle-small-down"></i></h1>
                            <p style={{ width: "100%", gap: "4px", margin: "0px", color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
                                {restaurant.RestaurantTime?.monday}
                            </p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", width: "50%", alignItems: "flex-end"}}>
                            <div id="item-search">
                            <i class="fi fi-rr-search"></i>
                            <input
                            // value={search}
                            // onChange={((e) => setSearch(e.target.value))}
                            onKeyDown={((e) => {
                                if (e.key === 'Enter') {
                                    setSearch(e.target.value);
                                  }
                            })}
                            placeholder={`Search store menu`}></input>
                            </div>
                            </div>
                        </div>
                        <span id="scroll-to" style={{ gap: "15px", justifyContent: "center", fontSize: "13px", width: "100%", display: "flex", color: "#767676"}}>
                            {/* <p onClick={(() => {
                                setScroll(true)
                                setMark(-5)
                                })} style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -5 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Order it again</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-4)
                                })}  style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -4 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Item Deals</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-3)
                                })}  style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -3 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Reviews</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-2)
                                })}  style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -2 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Most Ordered</p>
                            </p> */}
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-1)
                                })}  style={{ position: "relative",  overflow: "hidden", margin: "0px" }}>
                                <div id={mark == -1 ? "mark-two" : "hidden"}></div>
                                <p style={{ color: mark == -1 ? "black" : "rgb(73, 73, 73)",  padding: "2px 0px" }}>Reviews</p>
                            </p>
                            {keys.map((category, i) =>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(i)
                                })}  style={{ position: "relative",  overflow: "hidden", margin: "0px"  }}>
                                <div id={mark == i ? "mark-two" : "hidden"}></div>
                                <p style={{ color: mark == i ? "black" : "rgb(73, 73, 73)",  padding: "2px 0px" }}>{category}</p>
                            </p>
                            )}
                            </span>


            </div>

        <div className="rp">
            <div id="pages"> <span>Home</span> / <span>{restaurant.address?.split(",")[1]}</span> / <span>{restaurant.type}</span> / <span>{restaurant.name}</span> </div>
            <div style={{ backgroundImage: `url(${restaurant.RestaurantImage?.bannerUrl})`, borderRadius: "16px" }} id="rp-one">
                <div id="rp-ban">
                     <img src={restaurant.RestaurantImage?.iconUrl}></img>
                </div>
            </div>
            <div id="rp-two">
                <div style={{ width: "70%"}} id="r-info">
                    <div id="info-one">
                        <h1 style={{ marginBottom: "36px", marginBottom: "10px"}} >{restaurant.name}</h1>
                        <h2 style={{ fontSize: "20px", whiteSpace: "nowrap"}}>Store Info</h2>
                        <span id="io" style={{ display: "flex", gap: "8px"}}>
                            <p style={{ color: "#767676", fontSize: "13px", display: "flex", alignItems: "center", gap: "5px"}}>
                                {allReviews(restaurant.Reviews)}
                                <i class="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}}></i>
                               <span>{` (${restaurant.Reviews?.length}+ ratings)`}</span>
                            </p>
                            <div id="line-thirteen"></div>
                            <p style={{ color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}} >
                                American
                            </p>
                            <div id="line-thirteen"></div>
                            <p style={{ color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}} >
                                {restaurant.miles} mi
                            </p>
                            <div id="line-thirteen"></div>
                            <p style={{ color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}} >
                                $
                            </p>
                        </span>
                        <p style={{ fontSize: "13px", color: "#767676"}}>
                             <i style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}} class="fi fi-rr-clock-three"></i>
                            <p style={{ fontSize: "13px", color: "green", margin: "0px"}}>Open now</p>
                            <i style={{ width: "8px", height: "8px", fontSize: "8px", color: "#767676" }} class="fi fi-sr-bullet"></i>
                            Closes at {night}
                        </p>
                        <p style={{ fontSize: "13px", color: "#767676", display: "flex", gap: "5px", alignItems: "center" }}>Pricing & Fees<i style={{ width: "10px", height: "10px", fontSize: "10px" }}  class="fi fi-rr-circle-i"></i></p>
                    </div>
                    <div ref={el => divRefs.current[`mi-${-1}`] = el} className="review">
                        <div id="review-one">
                            <div>
                                <h1 style={{ fontSize: "24px", whiteSpace: "nowrap", margin: "0px" }}>Ratings & Reviews</h1>
                            </div>
                        </div>
                        <div style={sliderStyle} id="review-three">
                            <div id="rates">

                            <div id="other-rev">
                            <div>
                            <p style={{ fontSize: "36px", margin: "4px 0px", fontWeight: "700" }}>{allReviews(restaurant.Reviews)}</p>
                            <div>
                                {allReviews(restaurant.Reviews) >= 1 ? <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-sr-star"></i> : <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-rr-star"></i> }
                                {allReviews(restaurant.Reviews) >= 2 ? <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-sr-star"></i> : <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-rr-star"></i> }
                                {allReviews(restaurant.Reviews) >= 3 ? <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-sr-star"></i> : <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-rr-star"></i> }
                                {allReviews(restaurant.Reviews) >= 4 ? <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-sr-star"></i> : <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-rr-star"></i> }
                                {allReviews(restaurant.Reviews) >= 5 ? <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-sr-star"></i> : <i style={{ width: "14px", height: "14px", fontSize: "14px", color: "gold"}} class="fi fi-rr-star"></i> }
                            </div>
                            <p style={{ margin: "4px", whiteSpace: "nowrap", color: "#767676", fontSize: "13px", display: "flex", alignItems: "center", gap: "5px"}}>
                                {restaurant.Reviews?.length}+
                               <span> ratings ratings</span>
                            </p>
                            </div>
                            <div id="more-ratings" style={{ height: "100%", width: "80%", justifyContent: "center" }}>
                                <div style={{ height: "100%", fontSize: "12px", display: "flex", flexDirection: "column", gap: "6px" }} >
                                    <span style={{ maxWidth: "450px", display: "flex", alignItems: "center", gap: "10px", width: "100%" }} >5 <div id="a-bar"><div style={{ width: `${revCount["5"]}%`}} id="in-a-bar"></div></div></span>
                                    <span style={{ maxWidth: "450px", display: "flex", alignItems: "center", gap: "10px", width: "100%" }} >4 <div id="a-bar"><div style={{ width: `${revCount["4"]}%`}} id="in-a-bar"></div></div></span>
                                    <span style={{ maxWidth: "450px", display: "flex", alignItems: "center", gap: "10px", width: "100%" }} >3 <div id="a-bar"><div style={{ width: `${revCount["3"]}%`}} id="in-a-bar"></div></div></span>
                                    <span style={{ maxWidth: "450px", display: "flex", alignItems: "center", gap: "10px", width: "100%" }} >2 <div id="a-bar"><div style={{ width: `${revCount["2"]}%`}} id="in-a-bar"></div></div></span>
                                    <span style={{ maxWidth: "450px", display: "flex", alignItems: "center", gap: "10px", width: "100%" }} >1 <div id="a-bar"><div style={{ width: `${revCount["1"]}%`}} id="in-a-bar"></div></div></span>
                                </div>
                            </div>
                            </div>
                            </div>
                            <div style={{ margin: "4px 0px", marginLeft: "16px"}} id="line-five"></div>
                            <div id="r4">
                                { peakR?.map((review, i) =>
                                    <div style={{ width: "auto"}} id="reviewing-five">
                                    <div id="re-two">
                                        <p style={{ margin: "0px", fontSize: "16px", fontWeight: "500" }}>"{review.review}"</p>
                                    </div>
                                    <div style={{ fontSize: "8px" }} id="rating-three">
                                    {
                                        review.rating >= 1 ? <i className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "rgb(73, 73, 73)" }}></i>
                                    }
                                    {
                                        review.rating >= 2 ? <i className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "rgb(73, 73, 73)"}}></i>
                                    }
                                    {
                                        review.rating >= 3 ? <i className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "rgb(73, 73, 73)" }}></i>
                                    }
                                    {
                                        review.rating >= 4 ? <i className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "rgb(73, 73, 73)" }}></i>
                                    }
                                    {
                                        review.rating >= 5 ? <i className="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "rgb(73, 73, 73)" }}></i>
                                    }
                                    <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                                    <p style={{ fontSize: "12px" }}>
                                    {review.User.firstName} {review.User.lastName[0]}
                                    </p>
                                    <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                                    <p style={{ fontSize: "12px" }}>{formatTimestamp(review.createdAt)}</p>
                                    <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                                    </div>
                                    {/* <div style={{ padding: "16px 0px 0px"}}></div> */}
                                    <div>
                                    </div>
                            </div>
                                    )}
                                    <div style={{ padding: "0px 16px", paddingBottom: "16px" }}>

                                    <button onClick={(() => setRoll(true))} id="more-reviews-two">{reviews?.length ? "See More Reviews" : "No Reviews"} { reviews?.length > 0 && <i style={{ width: "16px", height: "16px", fontSize: "16px", color: "black"}} class="fi fi-rr-arrow-small-down"></i>}</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/* <div id="info-two">
                            <h1 style={{ fontSize: "20px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Lunch Menu <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-rr-angle-small-down"></i></h1>
                            <p style={{ fontSize: "13px", color: "#767676"}}>{restaurant.RestaurantTime?.monday}</p>
                            <span style={{ fontSize: "13px", width: "100%", overflowY: "scroll"}}>
                            {/* <p onClick={(() => {
                                setScroll(true)
                                setMark(-5)
                                })} style={{ position: "relative"}}>
                                <div id={mark == -5 ? "mark-two" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Order it again</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-4)
                                })}   style={{ position: "relative"}}>
                                <div id={mark == -4 ? "mark-two" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Item Deals</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-3)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -3 ? "mark-two" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Reviews</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-2)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -2 ? "mark-two" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Most Ordered</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-1)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -1 ? "mark-two" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Reviews</p>
                            </p>
                            {keys.map((category, i) =>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(i)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == i ? "mark-two" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>{category}</p>
                            </p>
                            )}
                            </span>
                    </div> */}
                </div>
                <div style={{ width: "30%"}} id="r-items">
                    {/* <div style={{ display: "flex", justifyContent: "flex-end", width: "100%"}}>
                        <div id="item-search">
                        <i class="fi fi-rr-search"></i>
                        <input placeholder={`Search ${restaurant.name}`}></input>
                        </div>
                    </div> */}
                    <div style={{ padding: "0px", display: "flex", flexDirection: "column", gap: "15px" }} >
                        <button onClick={(() => window.alert("Feature coming soon"))}  style={{ alignItems: "center", width: "100%", justifyContent: "center", display: "flex", gap: "10px" }} id="group-butt">
                            <i style={{ width: "14px", width: "14px", fontSize: "14px"}} class="fi fi-sr-users-medical"></i> Group Order</button>
                        <div style={{ padding: "0px" }} className="group-two" id= "group">
                            <span>
                            <h1 style={{ width: "100%", justifyContent: "center", fontSize: "16px", whiteSpace: "nowrap", display: "flex", margin: "0px" }}>${restaurant.deliveryFee}</h1>
                            <h2 style={{ fontSize: "12px", color: "#767676", margin: "0px" }}>delivery fee</h2>
                            </span>
                            <div style={{ width: "1px" }} id="line-four"></div>
                            <span>
                            <h1 style={{ width: "100%", justifyContent: "center", fontSize: "16px", whiteSpace: "nowrap", display: "flex", margin: "0px" }}>{restaurant.mins + 10} min</h1>
                            <h2 style={{ fontSize: "12px", color: "#767676", margin: "0px"}}> delivery time</h2>
                            </span>
                        </div>
                    </div>

        </div>
                </div>
            </div>
            <div className="rp-h" style={{ border: "0px" }}id={"rp-head"}>
                        <div id="rp-h-one">

                            <div style={{ width: "50%", display: "flex", gap: "5px", flexDirection: "column"}}>
                            <h1 style={{ gap: "10px", fontSize: "20px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Lunch Menu
                            {/* <i style={{ width: "20px", height: "20px", fontSize: "20px" }} class="fi fi-rr-angle-small-down"></i> */}
                            </h1>
                            <p style={{ width: "100%", gap: "4px", margin: "0px", color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
                                {restaurant.RestaurantTime?.monday}
                            </p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", width: "50%", alignItems: "flex-end"}}>
                            <div id="item-search">
                            <i class="fi fi-rr-search"></i>
                            <input placeholder={`Search store menu`}></input>
                            </div>
                            </div>
                        </div>
                        <span id="scroll-to" style={{ gap: "15px", justifyContent: "center", fontSize: "13px", width: "100%", display: "flex", color: "#767676"}}>
                            {/* <p onClick={(() => {
                                setScroll(true)
                                setMark(-5)
                                })} style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -5 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Order it again</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-4)
                                })}  style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -4 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Item Deals</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-3)
                                })}  style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -3 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Reviews</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-2)
                                })}  style={{ position: "relative",  overflow: "hidden" }}>
                                <div id={mark == -2 ? "mark-two" : "hidden"}></div>
                                <p style={{ padding: "2px 0px" }}>Most Ordered</p>
                            </p> */}
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-1)
                                })}  style={{ position: "relative",  overflow: "hidden", margin: "0px" }}>
                                <div id={mark == -1 ? "mark-two" : "hidden"}></div>
                                <p style={{ color: mark == -1 ? "black" : "rgb(73, 73, 73)",  padding: "2px 0px" }}>Reviews</p>
                            </p>
                            {keys.map((category, i) =>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(i)
                                })}  style={{ position: "relative",  overflow: "hidden", margin: "0px"  }}>
                                <div id={mark == i ? "mark-two" : "hidden"}></div>
                                <p style={{ color: mark == i ? "black" : "rgb(73, 73, 73)",  padding: "2px 0px" }}>{category}</p>
                            </p>
                            )}
                            </span>
                                <div style={{ backgroundColor: "rgb(231, 231, 231)", height: "1px", width: "80%" }}></div>

            </div>
            <div style={{ width: keys?.length == 0 && "100%", boxSizing: keys?.length == 0 && "border-box" }} id="rp-three">
                        {keys?.length == 0 ?
                            <>
                            <div style={{ textAlign: "center"}} id="no-results">
                            <img src="https://img.cdn4dd.com/s/managed/consumer/search/NoResult.svg"></img>
                            { !search ? <h1 style={{ margin: "0px 4px"}}>Menu Unavilable</h1> :
                                <>
                                <h1 style={{ margin: "0px 4px"}}>No Results</h1>
                            <p>There are no items that match your search. Try searching for a different item <br></br>
                                or use the section tabs to browse other menu items.</p>
                            <button style={{ margin: "40px 0px", justifyContent: "center", backgroundColor: "red", color: "white", width: "50%" }} id="browse-again" onClick={(() => setSearch(""))}>Reset Search</button>
                                </>
                            }
                            </div>
                            </>
                        : <>
                    { keys.map((key, i) =>
                    <div ref={el => divRefs.current[`mi-${i}`] = el} style={{ margin: "20px 0px" }} id={`mi-${i}`} className="menu">
                        <h1 style={{ fontSize: "24px", whiteSpace: "nowrap" }}>{key}</h1>
                        <div className="item">
                            { categories[key].map((item, i) =>
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
                        { reviews?.length > 0 && <div style={{ padding: "4% 0%" }}>
                        <h1 style={{ fontSize: "32px", whiteSpace: "nowrap", margin: "0px" }}>Ratings & Reviews</h1>
                                <p style={{ gap: "3px", margin: "18px 0px", color: "#767676", fontSize: "16px", display: "flex", alignItems: "center"}}>
                                    <span style={{ color: "black", fontSize: "18px", fontWeight: "600" }}>{allReviews(restaurant.Reviews)}</span>
                                    <i class="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "gold"}}></i>
                                    {restaurant.Reviews?.length}+
                                    ratings ratings,
                                    <span> {reviews?.length}</span> public reviews
                                </p>
                                <div id="grid">
                        { reviews?.map((review, i) =>
                                <div style={{ width: "auto"}} id="reviewing-four">
                                <h1 style={{ margin: "0px", fontSize: "16px" }}>{review.User.firstName} {review.User.lastName[0]}</h1>
                                 <div id="rating-three">
                                 {
                                    review.rating >= 1 ? <i className="fi fi-sr-star" style={{ width: "16px", height: "16px", fontSize: "16px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "16px", height: "16px", fontSize: "16px", color: "rgb(73, 73, 73)" }}></i>
                                 }
                                {
                                    review.rating >= 2 ? <i className="fi fi-sr-star" style={{ width: "16px", height: "16px", fontSize: "16px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "16px", height: "16px", fontSize: "16px", color: "rgb(73, 73, 73)"}}></i>
                                 }
                                {
                                    review.rating >= 3 ? <i className="fi fi-sr-star" style={{ width: "16px", height: "16px", fontSize: "16px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "16px", height: "16px", fontSize: "16px", color: "rgb(73, 73, 73)" }}></i>
                                 }
                                {
                                    review.rating >= 4 ? <i className="fi fi-sr-star" style={{ width: "16px", height: "16px", fontSize: "16px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "16px", height: "16px", fontSize: "16px", color: "rgb(73, 73, 73)" }}></i>
                                 }
                                 {
                                    review.rating >= 5 ? <i className="fi fi-sr-star" style={{ width: "16px", height: "16px", fontSize: "16px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "16px", height: "16px", fontSize: "16px", color: "rgb(73, 73, 73)" }}></i>
                                 }
                                 <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                                 <p>{formatTimestamp(review.createdAt)}</p>
                                 <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                                 <p>DoorDart Order</p>
                                 </div>
                                 <div id="re-two">
                                     <p style={{ margin: "0px", fontSize: "16px" }}>{review.review}</p>
                                 </div>
                                 <div style={{ padding: "16px 0px 0px"}}></div>
                                 <div>
                                 <button id="helpful"><i class="fi fi-rr-bulb"></i>Helpful</button>
                                 </div>
                         </div>
                                )}
                                </div>
                                 <div >
                                    <div>
                                        <button onClick={(() => history.push(`/restaurant/${id}/reviews`))} id="more-reviews-two" >See More<i style={{ width: "16px", height: "16px", fontSize: "16px", color: "black"}} class="fi fi-rr-arrow-small-down"></i></button>
                                    </div>
                                </div>
                        </div>}
            </div>
    <RestaurantFoot />
        </div>
  );
}

export default FranchiseTwo;
