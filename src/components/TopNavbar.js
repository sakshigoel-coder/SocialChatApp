import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons1, logo2 } from '../CommonCss/pagecss'
import Ionicons from 'react-native-vector-icons/Ionicons';
const TopNavbar = ({navigation, page }) => {
    return (
        <View style={styles.container}>
             <Image source={require('../../assests/logo.png')} style={logo2} />
             {
                page === 'MainPage' &&
                <Ionicons name="chatbubbles" size={24} color="black" style={icons1} onPress
                    ={
                        () => navigation.navigate('All_Chats')
                    } />
            }

             {
                page === 'My_UserProfile' &&
                <Ionicons name="settings-sharp" size={24} color="black" style={icons1} onPress
                    ={
                        () => navigation.navigate('Settings_1')
                    } />
            }
        </View>
    )
}

export default TopNavbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: "#111111",

    }
})