import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RestaurantPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";

function CartFormModal({ cartId }) {
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
    closeModal()

};

const deleteCart = async (id) => {
    await dispatch(cartActions.thunkDeleteCart(id))

};


  return (
    <div id="review-form">
        <div style={{ padding: "16px"}} id="cart-form">
            <h1 style={{ margin: "0px"}} >Delete this open cart?</h1>
            <p style={{ margin: "0px"}} >Are you sure you want to delete this open cart?</p>
        </div>
        <div id="review-butt">
        <button style={{ backgroundColor: "transparent", color: "black" }} onClick={handleSubmit}>Cancel</button>
        <button onClick={(() => deleteCart(cartId))}>Yes, delete</button>
        </div>
    </div>
  );
}

export default CartFormModal;
