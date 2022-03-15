import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PaymentForm from '../components/PaymentForm'
import { View,Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { counterActions } from '../store/redux-state';
import Spacer from '../components/Spacer';
import api from '../api/api'
import Loader from '../loader/Spinner-1s-200px.gif'
import NavigationButton from '../components/NavigationButton';
import useFetch from '../components/useFetch';

export default function PaymentScreen({navigation}) {
    const dispatch = useDispatch();
    let emails = [];
    let count;

    let {apiData,dataIsPresent,responseError} = useFetch();
    if(apiData) {
        for(let element in apiData){count++;
              emails.push(apiData[element].email)
            console.log(count!==Object.keys(apiData).length)
              if(count!==Object.keys(apiData).length) dataIsPresent=(true);}
          }
    
    const paymentDetails = useSelector((state) => state.paymentDetails);
    return (
        (!dataIsPresent) ? <Spacer>
        {responseError?
        <Text style={styles.welcomeText}>Bad Request. Please check the URL and try again.</Text>:
        <Image style={styles.image}
        source={Loader}
      />}
      </Spacer> :
        <Spacer>
            <Text style={styles.welcomeText}> Please enter the following details</Text>
            <Spacer>
            <PaymentForm payeeName={navigation.getParam('username')} paymentType = {paymentDetails.donationType} registration={true} submitBtnText="Register my Details" emails={emails}
            onSubmit={(name,accno,ifsc,email,membership)=>{
                dispatch(counterActions.submit({name,accno,ifsc,email,membership}));
                const data = {
                    "email":email,
                    "membership": membership||"standard",
                    "name": name,
                    "accno": accno,
                    "ifsc": ifsc
                };

                api.post('./users.json',data).then(response=>console.log(response))
                navigation.navigate('Home')
                }
            } />
            </Spacer>
            <NavigationButton onPress={()=>navigation.navigate('Home')} textStyle={styles.regbtn}>Already have an account? Click here to login</NavigationButton>
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
      regbtn: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
      },
      image:{
          height: 200
      }
})