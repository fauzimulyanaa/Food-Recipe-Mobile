/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import auth from './auth';
import GetRecipes from './GetRecipes';
import getDetailRecipe from './GetDetailRecipe';
import GetUserRecipe from './GetUserRecipe';
import DeleteRecipe from './DeleteRecipe';
import ProfileUpdate from './ProfileUpdate';

const rootReducers = combineReducers({
  auth,
  GetRecipes,
  getDetailRecipe,
  GetUserRecipe,
  DeleteRecipe,
  ProfileUpdate,
});

export default rootReducers;
