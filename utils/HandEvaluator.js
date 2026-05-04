import { payTable } from "./PayTable";

/**
 * Video Poker Hand Evaluator
 * This module evaluates poker hands and determines their payouts.
 * It follows standard video poker rules where hands are ranked from highest to lowest:
 * Royal Flush, Straight Flush, Four of a Kind, Full House, Flush, Straight,
 * Three of a Kind, Two Pair, and Jacks or Better.
 */

// Returns an array of card values sorted in ascending order
function getCardValues(hand) {
  return hand.map((card) => card.value).sort((a, b) => a - b);
}

// Returns an array of suits in the hand
function getCardSuits(hand) {
  return hand.map((card) => card.suit);
}

// Checks if the hand is a flush (all cards share the same suit)
function isFlush(hand) {
  const suits = getCardSuits(hand);
  return suits.every((suit) => suit === suits[0]);
}

// Checks if the hand is a straight (five consecutive card values)
function isStraight(cardValues) {
  // A, 2, 3, 4, 5 must be checked separately
  const isAceLowStraight =
    JSON.stringify(cardValues) === JSON.stringify([2, 3, 4, 5, 14]);
  if (isAceLowStraight) {
    return true;
  }

  // For a straight, the difference between highest and lowest card must be 4
  // and all cards must be unique (which is guaranteed by the card deck)
  return cardValues[4] - cardValues[0] === 4;
}

// Counts how many cards of each value are in the hand, sorted descending
// Example:
// Input two pair:  [{value: 8}, {value: 8}, {value: 4}, {value: 4}, {value: 6}]
// Output: [2, 2, 1]
function getValueCounts(hand) {
  const valueCounts = {};

  for (const card of hand) {
    if (valueCounts[card.value] === undefined) {
      valueCounts[card.value] = 1;
    } else {
      valueCounts[card.value] += 1;
    }
  }

  const counts = Object.values(valueCounts);
  counts.sort((a, b) => b - a);

  return counts;
}

// Counts how many of each face card (J, Q, K, A) are in the hand
// Example:
// Input: [{face: "jack"}, {face: "jack"}, {face: "queen"}, {face: "king"}, {face: "ace"}]
// Output: { jack: 2, queen: 1, king: 1, ace: 1 }
function getFaceCardCounts(hand) {
  const faceCounts = {
    jack: 0,
    queen: 0,
    king: 0,
    ace: 0,
  };

  for (const card of hand) {
    if (card.face in faceCounts) {
      faceCounts[card.face] += 1;
    }
  }

  return faceCounts;
}

// Checks if the hand is a Royal Flush (10, J, Q, K, A of the same suit)
function isRoyalFlush(hand) {
  const cardValues = getCardValues(hand);
  return (
    isFlush(hand) &&
    JSON.stringify(cardValues) === JSON.stringify([10, 11, 12, 13, 14])
  );
}

// Checks if the hand is a Straight Flush (five consecutive cards of the same suit)
function isStraightFlush(hand) {
  return isFlush(hand) && isStraight(getCardValues(hand));
}

// Checks if the hand has four cards of the same value
function isFourOfAKind(hand) {
  const counts = getValueCounts(hand);
  return counts[0] === 4;
}

// Checks if the hand has two different pairs
function isTwoPair(hand) {
  const counts = getValueCounts(hand);
  return counts[0] === 2 && counts[1] === 2;
}

// Checks if the hand has a pair of Jacks, Queens, Kings, or Aces
function isJacksOrBetter(hand) {
  const faceCounts = getFaceCardCounts(hand);
  return (
    faceCounts["jack"] === 2 ||
    faceCounts["queen"] === 2 ||
    faceCounts["king"] === 2 ||
    faceCounts["ace"] === 2
  );
}

/**
 * Evaluates a poker hand and returns all winning combinations with their payouts
 * Example:
 * Input: [{value: 10, suit: "hearts"}, {value: 11, suit: "hearts"}, ...]
 * Output: [{ hand: "Royal Flush", payout: 800 }]
 */
export function evaluateHand(hand) {
  const winningHands = [];
  const valueCounts = getValueCounts(hand);

  if (valueCounts[0] === 4) {
    winningHands.push({
      hand: "Four of a Kind",
      payout: payTable["Four of a Kind"],
    });
  } else if (valueCounts[0] === 3 && valueCounts[1] === 2) {
    winningHands.push({ hand: "Full House", payout: payTable["Full House"] });
  } else if (valueCounts[0] === 3) {
    winningHands.push({
      hand: "Three of a Kind",
      payout: payTable["Three of a Kind"],
    });
  } else if (valueCounts[0] === 2 && valueCounts[1] === 2) {
    winningHands.push({ hand: "Two Pair", payout: payTable["Two Pair"] });
  } else if (valueCounts[0] === 2) {
    if (isJacksOrBetter(hand)) {
      winningHands.push({
        hand: "Jacks or Better",
        payout: payTable["Jacks or Better"],
      });
    }
  } else {
    // Only check for straight and flush hands if there are no pairs
    if (isRoyalFlush(hand)) {
      winningHands.push({
        hand: "Royal Flush",
        payout: payTable["Royal Flush"],
      });
    } else if (isStraightFlush(hand)) {
      winningHands.push({
        hand: "Straight Flush",
        payout: payTable["Straight Flush"],
      });
    } else {
      if (isFlush(hand)) {
        winningHands.push({ hand: "Flush", payout: payTable["Flush"] });
      }
      if (isStraight(getCardValues(hand))) {
        winningHands.push({ hand: "Straight", payout: payTable["Straight"] });
      }
    }
  }

  winningHands.sort((a, b) => b.payout - a.payout);
  return winningHands;
}
