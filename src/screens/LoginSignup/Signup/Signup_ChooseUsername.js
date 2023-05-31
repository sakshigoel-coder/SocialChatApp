import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Signup_ChooseUsername = ({ navigation,route }) => {
    const { email } = route.params
    const [username, setusername] = useState('')

    const [loading, setLoading] = useState(false)

    
    const handleUsername = () => {
        if (username == '') {
            Alert.alert('Please enter username')
        }
        else {
            setLoading(true)
            fetch('http://192.168.0.100:3000/changeusername', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username
                })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.message === "Username Available") {
                            setLoading(false)
                            Alert.alert('Username has been set successfully')
                            navigation.navigate('Signup_ChoosePassword', { email: email, username: username })
                        }
                        else {
                            setLoading(false)
                            Alert.alert("Username not available");
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })

        }

        // navigation.navigate('Signup_ChoosePassword')
    }

    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>

                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                <Text style={{
                    color: 'gray',
                    fontSize: 16,
                }}

                >Go Back</Text>

            </TouchableOpacity>

            <Image source={require('../../../../assests/logo.png')} style={logo1} />
            <Text style={formHead2}>Choose a Username</Text>
            <TextInput placeholder="Enter a username" style={formInput} 
               onChangeText={(text) => setusername(text)}
               />

            {
                loading ? <ActivityIndicator /> :
                    <Text style={formbtn}
                        onPress={() => handleUsername()}
                    >
                        Next
                    </Text>
            }
        </View>
    )
}




export default Signup_ChooseUsername

const styles = StyleSheet.create({})