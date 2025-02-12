import { useFocusEffect, useRouter } from 'expo-router';
import { BackHandler } from 'react-native';
import React from 'react';

export function useBackHandler() {
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/(tabs)/Home'); // Prevents exiting the app
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router])
  );
}
