import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import GameBoard from '../../components/GameBoard';
import ResultCard from '../../components/ResultCard';

const MatchThePair: React.FC = () => {

  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  const handleGameEnd = (time: number) => {
    setTimeTaken(time); // Store the time taken when the game ends
  };

  return (
    <View style={styles.container}>
      {timeTaken === null ? (
        <>
          <Text style={styles.title}>Match the Pair</Text>
          <GameBoard onGameEnd={handleGameEnd} />
        </>
      ) : (
        <ResultCard time={timeTaken} />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    margin: 10,
    padding: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical:80,
  },
});

export default MatchThePair;
