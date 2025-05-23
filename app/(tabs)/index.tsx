//Log in Glitches when keyboard is down : scrollview package

import React, { useState, useEffect } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Image,Dimensions,Animated,KeyboardAvoidingView,Platform,Alert,} 
from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Home';

import { Video } from 'expo-av';
import { ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../hooks/types';
import {useRouter} from 'expo-router';
import { app, auth, database } from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref as dbRef, set, update, get } from 'firebase/database';




const COLORS = {
  primary: '#F0657A', 
  secondary: '#674EA7', 
  background: '#1A1A1A', 
  surface: '#2D2D2D', 
  error: '#FF6B6B',
  text: '#FFFFFF',
  textSecondary: '#BBBBBB',
  inputBg: '#363636',
};

const { width, height } = Dimensions.get('window');

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
}

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const videoRef = React.useRef<Video>(null);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const buttonScale = React.useRef(new Animated.Value(1)).current;
  const socialButtonsAnim = React.useRef(new Animated.Value(0)).current;

  const shakeAnim = React.useRef(new Animated.Value(0)).current;

   // For expo-av


  useEffect(() => {
    animateIn();
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }, []);

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(500),
        Animated.spring(socialButtonsAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Name validation (only for registration)
    if (!isLogin && !name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      shakeAnimation();
      return false;
    }
    return true;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'AuthScreen'>>();

  const checkUserProgress = async (user: any) => {
    try {
      const userRef = dbRef(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      const userData = snapshot.val();
      
      if (userData) {
        // User exists, check if they completed onboarding
        if (userData.quizResults && userData.quizResults.completedAt) {
          // User has completed the quiz before
          router.replace('./TabNavigator');
        } else if (userData.currentStep) {
          // User was in the middle of onboarding, resume from their last step
          router.replace(`./${userData.currentStep}`);
        } else {
          // User hasn't started onboarding
          router.replace('./qn1');
        }
      } else {
        // New user, start onboarding
        router.replace('./qn1');
      }
    } catch (error) {
      console.error('Error checking user progress:', error);
      // In case of error, default to starting onboarding
      router.replace('./qn1');
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Check for admin credentials
        if (email === 'admin@gmail.com' && password === 'admin123') {
          router.replace('../admin/dashboard');
          return;
        }

        // Check for mentor credentials
        const mentorEmails = ['sarah.j@ryla.com', 'michael.c@ryla.com', 'emma.r@ryla.com'];
        if (mentorEmails.includes(email) && password === 'passcode') {
          try {
            // Try to sign in the mentor
            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;
            
            // Update mentor's last login time and ensure role is set
            const userRef = dbRef(database, `users/${user.uid}`);
            await update(userRef, {
              lastLogin: new Date().toISOString(),
              role: 'mentor',
              email: email.trim()
            });

            console.log('Mentor authenticated successfully:', {
              email: user.email,
              uid: user.uid
            });

            router.replace('/admin/mentor-dashboard');
            return;
          } catch (error: any) {
            console.error('Mentor authentication error:', error);
            if (error.code === 'auth/user-not-found') {
              Alert.alert(
                'Account Not Found',
                'Please contact the administrator to set up your mentor account.',
                [{ text: 'OK' }]
              );
            } else if (error.code === 'auth/invalid-credential') {
              Alert.alert(
                'Invalid Credentials',
                'Please check your email and password and try again.',
                [{ text: 'OK' }]
              );
            } else {
              Alert.alert(
                'Authentication Error',
                'An error occurred during login. Please try again.',
                [{ text: 'OK' }]
              );
            }
            return;
          }
        }

        // Handle regular user login/registration
        if (isLogin) {
          const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
          const user = userCredential.user;
          router.replace('./TabNavigator');
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
          const user = userCredential.user;
          
          const userRef = dbRef(database, `users/${user.uid}`);
          await set(userRef, {
            name,
            email: email.trim(),
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          });
          
          router.replace('/(tabs)/qn1');
        }
      } catch (error: any) {
        console.error('Auth error:', error);
        Alert.alert('Error', error.message);
      }
    }
  };

  const toggleMode = () => {
    // Reset form and errors
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});

    // Animate form switch
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLogin(!isLogin);
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`${platform} login`, 'Social login integration would go here');
  };

  const renderInput = (
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    error?: string,
    isPassword?: boolean
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        const userRef = dbRef(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (userData?.quizResults?.completedAt) {
          // User has completed the quiz before
          router.replace('./TabNavigator');
        } else {
          // User hasn't taken the quiz yet
          router.replace('/(tabs)/qn1');
        }
      }
    } catch (error) {
      console.error('Error checking quiz status:', error);
      Alert.alert('Error', 'Failed to check quiz status');
    }
  };

  return (
    <View style={styles.container}>
    <Video
      ref={videoRef}
      style={styles.backgroundVideo}
      source={require('../../assets/videos/bg.mp4')}
       resizeMode={ResizeMode.STRETCH}
      isLooping
      isMuted={true}
      shouldPlay
      rate={0.5}
    />
    <View style={styles.overlay}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
         <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                  {
                    translateX: shakeAnim,
                  },
                ],
              },
            ]}
          >
          <Image
            source={require('../../assets/images/gs2.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>

          {!isLogin && renderInput(name, setName, 'User Name', errors.name)}
          {renderInput(email, setEmail, 'Email', errors.email)}
          {renderInput(password, setPassword, 'Password', errors.password, true)}

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <Animated.View
            style={[
              styles.socialButtons,
              {
                opacity: socialButtonsAnim,
                transform: [
                  {
                    translateY: socialButtonsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <Ionicons name="logo-google" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              
              <Ionicons name="logo-apple" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Facebook')}
            >
              <Ionicons name="logo-facebook" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleMode}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleText}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </Text>
          </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(0.1, 0.1, 0.6, 0)', // Semi-transparent dark overlay
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    width: width, // Use window width
    height: height, // Use window height  
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', 
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  formContainer: {
    height: '90%',
    width: '100%',
    marginVertical: 10,
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    padding: 20,
    shadowColor: '#F0657A',
    shadowOffset: {
      width: 1,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'purple', // 40 is hex for 25% opacity
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.text,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'purple',
    color: 'white',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    backgroundColor: '#F0657A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: 'purple',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'grey',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    backgroundColor: '',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  toggleButton: {
    marginTop: 20,
    padding: 10,
  },
  toggleText: {
    color: '#F0657A',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AuthScreen;