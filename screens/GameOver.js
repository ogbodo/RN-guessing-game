import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Colors from '../constants/colors'
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from "../components/MainButton";

function GameOverScreen(props) {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    {/* <Image source={require('../assets/success.png')} style={styles.image} /> */}
                    <Image
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Rosa_summit.jpg/220px-Monte_Rosa_summit.jpg' }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <BodyText style={styles.resultTexts}>
                    Your Phone needed  <Text style={styles.highLight}>{props.numberOfRounds} </Text>
                    rounds to to guess <Text style={styles.highLight}>{props.userNumber}</Text>
                </BodyText>

                <MainButton onPress={props.onRestart} >RESTART GAME!</MainButton>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highLight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;