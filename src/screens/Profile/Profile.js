/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {logoutAction} from '../../storages/actions/authLogin';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isSuccess);
  const userProfile = useSelector(state => state.auth.data);

  const handleLoginPress = () => {
    if (isAuthenticated) {
      dispatch(logoutAction(navigation));
    } else {
      // Navigate to the login screen
      navigation.navigate('Login');
    }
  };

  const handleMyRecipePress = () => {
    navigation.navigate('MyRecipe');
  };
  return (
    <View style={styles.wrapper_detail}>
      <View style={styles.profile}>
        <Image
          source={{uri: userProfile?.photo_user}}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {userProfile && userProfile.username ? userProfile.username : 'user'}
        </Text>
      </View>
      <View style={styles.wrapper_edit}>
        <View style={styles.edit}>
          <Image source={require('../../assets/user-kuning.png')} />
          <Text style={styles.title}>Edit Profile</Text>
          <Image source={require('../../assets/ic-chevron.png')} />
        </View>
        <View>
          <TouchableOpacity style={styles.edit} onPress={handleMyRecipePress}>
            <Image source={require('../../assets/award.png')} />
            <Text style={styles.title}>My Recipe</Text>
            <Image source={require('../../assets/ic-chevron.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.edit}>
          <Image source={require('../../assets/bookmark.png')} />
          <Text style={styles.title_saved}>Saved Recipe</Text>
          <Image source={require('../../assets/ic-chevron.png')} />
        </View>
        <View style={styles.edit}>
          <Image source={require('../../assets/Vector.png')} />
          <Text style={styles.title_saved}>Liked Recipe</Text>
          <Image source={require('../../assets/ic-chevron.png')} />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper_detail: {
    backgroundColor: '#fff',
    height: 694,
  },
  profile: {
    backgroundColor: '#EEC302',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    color: '#FFFFFF',
    marginTop: 7,
    fontSize: 20,
  },
  wrapper_edit: {
    backgroundColor: '#fff',
    width: '95%',
    marginHorizontal: 10,
    marginTop: -20,
    borderRadius: 10,
  },

  edit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 30,
  },
  title: {
    marginRight: 200,
    paddingLeft: 5,
  },

  title_saved: {
    marginRight: 180,
    paddingLeft: 5,
  },

  loginButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ProfileScreen;
