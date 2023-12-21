/* eslint-disable prettier/prettier */
import axios from 'axios';

export const updateProfile = (uuid, formData) => async (dispatch, getState) => {
  try {
    dispatch({type: 'UPDATE_PROFILE_PENDING'});
    let token = await getState().auth.data.token;

    const response = await axios.patch(`/user/update-user/${uuid}`, formData, {
      headers: {
        token: token,
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: 'UPDATE_PROFILE_SUCCESS',
      payload: response.data.data,
    });

    return response.data.data;
  } catch (error) {
    dispatch({
      type: 'UPDATE_PROFILE_FAILURE',
      payload: error.message,
    });

    throw error;
  }
};
