import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";

function ReviewFormThreeModal({ rev }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session );
  const { restaurant, review }  = useSelector((state) => state.restaurants);
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
        //  await dispatch(restaurantActions.thunkGetReview(rId))
    }
    fetchData()

}, [dispatch])

const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal()
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



  return (
    <div id="reviewed-form">
        <div id="close-reviewed">
            <i style={{ cursor: "pointer" }} onClick={handleSubmit} class="fi fi-br-cross"></i>
            <h1 style={{ margin: "0px", fontSize: "20px" }}>{rev.User.firstName} {rev.User.lastName[0]}</h1>
        </div>
        <div id="reviewing-three">
                <div id="rating-three">
                {
                    rating >= 1 ? <i className="fi fi-sr-star" style={{ width: "22px", height: "22px", fontSize: "22px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "22px", height: "22px", fontSize: "22px", color: "rgb(73, 73, 73)" }}></i>
                }
               {
                    rating >= 2 ? <i className="fi fi-sr-star" style={{ width: "22px", height: "22px", fontSize: "22px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "22px", height: "22px", fontSize: "22px", color: "rgb(73, 73, 73)"}}></i>
                }
               {
                    rating >= 3 ? <i className="fi fi-sr-star" style={{ width: "22px", height: "22px", fontSize: "22px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "22px", height: "22px", fontSize: "22px", color: "rgb(73, 73, 73)" }}></i>
                }
               {
                    rating >= 4 ? <i className="fi fi-sr-star" style={{ width: "22px", height: "22px", fontSize: "22px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "22px", height: "22px", fontSize: "22px", color: "rgb(73, 73, 73)" }}></i>
                }
                {
                    rating >= 5 ? <i className="fi fi-sr-star" style={{ width: "22px", height: "22px", fontSize: "22px",  color: "rgb(73, 73, 73)" }}></i> : <i className="fi fi-rr-star" style={{ width: "22px", height: "22px", fontSize: "22px", color: "rgb(73, 73, 73)" }}></i>
                }
                <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                <p>{formatTimestamp(rev.createdAt)}</p>
                <i style={{ color: "#767676", width: "8px", height: "8px", fontSize: "8px", display: "flex" }} class="fi fi-sr-bullet"></i>
                <p>DoorDart Order</p>
                </div>
                <div id="re-two">
                    <p style={{ margin: "0px", fontSize: "16px" }}>{rev.review}</p>
                </div>
                <div>
                <button id="helpful"><i class="fi fi-rr-bulb"></i>Helpful</button>
                </div>
        </div>
        <div id="reviewed-butt">
        <button onClick={(() => {
            closeModal()
            history.push(`/restaurant/${rev.restaurantId}/reviews`)
            })} style={{ backgroundColor: "transparent" }} >View All Reviews</button>
        <button onClick={handleSubmit}>Close</button>
        </div>
    </div>
  );
}

export default ReviewFormThreeModal;
