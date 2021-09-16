import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/type";
import { setRegisterLoading } from "./loading";

export const registration = (registerData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(setRegisterLoading());
    const { data } = await axios.post(
      `/api/auth/register`,
      registerData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
