/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import {launchImageLibrary} from 'react-native-image-picker';

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

const EditRecipeScreen = ({route, navigation}) => {
  const {recipeId, updateMyRecipes} = route.params;
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    instructions: '',
    ingredients: '',
    category_id: '',
    photo_recipes: null,
  });
  const auth = useSelector(state => state.auth);
  let token = auth?.data?.token;

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `https://easy-gray-alligator-tutu.cyclic.app/recipe/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRecipeData(response.data.data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchRecipeData();
  }, [recipeId]);
  const openGallery = async () => {
    try {
      const image = await launchImageLibrary(options);
      if (!image.didCancel) {
        setRecipeData({
          ...recipeData,
          photo_recipes: {
            uri: image.assets[0].uri,
            name: image.assets[0].fileName,
            type: image.assets[0].type,
          },
        });
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleUpdateRecipe = async () => {
    try {
      const formData = new FormData();
      formData.append('title', recipeData.title);
      formData.append('description', recipeData.description);
      formData.append('instructions', recipeData.instructions);
      formData.append('ingredients', recipeData.ingredients);
      formData.append('category_id', recipeData.category_id);
      if (recipeData.photo_recipes) {
        formData.append('photo_recipes', recipeData.photo_recipes);
      }

      const response = await axios.patch(
        `https://easy-gray-alligator-tutu.cyclic.app/recipe/update-recipe/${recipeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      updateMyRecipes();
      SweetAlert.showAlertWithOptions(
        {
          title: 'Success',
          subTitle: response.data.message,
          style: 'success',
        },
        () => navigation.navigate('MyRecipe'),
      );
    } catch (error) {
      console.error('Error updating recipe:', error);
      SweetAlert.showAlertWithOptions({
        title: 'Error',
        subTitle: 'Failed to update recipe.',
        style: 'error',
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Edit Recipe</Text>
        <Button title="Choose Photo" onPress={openGallery} />
        {/* Tampilkan foto yang dipilih jika ada */}
        {recipeData.photo_recipes && (
          <Image
            source={{uri: recipeData.photo_recipes.uri}}
            style={{width: 200, height: 200}}
          />
        )}
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          value={recipeData.title}
          onChangeText={value => setRecipeData({...recipeData, title: value})}
          placeholder="Title"
        />
        <Text>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={recipeData.description}
          onChangeText={value =>
            setRecipeData({...recipeData, description: value})
          }
          placeholder="Description"
          multiline
        />
        <Text>Instructions</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={recipeData.instructions}
          onChangeText={value =>
            setRecipeData({...recipeData, instructions: value})
          }
          placeholder="Instructions"
          multiline
        />
        <Text>Ingredients</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={recipeData.ingredients}
          onChangeText={value =>
            setRecipeData({...recipeData, ingredients: value})
          }
          placeholder="Ingredients"
          multiline
        />
        <Button title="Update Recipe" onPress={handleUpdateRecipe} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
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
});

export default EditRecipeScreen;
