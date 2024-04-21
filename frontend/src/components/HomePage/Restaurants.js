import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css"
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Restaurants({ arr, title }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants, saves, orders } = useSelector((state) => state.restaurants);
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ category, setCategory ] = useState("")
  const dispatch = useDispatch()
  const { location, setLocation } = useFilters()
  const history = useHistory()

 useEffect(() => {
     async function fetchData() {
         if ( !location && user?.id ) await dispatch(restaurantActions.thunkGetUserRestaurants())
         dispatch(cartActions.thunkGetCarts())
         if (user?.id) dispatch(restaurantActions.thunkGetSaves())
         console.log('hello?')
         if (user?.id) dispatch(restaurantActions.thunkGetOrders())
        }
     fetchData()

  }, [dispatch, location, user])

  useEffect(() => {
    const place = localStorage.getItem('place');
    if (place) {
      setLocation(place);
    }
  }, [location]);

    const goToNextTwo = (e) => {
        e.stopPropagation()
        setLengthTwo(lengthTwo + 1)

    };

    const goToPrevTwo = (e) => {
        e.stopPropagation();
        setLengthTwo(lengthTwo - 1)
    };

  const sliderStyleTwo = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${lengthTwo * 50}%)`,
    margin: "10px 0px"
  };

  const saveRestaurant = (id) => {
    dispatch(restaurantActions.thunkCreateSave(id))

  };

  const deleteSave = (saves, restaurantId) => {
    let save = saves.find((s) => s.userId == user.id)
    dispatch(restaurantActions.thunkDeleteSave(save.id, restaurantId))
  };

  let franchises = Object.values(restaurants).sort((a, b) => a.miles - b.miles)

  if (category) {
    franchises = franchises.filter((f) => f.type.includes(category))
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

  console.log(category)



  return (

    <div className="types">
    { arr.length > 0 && !category && <div style={{ overflow: "hidden"}} className="saved">
    <div style={{ boxSizing: "border-box"}} id="saved">
    <h1 style={{ fontSize: "26px", margin: "0px"}}>{title}</h1>
        <div style={{ display: "flex", gap: "18px", alignItems: "center", fontSize: "14px", fontWeight: "600"}}>
            <p>See All</p>
            <span style={{ display: "flex", gap: "10px", boxSizing: "border-box"}}>
                { <i id="gotobutt-two" style={{ cursor: lengthTwo == 0 && "not-allowed", left: "0", color: lengthTwo == 0 && "rgb(247, 247, 247)", backgroundColor: lengthTwo == 0 && "rgb(178, 178, 178)" }} onClick={goToPrevTwo} class="fi fi-sr-angle-circle-left"></i>}
                { <i id="gotobutt-two" style={{ cursor: lengthTwo == arr.length - 1 && "not-allowed", left: "0", color: lengthTwo == arr.length - 1 && "rgb(247, 247, 247)", backgroundColor: lengthTwo == arr.length - 1 && "rgb(178, 178, 178)", right: "0"}} onClick={goToNextTwo} class="fi fi-sr-angle-circle-right"></i>}
            </span>
        </div>
    </div>
    <div style={sliderStyleTwo} id="saves">
    {arr.map((f, id) =>
        <>
            <div style={{ height: "100%"}} onClick={(() => history.push(`/restaurant/${f.id}`))} className="restaurant" id={`r-${id}`}>
                <img style={{ marginBottom: "6px"}}src={f.RestaurantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{f.name} </h1>
                    { user && f.Saves?.some((s) => s.userId == user?.id && s.restaurantId == f.id) ?
                    <i onClick={((e) => {
                        e.stopPropagation()
                        deleteSave(f.Saves, f.id)})} style={{ color: "red", fontSize: "16px", margin: "4px"}} class="fi fi-ss-heart"></i> :
                    <i onClick={((e) => {
                        e.stopPropagation()
                        saveRestaurant(f.id)})} style={{ color: "#767676", fontSize: "16px", margin: "4px"}} class="fi fi-rs-heart"></i>
                    }
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
    </div>}

    </div>

  );
}

export default Restaurants;
