import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, FlatList } from 'react-native';
import NumberContainer from "../components/numberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton.ios";
import { Ionicons } from '@expo/vector-icons'
import BodyText from "../components/BodyText";

function generateRandomBetween(min, max, exclude) {
    min = Math.ceil(min)
    max = Math.floor(max);
    const randNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randNumber;
    }
}

function RenderListItem(listLength, itemData) {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}
function GameScreen(props) {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [passedGuesses, setPassedGuesses] = useState([initialGuess])
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { onGameOver, userChoice } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    })
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(passedGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't Lie!", "You know that's a lie...", [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess + 1;
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPassedGuesses(oldGuesses => [nextNumber, ...oldGuesses]);
    }
    let listContainerStyle = styles.listContainer;
    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (availableDeviceHeight < 500) {
        return <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Ionicons name='md-remove' size={24} color='white' /></MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} ><Ionicons name='md-add' size={24} color='white' /></MainButton>
            </View>
            <View style={listContainerStyle}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={passedGuesses}
                    renderItem={RenderListItem.bind(this, passedGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Ionicons name='md-remove' size={24} color='white' /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} ><Ionicons name='md-add' size={24} color='white' /></MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {passedGuesses.map((guess, index) => RenderListItem(guess, index, passedGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={passedGuesses}
                    renderItem={RenderListItem.bind(this, passedGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',//to center our contents horizontally
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width: '60%',
        flex: 1
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    }
});

export default GameScreen;