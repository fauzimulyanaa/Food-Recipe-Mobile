/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_PENDING':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: '',
      };

    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: '',
      };

    case 'UPDATE_PROFILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
