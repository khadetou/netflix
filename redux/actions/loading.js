import {
  SET_LOADING_MOVIE,
  SET_LOADING_USER,
  SET_REGISTER_LOADING,
} from "../types/type";

export const setRegisterLoading = () => (dispatch) => {
  dispatch({
    type: SET_REGISTER_LOADING,
  });
};
export const setLoadingUser = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_USER,
  });
};
export const setLoadingMovie = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_MOVIE,
  });
};
