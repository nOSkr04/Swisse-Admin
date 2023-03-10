import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Profile from "./auth/profile/reducer";

//Ecommerce
import Ecommerce from "./ecommerce/reducer";

// Dashboard Ecommerce
import DashboardEcommerce from "./dashboardEcommerce/reducer";
import Feed from "./blog/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Profile,
  Ecommerce,
  DashboardEcommerce,
  Feed
});

export default rootReducer;
