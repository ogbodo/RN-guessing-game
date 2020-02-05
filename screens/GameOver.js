import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../constants/colors'

function GameOverScreen(props) {
    return (
        <View style={styles.screen}>
            <Text>Game is Over!</Text>
            <Text>Rounds Number:{props.numberOfRounds}</Text>
            <Text>Number was:{props.userNumber}</Text>
            <Button title='RESTART GAME!' onPress={props.onRestart} />
        </View>
    )
}





const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;