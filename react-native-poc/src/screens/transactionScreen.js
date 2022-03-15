import React,{useEffect, useState} from 'react'
import { View,Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Spinner-1s-200px.gif'
import Spacer from '../components/Spacer';
import { counterActions } from '../store/redux-state';
import NavigationButton from '../components/NavigationButton';

export default function TransactionScreen({navigation}) {
    const [isSuccess, setisSuccess] = useState(false);
    const [isFailure, setisFailure] = useState(false);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(5);
    useEffect(() => {
        const interval = setInterval(()=>{
            setCounter(prev=>prev-1)
        },1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    const clearData=()=>{
        dispatch(counterActions.reset());
        navigation.navigate("Success");
    }
    return (
        <>
        <Spacer>
            <Text style={styles.welcomeText}>Welcome to Transaction Page</Text>
            <NavigationButton onPress={()=>{setisSuccess(true);setisFailure(false)}}>Transaction Success</NavigationButton>
            <NavigationButton onPress={()=>{setisFailure(true);setisSuccess(false)}}>Transaction Failure</NavigationButton>
        </Spacer>
        {isSuccess && (<View>
            <Spacer>
        <Image style={styles.image}
        source={Loader}
      />
      </Spacer>
            <Text style={styles.redirectText}>Initiating your transaction... {counter} sec</Text>
            {counter===0 && clearData()}
        </View>)}
        {isFailure && (
            <Spacer>
                <Text>Oops!! Your Transaction could not be processed at the moment! Please try again..</Text>
                <NavigationButton textStyle={styles.tryAgain} onPress={()=>{navigation.navigate('Payment')}}>Click here to try again</NavigationButton>
            </Spacer>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200
      },
      welcomeText: {
        fontWeight: "500",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    redirectText: {
          fontSize: 18,
          textAlign: 'center',
          marginTop: 10
    },
    savebtn: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: "500",
        borderRadius: 20,
        textAlign: 'center',
        margin: 10,
      },
      tryAgain: {
          color: 'blue',
          textAlign: 'center'
      },
})
