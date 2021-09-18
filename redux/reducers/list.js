import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  CREATE_LIST_FAIL,
  CREATE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
  DELETE_LIST_SUCCESS,
  GET_LISTS_FAIL,
  GET_LISTS_SUCCESS,
  SET_LOADING_LIST,
} from "../types/type";

const initialState = {
  lists: null,
  error: null,
  loading: false,
};

export const Lists = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case DELETE_LIST_SUCCESS:
    case CREATE_LIST_SUCCESS:
    case GET_LISTS_SUCCESS:
      return {
        ...state,
        lists: payload,
        loading: false,
      };

    case CREATE_LIST_FAIL:
    case GET_LISTS_FAIL:
    case DELETE_LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        lists: null,
      };
    case SET_LOADING_LIST:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
