/* eslint-disable prettier/prettier */
import axios from 'axios';

export const deleteRecipe = recipeId => async (dispatch, getState) => {
  dispatch({type: 'DELETE_RECIPE_REQUEST'});
  let token = await getState().auth.data.token;

  try {
    await axios.delete(
      `https://cyan-jittery-cygnet.cyclic.app/recipe/delete-recipe/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch({
      type: 'DELETE_RECIPE_SUCCESS',
      payload: recipeId,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_RECIPE_ERROR',
      payload: error.message,
    });
  }
};
