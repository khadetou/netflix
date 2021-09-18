import axios from "axios";
import {
  CREATE_LIST_FAIL,
  CREATE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
  DELETE_LIST_SUCCESS,
  GET_LISTS_FAIL,
  GET_LISTS_SUCCESS,
} from "../types/type";
import { setLoadingList } from "./loading";

//CREATE LISTS
export const createList = (listData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(setLoadingList());
    const { data } = axios.post("/api/list", listData, config);
    dispatch({
      type: CREATE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//GET LISTS
export const getLists = () => async (dispatch) => {
  try {
    dispatch(setLoadingList());
    const { data } = axios.get("/api/list");
    dispatch({
      type: GET_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LISTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE LIST
export const deleteList = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingList());
    const { data } = axios.get(`/api/list/${id}`);
    dispatch({
      type: DELETE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};
