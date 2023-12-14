/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

const EditRecipeScreen = ({route, navigation}) => {
  const {recipeId, updateMyRecipes} = route.params;
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    instructions: '',
    ingredients: '',
    category_id: '',
  });
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTk2ZDVmODMtNTZhZC00NGU3LWJkNmUtYmM0NmIxMzRjZDY4IiwiZW1haWwiOiJncmFjaWFAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRFeUFsS1h1Z0owV1FSRXFJNUtzRWJlZXh4NjdkNXpUbmpVbFR5UTQuNEYyRFhXemhVWUd6TyIsInVzZXJuYW1lIjoiU2hhbmlhIiwicGhvdG9fdXNlciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RqajZ2eno2dy9pbWFnZS91cGxvYWQvdjE2OTk0NTU3OTgvcGhvdG9fdXNlcnMvanU1dHFqZXN3cWFwNDJ5Z3Z1Y2EucG5nIiwiaWF0IjoxNzAyNTUxMTY5fQ.OJYHOmtCSl9AszTRrcAyseKTBC5jU6YwkD00pqGzLJg';

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `https://cyan-jittery-cygnet.cyclic.app/recipe/${recipeId}`,
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

  const handleUpdateRecipe = async () => {
    try {
      const response = await axios.patch(
        `https://cyan-jittery-cygnet.cyclic.app/recipe/update-recipe/${recipeId}`,
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Recipe</Text>
      <TextInput
        style={styles.input}
        value={recipeData.title}
        onChangeText={value => setRecipeData({...recipeData, title: value})}
        placeholder="Title"
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={recipeData.description}
        onChangeText={value =>
          setRecipeData({...recipeData, description: value})
        }
        placeholder="Description"
        multiline
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={recipeData.instructions}
        onChangeText={value =>
          setRecipeData({...recipeData, instructions: value})
        }
        placeholder="Instructions"
        multiline
      />
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
