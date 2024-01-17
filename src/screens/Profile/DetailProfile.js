/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

import IconUser from '../../assets/icons/IconUser.png';
import IconMyRecipes from '../../assets/icons/IconMyRecipes.png';
import IconMyLike from '../../assets/icons/IconMyLike.png';
import IconMyBookmark from '../../assets/icons/IconMyBookmark.png';
import ArrowGo from '../../assets/icons/ArrowGo.png';
import Lock from '../../assets/icons/Lock.png';

import {logoutAction} from '../../storages/actions/auth';
import {useDispatch, useSelector} from 'react-redux';

const DetailProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [dataProfile, setDataProfile] = useState();
  const isFocused = useIsFocused();
  const auth = useSelector(state => state.auth);
  let token = auth?.data?.token?.accessToken;
  let id_user = auth?.data?.uuid;

  const getDetailProfile = async () => {
    try {
      const res = await axios.get(
        `https://real-rose-hatchling-slip.cyclic.app/users/${id_user}`,
        {
          headers: {
            token,
          },
        },
      );
      setDataProfile(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getDetailProfile();
    }
  }, [isFocused, id_user]);
  return (
    <ScrollView style={styles.page}>
      <View style={styles.page}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.wrapperImage}>
          {!dataProfile ? null : (
            <Image source={{uri: dataProfile?.photo}} style={styles.image} />
          )}
          <Text style={styles.textName}>{dataProfile?.name}</Text>
        </View>
        <View style={styles.wrapperTab}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('EditProfile')}>
            <Image source={IconUser} />
            <Text style={styles.tabTitle}>Edit Profile</Text>
            <Image source={ArrowGo} style={styles.arrowGo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('MyRecipes')}>
            <Image source={IconMyRecipes} />
            <Text style={styles.tabTitle}>My Recipe</Text>
            <Image source={ArrowGo} style={styles.arrowGo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('SavedRecipes')}>
            <Image source={IconMyBookmark} />
            <Text style={styles.tabTitle}>Saved Recipe</Text>
            <Image source={ArrowGo} style={styles.arrowGo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('LikedRecipes')}>
            <Image source={IconMyLike} />
            <Text style={styles.tabLiked}>Liked Recipe</Text>
            <Image source={ArrowGo} style={styles.arrowGo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => dispatch(logoutAction(navigation))}>
            <Image source={Lock} />
            <Text style={styles.tabLiked}>Logout</Text>
            <Image source={ArrowGo} style={styles.arrowGo} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
  },
  wrapperImage: {
    display: 'flex',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEC302',
  },
  textName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  image: {
    width: 84,
    height: 84,
    objectFit: 'cover',
    borderRadius: 70,
  },
  wrapperTab: {
    display: 'flex',
    backgroundColor: '#FFF',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 20,
    marginHorizontal: 7,
    marginTop: -40,
    height: 400,
    elevation: 3,
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
    position: 'relative',
  },
  tabTitle: {
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    marginTop: 3,
    marginLeft: 15,
    fontWeight: '500',
    color: '#4d4d4dff',
  },
  tabLiked: {
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    marginTop: 3,
    marginLeft: 19,
    fontWeight: '500',
    color: '#4d4d4dff',
  },
  arrowGo: {
    position: 'absolute',
    right: 0,
    top: 6,
  },
});
