import React from 'react'
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function NavigationButton({textStyle, onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={textStyle||styles.savebtn}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})
