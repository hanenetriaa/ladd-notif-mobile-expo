import {
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
} from '../../actions/types/messageTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const createMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return {...state, loading: true, error: null};
    case CREATE_MESSAGE_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case CREATE_MESSAGE_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default createMessageReducer;
