import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from '../../actions/types/userTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const OneUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default OneUserReducer;
