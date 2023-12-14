/* eslint-disable prettier/prettier */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';

import HomeScreens from './src/screens/HomeScreens/HomeScreens';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import PopularScreens from './src/screens/PopularRecipe/popular';
import DetailRecipe from './src/screens/DetailRecipes/DetailRecipe';
import ProfileScreen from './src/screens/Profile/Profile';
import AddRecipe from './src/screens/AddRecipe/AddRecipe';
import MyRecipe from './src/screens/MyRecipe/MyRecipe';
import EditRecipe from './src/screens/EditRecipe/EditRecipe';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/home.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/user.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Recipe"
        component={AddRecipe}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/icons8-add-30.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PopularRecipes" component={PopularScreens} />
        <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MyRecipe" component={MyRecipe} />
        <Stack.Screen name="EditRecipe" component={EditRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
