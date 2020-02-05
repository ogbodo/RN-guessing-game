import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Headers';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  function configureNewGame() {
    setGuessRounds(0);
    setUserNumber(null);

  }
  function startGameHandler(selectedNumber) {
    setUserNumber(selectedNumber);

  }

  function gameOverHandler(numOfRounds) {
    setGuessRounds(numOfRounds);
  }
  let currentView = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds === 0) {
    currentView = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    currentView = <GameOverScreen numberOfRounds={guessRounds} userNumber={userNumber} onRestart={configureNewGame} />
  }

  return (
    <View style={styles.screen} >
      <Header title="Guess a Number" />
      {currentView}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
