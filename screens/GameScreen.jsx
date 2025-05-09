import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import PokerHand from "../components/Poker-Hand";
import { evaluateHand } from "../utils/HandEvaluator";
import Dealer from "../utils/Dealer";

export default function GameScreen() {
  const dealerRef = useRef(null);
  if (!dealerRef.current) {
    dealerRef.current = new Dealer();
  }
  const dealer = dealerRef.current;
  const [hand, setHand] = useState([]);
  const [bestHand, setBestHand] = useState(null);

  // Function to shuffle and deal a new hand
  const shuffleAndDeal = () => {
    dealer.NewGame();
    const newHand = dealer.DealHand();
    setHand(newHand);
    //console.log(newHand);
    // Evaluate the hand and get the best possible hand
    const results = evaluateHand(newHand);
    setBestHand(results[0]); // Get the highest payout hand
  };
  //function to draw new cards
  const drawCards = () => {
    const newHand = dealer.Draw(hand);
    //console.log(newHand);
    setHand(newHand);
    // Evaluate the hand and get the best possible hand
    const results = evaluateHand(newHand);
    setBestHand(results[0]); // Get the highest payout hand
  };

  // Initial deal
  useEffect(() => {
    shuffleAndDeal();
  }, []);

  // Function to set held to true for a card at a given index
  const holdCard = (index) => {
    setHand((prevHand) => {
      const newHand = [...prevHand];
      newHand[index] = { ...newHand[index], held: !newHand[index].held };
      return newHand;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Poker</Text>
      <PokerHand cards={hand} onHold={holdCard} />
      <View style={styles.bestHandContainer}>
        <Text style={styles.bestHandText}>
          {bestHand
            ? `${bestHand.hand} (Payout: ${bestHand.payout}x)`
            : "No Winner"}
        </Text>
      </View>
      <Pressable style={styles.shuffleButton} onPress={drawCards}>
        <Text style={styles.shuffleButtonText}>Draw Cards</Text>
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
    marginBottom: 20,
  },
  bestHandContainer: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  bestHandText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  shuffleButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shuffleButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
