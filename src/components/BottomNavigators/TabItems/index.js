/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';

import User from '../../../assets/icons/User.png';
import UserActive from '../../../assets/icons/UserActive.png';
import MessageCircle from '../../../assets/icons/MessageCircle.png';
import MessageCircleActive from '../../../assets/icons/MessageCircleActive.png';
import Home from '../../../assets/icons/Home.png';
import HomeActive from '../../../assets/icons/HomeActive.png';
import PlusSquare from '../../../assets/icons/PlusSquare.png';
import PlusSquareActive from '../../../assets/icons/PlusSquareActive.png';

const TabItems = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? (
        <Image source={HomeActive} />
      ) : (
        <Image source={Home} />
      );
    }
    if (label === 'AddRecipes') {
      return isFocused ? (
        <Image source={PlusSquareActive} />
      ) : (
        <Image source={PlusSquare} />
      );
    }

    if (label === 'Comments') {
      return isFocused ? (
        <Image source={MessageCircleActive} />
      ) : (
        <Image source={MessageCircle} />
      );
    }
    if (label === 'Profile') {
      return isFocused ? (
        <Image source={UserActive} />
      ) : (
        <Image source={User} />
      );
    }

    return <Image source={HomeActive} />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <View style={styles.wrapperLabel(label, isFocused)}>
        <Icon />
        <Text style={styles.text(isFocused, label)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapperLabel: (label, isFocused) => ({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
    backgroundColor: isFocused
      ? null
      : '#f6f5fcff' && label === 'Home'
      ? '#f6f5fcff'
      : null,
  }),
  text: (isFocused, label) => ({
    fontSize: 12,
    color: isFocused ? '#EFC81A' : '#666666',
    display: isFocused ? 'none' : 'flex' && label === 'Home' ? 'flex' : 'none',
    alignSelf: 'center',
    marginLeft: 9,
  }),
});
