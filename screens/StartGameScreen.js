import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Colors from '../constants/colors'
import Input from '../components/input';
import { StyleSheet, View, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import NumberContainer from '../components/numberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton.ios';


function StartGameScreen(props) {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    })
    const numberInputHandler = (text) => {
        setEnteredValue(text.replace(/[^0-9]/g, ' '))
    };
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirm(false)
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Input', 'Input has to be number between 1 to 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirm(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirm) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <BodyText>You Selected:</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => { props.onStartGame(selectedNumber) }} >START GAME</MainButton>
            </Card>
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input}
                                blurOnSubmit autoCorrect={false} autoCapitalize='none' keyboardType='number-pad' maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title='Reset' onPress={resetInputHandler} color={Colors.accent} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button: { width: Dimensions.get('window').width / 4 },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'

    }
});

export default StartGameScreen;