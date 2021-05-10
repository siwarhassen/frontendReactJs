import axios from "axios";
import {
  GET_CATEGORIESP,
  DELETE_CATEGORYP,
  CATEGORYP_SAVED,
  RESETCAT_SAVED,
  CATP_UPDATED,
} from "./types";

export const getcategories = () => {
  return async (dispatch) => {
    return await axios
      .get("https://aaweni.herokuapp.com/pi/catRoute/categoryP")
      .then((res) => {
        dispatch({ type: GET_CATEGORIESP, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteCategory = (catId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete("https://aaweni.herokuapp.com/pi/catRoute/categoryP/" + catId);

      dispatch({ type: DELETE_CATEGORYP, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCategory = (catpost) => {
  return async (dispatch) => {
    try {
      return await axios
        .post("https://aaweni.herokuapp.com/pi/catRoute/categoryP", catpost)
        .then((res) => dispatch({ type: CATEGORYP_SAVED, payload: res.data }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateCategory = (catId, category) => {
  return async (dispatch) => {
    try {
      const res = await axios.put("https://aaweni.herokuapp.com/pi/catRoute/categoryP/" + catId, category);

      dispatch({ type: CATP_UPDATED, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetCatSaved = () => ({ type: RESETCAT_SAVED });
