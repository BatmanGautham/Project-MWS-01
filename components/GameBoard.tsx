import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import Card from './Card';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';

interface CardType {
  id: string;
  value: string;
  type: 'emoji' | 'text';
  matchValue: string;
}

const GameBoard: React.FC<{ onGameEnd: (time: number) => void }> = ({ onGameEnd }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const audioFiles: { [key: string]: any } = {
    '🍎': require('../audio/apple.mp3'),
    '🍌': require('../audio/banana.mp3'),
    '🍇': require('../audio/grapes.mp3'),
    '🍓': require('../audio/strawberry.mp3'),
  };

  const initializeGame = () => {
    const initialCards: CardType[] = [
      { id: '1', value: '🍎', type: 'emoji', matchValue: 'apple' },
      { id: '2', value: 'Apple', type: 'text', matchValue: 'apple' },
      { id: '3', value: '🍌', type: 'emoji', matchValue: 'banana' },
      { id: '4', value: 'Banana', type: 'text', matchValue: 'banana' },
      { id: '5', value: '🍇', type: 'emoji', matchValue: 'grapes' },
      { id: '6', value: 'Grapes', type: 'text', matchValue: 'grapes' },
      { id: '7', value: '🍓', type: 'emoji', matchValue: 'strawberry' },
      { id: '8', value: 'Strawberry', type: 'text', matchValue: 'strawberry' },
    ];

    setCards([...initialCards].sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    setStartTime(Date.now());
  };

  const playAudio = async (value: string) => {
    try {
      const audioFile = audioFiles[value];
      if (audioFile) {
        if (sound) {
          await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
        setSound(newSound);
        await newSound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleCardPress = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    const selectedCard = cards[index];
    if (selectedCard.type === 'emoji') {
      playAudio(selectedCard.value);
    }

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.matchValue === secondCard.matchValue) {
        setMatchedCards(prevMatched => [...prevMatched, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    initializeGame();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      const endTime = Date.now();
      const timeTaken = (endTime - (startTime ?? 0)) / 1000;
      onGameEnd(timeTaken);
    }
  }, [matchedCards, cards, startTime, onGameEnd]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            isMatched={matchedCards.includes(index)}
            onPress={() => handleCardPress(index)}
          />
        ))}
      </View>
      <Button title="Reset Game" onPress={initializeGame}  />
      <Text style={styles.matchCount}>Matched: {matchedCards.length / 2} / {cards.length / 2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#f8f8f8',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 400,
    marginBottom: 10,
  },
  matchCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default GameBoard;

