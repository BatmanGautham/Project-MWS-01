import React from 'react';
import { View, Text } from 'react-native';

interface FactItemProps {
  fact: {
    id: string;
    text: string;
    // ... other properties
  };
}

const FactItem: React.FC<FactItemProps> = ({ fact }) => {
  return (
    <View>
      <Text>{fact.text}</Text>
    </View>
  );
};

export default FactItem;

