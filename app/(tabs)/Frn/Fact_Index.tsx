import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, View, Animated } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { Video,ResizeMode } from 'expo-av'; // Import Video component
import { FACTS } from '../../../constants/Facts';
import FactItem from '@/components/FactItem';
// import FactItem from '../../components/FactItem';

import { Fact } from '../../../types/index';

export default function TabOneScreen() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const shuffleAndSetFacts = useCallback(() => {
    const shuffledFacts = [...FACTS].sort(() => Math.random() - 0.5);
    setFacts(shuffledFacts);
  }, []);

  useFocusEffect(
    useCallback(() => {
      shuffleAndSetFacts();
    }, [shuffleAndSetFacts])
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderItem = ({ item, index }: { item: Fact; index: number }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      }}
    >
      <Link href={`../Frn/Facts_French/${item.id}`} asChild>
        <FactItem fact={item} onPress={() => {}} />
      </Link>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Video Background */}
      <Video
        source={require('@/assets/videos/FeedbackBackground.mp4')} // Ensure your file path matches
        style={StyleSheet.absoluteFillObject} // Fill the screen
        resizeMode={ResizeMode.COVER} // Fixed issue by using ResizeMode enum
        shouldPlay
        isLooping
        isMuted
      />
      <FlatList
        data={facts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Ensures black background behind video
    
  },
  listContainer: {
    padding: 15,
    zIndex: 2, // Ensure content is above the video background
  },
});
