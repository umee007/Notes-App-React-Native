import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar, TextInput, Dimensions } from 'react-native'
import color from '../misc/color'
import RoundIconBtn from '../components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Intro({onFinish}) {
    const [User,setUser] = useState("");
    const handleSubmit = async() => {
        const userName = {name: User};
        await AsyncStorage.setItem("User", JSON.stringify(userName));
        if(onFinish)
            onFinish();
    }
    return (
        <>
            <StatusBar/>
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Enter Your Name To Continue</Text>
                <TextInput value={User} onChangeText={(e)=>setUser(e)} placeholder='Enter Name' style={styles.input}/>
                {User.trim().length >= 3?<RoundIconBtn antIconName='arrowright' press={handleSubmit}/>:null}
            </View>
        </>
    )
}
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: color.PRIMARY,
        borderWidth: 2,
        marginTop: 10,
        padding: 10,
        width,
        height: 50,
        borderRadius: 10,
        fontSize: 20,
        color: color.PRIMARY,
        marginBottom: 15,
    },
    inputTitle: {
        alignSelf: 'center',
        marginBottom: 5,
        opacity: 0.5,

    },
})