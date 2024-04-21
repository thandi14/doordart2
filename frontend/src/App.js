import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as restaurantActions from "./store/restaurants";
import * as cartActions from "./store/shoppingcart";

import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import RestaurantPage from "./components/RestaurantPage";
import ReviewPage from "./components/ReviewPage";
import { useFilters } from "./context/Filters";
import SavedPage from "./components/SavedPage";
import SearchPage from "./components/SearchPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { setLocation } = useFilters();


  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    let data = {
      sessionId
    }
    dispatch(cartActions.thunkGetCarts(data))
    dispatch(restaurantActions.thunkGetSaves())
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const address = localStorage.getItem('place');
    if (address) {
      setLocation(address);
    }

  }, []);

  return (
    <>
  <Switch>
    <Route exact path="/">
      <SplashPage />
    </Route>
    <Route exact path="/home">
      <HomePage />
    </Route>
    <Route exact path="/restaurant/:id">
      <RestaurantPage />
    </Route>
    <Route exact path="/restaurant/:id/reviews">
      <ReviewPage />
    </Route>
    <Route exact path="/restaurants/saves">
      <SavedPage />
    </Route>
    <Route exact path="/restaurants/search">
      <SearchPage />
    </Route>
  </Switch>
</>
  );
}

export default App;
