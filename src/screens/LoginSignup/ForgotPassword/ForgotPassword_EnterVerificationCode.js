import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ForgotPassword_EnterVerificationCode = ({ navigation,route }) => {
    const { useremail, userVerificationCode } = route.params;
    console.log(useremail, userVerificationCode)

    const [verificationCode, setVerificationCode] = useState('');

    
    const handleVerificationCode = () => {

        if (verificationCode != userVerificationCode) {
            Alert.alert('Invalid Verification Code')
        }
        else {
            Alert.alert('Verification Code Matched')
            navigation.navigate('ForgotPassword_ChoosePassword', { email: useremail })
        }

        // navigation.navigate('ForgotPassword_ChoosePassword')
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
            <Text style={formHead3}>A verification code has been sent to your email</Text>

            <TextInput placeholder="Enter 6-Digit Code here" style={formInput} 
              onChangeText={(text) => setVerificationCode(text)}
              />

            <Text style={formbtn}
                onPress={() => handleVerificationCode()}
            >
                Next
            </Text>
        </View>
    )
}



export default ForgotPassword_EnterVerificationCode

const styles = StyleSheet.create({})