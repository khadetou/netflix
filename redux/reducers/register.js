import {
  CLEART_ERROR,
  CLEART_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_REGISTER_LOADING,
} from "../types/type";

const initialState = {
  register: null,
  error: null,
  loading: null,
};

export const register = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: payload,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEART_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case CLEART_SUCCESS:
      return {
        ...state,
        register: null,
        loading: false,
      };
    case SET_REGISTER_LOADING:
      return {
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
