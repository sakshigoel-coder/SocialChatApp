import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React,{useEffect, useState} from 'react'
import { containerFull } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../components/Bottomnavbar'
import TopNavbar from '../../components/TopNavbar'
import FollowersRandomPost from '../../components/FollowersRandomPost'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Mainpage = ({ navigation }) => {
    const [userdata, setUserdata] = useState(null)
    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(data => {
                // console.log('async userdata ', data)
                setUserdata(JSON.parse(data))
                console.log(userdata);
            })
            .catch(err => alert(err))
    }, [])

   
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"MainPage"} />
            <Bottomnavbar navigation={navigation} page={"MainPage"} />
            <FollowersRandomPost />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        paddingVertical: 50,
    }
})

export default Mainpage

