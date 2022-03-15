import React, {useState} from 'react'
import { View,Text, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import Spacer from '../components/Spacer';
import NavigationButton from '../components/NavigationButton';

export default function HomeScreen({navigation}) {
    const [userEmail, setUserEmail] = useState('')
    return (
      <Spacer>
        <Text style={styles.title}>Welcome to American Cancer Society</Text>
        <Text style={styles.loginText}>Please Enter your Email ID</Text>
        <View><TextInput style={styles.input} value={userEmail} onChangeText={(text)=>setUserEmail(text)} />
          <Spacer>
            <NavigationButton onPress={()=>navigation.navigate('Donation',{id:userEmail})}>Save And Proceed</NavigationButton>
            <NavigationButton textStyle = {styles.regbtn} onPress={()=>navigation.navigate('Register')}>Don't have an Account? Click here to create one</NavigationButton>
            </Spacer>
        </View>
      </Spacer>
    )
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: "100%",
        height: 60,
        color: "#007aff",
        padding: 10,
        fontSize: 14,
        fontFamily: "sans-serif",
        zIndex: 999,
        backgroundColor: 'yellow',
      },
      title : {
        fontFamily: "sans-serif",
        fontSize: 24,
        color: 'blue',
        fontWeight: "600",
        textAlign: 'center'
      },
      loginText: {
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 10,
        marginTop: 20,
      },
      savebtn: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: "500",
        borderRadius: 20,
        textAlign: 'center',
      },
      regbtn: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
      },
      input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5
    },
})