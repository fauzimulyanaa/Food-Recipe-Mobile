/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

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

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState('');
  const [open, setOpen] = useState(false);
  const [categoryId, setIdCategory] = useState(null);
  const [itemsCategory, setItemsCategory] = useState([{label: '', value: ''}]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    getCategory();
    if (isFocused) {
      setPhoto('');
      setSelectedImage('');
    }
  }, [isFocused]);

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTk2ZDVmODMtNTZhZC00NGU3LWJkNmUtYmM0NmIxMzRjZDY4IiwiZW1haWwiOiJncmFjaWFAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRFeUFsS1h1Z0owV1FSRXFJNUtzRWJlZXh4NjdkNXpUbmpVbFR5UTQuNEYyRFhXemhVWUd6TyIsInVzZXJuYW1lIjoiU2hhbmlhIiwicGhvdG9fdXNlciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RqajZ2eno2dy9pbWFnZS91cGxvYWQvdjE2OTk0NTU3OTgvcGhvdG9fdXNlcnMvanU1dHFqZXN3cWFwNDJ5Z3Z1Y2EucG5nIiwiaWF0IjoxNzAyNTUxMTY5fQ.OJYHOmtCSl9AszTRrcAyseKTBC5jU6YwkD00pqGzLJg';

  const getCategory = async () => {
    try {
      const response = await axios.get(
        'https://cyan-jittery-cygnet.cyclic.app/category',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategory(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getListCategory = () => {
    let data = category.map(item => {
      return {label: item.name, value: item.id};
    });
    setItemsCategory(data);
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

  const submit = async () => {
    let bodyData = new FormData();
    bodyData.append('title', title);
    bodyData.append('description', description);
    bodyData.append('instructions', instructions);
    bodyData.append('ingredients', ingredients);
    bodyData.append('category_id', categoryId);
    bodyData.append('photo_recipes', photo);

    try {
      const res = await axios.post(
        'https://cyan-jittery-cygnet.cyclic.app/recipe/create',
        bodyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      SweetAlert.showAlertWithOptions(
        {
          title: 'Success',
          subTitle: res.data.message,
          style: 'success',
        },
        () => {
          navigation.navigate('MyRecipe');
          setTitle('');
          setIngredients('');
          setDescription('');
          setInstructions('');
          setPhoto('');
          setIdCategory('');
          setSelectedImage('');
        },
      );
    } catch (error) {
      console.log(error.response.data.message || error.response.data.messsage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={openGallery} style={styles.imagePicker}>
        {photo && photo.uri ? (
          <Image source={{uri: photo.uri}} style={styles.image} />
        ) : (
          <Text style={styles.imagePickerText}>Select Recipe Photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        value={description}
        onChangeText={value => setDescription(value)}
        multiline
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Instructions"
        value={instructions}
        onChangeText={value => setInstructions(value)}
        multiline
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={value => setIngredients(value)}
        multiline
      />
      <Text style={styles.label}>Category</Text>
      <View style={styles.dropDown}>
        <DropDownPicker
          open={open}
          value={categoryId}
          items={itemsCategory}
          setOpen={setOpen}
          setValue={setIdCategory}
          setItems={setItemsCategory}
          listMode="SCROLLVIEW"
          onPress={getListCategory}
          placeholder="Category"
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={submit}>
        <Text style={styles.submitButtonText}>POST</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
    height: 1000,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    fontSize: 16,
    color: 'blue',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropDown: {
    marginHorizontal: 0,
    marginTop: 15,
    marginBottom: 30,
  },

  submitButton: {
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 89,
    marginTop: 20,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
  },
});

export default AddRecipeScreen;
