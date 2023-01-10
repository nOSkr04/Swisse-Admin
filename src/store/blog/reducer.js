import {
  GET_BLOGS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
} from "./actionType";

const INIT_STATE = {
  blogs: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
};

const Feed = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_BLOGS:
          return {
            ...state,
            blogs: action.payload.data,
          };


        case DELETE_BLOG:
          return {
            ...state,
            blogs: state.blogs.filter(
              blog => (blog.id + '') !== (action.payload.data + '')
            ),
          };

       

        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_BLOGS:
          return {
            ...state,
            error: action.payload.error,
          };
      

        case DELETE_BLOG:
          return {
            ...state,
            error: action.payload.error,
          };
       
        default:
          return { ...state };
      }

    case GET_BLOGS:
      return {
        ...state,
      };
   

    case DELETE_BLOG:
      return {
        ...state,
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.filter(
          blog => blog._id.toString() !== action.payload.blog.toString()
        ),
      };

    case DELETE_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Feed;