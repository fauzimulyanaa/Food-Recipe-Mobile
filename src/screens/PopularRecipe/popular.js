/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const PopularScreens = ({navigation}) => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const hardcodedAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTk2ZDVmODMtNTZhZC00NGU3LWJkNmUtYmM0NmIxMzRjZDY4IiwiZW1haWwiOiJncmFjaWFAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRFeUFsS1h1Z0owV1FSRXFJNUtzRWJlZXh4NjdkNXpUbmpVbFR5UTQuNEYyRFhXemhVWUd6TyIsInVzZXJuYW1lIjoiU2hhbmlhIiwicGhvdG9fdXNlciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RqajZ2eno2dy9pbWFnZS91cGxvYWQvdjE2OTk0NTU3OTgvcGhvdG9fdXNlcnMvanU1dHFqZXN3cWFwNDJ5Z3Z1Y2EucG5nIiwiaWF0IjoxNzAyNTUxMTY5fQ.OJYHOmtCSl9AszTRrcAyseKTBC5jU6YwkD00pqGzLJg';

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await axios.get(
          'https://cyan-jittery-cygnet.cyclic.app/recipe',
          {
            headers: {
              Authorization: `Bearer ${hardcodedAccessToken}`,
            },
          },
        );
        setPopularRecipes(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      }
    };

    fetchPopularRecipes();
  }, []);
  const navigateToRecipeDetail = recipeId => {
    navigation.navigate('DetailRecipe', {recipeId});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Recipes</Text>
      <FlatList
        data={popularRecipes}
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
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    paddingHorizontal: 16,
    paddingBottom: 90,
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
  },

  author: {
    fontSize: 15,
    marginTop: 10,
    color: 'salmon',
    fontWeight: '700',
  },
});

export default PopularScreens;
