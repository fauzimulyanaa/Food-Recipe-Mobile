/* eslint-disable prettier/prettier */
// EditProfileScreen.js

import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../storages/actions/ProfileUpdate';

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.ProfileUpdate.data);
  const isLoading = useSelector(state => state.ProfileUpdate.isLoading);

  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photo);

  const handleEditProfile = () => {
    const newData = {
      name,
      photo,
    };

    dispatch(updateProfile(user.id, newData));
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <Image source={{uri: photo}} style={styles.profileImage} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Photo URL"
        value={photo}
        onChangeText={text => setPhoto(text)}
      />
      <Button title="Save" onPress={handleEditProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditProfileScreen;
