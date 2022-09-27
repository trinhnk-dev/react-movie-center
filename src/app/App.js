import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Home from "features/movies/pages/home";
import Detail from "features/movies/pages/detail";
import Payment from "features/movies/pages/payment";
import Booking from "features/movies/pages/booking_seats";
import Header from "common/components/Header";
import SignIn from "features/authentication/signIn/index";
import SignUp from "features/authentication/signUp/index";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfileAction } from "features/authentication/utils/authAction";
import Profile from "features/authentication/Profile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileAction());
  }, []);

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/detail/:id/:slug" component={Detail} />
          <Route path="/booking/:id" component={Booking} />
          <Route path="/payment" component={Payment} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
