export function createDeck() {
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const faces = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
    "ace",
  ];

  let deck = [];

  for (let suit of suits) {
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const face = faces[i];

      deck.push({
        value: value,
        altValue: value === 14 ? 1 : null,
        face: face,
        suit: suit,
      });
    }
  }

  return deck;
}

export const cardImages = {
  "2clubs": require("../assets/card-images/2_of_clubs.svg"),
  "3clubs": require("../assets/card-images/3_of_clubs.svg"),
  "4clubs": require("../assets/card-images/4_of_clubs.svg"),
  "5clubs": require("../assets/card-images/5_of_clubs.svg"),
  "6clubs": require("../assets/card-images/6_of_clubs.svg"),
  "7clubs": require("../assets/card-images/7_of_clubs.svg"),
  "8clubs": require("../assets/card-images/8_of_clubs.svg"),
  "9clubs": require("../assets/card-images/9_of_clubs.svg"),
  "10clubs": require("../assets/card-images/10_of_clubs.svg"),
  jackclubs: require("../assets/card-images/jack_of_clubs.svg"),
  queenclubs: require("../assets/card-images/queen_of_clubs.svg"),
  kingclubs: require("../assets/card-images/king_of_clubs.svg"),
  aceclubs: require("../assets/card-images/ace_of_clubs.svg"),

  "2diamonds": require("../assets/card-images/2_of_diamonds.svg"),
  "3diamonds": require("../assets/card-images/3_of_diamonds.svg"),
  "4diamonds": require("../assets/card-images/4_of_diamonds.svg"),
  "5diamonds": require("../assets/card-images/5_of_diamonds.svg"),
  "6diamonds": require("../assets/card-images/6_of_diamonds.svg"),
  "7diamonds": require("../assets/card-images/7_of_diamonds.svg"),
  "8diamonds": require("../assets/card-images/8_of_diamonds.svg"),
  "9diamonds": require("../assets/card-images/9_of_diamonds.svg"),
  "10diamonds": require("../assets/card-images/10_of_diamonds.svg"),
  jackdiamonds: require("../assets/card-images/jack_of_diamonds.svg"),
  queendiamonds: require("../assets/card-images/queen_of_diamonds.svg"),
  kingdiamonds: require("../assets/card-images/king_of_diamonds.svg"),
  acediamonds: require("../assets/card-images/ace_of_diamonds.svg"),

  "2hearts": require("../assets/card-images/2_of_hearts.svg"),
  "3hearts": require("../assets/card-images/3_of_hearts.svg"),
  "4hearts": require("../assets/card-images/4_of_hearts.svg"),
  "5hearts": require("../assets/card-images/5_of_hearts.svg"),
  "6hearts": require("../assets/card-images/6_of_hearts.svg"),
  "7hearts": require("../assets/card-images/7_of_hearts.svg"),
  "8hearts": require("../assets/card-images/8_of_hearts.svg"),
  "9hearts": require("../assets/card-images/9_of_hearts.svg"),
  "10hearts": require("../assets/card-images/10_of_hearts.svg"),
  jackhearts: require("../assets/card-images/jack_of_hearts.svg"),
  queenhearts: require("../assets/card-images/queen_of_hearts.svg"),
  kinghearts: require("../assets/card-images/king_of_hearts.svg"),
  acehearts: require("../assets/card-images/ace_of_hearts.svg"),

  "2spades": require("../assets/card-images/2_of_spades.svg"),
  "3spades": require("../assets/card-images/3_of_spades.svg"),
  "4spades": require("../assets/card-images/4_of_spades.svg"),
  "5spades": require("../assets/card-images/5_of_spades.svg"),
  "6spades": require("../assets/card-images/6_of_spades.svg"),
  "7spades": require("../assets/card-images/7_of_spades.svg"),
  "8spades": require("../assets/card-images/8_of_spades.svg"),
  "9spades": require("../assets/card-images/9_of_spades.svg"),
  "10spades": require("../assets/card-images/10_of_spades.svg"),
  jackspades: require("../assets/card-images/jack_of_spades.svg"),
  queenspades: require("../assets/card-images/queen_of_spades.svg"),
  kingspades: require("../assets/card-images/king_of_spades.svg"),
  acespades: require("../assets/card-images/ace_of_spades.svg"),
};
