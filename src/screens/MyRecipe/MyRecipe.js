/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import {useNavigation} from '@react-navigation/native';

const MyRecipesScreen = () => {
  const navigation = useNavigation();
  const [myRecipes, setMyRecipes] = useState([]);
  const [id, setSelectedRecipeId] = useState(null);
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTk2ZDVmODMtNTZhZC00NGU3LWJkNmUtYmM0NmIxMzRjZDY4IiwiZW1haWwiOiJncmFjaWFAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRFeUFsS1h1Z0owV1FSRXFJNUtzRWJlZXh4NjdkNXpUbmpVbFR5UTQuNEYyRFhXemhVWUd6TyIsInVzZXJuYW1lIjoiU2hhbmlhIiwicGhvdG9fdXNlciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RqajZ2eno2dy9pbWFnZS91cGxvYWQvdjE2OTk0NTU3OTgvcGhvdG9fdXNlcnMvanU1dHFqZXN3cWFwNDJ5Z3Z1Y2EucG5nIiwiaWF0IjoxNzAyNTUxMTY5fQ.OJYHOmtCSl9AszTRrcAyseKTBC5jU6YwkD00pqGzLJg';

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get(
          'https://cyan-jittery-cygnet.cyclic.app/recipe/my-recipe',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setMyRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching my recipes:', error);
      }
    };

    fetchMyRecipes();
  }, []);

  const navigateToRecipeDetail = recipeId => {
    navigation.navigate('DetailRecipe', {recipeId});
  };
  const updateMyRecipes = async () => {
    try {
      const response = await axios.get(
        'https://cyan-jittery-cygnet.cyclic.app/recipe/my-recipe',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMyRecipes(response.data.data);
    } catch (error) {
      console.error('Error updating my recipes:', error);
    }
  };

  useEffect(() => {
    updateMyRecipes();
  }, []);

  const handleEditRecipe = recipeId => {
    navigation.navigate('EditRecipe', {recipeId, updateMyRecipes});
  };

  const showDeleteConfirmation = recipeId => {
    console.log('Recipe ID for deletion:', recipeId);
    setSelectedRecipeId(recipeId);
    SweetAlert.showAlertWithOptions(
      {
        title: 'Confirm Deletion',
        subTitle: 'Are you sure you want to delete this recipe?',
        style: 'warning',
        cancelText: 'Cancel',
        confirmText: 'Delete',
        showCancel: true,
        showConfirm: true,
      },
      isConfirm => {
        if (isConfirm) {
          handleDeleteRecipe(recipeId);
        } else {
          setSelectedRecipeId(null);
        }
      },
    );
  };

  const handleDeleteRecipe = async recipeId => {
    try {
      console.log('Deleting recipe with ID:', id);
      await axios.delete(
        `https://cyan-jittery-cygnet.cyclic.app/recipe/delete-recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMyRecipes(prevRecipes =>
        prevRecipes.filter(recipe => recipe.id !== recipeId),
      );

      SweetAlert.showAlertWithOptions(
        {
          title: 'Success',
          subTitle: 'Recipe deleted successfully!',
          style: 'success',
        },
        () => setSelectedRecipeId(null),
      );
    } catch (error) {
      console.error('Error deleting recipe:', error);
      SweetAlert.showAlertWithOptions(
        {
          title: 'Error',
          subTitle: 'Failed to delete recipe.',
          style: 'error',
        },
        () => setSelectedRecipeId(null),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Recipes</Text>
      <FlatList
        data={myRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToRecipeDetail(item.id)}>
            <View style={styles.card}>
              <Image
                source={{uri: item.photo_recipes}}
                style={styles.recipeImage}
              />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.author}>{item.author}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleEditRecipe(item.id)}
                  style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => showDeleteConfirmation(item.id)}>
                  <Text style={styles.actionButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    width: 100,
  },
  author: {
    fontSize: 15,
    marginTop: 10,
    color: 'darkblue',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 50,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 19,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 5,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    color: '#fff',
  },
  buttonText: {
    color: 'white',
  },
});

export default MyRecipesScreen;
