import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

interface ConversationItem {
  id: string;
  icon: string;
  title: string;
  image: any;
  subtitle: string;
  level: string;
}

const conversationItems: ConversationItem[] = [
  {
    id: '1',
    icon: '👋',
    title: 'Introduce yourself',
    image: require('../../../assets/images/back.jpg'),
    subtitle: 'Basic introductions',
    level: 'A1 Beginner',
  },
  {
    id: '2',
    icon: '💼',
    title: 'Talk about your job',
    image: require('../../../assets/images/firefighter.jpg'),
    subtitle: 'Work and occupation',
    level: 'A1 Beginner',
  },
  {
    id: '3',
    icon: '🍽️',
    title: 'Order food',
    image: require('../../../assets/images/food.jpeg'),
    subtitle: 'Ordering in a cafe',
    level: 'A1 Beginner',
  },
  {
    id: '4',
    icon: '🍷',
    title: 'Dining experience',
    image: require('../../../assets/images/restaurant1.jpg'),
    subtitle: 'Fine dining conversations',
    level: 'C1 Advanced',
  },
];

const LearnWithAIScreen = () => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace('../Eng/Home1');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>AI Conversations</Text>
        
        <View style={styles.header}>
          <Feather name="message-circle" size={24} color="#666" />
          <Text style={styles.headerText}>
            Practice speaking English in real-life situations at your level and get personalized feedback.
          </Text>
        </View>

        <View style={styles.freeTrialBadge}>
          <View style={styles.freeTrialDot} />
          <Text style={styles.freeTrialText}>FREE TRIES AVAILABLE</Text>
        </View>

        {conversationItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.conversationItem}
            onPress={() => {
              if (item.id === '3') {
                router.push('../Eng/Learnwithaifood');
              } else {
                // Handle other navigation
              }
            }}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>

            <View style={styles.itemContent}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                <Text style={styles.itemLevel}>{item.level}</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#1cb0f6" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'rgba(78, 13, 22, 0.23)', // Dark background
      },
      scrollView: {
        flex: 1,
        padding: 16,
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF', // Light text for dark background
        marginBottom: 16,
        marginTop: 30,
        textAlign: 'center',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 24,
        paddingRight: 40,
      },
      headerText: {
        fontSize: 16,
        color: '#CCCCCC', // Lighter text for readability
        flex: 1,
        lineHeight: 24,
      },
      freeTrialBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 32,
      },
      freeTrialDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50', // Green for visibility
      },
      freeTrialText: {
        color: '#4CAF50', // Matching green
        fontSize: 14,
        fontWeight: '600',
      },
      conversationItem: {
        marginBottom: 24,
      },
      itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
      },
      itemIcon: {
        fontSize: 24,
        color: '#FFD700', // Gold for emphasis
      },
      itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF', // Light text
      },
      itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C2C2C', // Darker background for items
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#444444', // Subtle border
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15, // Softer shadow for dark mode
        shadowRadius: 4,
        elevation: 2,
      },
      itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
      },
      itemDetails: {
        flex: 1,
      },
      itemSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#CCCCCC', // Lighter text
        marginBottom: 4,
      },
      itemLevel: {
        fontSize: 14,
        color: '#888888', // Subtle text for level info
      },
    });
    
    export default LearnWithAIScreen;