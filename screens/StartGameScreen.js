import React, { useState } from 'react';
import Card from '../components/Card';
import Colors from '../constants/colors'
import Input from '../components/input';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import NumberContainer from '../components/numberContainer';


function StartGameScreen(props) {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

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
                <Text>You Selected:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title='START GAME' onPress={() => { props.onStartGame(selectedNumber) }} />
            </Card>
    }
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input}
                        blurOnSubmit autoCorrect={false} autoCapitalize='none' keyboardType='number-pad' maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Reset' onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: { width: '40%' },
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