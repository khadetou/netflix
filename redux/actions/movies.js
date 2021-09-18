import axios from "axios";
import {
  GET_MOVIES_FAIL,
  GET_MOVIES_SUCCESS,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAIL,
  CREATE_MOVIES_SUCCESS,
  CREATE_MOVIES_FAIL,
  GET_RANDOM_MOVIE_SUCCESS,
  GET_RANDOM_MOVIE_FAIL,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAIL,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAIL,
} from "../types/type";
import { setLoadingMovie } from "./loading";

//CREATE MOVIE
export const createMovie = (movieData) => async (dispatch) => {
  try {
    dispatch(setLoadingMovie());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = axios.post("/api/movie", movieData, config);
    dispatch({
      type: CREATE_MOVIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MOVIES_FAIL,
      payload: error,
    });
  }
};

//GET ALL MOVIES
export const getAllMovies = () => async (dispatch) => {
  try {
    dispatch(setLoadingMovie());
    const { data } = axios.get("/api/movie");
    dispatch({
      type: GET_MOVIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MOVIES_FAIL,
      payload: error,
    });
  }
};

//GET A SINGLE MOVIE
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingMovie());
    const { data } = axios.get(`/api/movie/${id}`);
    dispatch({
      type: GET_MOVIE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MOVIE_FAIL,
      payload: error,
    });
  }
};

//GET RANDOM MOVIE
export const getRandomMovie =
  (type = "") =>
  async (dispatch) => {
    try {
      dispatch(setLoadingMovie());
      const { data } = axios.get(`/api/movie/random?type=${type}`);
      dispatch({
        type: GET_RANDOM_MOVIE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_RANDOM_MOVIE_FAIL,
        payload: error,
      });
    }
  };

//UPDATE MOVIE
export const updateMovie = (movieData, id) => async (dispatch) => {
  try {
    dispatch(setLoadingMovie());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = axios.put(`/api/movie/${id}`, movieData, config);
    dispatch({
      type: UPDATE_MOVIE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MOVIE_FAIL,
      payload: error,
    });
  }
};

//DELETE MOVIE
export const deleteMovie = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingMovie());

    const { data } = axios.put(`/api/movie/${id}`);
    dispatch({
      type: DELETE_MOVIE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MOVIE_FAIL,
      payload: error,
    });
  }
};
