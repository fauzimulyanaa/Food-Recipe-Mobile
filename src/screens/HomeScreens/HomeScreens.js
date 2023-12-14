/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './HomeScreenStyle';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [recipesItem, setRecipes] = useState([]);
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
        setRecipes(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      }
    };

    fetchPopularRecipes();
  }, []);

  const data = [
    {
      id: 1,
      title: 'Beef Steak',
      image: require('../../assets/popular.png'),
    },
    {
      id: 2,
      title: 'Beef Steak',
      image: require('../../assets/popular.png'),
    },
    {
      id: 3,
      title: 'Beef Steak',
      image: require('../../assets/popular.png'),
    },
    {
      id: 4,
      title: 'Beef Steak',
      image: require('../../assets/popular.png'),
    },
  ];

  const renderRecipe = ({item}) => (
    <View style={styles.cardRecipes}>
      <ImageBackground
        source={{uri: item.photo_recipes}}
        style={styles.recipeImage}>
        <Text style={styles.title}>{item.title}</Text>
      </ImageBackground>
    </View>
  );

  const popularRecipe = ({item}) => (
    <View style={styles.cardRecipesPopular}>
      <Image source={item.image} style={styles.recipeImagePopular} />
      <Text style={styles.titlePopular}>{item.title}</Text>
    </View>
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/icon-search.png')}
              style={styles.icon}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search Pasta, Bread, etc"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PopularRecipes')}>
          <View style={styles.wrapper_tagline}>
            <Text style={styles.tagline}>Popular Recipes</Text>
            <Text style={styles.desc}>Populer check</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          data={recipesItem}
          keyExtractor={recipe => recipe.id.toString()}
          renderItem={renderRecipe}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.wrapper_new_recipe}>
          <View style={styles.new_recipe}>
            <Text style={styles.new}>New Recipes</Text>
            <Text style={styles.more}>More info</Text>
          </View>
          <View style={styles.wrapper_icon}>
            <View style={styles.icon_recipe}>
              <Image source={require('../../assets/soup.png')} />
              <Text>Soup</Text>
            </View>
            <View style={styles.icon_recipe}>
              <Image source={require('../../assets/chicken.png')} />
              <Text>Chicken</Text>
            </View>
            <View style={styles.icon_recipe}>
              <Image source={require('../../assets/seefood.png')} />
              <Text>Seafood</Text>
            </View>
            <View style={styles.icon_recipe}>
              <Image source={require('../../assets/chicken.png')} />
              <Text>Dessert</Text>
            </View>
          </View>
        </View>

        <View style={styles.wrapper_popular}>
          <View>
            <Text style={styles.tagline_popular}>Popular For you</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={recipe => recipe.id.toString()}
            renderItem={popularRecipe}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
