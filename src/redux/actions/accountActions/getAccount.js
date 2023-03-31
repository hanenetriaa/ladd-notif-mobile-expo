import http from '../../../services/axios';
import {
  DETAILS_ACCOUNT_FAILURE,
  DETAILS_ACCOUNT_REQUEST,
  DETAILS_ACCOUNT_SUCCESS,
} from '../types/accountTypes';

export const getAccount = accountId => async dispatch => {
  dispatch({type: DETAILS_ACCOUNT_REQUEST});
  try {
    const response = await http.get(`/accounts/${accountId}`, {
      withCredentials: true,
    });
    dispatch({
      type: DETAILS_ACCOUNT_SUCCESS,
      payload: response.data.account,
    });
  } catch (error) {
    dispatch({type: DETAILS_ACCOUNT_FAILURE, payload: error.message});
  }
};
