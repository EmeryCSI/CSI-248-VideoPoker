import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { createDeck } from "../utils/Deck";
import { useState, useEffect } from "react";
import { cardImages } from "../utils/Deck";

export default function TestHand({ navigation }) {
  const [hand, setHand] = useState([]);

  useEffect(() => {
    const deck = createDeck();
    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    // Take first 5 cards
    setHand(deck.slice(0, 5));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Poker</Text>
      <View style={styles.cardContainer}>
        {hand.map((card, index) => {
          return (
            <View key={index} style={styles.card}>
              <Image
                source={cardImages[card.face + card.suit]}
                style={styles.cardImage}
                contentFit="contain"
              />
            </View>
          );
        })}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
  },
  card: {
    width: 120,
    height: 180,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonPressed: {
    backgroundColor: "#45a049",
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
