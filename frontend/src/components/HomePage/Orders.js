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
import '../ReviewPage/ReviewPage.css'
import Profile from "../HomePage/Profile";
import HomeNav from "../HomePage/HomeNav";
import HomeNavTwo from "../HomePage/HomeNavTwo";

function OrdersPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { userOrders } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const { setModalContent } = useModal()
  const [threshold, setThreshold] = useState(450);
  const { location, profile, setProfile } = useFilters()
  const history = useHistory()
  const targetRef = useRef()


  useEffect(() => {
    async function fetchData() {
         dispatch(cartActions.thunkUserOrders())
       }
    fetchData()

 }, [dispatch, location])

  useEffect(() => {
    window.scrollTo(0, 0);
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

    };
  }


    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const year = date.getFullYear().toString().slice(-2);
        return `${month}/${day}/${year}`;
    }

    let allOrders = Object.values(userOrders)

    let reviews = allOrders.flatMap((or) => or.Restaurant.Reviews);

    const renderStars = (rating, hoverRating, onMouseEnter, onMouseLeave, onClick) => {
        return [...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`fi ${index < (hoverRating || rating) ? 'fi-sr-star' : 'fi-rr-star'}`}
            style={{ width: "28px", height: "28px", fontSize: "28px", color: "rgb(73, 73, 73)" }}
            onMouseEnter={() => onMouseEnter(index + 1)}
            onMouseLeave={onMouseLeave}
            onClick={() => onClick(index + 1)}
          ></i>
        ));
      };

      const StarRating = ({ rated, initialRating, onRatingChange }) => {
        const [rating, setRating] = useState(initialRating);
        const [hoverRating, setHoverRating] = useState(null);

        const handleMouseEnter = (rating) => setHoverRating(rating);
        const handleMouseLeave = () => setHoverRating(null);
        const handleClick = (rating) => {
          setRating(rating);
          if (onRatingChange) onRatingChange(rating);
          !rated && setModalContent(<ReviewFormModal rev={rating} />)
        };



        return (
          <div id="order-three">
            {renderStars(rating, hoverRating, handleMouseEnter, handleMouseLeave, handleClick)}
          </div>
        );
      };




  return (
    <div style={{ position: "relative"}}>
    {user ? <HomeNavTwo /> : <HomeNav /> }
    <div style={{ display: "flex"}}>
    <div className="side-bar" style={{ minWidth: "220px", position: "sticky", height: "100vh", top: "64px", zIndex: 10}}>

{ user?.id && <div onClick={(() => window.alert("Feature coming soon"))}  id="side-bar">
    <span onClick={((e) => {
        e.stopPropagation()
        history.push('/home')})}>
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
    <span onClick={((e) => {
        e.stopPropagation()
        })}className="page">
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
            <div id="order-page">
            <div id="review-head">
                <div style={{ paddingBottom: "16px"}} >
                <h1 style={{ fontSize: "24px", margin: "15px 0px"}} >Orders</h1>
                <h1 style={{ fontSize: "18px", margin: "0px"}}>Completed</h1>
                </div>
            </div>
            <div id="reviewed-two">

                { allOrders.map((order, i) =>
                <div className="order-four">
                        <div onClick={((e) => {
        history.push(`/restaurant/${order.Restaurant.id}`)})}id="or-restaurant">
                    <h1 style={{ margin: "0px", fontSize: "16px" }}>{order.Restaurant.name}</h1>
                    <i class="fi fi-rr-angle-small-right"></i>
                            </div>
                     <div id="order-four">
                     <div id="rating-three">
                     <p>{formatTimestamp(order.createdAt)}</p>
                     <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                     <p style={{ margin: "0px", fontSize: "16px" }}>${order.price}</p>
                     <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                     <p style={{ margin: "0px", fontSize: "16px" }}>{order.CartItems.length} items</p>
                     </div>
                     <div id="items">
                     <div id="or-two">
                         <p style={{ margin: "0px", fontSize: "16px" }}>{order.CartItems.map((item) => item.MenuItem.item).join(', ')}</p>
                     </div>
                     <div id="or-button">
                     <button onClick={(() =>  window.alert("Feature coming soon!"))} id="helpful"><i class="fi fi-rr-shopping-cart-add"></i>Reorder</button>
                     <button onClick={(() =>  window.alert("Feature coming soon!"))} id="helpful"><i class="fi fi-rr-tags"></i>View Receipt</button>
                     </div>
                     </div>
                     <div className="order-three">

                     <div id="order-three">
                            <StarRating rated={order.Restaurant.Reviews.some((r) => r.orderId == order.id )} rating={ order.Restaurant.Reviews.some((r) => r.orderId == order.id ) ? order.Restaurant.Reviews.find((r) => r.orderId == order.id ) : 0} />
                     </div>
                     <div id="leave-r">
                     <i style={{ width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                        <p>Leave a review</p>
                        </div>
                        </div>
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

export default OrdersPage;
