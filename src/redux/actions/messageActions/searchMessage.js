import http from '../../../services/axios';
import {
  ALL_MESSAGES_FAILURE,
  ALL_MESSAGES_REQUEST,
  ALL_MESSAGES_SUCCESS,
} from '../types/messageTypes';

export const SearchMessages = filters => async dispatch => {
  dispatch({type: ALL_MESSAGES_REQUEST});
  try {
    const response = await http.post(
      '/messages/search',
      {},
      {
        withCredentials: true,
        params: filters,
      },
    );
    dispatch({type: ALL_MESSAGES_SUCCESS, payload: response.data.messageList});
  } catch (error) {
    dispatch({type: ALL_MESSAGES_FAILURE, payload: error.message});
  }
};
