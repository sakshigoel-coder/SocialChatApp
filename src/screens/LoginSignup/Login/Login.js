import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { containerFull, hr80, logo1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'

const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleLogin = () => {
        if (email == '' || password == '') {
            Alert.alert('Please enter email and password')
        }
        else {
            setLoading(true)
            fetch('http://192.168.0.100:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setLoading(false)
                        Alert.alert(data.error)
                    }
                    else if (data.message == 'Successfully Signed In') {
                        setLoading(false)
                        navigation.navigate('MainPage', { data })
                    }
                })
                .catch(err => {
                    setLoading(false)
                   Alert.alert(err)
                })
        }
        // navigation.navigate('MainPage')
    }
    return (
        <View style={containerFull}>
            <Image source={require('../../../../assests/logo.png')} style={logo1} />
            <Text style={formHead}>Login</Text>
            <TextInput placeholder="Enter Your Email" style={formInput}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput placeholder="Enter Your Password" style={formInput}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <Text style={formTextLinkRight}
                onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}
            >Forgot Password?</Text>

            {
                loading ?
                    <ActivityIndicator size="large" color="white" />
                    :
                    <Text style={formbtn} onPress={
                        () => handleLogin()
                    }>
                        Submit
                    </Text>
            }


            <View style={hr80}></View>


            <Text style={formTextLinkCenter}>
                Don't have an account? <Text style={{ color: 'white' }}
                    onPress={() => navigation.navigate('Signup_EnterEmail')}
                >Signup</Text>
            </Text>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({})