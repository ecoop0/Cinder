import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { supabase } from './supabase';
import { swiperStyles } from './styles';


/** --- 1. Define the shape of your fragrance rows ----------------------- */
interface Fragrance {
  id: number;
  Name: string;
  Brand: string;
  Top_note: string;
  image: string; // assuming you have an image URL or path
  // add more fields later as needed
}

/** --- 2. Main component ------------------------------------------------- */
export default function FragranceSwiper() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<Swiper<any>>(null); // Add ref for Swiper
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    const fetchFragrances = async () => {
      const { data, error } = await supabase
        .from('FragTest2')
        .select('*')
        .limit(100) // limit to 100 for performance;
       console.log(data)
        // console.log('Supabase response:', { data, error }); // Logging to See if the Database is the issue

        // console.log('Fetched data:', data);
        // if (data && data.length > 0) {
        //   console.log('First item:', data[0]);
        // }



      if (error) {
        console.error('Error fetching fragrances:', error);
      } else {
        console.log('Fetched data:', data);
        setFragrances(data || []);
      }

      setLoading(false);
    };

    fetchFragrances();
  }, []);

  const handleSwipeRight = (index: number) => {
    const liked = fragrances[index];
    if (liked) {
      console.log('Liked:', liked.Name);
      // saving logic will go here next
    }
  };

  if (loading) {
    return (
      <View style={swiperStyles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading fragrances…</Text>
      </View>
    );
  }

  if (!loading && fragrances.length === 0) {
    return (
      <View style={swiperStyles.loader}>
        <Text style={[swiperStyles.noFragranceFound]}>No fragrances found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Swiper
        ref={swiperRef}
        /* tell Swiper what a card looks like */
        cards={fragrances.slice(0,100)}
        renderCard={(card: Fragrance) => {
          if (!card) {
            return <View style={swiperStyles.card} />;
          }
          return (
            <View style={swiperStyles.card}>
              {/* Picture at the top */}
              <Image
                source={{ uri: card.image }}
                style={swiperStyles.image}
                resizeMode="cover"
              />
              {/* Name below the picture */}
              <Text style={swiperStyles.title}>{card.Name}</Text>
              {/* Brand below the name */}
              <Text style={swiperStyles.brand}>{card.Brand}</Text>
              {/* Top note below the brand */}
              <Text style={swiperStyles.notes}>
                Top notes: {card.Top_note}
              </Text>
            </View>
          );
        }}
        onSwipedRight={handleSwipeRight}
        backgroundColor="transparent"
        cardIndex={0}
        stackSize={3}
        // overlayLabels={{
        //   left: {
        //     title: '',
        //     element: (
        //       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        //         <FontAwesome name="times-circle" size={64} color="red" />
        //       </View>
        //     ),
        //     style: {
        //       wrapper: {
        //         flexDirection: 'column',
        //         alignItems: 'flex-end',
        //         justifyContent: 'flex-start',
        //         marginTop: 30,
        //         marginLeft: -30,
        //       },
        //     },
        //   },
        //   right: {
        //     title: '',
        //     element: (
        //       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        //         <FontAwesome name="check-circle" size={64} color="green" />
        //       </View>
        //     ),
        //     style: {
        //       wrapper: {
        //         flexDirection: 'column',
        //         alignItems: 'flex-start',
        //         justifyContent: 'flex-start',
        //         marginTop: 30,
        //         marginRight: -30,
        //       },
        //     },
        //   },
        // }}
      />
      {/* Swipe buttons */}
      <View style={{ flexDirection: 'row', marginTop: 500 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 32,
            padding: 16,
            marginHorizontal: 24,
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            opacity: buttonsDisabled ? 0.5 : 1, // Disable button if needed
          }}
          onPress={() =>  {
            setButtonsDisabled(true);
            setTimeout(() => {
              swiperRef.current?.swipeLeft();
              setButtonsDisabled(false);
            }, 1000);

            }
          }
        >
          <FontAwesome name="times" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 32,
            padding: 16,
            marginHorizontal: 24,
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            opacity: buttonsDisabled ? 0.5 : 1, // Disable button if needed
          }}
          disabled = {buttonsDisabled}
          onPress={() =>  {
            setButtonsDisabled(true);
            setTimeout(() => {
              swiperRef.current?.swipeRight();
              setButtonsDisabled(false);
            }, 1000);

            }
          }
        >
          <FontAwesome name="check" size={40} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
