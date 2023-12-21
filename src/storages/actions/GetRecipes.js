/* eslint-disable prettier/prettier */
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const base_url = 'https://cyan-jittery-cygnet.cyclic.app';
export const getAllMenus = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_MENU_PENDING'});
    let token = await getState().auth.data.token;
    const response = await axios.get(`${base_url}/recipe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({payload: response.data.data, type: 'GET_MENU_SUCCESS'});
  } catch (error) {
    dispatch({type: 'GET_MENU_ERROR', payload: error.message});
  }
};
