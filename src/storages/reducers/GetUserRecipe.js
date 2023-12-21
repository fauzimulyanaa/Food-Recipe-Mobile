/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const userRecipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_RECIPES_PENDING':
      return {...state, isLoading: true, isSuccess: false, isError: false};
    case 'FETCH_USER_RECIPES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload,
        isError: false,
      };
    case 'FETCH_USER_RECIPES_ERROR':
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

export default userRecipesReducer;
