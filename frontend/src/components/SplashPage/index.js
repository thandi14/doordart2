import React, { useRef, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./SplashPage.css"
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginForm";
import SignupFormModal from "../SignupForm";
import SplashFoot from "./SplashFoot";
import SplashNav from "./SplashNav";
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as restaurantActions from "../../store/restaurants"

function SplashPage() {
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const { setLocation } = useFilters()
  const autocompleteRef = useRef(null);
  const history = useHistory()
  const [address, setAddress] = useState('');

const handlePlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (autocomplete) {
      const place = autocomplete.state.autocomplete.getPlace()
      if (place) {
          submitPlaceChanged(place.formatted_address);
      }
    }
  };

  const submitPlaceChanged = async (place) => {

    const saveDataToSession = () => {
        localStorage.setItem('place', place);
      };

      setLocation(place);

      let data = {
        address: address
      };

      await dispatch(restaurantActions.thunkGetRestaurants(data));
      window.alert("GOOGLE API MAY NOT BE AVAILABLE SO MILES/TIMES/PRICE LEVEL MAY NOT BE ACCURATE OR DISPLAY")
      history.push("/home");

  };

  return (
    <>
    <SplashNav />
    <div className="header">
            <div style={{ color: "white"}}>
            <img src="https://www.pngall.com/wp-content/uploads/15/Door-Dash-Logo-PNG-Photo.png"></img>
            DoorDart
            </div>
        <div id="head-nav">
            <div id="user-one">
            <OpenModalButton
            buttonText="Sign In"
            modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
            />
            </div>
      {/* {isLoaded && sessionLinks} */}
       </div>
       <div id="head-cont">
      <h1 style={{ color: "white", fontSize: "40px", margin: "20px"}}>Discover restaurants and more near you.</h1>
      <div id="address-input">
      <i class="fi fi-rs-marker"></i>
      <LoadScript
      googleMapsApiKey="AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k"
      libraries={['places']}
    >
      <Autocomplete
               onPlaceChanged={handlePlaceChanged}
               ref={autocompleteRef}
               fields={['formatted_address', 'geometry']}
        >
        <input
           id="location"
           type="text"
           placeholder="Enter your address"
           style={{ width: '100%' }}
        />
      </Autocomplete>
    </LoadScript>
      {/* <input defaultValue="Enter delivery address"></input> */}
      <span>
      <i style={{ color: "red", cursor: "pointer"}} class="fi fi-ss-arrow-circle-right"></i>
      </span>
      </div>
      <button onClick={(() => setModalContent(<LoginFormModal />))} ><i class="fi fi-br-user"></i>Sign in for saved address</button>
       </div>
    </div>
    <div className="sp-one" id="sp-one">
        <div>
            <div>
            <img style={{ width: "142px", height: "142px"}} src="https://images.ctfassets.net/lmx885sr3per/2eQ8UnJ4tmqGGlbsguT2mU/d4409b8986044f284581859c7a0524df/ScootScoot.svg"></img>
            <h1 style={{ fontSize: "32px", margin: "15px" }} >Become a <br></br>
            Dasher</h1>
            <p style={{ fontSize: "18px"}}>As a delivery driver, you'll make reliable money – working anytime, anywhere.</p>
            </div>
            <span style={{ height: "16px", cursor: "pointer"}}  id="sp-butt-one" >Start earning<i class="fi fi-rr-arrow-small-right"></i></span>
        </div>
        <div>
            <div>
            <img style={{ width: "142px", height: "142px"}} src="https://images.ctfassets.net/lmx885sr3per/1p9xn0clqts8OZaX6Ychbv/c2305486c74618057824dfdd5cec66ca/Become_a_Partner.svg"></img>
            <h1 style={{ fontSize: "32px", margin: "15px" }} >Become a <br></br>
            Partner</h1>
            <p style={{ fontSize: "18px"}}>Grow your business and reach new customers by partnering with us.</p>
            </div>
            <span style={{ height: "16px", cursor: "pointer"}} id="sp-butt-one" >Sign up your store <i class="fi fi-rr-arrow-small-right"></i></span>
        </div>
        <div>
            <img style={{ width: "142px", height: "142px"}} src="https://images.ctfassets.net/lmx885sr3per/kA6ZnIjNlZk5dnkShe54T/104df1b5309df686a21fffa46fd0e1a1/iphone__1_.svg"></img>
            <div>
            <h1 style={{ fontSize: "32px", margin: "15px" }} >Get the best <br></br>
            DoorDash <br></br>
            experience</h1>
            <p style={{ fontSize: "18px"}}>Experience the best your neighborhood has to offer, all in one app.</p>
            </div>
            <span style={{ height: "16px", cursor: "pointer"}} id="sp-butt-one" >Get the app <i class="fi fi-rr-arrow-small-right"></i></span>
        </div>
    </div>
    <div className="sp-two">
        <div>
            <h1 style={{ fontSize: "40px", margin: "0px"}} >Everything you <br></br>
            crave, delivered.</h1>
            <h2 style={{ fontSize: "20px"}} >Your favorite local restaurants</h2>
            <p style={{ margin: "0px"}}>Get a slice of pizza or the whole pie delivered, or pick up house lo mein from the Chinese takeout spot you've been meaning to try.</p>
            <button style={{ fontSize: "16px", marginTop: "35px" }} id="sp-butt">Find restaurants</button>
        </div>
        <img src="https://images.ctfassets.net/lmx885sr3per/1OYbGcQZKl5vZuqEWPTOsx/faa4ee8381bfc049488a16620ff80f9a/download_the_app_desktop.png"></img>
    </div>
    <div className="sp-three" style={{ backgroundColor: "rgb(254, 241, 238)"}}>
        <img style={{ padding: "10px", }}  src="https://images.ctfassets.net/lmx885sr3per/44nvThBCxYBS0kQxJ2d3nq/eb991b92f1da32366c3fdadd2da4adae/dashpass_desktop.png"></img>
        <div>
            <h1 style={{ fontSize: "40px", margin: "0px"}} >DashPass is <br></br>
            delivery for less</h1>
            <p style={{ fontSize: "16px"}} >Members get a $0 delivery fee on DashPass orders, 5% back on pickup orders, and so much more. Plus, it's free for 30 days.</p>
            <button style={{ fontSize: "16px", marginTop: "20px" }} id="sp-butt">Get DashPass</button>
        </div>
    </div>
    <div className="sp-four">
        <div id="sp-four-cont" >
        <h1 style={{ fontSize: "40px", margin: "0px", textAlign: "center"}}>Get grocery and <br></br>
        convenience store <br></br>
        essentials</h1>
        <h2 style={{ fontSize: "20px", textAlign: "center"}} >Grocery delivery, exactly how you want it.</h2>
        <p style={{ fontSize: "16px", textAlign: "center"}} >Shop from home and fill your cart with fresh produce, frozen entrees, deli delights and more.</p>
        <button  style={{ fontSize: "16px", marginTop: "20px" }}  id="sp-butt">Shop Groceries</button>
        </div>
    </div>
    <div style={{ marginBottom: "-90px"}} className="sp-five">
        <div>
            <h1 style={{ fontSize: "40px", margin: "0px"}} >Convience <br></br>
            stores at your <br></br>
            doorstep</h1>
            <p>Stock up on snacks, household essentials, candy, or vitamins — all delivered in under an hour.</p>
            <button style={{ fontSize: "16px", marginTop: "20px" }} id="sp-butt">Shop now</button>
        </div>
        <img src="https://images.ctfassets.net/lmx885sr3per/42nRZAinJSkrWS8VFVAqav/37244a3e95010ea9b25bea9b4231fe6c/convenience_desktop.png"></img>
    </div>
    <div className="sp-six">
        <h1 style={{ padding: "22px", paddingTop: "50px"}} >Helping you with to-dos <br></br>
            and gifting</h1>
        <div>
        <div>
            <img src="https://images.ctfassets.net/lmx885sr3per/3UL3FCCegxZtlUrZjedeO2/bf04b1d21eb0921f446a69f96129c069/package_pickup_desktop.png"></img>
            <h1 style={{ fontSize: "40px", margin: "5px"}}>Return packages from home</h1>
            <p style={{ fontSize: "16px"}}>Request a package pickup with just a few taps and get your returns dropped off at carriers like UPS, FedEx, and USPS.</p>
            <button style={{ marginTop: "5px", marginBottom: "5px", fontSize: "16px", marginTop: "20px"}}  id="sp-butt">Try Package Pickup</button>
        </div>
        <div>
            <img src="https://images.ctfassets.net/lmx885sr3per/44UzNsxQkafsFqSBgQgbjM/89bd25f7513fbf3c2391a3d8b11573ad/flowers_desktop.png" alt="Flowers for any occasion" ></img>
            <h1 style={{ fontSize: "40px", margin: "5px"}}>Flowers for any occasion</h1>
            <p style={{ fontSize: "16px"}}>Shop hand-picked and thoughtfully-arranged blooms from florists near you.</p>
            <button style={{ marginTop: "5px", marginBottom: "5px",fontSize: "16px", marginTop: "20px"}}  id="sp-butt">Send Flowers</button>
        </div>
        <div>
        <img src="https://images.ctfassets.net/lmx885sr3per/55MCL8IuU99ZE6B3nsqnRr/c87d4069fe93e80daae4e4bfcdc6fcae/alcohol_desktop.png"></img>
            <h1 style={{ fontSize: "40px", margin: "5px"}}>Restock the minibar</h1>
            <p style={{ fontSize: "16px"}}>Hosting a get-together or need or need a special cocktail ingredient? Get liquor, beer, mixers, champagne and wine delivered fast.*</p>
            <button style={{ marginTop: "5px", marginBottom: "5px", fontSize: "16px", marginTop: "20px"}}  id="sp-butt">Shop Alcohol</button>
            <span  style={{ marginTop: "5px", fontSize: "14px"}}>*Must be 21+. Enjoy responsibly.</span>
        </div>
        <div>
        <img src="https://images.ctfassets.net/lmx885sr3per/UoD5uO9zHQvNlWoXsVsVG/5b6e260ba029ec05900e9d2d86649195/pet_supplies_desktop.png" ></img>
            <h1 style={{ fontSize: "40px", margin: "5px"}}>What your pets need, and want</h1>
            <p style={{ fontSize: "16px"}}>Finally, something cat people and dog people agree on — pet supplies delivery. Shop pet food, chew toys, and even costumes.</p>
            <button style={{ marginTop: "5px", marginBottom: "5px", fontSize: "16px", marginTop: "20px"}} id="sp-butt">Get Pet Supplies</button>
        </div>
        </div>
    </div>
    <div className="sp-seven">
            <h1>Unlocking opportunity for <br></br>
                Dashers and businesses</h1>
    </div>
    <div className="sp-eight">
        <div>
            <h1 style={{ fontSize: "40px", margin: "0px"}}>Sign up to dash<br></br>
            and get paid</h1>
            <p>Deliver with the #1 Food and Drink App in the U.S., set your own schedule, and start earning cash anytime, anywhere.</p>
            <button style={{ fontSize: "16px", marginTop: "20px" }} id="sp-butt">Become a Dasher</button>
        </div>
        <img src="https://images.ctfassets.net/lmx885sr3per/7tp7Bdx8s5CzSxaeNXQWjA/35b0cbe6b2c2a9bcbb35e7b1bfcd2e24/become_a_dasher_desktop.png"></img>
    </div>
    <div style={{ paddingBottom: "15px"}} className="sp-nine">
        <img style={{ padding: "10px", }} src="https://images.ctfassets.net/lmx885sr3per/6O0y75ccXWzyi7O734BTRs/67ff4785cea1c07bc402d55e96126581/work_with_doordash_desktop.png" ></img>
        <div>
            <h1 style={{ fontSize: "40px", margin: "0px", }}>Grow your <br></br>
            business with <br></br>
            DoorDash</h1>
            <p>Businesses large and small partner with DoorDash to reach new customers, increase order volume, and drive more sales.</p>
            <button  style={{ fontSize: "16px", marginTop: "20px"}} id="sp-butt">Become a Partner</button>
        </div>
    </div>
    <div className="sp-ten">
        <h1 style={{ margin: "25px", marginBottom: "15px"}}>Get more from your neighborhood</h1>
        <div>
        <div id="top-one">
            <span style={{ color: "rgb(73, 73, 73)"}}>
                <p style={{ color: "black", fontWeight: "600", borderBottom: "3px solid #606060"}} >Top Citites</p>
                <p>Top Cuisines</p>
                <p>Top Chains</p>
            </span>
        </div>
        <div id="top">
            <span>
                <p>New York</p>
                <p>Brooklyn</p>
                <p>Atlanta</p>
            </span>
            <span>
                <p>Los Angeles</p>
                <p>San Diego</p>
                <p>Queens</p>
            </span>
            <span>
                <p>Torronto</p>
                <p>Las Vegas</p>
                <p>Vancouver</p>
            </span>
            <span>
                <p>Chicago</p>
                <p>San Francisco</p>
                <p>Miami</p>
            </span>
            <span>
                <p>Houston</p>
                <p>Seattle</p>
                <p>San Antonio</p>
            </span>
        </div>
        {/* <div id="top">
            <span>
            </span>
        </div> */}
        </div>
    </div>
    <SplashFoot />
    </>
  );
}

export default SplashPage;
