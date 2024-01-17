/* eslint-disable prettier/prettier */
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

export const updateProfile =
  (id_user, bodyData, navigation) => async (dispatch, getState) => {
    try {
      dispatch({type: 'UPDATE_PROFILE_PENDING'});
      let token = await getState().auth.data.token;

      const response = await axios.patch(
        `https://real-rose-hatchling-slip.cyclic.app/user/update-user/${id_user}`,
        bodyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      dispatch({
        type: 'UPDATE_PROFILE_SUCCESS',
        payload: response.data.data,
      });
      SweetAlert.showAlertWithOptions({
        title: 'Success!',
        subTitle: 'Update successful',
        confirmButtonColor: '#000',
        style: 'success',
      });
      navigation.navigate('Profile');
      return response.data.data;
    } catch (error) {
      dispatch({
        type: 'UPDATE_PROFILE_FAILURE',
        payload: error.message,
      });

      throw error;
    }
  };
