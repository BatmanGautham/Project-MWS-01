import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

interface ResultCardProps {
  time: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ time }) => {
  const router = useRouter();

  // Determine result message based on time
  let resultMessage = 'Good job!';
  if (time < 8) {
    resultMessage = 'Fantastic Work! Keep it up';
  } else if (time < 15) {
    resultMessage = 'Excellent work';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Result</Text>
      <Text style={styles.time}>Time Taken: {time.toFixed(2)}s</Text>
      <Text style={styles.message}>{resultMessage}</Text>
      <Button title="Retry" onPress={() => router.push('/')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 40,
    margin:30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    marginVertical: 10,
  },
  message: {
    fontSize: 30,
    fontWeight: '600',
    color: '#4caf50',
    marginBottom: 20,
  },
});

export default ResultCard;
