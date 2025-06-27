import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { supabase } from './supabase';

/** --- 1. Define the shape of your fragrance rows ----------------------- */
interface Fragrance {
  id: number;
  name: string;
  brand: string;
  top_notes: string[] | null;
  // add more fields later as needed
}

/** --- 2. Main component ------------------------------------------------- */
export default function FragranceSwiper() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFragrances = async () => {
      const { data, error } = await supabase
        .from('fragrances')
        .select('*')
        .limit(20);

      if (error) console.error(error);
      else setFragrances(data as Fragrance[]);

      setLoading(false);
    };

    fetchFragrances();
  }, []);

  const handleSwipeRight = (index: number) => {
    const liked = fragrances[index];
    console.log('Liked:', liked.name);
    // saving logic will go here next
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading fragrances…</Text>
      </View>
    );
  }

  return (
    <Swiper
      /* tell Swiper what a card looks like */
      cards={fragrances}
      renderCard={(card: Fragrance) => (
        <View style={styles.card}>
          <Text style={styles.title}>{card.name}</Text>
          <Text style={styles.brand}>{card.brand}</Text>
          <Text style={styles.notes}>
            Top notes: {card.top_notes?.join(', ')}
          </Text>
        </View>
      )}
      onSwipedRight={handleSwipeRight}
      backgroundColor="transparent"
      cardIndex={0}
      stackSize={3}
    />
  );
}

/** --- 3. Styles --------------------------------------------------------- */
const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    height: 400,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  brand: { fontSize: 18, color: '#777' },
  notes: { marginTop: 15, fontSize: 16, color: '#333' },
});
