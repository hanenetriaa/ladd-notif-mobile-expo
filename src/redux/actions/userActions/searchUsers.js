import http from '../../../services/axios';
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from '../types/userTypes';

export const searchUsers = filters => async dispatch => {
  dispatch({type: FETCH_USERS_REQUEST});
  try {
    const response = await http.post(
      'users/search',
      {},
      {
        withCredentials: true,
        params: filters,
      },
    );
    dispatch({type: FETCH_USERS_SUCCESS, payload: response.data.userList});
  } catch (error) {
    dispatch({type: FETCH_USERS_FAILURE, payload: error.message});
  }
};
