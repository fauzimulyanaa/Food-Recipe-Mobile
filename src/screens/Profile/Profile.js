/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };
  const handleMyRecipePress = () => {
    navigation.navigate('MyRecipe');
  };
  return (
    <View style={styles.wrapper_detail}>
      <View style={styles.profile}>
        <Image source={require('../../assets/pp.png')} />
        <Text style={styles.name}>Mareta Lopeda</Text>
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
        <TouchableOpacity style={styles.edit} onPress={handleLoginPress}>
          <Image
            source={require('../../assets/icons8-login-50.png')}
            style={styles.img_login}
          />
          <Text style={styles.title}>Login</Text>
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

  img_login: {
    width: 30,
    height: 30,
  },
});

export default ProfileScreen;
