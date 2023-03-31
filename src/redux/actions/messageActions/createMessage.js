import http from '../../../services/axios';
import {
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_FAILURE,
} from '../types/messageTypes';

export const createMessage = (data, accountId) => async dispatch => {
  dispatch({type: CREATE_MESSAGE_REQUEST});
  try {
    const response = await http.post(`/accounts/${accountId}/message`, data, {
      withCredentials: true,
    });
    dispatch({type: CREATE_MESSAGE_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: CREATE_MESSAGE_FAILURE, payload: error.message});
  }
};
