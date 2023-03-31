import http from '../../../services/axios';
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from '../types/userTypes';

export const getUser = userId => async dispatch => {
  dispatch({type: FETCH_USER_REQUEST});
  try {
    const response = await http.get(`/users/${userId}`, {
      withCredentials: true,
    });
    dispatch({type: FETCH_USER_SUCCESS, user: response.data.user});
  } catch (error) {
    dispatch({type: FETCH_USER_FAILURE, payload: error.message});
  }
};
