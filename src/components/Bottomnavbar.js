 import React from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { icons1 } from '../CommonCss/pagecss';

  const Bottomnavbar = ({ page ,navigation}) => {
    return (
      <View style={styles.container}>
        {
                  page === 'MainPage' ?
                      <MaterialCommunityIcons name="home-variant" size={24} color="black" style={styles.activeicons1}

                          onPress={() => navigation.navigate('MainPage')} />
                      :
                      <MaterialCommunityIcons name="home-variant" size={24} color="black" style={icons1}

                          onPress={() => navigation.navigate('MainPage')} />
              }

              {
                  page === 'SearchUserPage' ?
                      <Fontisto name="search" size={24} color="black" style={styles.activeicons1}

                          onPress={() => navigation.navigate('SearchUserPage')}
                      />
                      :
                      <Fontisto name="search" size={24} color="black" style={icons1}

                          onPress={() => navigation.navigate('SearchUserPage')}
                      />
              }
              {
                  page === 'NotificationPage' ?
                      <Ionicons name="notifications" size={24} color="black" style={styles.activeicons1}

                          onPress={() => navigation.navigate('NotificationPage')}

                      />
                      :
                      <Ionicons name="notifications" size={24} color="black" style={icons1}

                          onPress={() => navigation.navigate('NotificationPage')}

                      />
              }
              {
                  page === 'My_UserProfile' ?
                      <FontAwesome name="user" size={24} color="black" style={styles.activeicons1}

                          onPress={() => navigation.navigate('My_UserProfile')}

                      />
                      :
                      <FontAwesome name="user" size={24} color="black" style={icons1}

                          onPress={() => navigation.navigate('My_UserProfile')}

                      />
              }
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
    activeicons1: {
      backgroundColor: 'white',
      borderRadius: 30,
      width:35,
     height:35,
      padding:5
  }
  });