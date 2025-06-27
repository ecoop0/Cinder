import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { supabase } from './supabase'

export default function FragranceSwiper() {
  const [fragrances, setFragrances] = useState([])

  useEffect(() => {
    const fetchFragrances = async () => {
      const { data, error } = await supabase.from('fragrances').select('*').limit(20)
      if (data) setFragrances(data)
      if (error) console.log('❌', error)
    }
    fetchFragrances()
  }, [])

  const handleSwipeRight = async (cardIndex) => {
    const liked = fragrances[cardIndex]
    // save to user’s liked list (next step)
    console.log('Liked:', liked.name)
  }

  const renderCard = (card) => (
    <View style={styles.card}>
      <Text style={styles.name}>{card.name}</Text>
      <Text style={styles.brand}>{card.brand}</Text>
      <Text style={styles.notes}>Notes: {card.top_notes?.join(', ')}</Text>
    </View>
  )

  return (
    <Swiper
      cards={fragrances}
      renderCard={renderCard}
      onSwipedRight={handleSwipeRight}
      cardIndex={0}
      backgroundColor={'#f3f3f3'}
      stackSize={3}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    height: 500,
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  name: { fontSize: 24, fontWeight: 'bold' },
  brand: { fontSize: 18, color: '#666' },
  notes: { marginTop: 10 }
})
// Note: Ensure you have the necessary packages installed:
// npm install react-native-deck-swiper @supabase/supabase-js react-native-svg
// Also, ensure your Supabase table 'fragrances' has the necessary columns like 'name', 'brand', and 'top_notes'.   