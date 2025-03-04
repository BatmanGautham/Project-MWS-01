// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// interface CardProps {
//   value: string;
//   isFlipped: boolean;
//   onPress: () => void;
// }

// const Card: React.FC<CardProps> = ({ value, isFlipped, onPress }) => {
//   return (
//     <TouchableOpacity 
//       style={[styles.card, isFlipped ? styles.flipped : styles.unflipped]} 
//       onPress={onPress} 
//       disabled={isFlipped}
//     >
//       <Text style={styles.text}>{isFlipped ? value : '?'}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: 70,
//     height: 90,
//     margin: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   unflipped: {
//     backgroundColor: '#6200ee',
//   },
//   flipped: {
//     backgroundColor: '#03dac6',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
// });

// export default Card;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, isMatched, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isFlipped ? styles.flipped : styles.unflipped,
        isMatched ? styles.matched : null
      ]} 
      onPress={onPress} 
      disabled={isFlipped || isMatched}
    >
      <Text style={styles.text}>{isFlipped || isMatched ? value : '?'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  unflipped: {
    backgroundColor: '#6200ee',
  },
  flipped: {
    backgroundColor: '#03dac6',
  },
  matched: {
    backgroundColor: '#4CAF50',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Card;

