import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import { useFilters } from "../../context/Filters";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import ItemFormModal from "../ItemForm";
import ReviewFormModal from "../ReviewForm";
import ReviewFormThreeModal from "../ReviewForm/index3";
import RestaurantNav from "../RestaurantPage/RestaurantNav";
import RestaurantFoot from "../RestaurantPage/RestaurantFoot";
import './ReviewPage.css'
import Profile from "../HomePage/Profile";
import HomeNav from "../HomePage/HomeNav";
import HomeNavTwo from "../HomePage/HomeNavTwo";

function ReviewPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurant, reviews } = useSelector((state) => state.restaurants);
  const { id } = useParams();
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const { setModalContent } = useModal()
  const [threshold, setThreshold] = useState(450);
  const { location, profile, setProfile } = useFilters()
  const history = useHistory()
  const targetRef = useRef()


  useEffect(() => {
    async function fetchData() {
           let data = {
               address: location
           }
         await dispatch(restaurantActions.thunkGetRestaurant(id, data))
       }
    fetchData()

 }, [dispatch, location, id])

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(restaurantActions.thunkGetReviews(id, 1))
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [currentPage]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (windowHeight + scrollTop >= documentHeight - threshold) {
      const storedCurrentPage = localStorage.getItem("currentPage");

        setCurrentPage(currentPage + 1);
        setThreshold(threshold + 200);
        dispatch(restaurantActions.thunkGetReviews(id, currentPage))

  };
  }

  const rating = (reviews) => {

    if (!reviews?.length) return 0

    let sum = 0
    for (let review of reviews) {
        sum += review.rating
    }

    let result = sum / reviews.length

    return result.toFixed(1)

  };


    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        // Extract components
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
        const year = date.getFullYear().toString().slice(-2); // Extract last two digits

        // Format into MM/DD/YY
        return `${month}/${day}/${year}`;
    }

    let allReviews = Object.values(reviews)


  return (
    <div style={{ position: "relative"}}>
    {user ? <HomeNavTwo /> : <HomeNav /> }
    <div style={{ display: "flex"}}>
    <div className="side-bar" style={{ position: "sticky", height: "100vh", top: "64px", zIndex: 10}}>

{ user?.id && <div onClick={(() => window.alert("Feature coming soon"))}  id="side-bar">
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
    { profile && <div ref={targetRef} style={{ left: "220px"}}  id="profile-modal">
        <Profile user={user} d={profile} />
    </div>}
</div>}
    </div>
    <div style={{ width: "100%"}} >
        <div className="review-page">
            <div id="review-head">
                <div style={{ padding: "0px 4%"}} >
                <div id="ro-one">
                    <i onClick={(() => history.push(`/restaurant/${restaurant.id}`))} class="fi fi-sr-angle-circle-left"></i>
                    <div id="ro-name"> <p style={{ margin: "0px", fontSize: "14px", textDecoration: "underline"}}>{restaurant.name}</p> <span style={{ color: "#767676", fontSize: "14px", marginLeft: "5px"}}>/</span></div>
                </div>
                <h1 style={{ margin: "15px 0px"}} >Rating & Reviews</h1>
                </div>
            </div>
            <div id="rev-page">
            <div id="reviewed-one">
            <div style={{ gap: "10px"}} id="ro-rating">
            <h1 style={{ margin: "0px"}}>{rating(allReviews)}</h1>
            <i class="fi fi-sr-star" style={{ width: "30px", height: "30px", fontSize: "30px", color: "gold"}}></i>
            </div>
            <p style={{ whiteSpace: "nowrap", lineHeight: '16px', gap: "3px", margin: "0px", color: "rgb(73, 73, 73)", fontSize: "13px",}}>
                                    {restaurant.Reviews?.length}+
                                    ratings ratings,
                                    {/* <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i> */}
                                     <span> {allReviews?.length}</span> public reviews
            <p style={{  marginTop: "10px", fontSize: "13px", color: "rgb(118, 118, 118)" }} id="review-what">What are public reviews? <i style={{ display: "flex", width: "18px", height: "18px", fontSize: "18px", color: "rgb(118, 118, 118)"}} class="fi fi-rr-info"></i></p>
            </p>
            <div style={{  justifyContent: "flex-start" }} id="add-r">
            <button onClick={(() => setModalContent(<ReviewFormModal />))}>Add a Review</button>
            </div>
            </div>
            <div id="reviewed-two">

                { allReviews.map((review, i) =>
                     <div id="reviewing-four">
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
                     <button onClick={(() =>  window.alert("Feature coming soon!"))} id="helpful"><i class="fi fi-rr-bulb"></i>Helpful</button>
                     </div>
             </div>
                )}

            </div>
            </div>
        </div>
    <RestaurantFoot />
    </div>
    </div>
    </div>
  );
}

export default ReviewPage;
