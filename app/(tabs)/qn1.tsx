import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface GoalOption {
  id: string;
  icon: string;
  title: string;
}

const goals: GoalOption[] = [
  {
    id: '1',
    icon: 'briefcase',
    title: 'Career and business',
  },
  {
    id: '2',
    icon: 'smile',
    title: 'Lessons for kids',
  },
  {
    id: '3',
    icon: 'edit-3',
    title: 'Exams and course work',
  },
  {
    id: '4',
    icon: 'globe',
    title: 'Culture, travel and hobby',
  },
  {
    id: '5',
    icon: 'book',
    title: 'I need it for school',
  },
  {
    id: '6',
    icon: 'book',
    title: 'Other',
  },
];

const GoalSelectionScreen = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>What's your goal?</Text>
        
        <View style={styles.optionsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.optionCard,
                selectedGoal === goal.id && styles.optionCardSelected,
              ]}
              onPress={() => handleGoalSelect(goal.id)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={styles.iconContainer}>
                  <Icon name={goal.icon} size={24} color="#000" />
                </View>
                <Text style={styles.optionText}>{goal.title}</Text>
              </View>
              <View style={styles.radioContainer}>
                <View style={styles.radioOuter}>
                  {selectedGoal === goal.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => {
            router.replace('./qn2');
          }}
        >
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip this question</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionCardSelected: {
    backgroundColor: '#F0F0F0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  radioContainer: {
    marginLeft: 12,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  skipButton: {
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton:{
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    // marginTop: 'auto',

  },
  nextButtonText:{
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  }

  
});

export default GoalSelectionScreen;