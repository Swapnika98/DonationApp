import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import NavigationButton from '../components/NavigationButton'
import Spacer from '../components/Spacer'

export default function IndexScreen({navigation}) {
    return (
        <View>
            <Text>Congratulations!! We have received your contribution.</Text>
            <Spacer>
                <Spacer>
                    <NavigationButton textStyle={styles.tryAgain} onPress={()=>{navigation.navigate('Home')}}>Click here to go back</NavigationButton>
                </Spacer>
            </Spacer>
        </View>
    )
}

const styles = StyleSheet.create({
    tryAgain: {
        color: 'blue',
        textAlign: 'center'
    },
})
