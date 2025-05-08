import React from "react";
import { View, StyleSheet } from "react-native";
import PokerCard from "./Poker-Card";

export default function PokerHand({ cards, onHold }) {
  return (
    <View style={styles.handContainer}>
      {cards.map((card, idx) => (
        <PokerCard key={idx} card={card} index={idx} onHold={onHold} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  handContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
});
