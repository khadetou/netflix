import {
  CLEAR_ERROR,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  SET_LOADING_USER,
} from "../types/type";

const initialState = {
  user: null,
  users: null,
  error: null,
  loading: null,
};

export const Users = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return {
        ...state,
      };
  }
};
