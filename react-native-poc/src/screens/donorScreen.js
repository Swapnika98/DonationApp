import React from 'react'
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import Spacer from '../components/Spacer';
import { counterActions } from '../store/redux-state';
import NavigationButton from '../components/NavigationButton';

export default function DonorScreen({navigation}) {
    const paymentDetails = useSelector((state) => state.paymentDetails);
    console.log(paymentDetails)
    return (
        <Spacer>
            <Text style={styles.welcomeText}>Please Confirm your Details</Text>
            <Spacer>
                <Text style={styles.detail}>Full Name: <Text style={styles.value}>{paymentDetails.name}</Text></Text>
                <Text style={styles.detail}>Your Account Number: <Text style={styles.value}>{paymentDetails.accno}</Text></Text>
                <Text style={styles.detail}>Your IFSC code: <Text style={styles.value}>{paymentDetails.ifsc}</Text></Text>
                <Text style={styles.detail}>Donation Type: <Text style={styles.value}>{paymentDetails.donationType}</Text></Text>
                <Text style={styles.detail}>Donation amount: <Text style={styles.value}>{paymentDetails.amount}</Text></Text>
            </Spacer>
            <NavigationButton onPress={()=>navigation.navigate('Payment')}>Edit my details</NavigationButton>
            <NavigationButton onPress={()=>navigation.navigate('Transaction')}>Continue to Transaction Page</NavigationButton>
        </Spacer>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        fontWeight: "500",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
      },
      savebtn: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: "500",
        borderRadius: 20,
        textAlign: 'center',
        marginBottom: 10,
      },
      detail: {
          fontSize: 18,
          fontWeight: "500",
      },
      value: {
          color: 'blue'
      }
})