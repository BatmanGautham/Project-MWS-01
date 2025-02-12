import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface LearningSlide {
  id: string;
  image: any;
  frenchWord: string;
  englishWord: string;
}

const LearningSlides: React.FC<{ slides: LearningSlide[]; onComplete: () => void }> = ({ slides, onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <Image source={currentSlide.image} style={styles.slideImage} />
        <Text style={styles.frenchWord}>{currentSlide.frenchWord}</Text>
        <Text style={styles.englishWord}>{currentSlide.englishWord}</Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentSlideIndex < slides.length - 1 ? 'Next' : 'Start Quiz'}
        </Text>
        <Icon name="arrow-right" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(15, 0, 25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  slideImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  frenchWord: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  englishWord: {
    color: '#A56EFF',
    fontSize: 22,
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 16, 210, 0.83)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'rgba(127, 17, 224, 0.64)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default LearningSlides;