import { csrfFetch } from "./csrf";

const GET_CART = "cart/getCart";
const GET_DISCOUNTS = "cart/getDiscounts";
const GET_ORDERED = "cart/getOrdered";
const GET_ORDERS = "cart/getOrders";
const GET_ORDERED_ITEMS = "cart/getOrderedItems";
const GET_ORDERED_ITEM = "cart/getOrderedItem";
const GET_DETAILS = "cart/getDetails";
const GET_UPDATES = "cart/getUpdates";
const GET_CARTS = "cart/getCarts";
const GET_ITEM = "cart/getItem";
const DELETE_ITEM = "cart/deleteItem";
const DELETE_CART = "cart/deleteCart";


const getCarts = (carts) => {
  return {
    type: GET_CARTS,
    carts,
  };
};

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const getDiscounts = (discounts) => {
  return {
    type: GET_DISCOUNTS,
    discounts,
  };
};

const getOrdered = (orders) => {
  return {
    type: GET_ORDERED,
    orders,
  };
};

const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const getOrderedItems = (orders) => {
  return {
    type: GET_ORDERED_ITEMS,
    orders,
  };
};

const getOrderedItem = (item) => {
  return {
    type: GET_ORDERED_ITEM,
    item,
  };
};

const getDetails = (details) => {
  return {
    type: GET_DETAILS,
    details,
  };
};

const getUpdates = (updates) => {
  return {
    type: GET_UPDATES,
    updates,
  };
};



const getItem = (item) => {
    return {
      type: GET_ITEM,
      item,
    };
};

const deleteCartItem = (id) => {
  return {
    type: DELETE_ITEM,
    id,
  };
};

const deleteCart = (id) => {
  return {
    type: DELETE_CART,
    id,
  };
};


export const thunkGetCart = (id, data) => async (dispatch) => {

  const response = await csrfFetch(`/api/restaurants/${id}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getCart(data1));
  return response;
};

export const thunkGetDiscounts = (id, data) => async (dispatch) => {

  const response = await csrfFetch(`/api/shoppingcarts/discounts`)
  const data1 = await response.json();
  dispatch(getDiscounts(data1));
  return response;
};

export const thunkGetMostOrdered = (id, data) => async (dispatch) => {

  const response = await csrfFetch(`/api/shoppingcarts/ordered`)
  const data1 = await response.json();
  dispatch(getOrdered(data1));
  return response;
};

export const thunkUserOrders = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/shoppingcarts/orders`)
  const data1 = await response.json();
  dispatch(getOrders(data1));
  return response;
};

export const thunkGetMostOrderedItems = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/shoppingcarts/${id}/ordered`)
  const data1 = await response.json();
  dispatch(getOrderedItems(data1));
  return response;
};

export const thunkGetRecentOrderedItem = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/items/${id}`)
  const data1 = await response.json();
  dispatch(getOrderedItem(data1));
  return response;
};


export const thunkGetCarts = (data) => async (dispatch) => {

  const response = await csrfFetch(`/api/shoppingcarts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getCarts(data1));
  return response;
};

export const thunkGetItem = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${id}`)
    const data = await response.json();
    dispatch(getItem(data));
    return data;
  };

export const thunkCreateCart = (id, data) => async (dispatch) => {
  console.log("create", data)
    const response = await csrfFetch(`/api/shoppingcarts/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const data1 = await response.json();
    dispatch(getCart(data1));
    return data1;
};

export const thunkCreateCartItem = (id, data) => async (dispatch) => {
    const response = await csrfFetch(`/api/shoppingcarts/${id}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const data1 = await response.json();
    dispatch(getDetails(data1));
    return response;
};

export const thunkUpdateCartItem = (id, data) => async (dispatch) => {
    const response = await csrfFetch(`/api/shoppingcarts/${id}/item`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const data1 = await response.json();
    dispatch(getUpdates(data1));
    return response;
};

export const thunkUpdateCart = (id, data) => async (dispatch) => {
  console.log(data)
    const response = await csrfFetch(`/api/shoppingcarts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const data1 = await response.json();
    dispatch(getCart(data1));
    return response;
};

export const thunkDeleteCartItem = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/shoppingcarts/${id}/item`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json();
    dispatch(deleteCartItem(id));
    return response;
};

export const thunkDeleteCart = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/shoppingcarts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json();
    dispatch(deleteCart(id));
    return response;
};

export const thunkCreateOrder = (id) => async (dispatch) => {
  dispatch(deleteCart(id));
  return "Processing Order";
};


let initialState = {
   shoppingCarts: {},
   shoppingCart: {},
   cartItem: {},
   discounts: {},
   orderedItem: {},
   cartOrders: {},
   itemOrders: {},
   userOrders : {}

}


const cartReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_CARTS:
      newState = { ...state };
      if (action.carts.length) action.carts.forEach(
        (cart) => (newState.shoppingCarts[cart.id] = { ...cart})
      );
      return newState;
    case GET_ORDERED:
      newState = { ...state };
      if (action.orders.length) action.orders.forEach(
        (order) => (newState.cartOrders[order.id] = { ...order})
      );
      return newState;
      case GET_DISCOUNTS:
      newState = { ...state };
      if (action.discounts.length) action.discounts.forEach(
        (discount) => (newState.discounts[discount.id] = { ...discount})
      );
      return newState;
      case GET_ORDERS:
        newState = { ...state };
        if (action.orders.length) action.orders.forEach(
          (order) => (newState.userOrders[order.id] = { ...order})
        );
        return newState;
    case GET_ORDERED_ITEMS:
      newState = { ...state };
      if (action.orders.length) action.orders.forEach(
        (order) => (newState.itemOrders[order.id] = { ...order})
      );
      return newState;
    case GET_CART:
      newState = { ...state };
      const cart = action.cart;
      newState.shoppingCart = { ...cart };
      return newState;
    case GET_DETAILS:
      newState = { ...state };
      const details = action.details;
      let more = newState.shoppingCart.CartItems.some((i) => i.id == details.id)
      if (more) {
        newState.shoppingCart.CartItems = newState.shoppingCart.CartItems.map((item) => {
          if (item.id === details.id) {
              return details;
          }
          return item;
        });
      }
      else {
        newState.shoppingCart.CartItems.push(details)

      }
      return newState;
      case GET_ORDERED_ITEM:
        newState = { ...state };
        const cartItem = action.item;
        newState.orderedItem = cartItem
        return newState;
    case GET_UPDATES:
      newState = { ...state };
      const updates = action.updates;
      newState.shoppingCart.CartItems = newState.shoppingCart.CartItems.map((item) => {
          if (item.id === updates.id) {
              return updates;
          }
          return item;
      });
      return newState;
    case GET_ITEM:
      newState = { ...state };
      const item = action.item;
      newState.cartItem = { ...item };
      return newState;
    case DELETE_ITEM:
      newState = { ...state };
      const itemId = action.id;
      newState.shoppingCart.CartItems = newState.shoppingCart.CartItems.filter((i) => i.id != itemId);
      return newState;
      case DELETE_CART:
        newState = { ...state };
        const cartId = action.id;
        newState.shoppingCarts = newState.shoppingCarts.filter((i) => i.id != cartId);
        return newState;
    default:
      return state;
  }
};

export default cartReducer;
