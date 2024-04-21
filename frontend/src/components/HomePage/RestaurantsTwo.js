import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css"
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function RestaurantsTwo({ filter, category, restaurants }) {
  const { user } = useSelector((state) => state.session );
  const { saves, orders } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ index, setIndex ] = useState(0)
  const [ reset, setReset ] = useState(true)
  const [franchises, setFranchises] = useState(restaurants); // Assuming `restaurants` is the initial value
  const dispatch = useDispatch()
  const { location, setProfile, profile, setLocation, setResults, results } = useFilters()
  const history = useHistory()
  const targetRef = useRef()

 useEffect(() => {
     async function fetchData() {
         if (!location && user?.id ) await dispatch(restaurantActions.thunkGetUserRestaurants())
         dispatch(cartActions.thunkGetCarts())
         if (user?.id) dispatch(restaurantActions.thunkGetSaves())
         if (user?.id) dispatch(restaurantActions.thunkGetOrders())
        }
     fetchData()

  }, [dispatch, location, user])

  useEffect(() => {
    if (!category && !Object.values(filter).length) setFranchises(restaurants)
    }, [restaurants, category, filter])

    console.log(restaurants)

  useEffect(() => {
    const place = localStorage.getItem('place');
    if (place) {
      setLocation(place);
    }
  }, [location]);


  const saveRestaurant = (id) => {
    dispatch(restaurantActions.thunkCreateSave(id))

  };

  const deleteSave = (saves, restaurantId) => {
    let save = saves.find((s) => s.userId == user.id)
    dispatch(restaurantActions.thunkDeleteSave(save.id, restaurantId))
  };

  const handleReset = () => {
    setFranchises(restaurants);
  };

  function milesToTime(miles, speed) {
    // Check if speed is greater than zero to avoid division by zero
    if (speed > 0) {
      const timeInHours = miles / speed;
      return Math.round(timeInHours); // Round to the nearest integer
    } else {
      return null; // Return null if speed is zero or negative
    }
  }

  useEffect(() => {
    let filteredFranchises = [...restaurants]; // Initialize with all restaurants

    if (category) {
        filteredFranchises = filteredFranchises.filter((f) => f.type.includes(category));
    }
    if (Object.values(filter).length) {
        if (filter.fees) {
            filteredFranchises = filteredFranchises.filter((f) => f.deliveryFee < filter.fee);
        }
        if (filter.star) {
            filteredFranchises = filteredFranchises.filter((f) => {
                const averageRating = f.Reviews.reduce((accumulator, review) => accumulator + review.rating, 0) / f.Reviews.length;
                return averageRating < filter.stars;
            });
        }
        if (filter.timing) {
            filteredFranchises = filteredFranchises.filter((f) => {
                const timeAndFee = (milesToTime(f.miles, 60) || 0) + f.deliveryFee;
                return timeAndFee > filter.time;
            });
        }
        if (filter.pricing) {
            filteredFranchises = filteredFranchises.filter((f) => f.level > filter.price);
        }
    }
    if (!category && !Object.values(filter).length) {
        filteredFranchises = [...restaurants]; // Reset to all restaurants
    }

    setFranchises(filteredFranchises);
    setResults(filteredFranchises.length);
}, [category, filter]);

  let saved = []

  if (Object.values(saves).length) {
    for (let save of Object.values(saves)) {
        saved.push(save.Restaurant)
    }
  }

  let ordered = []
  let set = new Set()

  if (Object.values(orders).length) {
    for (let order of Object.values(orders)) {
        if (!set.has(order.Restaurant.name)) {
            ordered.push(order.Restaurant)
            set.add(order.Restaurant.name)
        }
    }
  }


  const reviews = (reviews) => {

    if (!reviews.length) return 0

    let sum = 0
    for (let review of reviews) {
        sum += review.rating
    }

    let result = sum / reviews.length

    return result.toFixed(1)

  };


  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%"}} >
    <div className="restaurants">
        {franchises.map((f, id) =>
        <>
            <div onClick={(() => history.push(`/restaurant/${f.id}`))} className="restaurant" id={`r-${id}`}>
                <img style={{ marginBottom: "6px", height: "60%" }}src={f.RestaurantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{f.name} </h1>
                    { user?.id && <>
                    { user && f.Saves?.some((s) => s.userId == user?.id && s.restaurantId == f.id) ?
                    <i onClick={((e) => {
                        e.stopPropagation()
                        deleteSave(f.Saves, f.id)})} style={{ color: "red", fontSize: "16px", margin: "4px"}} class="fi fi-ss-heart"></i> :
                    <i onClick={((e) => {
                        e.stopPropagation()
                        saveRestaurant(f.id)})} style={{ color: "#767676", fontSize: "16px", margin: "4px"}} class="fi fi-rs-heart"></i>
                    }
                    </>}
                </div>
                <div id="r-info">
                    <h1 style={{ fontSize: "12px"}}>
                    <span style={{ color: "black"}}>{reviews(f.Reviews)}</span>
                    <i class="fi fi-sr-star" style={{ fontSize: "12px", color: "#e4e404" }}></i>
                    ({f.Reviews?.length})
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    {f.miles} mi
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    {f.mins + 10} mins
                    </h1>
                </div>
                <h1 style={{ fontSize: "12px", color: "#767676"}}>${f.deliveryFee} Delivery Fee</h1>
            </div>
        </>
    )}
    </div>
    </div>
  );
}

export default RestaurantsTwo;
