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
import {useDispatch, useSelector} from 'react-redux';
import {getAllMenus} from '../../storages/actions/GetRecipes';

const PopularScreens = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const popularRecipes = useSelector(state => state.GetRecipes.data);
  console.log(popularRecipes);

  useEffect(() => {
    dispatch(getAllMenus());
  }, [dispatch]);
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
