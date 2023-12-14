/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const RecipeDetailScreen = () => {
  const route = useRoute();
  const {recipeId} = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const hardcodedAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYmJkYTQyYTgtNjYyYi00M2MwLTg0ZWUtYTJiNzIxMDllNTU2IiwiZW1haWwiOiJkYXlhdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGx2VEI1RGxrM0dkQ3UzZW1ZTWVWS2VVQmZKU0oxUURINXp6ZDFVS3BKVUtmQ2VUTFhqajFxIiwidXNlcm5hbWUiOiJEYXlhdCBCIiwicGhvdG9fdXNlciI6bnVsbCwiaWF0IjoxNjk5NTg0NDcyfQ.r9LkPqIx4IyIIe3QoI_ZRYXMt2oSGggSqUR_quwSNTU';

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const response = await axios.get(
          `https://cyan-jittery-cygnet.cyclic.app/recipe/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${hardcodedAccessToken}`,
            },
          },
        );
        setRecipe(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeById();
  }, [recipeId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!recipe) {
    return <Text>Error fetching recipe details</Text>;
  }

  return (
    <View style={styles.wrapper_detail}>
      <Image
        source={{uri: recipe.photo_recipes}}
        style={{width: 400, height: 300}}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.author}> {recipe.author}</Text>
      </View>
      <View style={styles.ingredients}>
        <Text style={styles.tagline}>ingredients</Text>
        <Text style={styles.list}>{recipe.ingredients}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper_detail: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 180,
    left: 0,
    padding: 16,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FBFBFB',
    width: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 5,
  },
  author: {
    fontSize: 16,
    color: '#161A30',
    fontWeight: '700',
  },
  ingredients: {
    marginTop: 0,
    fontSize: 18,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
  },
  tagline: {
    fontSize: 20,
    marginBottom: 20,
    color: '#18172B',
    borderBottomWidth: 1,
    borderBottomColor: '#EEC302',
    paddingBottom: 10,
  },
  list: {
    color: '#666666',
    paddingBottom: 6,
  },
});

export default RecipeDetailScreen;
