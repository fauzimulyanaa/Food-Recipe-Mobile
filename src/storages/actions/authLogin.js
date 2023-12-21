/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

const base_url = 'https://cyan-jittery-cygnet.cyclic.app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = (email, password, navigation) => async dispatch => {
  let loginUrl = '/auth/login';
  let bodyData = {
    email,
    password,
  };
  try {
    dispatch({type: 'LOGIN_REQUEST'});

    const result = await axios.post(base_url + loginUrl, bodyData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    await AsyncStorage.setItem('authToken', result.data.data.token);
    dispatch({payload: result.data.data, type: 'LOGIN_SUCCESS'});
    SweetAlert.showAlertWithOptions({
      title: 'Success!',
      subTitle: 'Login successful',
      confirmButtonColor: '#000',
      style: 'success',
    });
    navigation.navigate('Profile');
  } catch (err) {
    dispatch({payload: err.response.data, type: 'LOGIN_ERROR'});
    SweetAlert.showAlertWithOptions(
      {
        title: 'Failed!',
        subTitle: `error :  ${
          err.response.data.messsage || err.response.data.message
        } `,
        confirmButtonColor: '#000',
        style: 'error',
      },
      () =>
        console.log(err.response.data.messsage || err.response.data.message),
    );
  }
};

export const logoutAction = navigation => async dispatch => {
  dispatch({type: 'LOGOUT'});

  navigation.navigate('Login');
};
