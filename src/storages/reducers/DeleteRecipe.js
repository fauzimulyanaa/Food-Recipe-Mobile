/* eslint-disable prettier/prettier */
const initialState = {
  myRecipes: [],
  isLoading: false,
  error: null,
};

const deleteRecipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_RECIPE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'DELETE_RECIPE_SUCCESS':
      return {
        ...state,
        myRecipes: state.myRecipes.filter(
          recipe => recipe.id !== action.payload,
        ),
        isLoading: false,
        error: null,
      };

    case 'DELETE_RECIPE_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default deleteRecipesReducer;
