/* eslint-disable prettier/prettier */
import axios from 'axios';

export const getRecipeDetail = recipeId => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_RECIPE_DETAIL_REQUEST'});
    let token = await getState().auth.data.token;

    const response = await axios.get(
      `https://easy-gray-alligator-tutu.cyclic.app/recipe/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch({
      type: 'GET_RECIPE_DETAIL_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_RECIPE_DETAIL_ERROR',
      payload: error.message,
    });
  }
};
