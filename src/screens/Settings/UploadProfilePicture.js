import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {firebase} from '../../firebase/Config';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadProfilePicture = ({ navigation }) => {

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false)

    const pickImage = () => {
      return new Promise((resolve, reject) => {
        const options = {
          mediaType: 'photo',
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        };
  
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('Image picking cancelled');
            resolve(null);
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
            reject(response.error);
          } else if (response.customButton) {
            console.log('Custom button tapped: ', response.customButton);
            reject('Custom button tapped');
          } else {
            const source = { uri: response.assets[0].uri };
            setImage(source);
  
            const uri = response.assets[0].uri;
            const filename = uri.substring(uri.lastIndexOf('/') + 1);
  
            const ref = firebase.storage().ref().child(filename);
            fetch(uri)
              .then((response) => response.blob())
              .then(async (blob) => {
                const snapshot = await ref.put(blob);
                const url = await snapshot.ref.getDownloadURL();
                console.log(url);
                resolve(url);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          }
        });
      });
    };
  
    const handleUpload = () => {
      setLoading(true);
      AsyncStorage.getItem('user')
        .then((data) => {
          pickImage()
            .then((url) => {
              fetch('http://192.168.0.100:3000/setprofilepic', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: JSON.parse(data).user.email,
                  profilepic: url,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === 'Profile picture updated successfully') {
                    setLoading(false);
                    Alert.alert('Profile picture updated successfully');
                    navigation.navigate('Settings_1');
                  } else if (data.error === 'Invalid Credentials') {
                    Alert.alert('Invalid Credentials');
                    setLoading(false);
                    navigation.navigate('Login');
                  } else {
                    setLoading(false);
                    Alert.alert('Please Try Again');
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
      
    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings_1')} style={goback}>

                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                <Text style={{
                    color: 'gray',
                    fontSize: 16,
                }}

                >Go Back</Text>

            </TouchableOpacity>

            <Image source={require('../../../assests/logo.png')} style={logo1} />
            <Text style={formHead2}>Choose a profile profile</Text>


            {
                loading ? <ActivityIndicator
                    size="large"
                    color="white"
                /> :
                    <Text style={formbtn}
                        onPress={() => handleUpload()}
                    >
                        Upload
                    </Text>
            }
        </View>
    )
}





export default UploadProfilePicture

const styles = StyleSheet.create({})







