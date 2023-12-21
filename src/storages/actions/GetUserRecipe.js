/* eslint-disable prettier/prettier */
import axios from 'axios';
export const getUserRecipes = () => async (dispatch, getState) => {
  dispatch({type: 'FETCH_USER_RECIPES_PENDING'});
  try {
    let userId = await getState().auth.data.uuid;
    let token = await getState().auth.data.token;

    if (userId) {
      const response = await axios.get(
        'https://cyan-jittery-cygnet.cyclic.app/recipe/my-recipe',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      console.log('API Response:', response.data.data);
      dispatch({
        type: 'FETCH_USER_RECIPES_SUCCESS',
        payload: response.data.data,
      });
    }
  } catch (error) {
    dispatch({type: 'FETCH_USER_RECIPES_ERROR', payload: error.message});
  }
};
