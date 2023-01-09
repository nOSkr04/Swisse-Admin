import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Ecoomerce Redux States
import {
  GET_BLOGS,
  DELETE_BLOG,
} from "./actionType";

import {
  ecommerceApiResponseSuccess,
  ecommerceApiResponseError,
  deleteBlogSuccess,
  deleteBlogFail,

} from "./action";

//Include Both Helper File with needed methods
import {
  getBlogs as getBlogsApi,
  deleteBlogs as deleteBlogsApi,
} from "../../helpers/fakebackend_helper";

function* getBlogs() {
  try {
    const response = yield call(getBlogsApi);
    yield put(ecommerceApiResponseSuccess(GET_BLOGS, response.data));
  } catch (error) {
    yield put(ecommerceApiResponseError(GET_BLOGS, error));
  }
}


function* deleteBlogs({ payload: blog }) {
  try {
    const response = yield call(deleteBlogsApi, blog);
    yield put(deleteBlogSuccess({ blog, ...response }));
    toast.success("Blog Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(deleteBlogFail(error));
    toast.error("Blog Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetBlogs() {
  yield takeEvery(GET_BLOGS, getBlogs);
}

export function* watchDeleteBlogs() {
  yield takeEvery(DELETE_BLOG, deleteBlogs);
}



function* ecommerceSaga() {
  yield all([
    fork(watchGetBlogs),
    fork(watchDeleteBlogs),
    
  ]);
}

export default ecommerceSaga;
