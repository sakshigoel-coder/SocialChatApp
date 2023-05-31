import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ActivityIndicator,Alert } from 'react-native'
import React,{useState} from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ForgotPassword_EnterEmail = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] =useState(false)


    const handleEmail = () => {
        if (email === '') {
            Alert.alert('Please enter email')
        }

        else {
            setLoading(true)
            fetch('http:// 192.168.0.100:3000/verifyfp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
                .then(res => res.json()).then(data => {
                    if (data.error === "Invalid Credentials") {
                        // alert('Invalid Credentials')
                         Alert.alert('Invalid Credentials')
                        setLoading(false)
                    }
                    else if (data.message === "Verification Code Sent to your Email") {
                        setLoading(false)
                        Alert.alert(data.message);

                        navigation.navigate('ForgotPassword_EnterVerificationCode', {
                            useremail: data.email,
                            userVerificationCode: data.VerificationCode
                        })

                    }
                })
        }
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
            <Text style={formHead2}>Verify Your Email</Text>
            <TextInput placeholder="Enter Your Email" style={formInput}
                onChangeText={(text) => setEmail(text)} 
                />
            {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={formbtn}
                        onPress={() => handleEmail()}
                    >
                        Next
                    </Text>
            }


        </View>
    )
}


export default ForgotPassword_EnterEmail

const styles = StyleSheet.create({})