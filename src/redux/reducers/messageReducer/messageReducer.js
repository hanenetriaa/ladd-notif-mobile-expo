import {
  ALL_MESSAGES_FAILURE,
  ALL_MESSAGES_REQUEST,
  ALL_MESSAGES_SUCCESS,
} from '../../actions/types/messageTypes';

const initialState = {
  messageList: [],
  loading: false,
  error: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        messageList: action.payload,
        loading: false,
        error: null,
      };
    case ALL_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
