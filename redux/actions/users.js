import axios from "axios";
import { GET_USER_FAIL, GET_USER_SUCCESS } from "../types/type";
import { setLoadingUser } from "./loading";

export const getUser = () => async (dispatch) => {
  try {
    dispatch(setLoadingUser());
    const { data } = await axios.get("/api/user");
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
