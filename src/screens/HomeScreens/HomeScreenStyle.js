/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'white',
    height: 'auto',
    paddingBottom: 80,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: 'gray',
    borderRadius: 40,
    padding: 9,
    marginHorizontal: 20,
    backgroundColor: '#EFEFEF',
    borderWidth: 0,
    paddingHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },

  wrapper_tagline: {
    padding: 25,
  },
  tagline: {
    fontSize: 20,
    color: '#3F3A3A',
    fontWeight: '500',
  },

  desc: {
    marginTop: 5,
    color: '#666666',
    fontWeight: '900',
  },

  cardRecipes: {
    width: 200,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    width: 300,
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  wrapper_new_recipe: {
    padding: 25,
  },
  new_recipe: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  new: {
    fontSize: 20,
    color: '#3F3A3A',
  },

  more: {
    color: '#6D61F2',
    fontSize: 14,
  },
  wrapper_icon: {
    marginTop: 20,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
  },

  icon_recipe: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  wrapper_popular: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  tagline_popular: {
    fontSize: 20,
  },
  cardRecipesPopular: {
    width: 150,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  recipeImagePopular: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titlePopular: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default styles;
