import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";
import ReviewFormTwoModal from "./index2";

function ReviewFormModal({ itemId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session );
  const { restaurant }  = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { closeModal, setModalContent } = useModal();
  const history = useHistory()
  const { setItem, setCount } = useFilters()
  const [ data, setData ] = useState({})
  const [ rating, setRating ] = useState(0)
  const [ review, setReview ] = useState("")
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const handleChange = (event) => {
    setReview(event.target.value);
  };


  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0);
  };


  let options = cartItem.ItemOptions

  const addItem = () => {
    return
  };

  useEffect(() => {
    async function fetchData() {
        //  await dispatch(cartActions.thunkGetCart(restaurant.id))
    }
    fetchData()

}, [dispatch])

const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
        review,
        rating,
        franchiseId: restaurant.franchiseId
    }
    console.log("before dispatch:", data)
    let r =  await dispatch(restaurantActions.thunkCreateReview(restaurant.id, data))
    console.log("after dispatch:", r)
    closeModal()
    setModalContent(<ReviewFormTwoModal rev={r} />)

  };


  return (
    <div id="review-form">
        <div id="close-review">
            <i onClick={(() => closeModal())} class="fi fi-br-cross"></i>
            <h1 style={{ margin: "0px" }}>Add a Public Review</h1>
        </div>
        <div className="reviewing">
            <p style={{ fontSize: "16px", color: "#494949", margin: "0px" }} >{restaurant.name}</p>
            <div id="reviewing">
                <div id="your-r">
                <p>{user.firstName} {user.lastName[0]}</p>
                <span>Public review<i style={{ display: "flex", width: "14px", height: "14px", fontSize: "14px", color: "black"}} class="fi fi-rr-info"></i></span>
                </div>
                <div id="rating">
                {
                    hoveredIndex >= 1 || rating >= 1 ? <i
                    onClick={(() => setRating(1))}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-sr-star"
                    style={{ width: "34px", height: "34px", fontSize: "34px",  color: "rgb(73, 73, 73)" }}></i> :
                    <i
                    onClick={(() => setRating(1))}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-rr-star"
                    style={{ width: "34px", height: "34px", fontSize: "34px" }}>
                    </i>
                }
                {
                    hoveredIndex >= 2 || rating >= 2 ? <i
                    onClick={(() => setRating(2))}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-sr-star"
                    style={{ width: "34px", height: "34px", fontSize: "34px",  color: "rgb(73, 73, 73)" }}></i> :
                    <i
                    onClick={(() => setRating(2))}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-rr-star"
                    style={{ width: "34px", height: "34px", fontSize: "34px" }}>
                </i>
                }
                {
                    hoveredIndex >= 3 || rating >= 3 ? <i
                    onClick={(() => setRating(3))}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-sr-star"
                    style={{ width: "34px", height: "34px", fontSize: "34px",  color: "rgb(73, 73, 73)" }}></i> :
                    <i
                    onClick={(() => setRating(3))}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-rr-star"
                    style={{ width: "34px", height: "34px", fontSize: "34px" }}></i>
                }
                {
                    hoveredIndex >= 4 || rating >= 4 ? <i
                    onClick={(() => setRating(4))}
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-sr-star" style={{ width: "34px", height: "34px", fontSize: "34px",  color: "rgb(73, 73, 73)" }}></i> :
                    <i
                    onClick={(() => setRating(4))}
                    className="fi fi-rr-star"
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={handleMouseLeave}
                    style={{ width: "34px", height: "34px", fontSize: "34px" }}></i>
                }
                {
                    hoveredIndex >= 5 || rating >= 5 ? <i
                    onClick={(() => setRating(5))}
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={handleMouseLeave}
                    className="fi fi-sr-star" style={{ width: "34px", height: "34px", fontSize: "34px",  color: "rgb(73, 73, 73)" }}></i> :
                    <i
                    onClick={(() => setRating(5))}
                    className="fi fi-rr-star"
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={handleMouseLeave}
                    style={{ width: "34px", height: "34px", fontSize: "34px" }}></i>
                }
                </div>
                <div id="re">
                    <textarea
                    style={{ resize: "none" }}
                    value={review}
                    onChange={handleChange}
                    placeholder="Helpful reviews mention specific items and describe their quality and taste.">
                    </textarea>
                </div>
            </div>
            <p style={{ fontSize: "14px", color: "#767676", margin: "0px" }} >Min characters: 10</p>
        </div>
        <div id="review-butt">
        <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
}

export default ReviewFormModal;
