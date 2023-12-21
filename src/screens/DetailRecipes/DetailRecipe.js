/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipeDetail} from '../../storages/actions/GetDetailRecipe';
import {useRoute} from '@react-navigation/native';
import SweetAlert from 'react-native-sweet-alert';

const RecipeDetailScreen = () => {
  const route = useRoute();
  const {recipeId} = route.params;
  const dispatch = useDispatch();
  const {recipe, isLoading, isError} = useSelector(
    state => state.getDetailRecipe,
  );

  useEffect(() => {
    dispatch(getRecipeDetail(recipeId));
  }, [dispatch, recipeId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
