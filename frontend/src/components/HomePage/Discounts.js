import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css"
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Discounts({ title, stores }) {
  const { user } = useSelector((state) => state.session );
  const { discounts } = useSelector((state) => state.cart);
  const [ start, setStart ] = useState(0)
  // const [ stop, setStop ] = useState(2)
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ category, setCategory ] = useState("")
  const dispatch = useDispatch()
  const { location, setLocation } = useFilters()
  const history = useHistory()

 useEffect(() => {
     async function fetchData() {
          dispatch(cartActions.thunkGetDiscounts())
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
      const newStart = start + 1;
      if (newStart + 2 < arr.length) {
        setStart(newStart);
      }

    };

    const goToPrevTwo = (e) => {
        e.stopPropagation();
        setLengthTwo(lengthTwo - 1)
        if (start > 0) {
          setStart(start - 1);
        }
    };

    const reviews = (reviews) => {

      if (!reviews.length) return 0

      let sum = 0
      for (let review of reviews) {
          sum += review.rating
      }

      let result = sum / reviews.length

      return result.toFixed(1)

    };

    let arr = Object.values(discounts)
    let discounted = stores.filter((store) =>
    arr.some((dis) => dis?.restaurantId === store?.id )
   );


  const sliderStyleTwo = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 250ms ease",
    transform: `translateX(-${lengthTwo * (100 / arr.length)}%)`,
    margin: "10px 0px"
  };


  const handleClick = (id) => {
    const newTab = window.open(`/restaurant/${id}`, '_blank');
    newTab.focus();
  };


  console.log(discounted, arr)



  return (

    <div className="types">
    { arr.length > 0 && !category && <div style={{ overflow: "hidden" }} className="saved">
    <div style={{ boxSizing: "border-box", padding: "0px 4px",}} id="saved">
    <h1 style={{ fontSize: "26px", margin: "0px"}}>{title}</h1>
        <div style={{ display: "flex", gap: "18px", alignItems: "center", fontSize: "14px", fontWeight: "600"}}>
            <p>See All</p>
            <span style={{ display: "flex", gap: "10px", boxSizing: "border-box"}}>
                { <i id="gotobutt-two" style={{ cursor: lengthTwo == 0 && "not-allowed", left: "0", color: lengthTwo == 0 && "rgb(247, 247, 247)", backgroundColor: lengthTwo == 0 && "rgb(178, 178, 178)" }} onClick={((e) => {
                  if (lengthTwo > 0) {
                    goToPrevTwo(e)
                  }})} class="fi fi-sr-angle-circle-left"></i>}
                { <i id="gotobutt-two" style={{ cursor: lengthTwo == arr.length && "not-allowed", left: "0", color: lengthTwo == arr.length && "rgb(247, 247, 247)", backgroundColor: lengthTwo == arr.length - 1 && "rgb(178, 178, 178)", right: "0"}} onClick={((e) => {
                  if (lengthTwo < arr.length) {
                    goToNextTwo(e)
                  }
                  })} class="fi fi-sr-angle-circle-right"></i>}
            </span>
        </div>
    </div>
    <div style={{ overflow: "hidden", width: `${Math.max(arr.length, 3) * 33.3}%`}}>
    <div style={sliderStyleTwo} id="saves">
    {discounted.map(((d, id) =>
       <>
        { <div key={id} style={{
            height: "100%",
            width: "33%"
          }}
          onClick={(() => handleClick(d.id))} className="discount" id={`r-${id}`}>
                <img style={{ marginBottom: "6px"}}src={d.RestaurantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{d.name} </h1>
                    { user && d.Saves?.some((s) => s.userId == user?.id && s.restaurantId == d.id) ?
                    <i onClick={((e) => {
                        e.stopPropagation()
                    })} style={{ color: "red", fontSize: "16px", margin: "4px"}} class="fi fi-ss-heart"></i> :
                    <i onClick={((e) => {
                        e.stopPropagation()
                    })} style={{ color: "#767676", fontSize: "16px", margin: "4px"}} class="fi fi-rs-heart"></i>
                    }
                </div>
                <div id="r-info">
                    <h1 style={{ fontSize: "12px"}}>
                    <span style={{ color: "black"}}>{reviews(d.Reviews)}</span>
                    <i class="fi fi-sr-star" style={{ fontSize: "12px", color: "#e4e404" }}></i>
                    ({d.Reviews?.length})
                    <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                    {/* {d.miles ? d.miles : 0} mi */}
                    {/* <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i> */}
                    {d.mins + 10} mins
                    </h1>
                </div>
                <h1 style={{ fontSize: "12px", color: "#767676"}}>${d.deliveryFee} Delivery Fee</h1>
            </div>}
        </>
        ))}
    </div>
      </div>
    </div>}
    </div>

  );
}

export default Discounts;
