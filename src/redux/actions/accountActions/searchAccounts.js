import http from '../../../services/axios';
import {
  FETCH_ACCOUNTS_FAILURE,
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
} from '../types/accountTypes';

export const SearchAccounts = filters => async dispatch => {
  dispatch({type: FETCH_ACCOUNTS_REQUEST});
  try {
    const response = await http.post(
      '/accounts/search',
      {},
      {
        withCredentials: true,
        params: filters,
      },
    );
    dispatch({
      type: FETCH_ACCOUNTS_SUCCESS,
      payload: response.data.accountList,
    });
  } catch (error) {
    dispatch({type: FETCH_ACCOUNTS_FAILURE, payload: error.message});
  }
};
