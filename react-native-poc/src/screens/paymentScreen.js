import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PaymentForm from '../components/PaymentForm'
import { View,Text, StyleSheet } from 'react-native'
import { counterActions } from '../store/redux-state';
import Spacer from '../components/Spacer';

export default function PaymentScreen({navigation}) {
    const dispatch = useDispatch();
    const paymentDetails = useSelector((state) => state.paymentDetails);
    return (
        <Spacer>
            <Text style={styles.welcomeText}>Hi, {paymentDetails.name}. Please enter the following details</Text>
            <Spacer>
            <PaymentForm payeeName={navigation.getParam('username')} paymentType = {paymentDetails.donationType} submitBtnText="Proceed for payment"
            onSubmit={(amount)=>{
                dispatch(counterActions.amt({amount}));
                navigation.navigate('Donor')
                }
            } />
            </Spacer>
        </Spacer>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        fontWeight: "500",
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
      }
})