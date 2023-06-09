import { StyleSheet, Text, View, StatusBar,ScrollView,Image,ActivityIndicator, Alert } from 'react-native'
import React, { useEffect,useState } from 'react'
import { containerFull } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../components/Bottomnavbar';
import TopNavbar from '../../components/TopNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Foundation from 'react-native-vector-icons/Foundation';

const My_UserProfile = ({ navigation }) => {
    const [userdata, setUserdata] = useState(null)

    const loaddata = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value) {
            const token = JSON.parse(value).token;
            const email = JSON.parse(value).user.email;
            fetch('http://192.168.0.100:3000/userdata', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ email: email })
            })
              .then(res => res.json())
              .then(data => {
                if (data.message === 'User Found') {
                  setUserdata(data.user);
                } else {
                  Alert.alert('Login Again');
                  navigation.navigate('Login');
                }
              })
              .catch(err => {
                navigation.navigate('Login');
              });
          } else {
            navigation.navigate('Login');
          }
        } catch (err) {
          navigation.navigate('Login');
        }
      };
    
      useEffect(() => {
        loaddata();
      }, []);

    console.log('userdata ', userdata)
    const data = {
        username: 'Aman Dhattarwal',
        followers: 1100,
        following: 1500,
        description: "I am a software developer and I love to code",
        profile_image: 'https://picsum.photos/500/500',
        posts: [
            {
                id: 1,
                post_image: 'https://picsum.photos/id/10/200/300',
            },
            {
                id: 2,
                post_image: 'https://picsum.photos/id/39/200/300',
            },
            {
                id: 3,
                post_image: 'https://picsum.photos/id/55/200/300',
            },
            {
                id: 4,
                post_image: 'https://picsum.photos/id/90/200/300',
            },
            {
                id: 5,
                post_image: 'https://picsum.photos/id/89/200/300',
            }
        ]
    }
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"My_UserProfile"} />
            <Bottomnavbar navigation={navigation} page={"My_UserProfile"} />
        {/* Add TopNavbar and Bottomnavbar components */}
        <Foundation name="refresh" size={30} color="white" style={styles.refresh} onPress={loaddata} />
        {
                userdata ?
                    <ScrollView>
                        <View style={styles.c1}>
                            {
                                userdata.profilepic.length > 0 ?
                                    <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
                                    :
                                    <Image style={styles.profilepic} source={nopic} />
                            }
                            <Text style={styles.txt}>@{userdata.username}</Text>

                            <View style={styles.c11}>
                                <View style={styles.c111}>
                                    <Text style={styles.txt1}>Followers</Text>
                                    <Text style={styles.txt2}>{userdata.followers.length}</Text>
                                </View>
                                <View style={styles.vr1}></View>
                                <View style={styles.c111}>
                                    <Text style={styles.txt1}>Following</Text>
                                    <Text style={styles.txt2}>{userdata.following.length}</Text>
                                </View>
                                <View style={styles.vr1}></View>
                                <View style={styles.c111}>
                                    <Text style={styles.txt1}>Posts</Text>
                                    <Text style={styles.txt2}>{userdata.posts.length}</Text>
                                </View>
                            </View>

                            {
                                userdata.description.length > 0 &&
                                <Text style={styles.description}>{userdata.description}</Text>
                            }


                        </View>
                        {
                            userdata.posts.length > 0 ?
                                <View style={styles.c1}>
                                    <Text style={styles.txt}>Your Posts</Text>
                                    <View style={styles.c13}>
                                        {
                                            userdata.posts?.map(
                                                (item) => {
                                                    return (
                                                        <Image key={item.post} style={styles.postpic}
                                                            source={{ uri: item.post }}
                                                        />
                                                    )
                                                }
                                            )
                                        }
                                    </View>
                                </View>
                                :
                                <View style={styles.c2}>
                                    <Text style={styles.txt1}>You have not posted anything yet</Text>
                                </View>
                        }

                    </ScrollView>

                    :
                    <ActivityIndicator size="large" color="white" />
            }

</View>
);
}
    


export default My_UserProfile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        paddingVertical: 50,
    },
    c1: {
        width: '100%',
        alignItems: 'center',
    },
    profilepic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10
    },
    txt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: '#111111',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    txt1: {
        color: 'white',
        fontSize: 15,
    },
    txt2: {
        color: 'white',
        fontSize: 20,
    },
    c11: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    c111: {
        alignItems: 'center',
    },
    vr1: {
        width: 1,
        height: 50,
        backgroundColor: 'white'
    },
    description: {
        color: 'white',
        fontSize: 15,
        marginVertical: 10,
        backgroundColor: '#111111',
        width: '100%',
        padding: 10,
        paddingVertical: 20,
    },
    postpic: {
        width: 120,
        height: 150,
        margin:'2%',
        resizeMode:'cover'
    },
    c13: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        justifyContent: 'center'
    },
    c2: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    refresh: {
        position: 'absolute',
        top: 50,
        right: 5,
        zIndex: 1,
    }
})