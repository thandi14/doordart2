import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as cartActions from '../../store/shoppingcart';

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SignupFormModal from "../SignupForm";
import { useModal } from "../../context/Modal";
import empty from "./emptyCart.png"
import { useFilters } from "../../context/Filters";
import CartFormModal from "./CartForm";


function ShoppingCarts({ user, d }) {
  const dispatch = useDispatch();
  const [ drop, setDrop ] = useState(d)
  const { restaurant } = useSelector((state) => state.restaurants);
  const { shoppingCarts } = useSelector((state) => state.cart);
  const history = useHistory()
  const { setModalContent } = useModal()
  const { recentId } = useFilters()
  const [shoppingCart, setShoppingCart] = useState({});
  const [otherCarts, setOtherCarts] = useState([]);

  useEffect(() => {

    let cart
    let carts = [];
    if (recentId) {
        cart = Object.values(shoppingCarts).find(cart => cart.restaurantId == recentId);
        carts = Object.values(shoppingCarts).filter(cart => cart.restaurantId != recentId);
        setShoppingCart(cart);
        console.log(recentId, cart)
    }
    if (!cart) {
        cart = Object.values(shoppingCarts)[0] || null;
        setShoppingCart(cart);
        carts = Object.values(shoppingCarts).filter(cart => cart.restaurantId != shoppingCart.id);

    }

    setOtherCarts(carts);

  }, [recentId, shoppingCarts]);


  useEffect(() => {
      setDrop(d)
  }, [d])


  const deleteItem = async (id) => {
   await dispatch(cartActions.thunkDeleteCartItem(id));
  };

  const updateItem = async (id, quantity) => {
    let data = {
      quantity
    }
    await dispatch(cartActions.thunkUpdateCartItem(id, data));
  };

  let cartItems = shoppingCart && shoppingCart.CartItems?.length ? shoppingCart.CartItems : []

  let totalPrice = cartItems?.reduce((total, item) => {
    let money = 0
    if (item && item.MenuItem) money = item.MenuItem.price
    const itemPrice =  money ? item.quantity * money: 0;
    return total + itemPrice;
  }, 0);


  const pricing = async (cartIs) => {
    let totalPrice = cartIs?.reduce((total, item) => {
        let money = 0
        if (item && item.MenuItem) money = item.MenuItem.price
        const itemPrice =  money ? item.quantity * money: 0;
        return total + itemPrice;
      }, 0);

      return totalPrice
  };


  const ulClassName = drop ? "shopping-menu" : "hidden";

  const checkout = async (id, price) => {
    let data = {
      price
    }

    await dispatch(cartActions.thunkUpdateCart(id, data));
    if (user) {
        history.push('/home')
    }
    else if (!user) {
        if (Object.values(shoppingCarts).length) {
            history.push('/home')
        }
        else {
            history.push('/')
        }
    }

    await dispatch(cartActions.thunkCreateOrder(id))

    window.alert("Order placed! :)")

  };


  return (
    <div className={ulClassName}>
      <div id="shopping-menu" style={{position: "absolute"}}>
      <div style={{ fontSize: "14px" }} id="close">
      <i onClick={(() => setDrop(false))} class="fi fi-br-cross"></i>
      </div>
      <div style={{ overflowY: "scroll", height: "100%" }}>
      { !cartItems?.length && <div id="empty-cart">
        <img src={empty}></img>
        <p style={{ margin: "1px", color: "#767676", fontSize: "13px"}} >Your cart is empty</p>
        <p style={{ margin: "1px", color: "#767676", fontSize: "13px"}}>Add items to get started</p>
      </div>}
      { cartItems?.length > 0 && <div >
        <div style={{ paddingLeft: "16px"}} id="cart-info">
        <p style={{ width: "100%", margin: "0px", color: "#767676", fontSize: "12px", fontWeight: "500"}}>Your cart from</p>
        <h1 style={{ fontSize: "18px", margin: "0px"}}>{shoppingCart.Restaurant.name}</h1>
        <p style={{ width: "100%", margin: "0px", color: "#767676", fontSize: "16px", fontWeight: "300"}}>Maximum order limit: $500.00</p>
        <button onClick={(() => checkout(shoppingCart?.id, totalPrice.toFixed(0)))} style={{ justifyContent: "space-between", display: "flex", }} id="cart-co">
          <p>Checkout</p>
          <p>${totalPrice.toFixed(2)}</p>
          </button>
        </div>
        {
          cartItems.map((item, i) =>
        <div style={{ paddingLeft: "16px"}} id="cart-r">
            <div style={{ border: i == cartItems.length - 1 && otherCarts.length ? "none" : ""}} className="cart-r" id={i == 0 ? "top" : ""}>
              <div>
              <img src={item.MenuItem?.imgUrl}></img>
              </div>
                <div style={{ width: "100%"}}>
                     <h2 id="item-t" style={{ fontSize: "16px", margin: "0px"}}>{item.MenuItem?.item}</h2>
                    {item.CartItemNotes?.length > 0 &&
                    <p id="options" style={{ fontSize: "10px", margin: "0px", color: "#767676"}}>
                    {item.CartItemNotes.map((note) => note.ItemSelection?.selection).join(', ')}
                    </p>}
                    <p style={{ fontSize: "10px", margin: "6px 0px" }}>{item.MenuItem?.price}</p>
                </div>
                <div>
                  <div id="edit-cart">
                  <i onClick={(() => item.quantity == 1 ? deleteItem(item.id) : updateItem(item.id, item.quantity - 1))} class="fi fi-sr-circle-trash"></i>
                  <p style={{ fontSize: "12px"}}>{item.quantity}x</p>
                  <i onClick={(() => {
                    updateItem(item.id, item.quantity + 1)
                  })} class="fi fi-sr-add"></i>
                  </div>
                </div>
            </div>
          </div>
          )}
        </div>
      }
        { otherCarts.length > 0 && <div id="other-carts">
                <h1 style={{ fontSize: "22px"}}>Other carts</h1>
                {otherCarts.map((cart, i) =>
                    <div id="other-c">
                        <div style={{ justifyContent: "space-between", alignItems: "center", display: "flex"}} >
                            <div style={{ gap: "5px", alignItems: "center", display: "flex"}}>
                            <img id="r-ic" style={{ width: "40px", height: "40px", borderRadius: "100%"}} src={cart.Restaurant?.RestaurantImage?.iconUrl}></img>
                            <p>{cart.Restaurant?.name}</p>
                            </div>
                            <i style={{ width:"24px", fontSize: "24px", cursor: "pointer" }} onClick={(() => setModalContent(<CartFormModal cartId={cart.id} />))} class="fi fi-sr-trash-xmark"></i>
                        </div>
                        <div id="each-item">
                            {cart.CartItems.map((item, i) =>
                            <>
                                {i >= 1 && <i style={{ width:"8px", fontSize: "8px", height: "8px" }}  class="fi fi-sr-bullet"></i>} <p style={{ margin:" 4px 0px", fontSize: "13px", color: "#767676" }}>{item.MenuItem?.item}</p>
                            </>
                            )}
                        </div>
                        <div style={{ width: "100%"}}>
                        {cart.CartItems.map((item, i) =>
                            <img style={{ width: "50px", height: "50px"}} src={item.MenuItem?.imgUrl}></img>
                        )}
                        </div>
                        <div onClick={(() => checkout(cart?.id, pricing(cart.CartItems).toFixed(0)))} id="other-butts">
                        <button>Checkout</button>
                        <button onClick={(() => history.push(`restaurants/${cart.Restaurant.id}`))}>Add more items</button>
                        </div>
                    </div>
                )

                }
                </div>}
    </div>
    <div>
    </div>

      </div>
  </div>
  );
}

export default ShoppingCarts;
