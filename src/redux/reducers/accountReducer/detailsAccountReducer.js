import {
  DETAILS_ACCOUNT_FAILURE,
  DETAILS_ACCOUNT_REQUEST,
  DETAILS_ACCOUNT_SUCCESS,
} from '../../actions/types/accountTypes';

const initialState = {
  account: null,
  loading: false,
  error: null,
};

const detailsAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILS_ACCOUNT_REQUEST:
      return {...state, loading: true};
    case DETAILS_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
        error: null,
      };
    case DETAILS_ACCOUNT_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default detailsAccountReducer;
