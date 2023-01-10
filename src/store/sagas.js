import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AuthSaga from "./auth/login/saga";
import ProfileSaga from "./auth/profile/saga";
//ecommerce
import ecommerceSaga from "./ecommerce/saga";
// Dashboard Ecommerce
import dashboardEcommerceSaga from "./dashboardEcommerce/saga";
import feedSaga from "./blog/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AuthSaga),
    fork(ProfileSaga),
    fork(ecommerceSaga),
    fork(dashboardEcommerceSaga),
    fork(feedSaga),
  ]);
}
