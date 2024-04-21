import { csrfFetch } from "./csrf";

const GET_RESTAURANTS = "restaurant/getRestaurants";
const GET_RESTAURANT = "restaurant/getRestaurant";
const GET_REVIEW = "restaurant/getReview";
const GET_REVIEWS = "restaurant/getReviews";
const GET_REVIEW_DETAILS = "restaurant/getReviewDetails";
const UPDATE_REVIEW = "restaurant/updateReview";
const DELETE_REVIEW = "restaurant/deleteReview";
const GET_SAVE_DETAILS = "restaurant/getSaveDetails";
const GET_SAVES = "restaurant/getSaves";
const GET_ORDERS = "restaurant/getOrders";
const GET_SEARCHS = "restaurant/getSearchs";
const DELETE_SAVE = "restaurant/deleteSave";

const getRestaurants = (restaurants) => {
  return {
    type: GET_RESTAURANTS,
    restaurants,
  };
};

const getRestaurant = (restaurant) => {
  return {
    type: GET_RESTAURANT,
    restaurant,
  };
};


const getReview = (review) => {
  return {
    type: GET_REVIEW,
    review,
  };
};

const getSaves = (saves) => {
  return {
    type: GET_SAVES,
    saves,
  };
};

const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const getSearch = (searchs) => {
  return {
    type: GET_SEARCHS,
    searchs,
  };
};



const getSaveDetails = (details) => {
  return {
    type: GET_SAVE_DETAILS,
    details,
  };
};

const deleteSave = (id, restaurantId) => {
  return {
    type: DELETE_SAVE,
    id,
    restaurantId
  };
};

const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const getReviewDetails = (details) => {
  return {
    type: GET_REVIEW_DETAILS,
    details,
  };
};


const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    id,
  };
};

export const thunkGetUserRestaurants = () => async (dispatch) => {
    const response = await csrfFetch("/api/restaurants");
    const data = await response.json();
    dispatch(getRestaurants(data));
    return response;
};

export const thunkGetRestaurants = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/restaurants", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getRestaurants(data1));
  return response;
};

export const thunkGetRestaurant = (id, data) => async (dispatch) => {
  console.log(data)
  const response = await csrfFetch(`/api/restaurants/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getRestaurant(data1));
  return response;
};

export const thunkGetReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`)
  const data1 = await response.json();
  dispatch(getReview(data1));
  return data1;
};

export const thunkGetSaves = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/saves`)
  const data1 = await response.json();
  dispatch(getSaves(data1));
  return data1;
};

export const thunkGetOrders = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/shoppingcarts/orders`)
  const data1 = await response.json();
  dispatch(getOrders(data1));
  return data1;
};

export const thunkGetSearch = (search) => async (dispatch) => {
  console.log("hello!", search)
  const response = await csrfFetch(`/api/restaurants/search?search=${search}`)
  const data1 = await response.json();
  dispatch(getSearch(data1));
  return data1;
};



export const thunkGetReviews = (id, page) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${id}/reviews?page=${page}`)
  const data1 = await response.json();
  dispatch(getReviews(data1));
  return data1;

};



export const thunkCreateReview = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${id}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getReviewDetails(data1));
  return data1;
};

export const thunkCreateSave = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${id}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
  const data1 = await response.json();
  dispatch(getSaveDetails(data1));
  return data1;
};


export const thunkUpdateReview = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(updateReview(data1));
  return response;
};


export const thunkDeleteReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const data = await response.json();
  dispatch(deleteReview(id));
  return response;
};

export const thunkDeleteSave = (id, restaurantId) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/save/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const data = await response.json();
  dispatch(deleteSave(id, restaurantId));
  return response;
};

let initialState = {
   restaurants: {},
   restaurant: {},
   reviews: {},
   review: {},
   saves: {},
   orders: {},
   searchs: {}

}


const restaurantReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_RESTAURANTS:
      newState = { ...state };
      if (action.restaurants?.length) action.restaurants?.forEach(
        (restaurant) => (newState.restaurants[restaurant.id] = { ...restaurant})
      );
      return newState;
    case GET_REVIEWS:
      newState = { ...state };
      if (action.reviews?.length) action.reviews?.forEach(
        (review) => (newState.reviews[review.id] = { ...review})
      );
      return newState;
    case GET_RESTAURANT:
      newState = { ...state };
      const restaurant = action.restaurant;
      newState.restaurant = { ...restaurant };
      return newState;
    case GET_REVIEW:
      newState = { ...state };
      const review = action.review;
      newState.review = { ...review };
      return newState;
    case GET_REVIEW_DETAILS:
      newState = { ...state };
      const details = action.details;
      if (newState.restaurant.Reviews?.length == 0) {
        newState.restaurant.Reviews = []
      }
      newState.restaurant.Reviews?.push(details);
      newState.review = { ...details };
      return newState;
    case GET_SAVES:
      newState = { ...state };
      if (action.saves?.length) action.saves?.forEach(
        (save) => (newState.saves[save.id] = { ...save })
      );
      return newState;
    case GET_ORDERS:
    newState = { ...state };
    if (action.orders?.length) action.orders?.forEach(
      (order) => (newState.orders[order.id] = { ...order })
    );
    case GET_SEARCHS:
      newState = { ...state };
      if (action.searchs?.length) action.searchs?.forEach(
        (search) => (newState.searchs[search.id] = { ...search })
      );
    return newState;
    case GET_SAVE_DETAILS:
      newState = { ...state };
      const sDetails = action.details;
      if (!newState.restaurants[sDetails.restaurantId].Saves?.length) {
        newState.restaurants[sDetails.restaurantId].Saves = []
      }
      newState.restaurants[sDetails.restaurantId].Saves.push(sDetails)
      newState.saves[sDetails.id] = { ...sDetails };
      return newState;
    case UPDATE_REVIEW:
      newState = { ...state };
      const update = action.review;
      newState.restaurant.Reviews.forEach((r) => {
        if (r.id == update.id) {
          r = update
        }
      });
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      const reviewId = action.id;
      newState.restaurant.Reviews = newState.restaurant.Reviews.filter((r) => r.id != reviewId);
      return newState;
    case DELETE_SAVE:
      newState = { ...state };
      const saveId = action.id;
      const restaurantId = action.restaurantId;
      delete newState.saves[saveId]
      if (!newState.restaurants[restaurantId].Saves?.length) {
        return newState
      }
      newState.restaurants[restaurantId].Saves = newState.restaurants[restaurantId].Saves.filter((save) => save.id !== saveId);
    return newState;
    default:
      return state;
  }
};

export default restaurantReducer;
