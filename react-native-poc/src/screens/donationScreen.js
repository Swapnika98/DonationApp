import db from '../api/firebase.config';
import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View,Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { counterActions } from '../store/redux-state';
import Spacer from '../components/Spacer';
import api from '../api/api'
import Loader from '../loader/Spinner-1s-200px.gif'
import axios from "axios";
import NavigationButton from '../components/NavigationButton';
import callAPI from '../components/useFetch';
import useFetch from '../components/useFetch';

export default function DonationScreen({navigation}) {
  const userEmail = navigation.getParam('id');
  const paymentDetails = useSelector((state) => state.paymentDetails);

      let {apiData,dataIsPresent,responseError} = useFetch();
      console.log(apiData);
      
    if(apiData) {
      let count = 0;
      for(let element in apiData){
        count++;
        if(apiData[element].email===userEmail) {
          console.log(apiData[element])
          apiData = (apiData[element]);
          dataIsPresent = (true);
          break;
        }
        if(count===Object.keys(apiData).length) {
          console.log("not found")
          navigation.navigate('Register')
        }
      }
    }
    
  const dispatch = useDispatch();
    let donation = {
        category: [
            { itemName: "cheque" },
            { itemName: "debit/credit card" },
          ]
          };
          if(paymentDetails.membership==="premium"){
            donation.category.push({ itemName: "UPI payment" },
          { itemName: "Net Banking" })
          }
          const [selectedtype, setselectedtype] = useState(donation.category[0].itemName)
    return (
      <>
      {!dataIsPresent? (
        <Spacer>
        {responseError?
        <Text style={styles.welcomeText}>Bad Request. Please check the URL and try again.</Text>:
        <Image style={styles.image}
        source={Loader}
      />}
      </Spacer>
      ): (
        <Spacer>
            <Text style={styles.welcomeText}>Welcome {apiData.name}</Text>
            <Text>Please select your type of Donation: </Text>
          <Spacer>
            <Picker
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={selectedtype}
            onValueChange={(itemValue)=>setselectedtype(itemValue)}
            >
            {donation.category.map((item, index) => (
              <Picker.Item key={index}
              color="#0087F0"
              label={item.itemName}
              value={item.itemName}
              index={index}
              />
              ))}
          </Picker>
          </Spacer>
          <Spacer>
          <NavigationButton onPress={
            ()=>{
              dispatch(counterActions.type({selectedtype})); navigation.navigate('Payment',{username:(navigation.getParam('id'))});
            }
          }>Continue</NavigationButton>
      </Spacer>  
        </Spacer>
      )}        
    </>
    )
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: "100%",
        height: 40,
        color: "#007aff",
        fontSize: 14,
        fontFamily: "sans-serif"
      },
      welcomeText: {
        fontWeight: "500",
        fontSize: 18,
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
      },
      image: {
        height: 200
      }
})