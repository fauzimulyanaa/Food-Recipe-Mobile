/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {BookOpen} from '../../assets';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {TitlePage} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AlertUploadPhoto from '../../components/AlertConfirmation/AlertUploadPhoto';
import AlertFailed from '../../components/AlertConfirmation/AlertFailed';

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
const EditRecipe = ({route, navigation}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);
  const [idCategory, setIdCategory] = useState();
  const [itemsCategory, setItemsCategory] = useState([{label: '', value: ''}]);
  const [title, setTitle] = useState();
  const [titleIsActive, setTitleIsActive] = useState();
  const [ingredients, setIngredients] = useState();
  const [ingredientsIsActive, setIngredientsIsActive] = useState();
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector(state => state.auth);

  const {id_recipe} = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCategory();
      getDetailRecipe();
    }
  }, [isFocused]);

  let token = auth?.data?.token?.accessToken;

  const getCategory = async () => {
    try {
      const res = await axios.get(
        'https://real-rose-hatchling-slip.cyclic.app/category',
        {
          headers: {
            token,
          },
        },
      );
      setCategory(res.data.result);
      setItemsCategory(
        res.data.result.map(items => {
          return {label: items.name, value: items.id_category};
        }),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDetailRecipe = async () => {
    try {
      const res = await axios.get(
        `https://real-rose-hatchling-slip.cyclic.app/recipe/detail/${id_recipe}`,
        {
          headers: {
            token,
          },
        },
      );
      setTitle(res.data.data.title);
      setIngredients(res.data.data.ingredients.join(', '));
      setPhoto(res.data.data.photo);
      setIdCategory(res.data.data.id_category);
    } catch (error) {
      console.log(error.message);
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App Needs Camera Access',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('access camera success');
        cameraLaunch();
      } else {
        console.log('access camera failed');
        console.log(PermissionsAndroid.RESULTS.GRANTED);
      }
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  };

  const cameraLaunch = () => {
    launchCamera(options, res => {
      console.log('respons camera ', res);
      if (res.didCancel) {
        console.log('user cancel camera');
      } else if (res.error) {
        console.log('camera error', res.errorMessage);
      } else {
        console.log('camera success');
        console.log(res);
        setSelectedImage(res.assets[0].uri);
        setPhoto({
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          fileName: res.assets[0].fileName,
          type: res.assets[0].type,
        });
      }
    });
  };

  const galleryLaunch = () => {
    launchImageLibrary(options, res => {
      console.log('respons gallery ', res);
      if (res.didCancel) {
        console.log('user cancel gallery');
      } else if (res.error) {
        console.log('gallery error', res.errorMessage);
      } else {
        console.log('gallery success');
        console.log(res);
        setSelectedImage(res.assets[0].uri);
        setPhoto({
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          fileName: res.assets[0].fileName,
          type: res.assets[0].type,
        });
      }
    });
  };

  const submit = async () => {
    setIsLoading(true);

    let bodyData = new FormData();
    bodyData.append('title', title);
    bodyData.append('ingredients', ingredients);
    bodyData.append('photo', photo);
    bodyData.append('id_category', idCategory);
    try {
      const res = await axios.put(
        `https://real-rose-hatchling-slip.cyclic.app/recipe/${id_recipe}`,
        bodyData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setIsLoading(false);
      navigation.navigate('MyRecipes');
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response.data.messsage || error.response.data.message);
      AlertFailed(
        'Failed',
        error.response.data.messsage || error.response.data.message,
      );
      setIsLoading(false);
    }
  };
  return (
    <>
      <ScrollView style={styles.page} nestedScrollEnabled={true}>
        <View style={styles.page} contentInsetAdjustmentBehavior="automatic">
          <TitlePage content={'Update Your Recipe'} />
          <View
            style={
              titleIsActive
                ? styles.inputTitleRecipeActive
                : styles.inputTitleRecipe
            }>
            {/* <BookOpen style={styles.iconBook} /> */}
            <TextInput
              style={styles.inputForm}
              placeholder="Title"
              value={title}
              onChangeText={value => setTitle(value)}
              onFocus={() => setTitleIsActive(true)}
              onBlur={() => setTitleIsActive(false)}
            />
          </View>
          <View
            style={
              ingredientsIsActive
                ? styles.wrapperIngredientsActive
                : styles.wrapperIngredients
            }>
            <TextInput
              multiline={true}
              numberOfLines={13}
              placeholder="Ingredients"
              value={ingredients}
              style={styles.inputIngredients}
              onChangeText={value => setIngredients(value)}
              onFocus={() => setIngredientsIsActive(true)}
              onBlur={() => setIngredientsIsActive(false)}
            />
          </View>
          {photo ? (
            <View style={styles.wrapperIngredients}>
              <Image
                style={styles.image}
                source={{uri: selectedImage || photo}}
              />
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.wrapperIngredients}
            onPress={() =>
              AlertUploadPhoto({
                alertTitle: 'Add photo',
                alertMsg: 'Where will you add the photo?',
                camera: requestPermission,
                gallery: galleryLaunch,
              })
            }>
            <Text style={styles.addPhoto}>Edit Photo</Text>
          </TouchableOpacity>
          <View style={styles.dropDown}>
            <DropDownPicker
              open={open}
              value={idCategory}
              items={itemsCategory}
              setOpen={setOpen}
              setValue={setIdCategory}
              setItems={setItemsCategory}
              listMode="SCROLLVIEW"
              placeholder="Category"
            />
          </View>
          <TouchableOpacity style={styles.wrapperBtn} onPress={submit}>
            <Text style={styles.textBtn}>Update</Text>
            {isLoading ? (
              <ActivityIndicator
                animating={isLoading ? true : false}
                color={'#4d4d4dff'}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default EditRecipe;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputTitleRecipe: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitleRecipeActive: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EFC81A',
    elevation: 5,
  },
  wrapperIngredients: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
  },
  wrapperIngredientsActive: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EFC81A',
    elevation: 5,
  },
  iconBook: {
    alignSelf: 'center',
    marginLeft: 50,
  },
  inputForm: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginLeft: 5,
    color: 'black',
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
  },
  inputIngredients: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginLeft: 5,
    color: 'black',
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
    textAlignVertical: 'top',
  },
  addPhoto: {
    padding: 13,
    color: '#6e6767ff',
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
  },
  dropDown: {
    marginHorizontal: 28,
    marginTop: 15,
  },
  wrapperBtn: {
    marginHorizontal: 115,
    marginTop: 25,
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    marginBottom: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textBtn: {
    padding: 10,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Poppins Regular',
  },
});
