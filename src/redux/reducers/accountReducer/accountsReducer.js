import {
  FETCH_ACCOUNTS_FAILURE,
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
} from '../../actions/types/accountTypes';

const initialState = {
  accountList: [],
  loading: false,
  error: null,
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accountList: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default accountsReducer;
