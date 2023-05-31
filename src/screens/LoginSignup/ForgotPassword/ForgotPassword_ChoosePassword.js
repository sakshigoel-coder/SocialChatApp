import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Alert,ActivityIndicator} from 'react-native'
import React,{useState}from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ForgotPassword_ChoosePassword = ({ navigation,route }) => {
    const { email } = route.params;
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setLoading] = useState(false)

    
    const handlePasswordChange = () => {
        if (password == '' || confirmpassword == '') {
            Alert.alert('Please enter password')
        } else if (password != confirmpassword) {
            Alert.alert('Password does not match')
        }

        else {
            setLoading(true);
            fetch('http:// 192.168.0.100:3000/resetpassword', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.message === "Password Changed Successfully") {
                            setLoading(false)
                            Alert.alert(data.message);
                            navigation.navigate('ForgotPassword_AccountRecovered')
                        }
                        else {
                            setLoading(false)
                            Alert.alert("Something went wrong");
                        }
                    })
                .catch(err => {
                    setLoading(false);
                    Alert.alert(err)
                })
        }

        // navigation.navigate('ForgotPassword_AccountRecovered')
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
            <Text style={formHead2}>Choose a strong password</Text>
            <TextInput placeholder="Enter password" style={formInput} secureTextEntry
               onChangeText={(text) => setpassword(text)}
                />
            <TextInput placeholder="Confirm password" style={formInput} secureTextEntry
              onChangeText={(text) => setconfirmpassword(text)}
               />
            {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={formbtn}
                        onPress={() => handlePasswordChange()}
                    >
                        Next
                    </Text>
            }
        </View>
    )
}



export default ForgotPassword_ChoosePassword

const styles = StyleSheet.create({})