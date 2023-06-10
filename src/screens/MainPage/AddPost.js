import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../../firebase/Config';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddPost = ({ navigation }) => {

    const [postdescription, setpostdescription] = useState('')

    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [post, setPost] = useState('')

    const pickImage = () => {
        setLoading1(true)
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
              setLoading1(false)
              setPost(null)
              resolve(null);
            } else if (response.error) {
              console.log('Image picker error: ', response.error);
              reject(response.error);
            } else if (response.customButton) {
              console.log('Custom button tapped: ', response.customButton);
              reject('Custom button tapped');
            } else {
              const source = { uri: response.assets[0].uri };
           
    
              const uri = response.assets[0].uri;
              const filename = uri.substring(uri.lastIndexOf('/') + 1);
    
              const ref = firebase.storage().ref().child(filename);
              fetch(uri)
                .then((response) => response.blob())
                .then(async (blob) => {
                  const snapshot = await ref.put(blob);
                  const url = await snapshot.ref.getDownloadURL();
                  console.log(url);
                  setLoading1(false)
                  setPost(url)
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

        if (post != null) {
            AsyncStorage.getItem('user')
                .then(data => {
                    setLoading2(true)

                    fetch('http://192.168.0.100:3000/addpost', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            post: post,
                            postdescription: postdescription
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message == 'Post added successfully') {
                                Alert.alert('Post added successfully')
                                setLoading2(false)
                                navigation.navigate('My_UserProfile')
                            }
                            else {
                               Alert.alert('Something went wrong, please try again')
                                setLoading2(false)
                            }
                        })
                })
        }
        else {
           Alert.alert('Please select an image')
        }
    }

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
            {
                loading1 ? <ActivityIndicator
                    size="large"
                    color="white"
                /> :
                    <>
                        <Text
                            style={formHead2}
                        >Add New Post</Text>

                        {
                            post ?
                                <TouchableOpacity
                                    onPress={() => pickImage()}
                                >
                                    <Image source={{ uri: post }} style={{
                                        width: 200, height: 200,
                                        marginVertical: 10,
                                    }} />
                                </TouchableOpacity>
                                :

                                <Text style={styles.addpost}
                                    onPress={() => {
                                        pickImage()
                                    }}
                                >
                                    Click here to select a new post
                                </Text>
                        }
                    </>
            }



            {/*  */}
            <Text style={formHead2}>Change Description</Text>
            <TextInput placeholder="Enter new description" style={formInput}
                onChangeText={(text) => setpostdescription(text)}
                multiline={true}
                numberOfLines={5}
            />

            {
                loading2 ? <ActivityIndicator
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






export default AddPost

const styles = StyleSheet.create({
    addpost: {
        fontSize: 20,
        fontWeight: '100',
        color: 'white',

        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 50,
        width: '80%',
        textAlign: 'center',
        marginVertical: 20,
    }
})