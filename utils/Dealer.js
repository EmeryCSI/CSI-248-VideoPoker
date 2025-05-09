import { createDeck } from "./Deck";

class Dealer {
  #deck; // Private field for the deck

  constructor() {
    this.#deck = [];
  }

  NewGame() {
    // Create a new deck using the createDeck function
    this.#deck = createDeck();
    //console.log(this.#deck);

    // Shuffle the deck
    for (let i = this.#deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#deck[i], this.#deck[j]] = [this.#deck[j], this.#deck[i]];
    }
  }

  DealHand() {
    if (this.#deck.length < 5) {
      throw new Error("Not enough cards in deck");
    }

    // Deal 5 cards and add held: false property to each card
    const hand = [];
    for (let i = 0; i < 5; i++) {
      const card = this.#deck.pop();
      hand.push({ ...card, held: false });
    }
    return hand;
  }

  Draw(hand) {
    // Create a new hand array
    const newHand = [...hand];

    // Replace cards that are not held
    for (let i = 0; i < newHand.length; i++) {
      console.log(newHand[i]);
      if (!newHand[i].held > 0) {
        console.log("drawing card");
        const newCard = this.#deck.pop();
        //console.log(newCard);
        newHand[i] = { ...newCard, held: false };
      }
    }

    return newHand;
  }
}

export default Dealer;
