import React from 'react'
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator} from "react-navigation-stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './src/store/redux-state';
import HomeScreen from './src/screens/homeScreen';
import DonationScreen from './src/screens/donationScreen';
import PaymentScreen from './src/screens/paymentScreen';
import DonorScreen from './src/screens/donorScreen';
import TransactionScreen from './src/screens/transactionScreen';
import RegisterScreen from './src/screens/registerScreen';
import SuccessScreen from './src/screens/SuccessScreen';


const navigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Home: HomeScreen,
    Register: RegisterScreen,
  }),
  // mainFlow: createBottomTabNavigator({
  innerFlow: createStackNavigator({
    Donation: DonationScreen,
    Payment: PaymentScreen,
    Donor: DonorScreen,
    Transaction: TransactionScreen,
    Success: SuccessScreen,
  }),
//   Home: HomeScreen,
// }),
})

const App = createAppContainer(navigator);

export default () => {
  return <Provider store={store}><App/></Provider>
}