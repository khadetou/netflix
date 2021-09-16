import { SET_REGISTER_LOADING } from "../types/type";

export const setRegisterLoading = () => (dispatch) => {
  dispatch({
    type: SET_REGISTER_LOADING,
  });
};
