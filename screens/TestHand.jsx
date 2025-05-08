import { StyleSheet, Text, View, Pressable } from "react-native";

export default function TestHand({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Hand</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>A♠</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>K♥</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Q♦</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>J♣</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>10♠</Text>
        </View>
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
    width: 60,
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
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
