import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

const GameList: React.FC = () => {
  const router = useRouter();

  const handleVideoLoad = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      console.error('Video failed to load:', status.error);
    } else {
      console.log('Video loaded successfully');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        style={styles.backgroundVideo}
        source={require('../../assets/videos/bg.mp4')}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
        rate={0.5}
        onLoad={handleVideoLoad} // Debug video loading
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Games</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Crossword"
            onPress={() => router.push('/Crossword')}
            color="#007BFF"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Match The Pair"
            onPress={() => router.push('/MatchThePair')}
            color="#007BFF"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  backgroundVideo: {
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
          width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text for better visibility
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default GameList;