import React from 'react';
import { SafeAreaView } from 'react-native';
import FragranceSwiper from '../../FragranceSwiper';
import { Stack } from 'expo-router';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Fragrance Swipe' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <FragranceSwiper />
      </SafeAreaView>
    </>
  );
}
