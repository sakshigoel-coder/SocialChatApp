import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { icons1 } from '../CommonCss/pagecss';

const Bottomnavbar = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="home-outline" size={24} color="black"  style={icons1}/>
      <Fontisto name="search" size={24} color="black"  style={icons1} />
      <Ionicons name="ios-heart" size={24} color="black"  style={icons1} />
      <FontAwesome name="user-circle" size={24} color="black"   style={icons1}/>
    </View>
  );
};

export default Bottomnavbar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#111111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    paddingVertical: 10,
  },
});
