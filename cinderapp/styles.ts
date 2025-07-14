import { StyleSheet } from 'react-native';

export const swiperStyles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center',},
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,         // Slightly larger border radius
    padding: 24,              // More padding for bigger card
    height: 500,              // Increased height
    width: 320,               // Increased width
    alignSelf: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  brand: { fontSize: 20, color: '#777', marginTop: 8 },
  notes: { 
    marginTop: 18, 
    fontSize: 18, 
    color: '#333', 
    backgroundColor: '#f5f5f5', // subtle background for top notes
    padding: 8,                 // padding inside top notes
    borderRadius: 8,            // rounded corners for top notes
    alignSelf: 'stretch',       // fill card width
  },
  url: { marginTop: 10, fontSize: 14, color: '#red' },
  noFragranceFound: {
    fontSize: 18,
    color: '#500',
    textAlign: 'center',
    marginTop: 20,
  },

    image: {
        width: '100%',
        height: 260,                // slightly larger image
        borderRadius: 14,
        marginBottom: 18,
    },
});