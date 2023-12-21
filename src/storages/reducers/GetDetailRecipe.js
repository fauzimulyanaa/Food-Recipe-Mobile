/* eslint-disable prettier/prettier */
const initialState = {
  recipe: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

const recipeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPE_DETAIL_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: '',
      };
    case 'GET_RECIPE_DETAIL_SUCCESS':
      return {
        ...state,
        isLoading: false,
        recipe: action.payload,
        isError: false,
        errorMessage: '',
      };
    case 'GET_RECIPE_DETAIL_ERROR':
      return {
        ...state,
        isLoading: false,
        recipe: null,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default recipeDetailReducer;
