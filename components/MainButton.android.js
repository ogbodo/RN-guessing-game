import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, Platform, TouchableNativeFeedback } from 'react-native';
import colors from "../constants/colors";

function MainButton(props) {
    let ButtonComponent = TouchableOpacity;
    if (Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        fontFamily: 'open-sans',
        color: 'white',
        fontSize: 18
    },
    buttonContainer: {
        borderRadius: 20,
        overflow: 'hidden'
    }
})
export default MainButton