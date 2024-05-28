import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ItemForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";
import ItemFormModal from ".";

function Instructions({ itemId }) {
  const dispatch = useDispatch();
  const { restaurant }  = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { setModalContent } = useModal()
  const history = useHistory()
  const [ quantity, setQuantity ] = useState(1)
  const [items, setItems] = useState({});
  const { setItem, setCount } = useFilters()
  const [ data, setData ] = useState({})
  const [ validation, setValidation ] = useState(0)
  const [ optionIds, setOptionIds ] = useState([]);
  const [ price, setPrice ] = useState(0)


  const handleSubmit = async (e) => {

    const generateRandomSessionId = () => {
        return Math.random().toString(36).substring(2);
    };


    // e.preventDefault();
    setCount(quantity)
    setItem(cartItem)
    let selections = Object.values(items)
    const ops = [].concat(...selections);
    let data = { itemId, options: ops, quantity }
    let data1
    if (!shoppingCart?.id) {
        let sessionId = localStorage.getItem('sessionId');

        if (!sessionId) sessionId = generateRandomSessionId();

        const requestBody = {
            sessionId,
        };

        console.log(sessionId)
        localStorage.setItem('sessionId', sessionId);
        data1 = await dispatch(cartActions.thunkCreateCart(restaurant.id, requestBody))
        if (data1) await dispatch(cartActions.thunkCreateCartItem(data1.id, data))
    }
    if (shoppingCart?.id) await dispatch(cartActions.thunkCreateCartItem(shoppingCart.id, data))
  };



  return (
    <div className="item-modal">
        <div id="instruct-item">
        <i onClick={(() => setModalContent(<ItemFormModal />))} class="fi fi-rr-arrow-small-left"></i>
        </div>
        <div id="instruct-modal">
        <div className="item-one">
            <h1 style={{ fontSize: "24px" }} >User Preferences</h1>
        </div>
        <div style={{ marginTop: "15px"}} id="si">
            <span>
            <h2 style={{ fontSize: "14px", color: "#b2b2b2ff"}}>Add Special Instructions</h2>
            </span>
            <span onClick={(() => window.alert("Feature coming soon"))} style={{ cursor: "pointer"}}>
                <textarea id="instruct" value={"The store has chosen not to accept special requests. Contact them directly with questions about their menus."}>
                </textarea>
            </span>
        </div>
        <div style={{ marginTop: "15px"}} id="si">
            <span>
            <h2 style={{ fontSize: "14px" }}>If item is unavailable</h2>
            </span>
            <span onClick={(() => window.alert("Feature coming soon"))} style={{ cursor: "pointer"}}>
                <div id="unavailable">
                    <p style={{ margin: "0px" }}>Go with merchant recommendation</p>
                    <i class="fi fi-rr-angle-small-down"></i>
                </div>
            </span>
        </div>
        </div>
        <div id="buy-item">
            <button onClick={(() => window.alert("Feature coming soon"))} >
               Save
            </button>
        </div>
    </div>
  );
}

export default Instructions;
