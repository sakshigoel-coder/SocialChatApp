import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Signup_EnterEmail = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmail =  async () => {
    if (email === '') {
      Alert.alert('Please enter email')
    } else {
        setLoading(true);
        try {
          const response = await fetch('http://192.168.0.100:3000/verify', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email
            })
          });
  
          const data = await response.json();
  
          if (response.ok) {
            if (data.error === 'Invalid Credentials') {
              console.log(data);
              Alert.alert('Invalid Credentials');
            } else if (data.message === 'Verification Code Sent to your Email') {
              console.log(data);
              Alert.alert(data.message);
              navigation.navigate('Signup_EnterVerificationCode', {
                useremail: data.email,
                userVerificationCode: data.VerificationCode
              });
            }
          } else {
            console.log(data);
            Alert.alert('Error sending email');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error sending email');
        } 
        finally {
            setLoading(false);
          }
    }
  }

  return (
    <View style={containerFull}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>
        <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
        <Text style={{ color: 'gray', fontSize: 16 }}>Go Back</Text>
      </TouchableOpacity>

      <Image source={require('../../../../assests/logo.png')} style={logo1} />
      <Text style={formHead2}>Create a new account</Text>
      <TextInput
        placeholder="Enter Your Email"
        style={formInput}
        onChangeText={text => {
          setEmail(text)
        }}
      />

{loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <TouchableOpacity onPress={handleEmail} style={formbtn}>
        <Text style={styles.buttonText}>
          Next
        </Text>
        </TouchableOpacity>

      )}
     
    </View>
  )
}

export default Signup_EnterEmail

const styles = StyleSheet.create({
buttonText:{
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    
}
})