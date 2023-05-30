import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ForgotPassword_EnterEmail = ({ navigation }) => {
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
            <TextInput placeholder="Enter Your Email" style={formInput} />
            <Text style={formbtn}
                onPress={() => navigation.navigate('ForgotPassword_EnterVerificationCode')}
            >
                Next
            </Text>
        </View>
    )
}


export default ForgotPassword_EnterEmail

const styles = StyleSheet.create({})