import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { cardImages } from "../utils/Deck";

export default function PokerCard({ card, index, onHold }) {
  const handlePress = () => {
    onHold(index);
  };

  return (
    <View style={styles.cardWrapper}>
      <Pressable onPress={handlePress} style={styles.card}>
        <Image
          source={cardImages[card.face + card.suit]}
          style={styles.cardImage}
          contentFit="contain"
        />
        {card.held && (
          <View style={styles.heldOverlay}>
            <Text style={styles.heldText}>HELD</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    alignItems: "center",
  },
  heldText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 28,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    width: 120,
    height: 180,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  heldOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
