import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  CREATE_MOVIES_FAIL,
  CREATE_MOVIES_SUCCESS,
  DELETE_MOVIE_FAIL,
  DELETE_MOVIE_SUCCESS,
  GET_MOVIES_FAIL,
  GET_MOVIES_SUCCESS,
  GET_MOVIE_FAIL,
  GET_MOVIE_SUCCESS,
  GET_RANDOM_MOVIE_FAIL,
  GET_RANDOM_MOVIE_SUCCESS,
  SET_LOADING_MOVIE,
  UPDATE_MOVIE_FAIL,
  UPDATE_MOVIE_SUCCESS,
} from "../types/type";

const initialState = {
  movies: null,
  movie: null,
  error: null,
  loading: null,
};

export const Movies = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATE_MOVIES_SUCCESS:
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
        loading: false,
      };
    case GET_RANDOM_MOVIE_SUCCESS:
    case DELETE_MOVIE_SUCCESS:
    case UPDATE_MOVIE_SUCCESS:
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        movie: payload,
        loading: false,
      };

    case GET_RANDOM_MOVIE_FAIL:
    case DELETE_MOVIE_FAIL:
    case UPDATE_MOVIE_FAIL:
    case CREATE_MOVIES_FAIL:
    case GET_MOVIE_FAIL:
    case GET_MOVIES_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        movie: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case SET_LOADING_MOVIE:
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
