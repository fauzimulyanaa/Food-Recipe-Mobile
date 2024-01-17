/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// EditProfileScreen.js

import React, {useState, useEffect} from 'react';
import SweetAlert from 'react-native-sweet-alert';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../storages/actions/ProfileUpdate';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWitdh: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
  storageOptions: {
    path: 'image',
  },
};

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.ProfileUpdate.data);
  const isLoading = useSelector(state => state.ProfileUpdate.isLoading);
  const auth = useSelector(state => state.auth);

  const [username, setName] = useState();
  const [photo, setPhoto] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [dataProfile, setDataProfile] = useState();
  console.log(dataProfile);

  let token = auth?.data?.token;
  let id_user = auth?.data?.uuid;

  const getDetailProfile = async () => {
    try {
      const res = await axios.get(
        `https://easy-gray-alligator-tutu.cyclic.app/user/${id_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDataProfile(res.data.data);
      setPhoto(res?.data?.data?.photo_user);
      setName(res?.data?.data?.username);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDetailProfile();
  }, [id_user]);

  const submit = () => {
    let bodyData = new FormData();
    bodyData.append('photo_user', photo);
    bodyData.append('username', username);

    dispatch(updateProfile(id_user, bodyData, navigation));
  };

  const openGallery = async () => {
    const image = await launchImageLibrary(options);
    setSelectedImage(image.assets[0].uri);
    setPhoto({
      uri: image.assets[0].uri,
      name: image.assets[0].fileName,
      fileName: image.assets[0].fileName,
      type: image.assets[0].type,
    });
  };

  return (
    <ScrollView>
      <View style={styles.page} contentInsetAdjustmentBehavior="automatic">
        <TouchableOpacity onPress={openGallery} style={styles.imagePicker}>
          {photo && photo.uri ? (
            <Image source={{uri: photo.uri}} style={styles.image} />
          ) : (
            <Text style={styles.imagePickerText}>Select Recipe Photo</Text>
          )}
        </TouchableOpacity>
        <View>
          <TextInput
            placeholder="username"
            style={styles.textInput}
            value={username}
            onChangeText={value => setName(value)}
          />
        </View>
        <TouchableOpacity style={styles.wrapperBtn} onPress={submit}>
          <Text style={styles.textBtn}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagePicker: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePickerText: {
    padding: 20,
    textAlign: 'center',
    color: '#777',
  },
  image: {
    width: '100%',
    height: 200,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    width: 200,
  },
  wrapperBtn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  textBtn: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default EditProfileScreen;
