import {
  GET_BLOGS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
} from "./actionType";

// common success
export const blogApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const blogApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getBlogs = () => ({
  type: GET_BLOGS,
});

export const deleteBlogs = blog => ({
  type: DELETE_BLOG,
  payload: blog,
});

export const deleteBlogSuccess = blog => ({
  type: DELETE_BLOG_SUCCESS,
  payload: blog,
});

export const deleteBlogFail = error => ({
  type: DELETE_BLOG_FAIL,
  payload: error,
});
