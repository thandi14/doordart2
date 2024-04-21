import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";

function ReviewFormTwoModal({ rev }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session );
  const { restaurant }  = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { closeModal } = useModal();
  const history = useHistory()
  const { setItem, setCount } = useFilters()
  const [ data, setData ] = useState({})
  const [ rating, setRating ] = useState(rev.rating)


useEffect(() => {
    async function fetchData() {
        setRating(rev.rating)
    }
    fetchData()

}, [dispatch, rev])

useEffect(() => {
    async function fetchData() {
        //  await dispatch(cartActions.thunkGetCart(restaurant.id))
    }
    fetchData()

}, [dispatch])

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    closeModal()
  };


  return (
    <div id="review-form">
        <div id="close-review">
            <i onClick={handleSubmit} class="fi fi-br-cross"></i>
            <h1 style={{ margin: "0px" }}>Thanks for leaving a review!</h1>
        </div>
        <div style={{ padding: "10px 100px"}} >

        <div id="reviewing-two">
                <div id="your-r">
                <p style={{ fontSize: "14px" }}>{user.firstName} {user.lastName[0]}</p>
                <span><i style={{ display: "flex", width: "14px", height: "14px", fontSize: "14px", color: "black"}} class="fi fi-rr-info"></i> Pending</span>
                </div>
                <div id="rating-two">
                {
                    rating >= 1 ? <i className="fi fi-sr-star" style={{ width: "12px", height: "12px", fontSize: "12px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "12px", height: "12px", fontSize: "12px" }}></i>
                }
               {
                    rating >= 2 ? <i className="fi fi-sr-star" style={{ width: "12px", height: "12px", fontSize: "12px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "12px", height: "12px", fontSize: "12px" }}></i>
                }
               {
                    rating >= 3 ? <i className="fi fi-sr-star" style={{ width: "12px", height: "12px", fontSize: "12px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "12px", height: "12px", fontSize: "12px" }}></i>
                }
               {
                    rating >= 4 ? <i className="fi fi-sr-star" style={{ width: "12px", height: "12px", fontSize: "12px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "12px", height: "12px", fontSize: "12px" }}></i>
                }
                {
                    rating >= 5 ? <i className="fi fi-sr-star" style={{ width: "12px", height: "12px", fontSize: "12px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "12px", height: "12px", fontSize: "12px" }}></i>
                }
                <i style={{ width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                <p>Today</p>
                <i style={{ width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                <p>Reviewed on</p>
                <img style={{ width: "18px", height: "10px"}} src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
                </div>
                <div id="re-two">
                    <p style={{ margin: "0px", fontSize: "14px" }}>{rev.review}</p>
                </div>
            </div>
        </div>
            <p id="guidelines">Your review has been submitted. We'll check your store review to ensure it meets our <span style={{ color: "red" }}>Review Guidelines</span>. You'll recieve an email when your store review is approved and added to this store's page. </p>
        <div id="review-butt">
        <button onClick={handleSubmit}>Done</button>
        </div>
    </div>
  );
}

export default ReviewFormTwoModal;
