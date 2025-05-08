import { payTable } from "./PayTable";

/**
 * Video Poker Hand Evaluator
 * This module evaluates poker hands and determines their payouts.
 * It follows standard video poker rules where hands are ranked from highest to lowest:
 * Royal Flush, Straight Flush, Four of a Kind, Full House, Flush, Straight,
 * Three of a Kind, Two Pair, and Jacks or Better.
 */

/**
 * Gets the numerical values of all cards in the hand, sorted in ascending order
 * @param {Array} hand - Array of card objects with value and suit properties
 * @returns {Array} Array of card values sorted in ascending order
 */
function getCardValues(hand) {
  return hand.map((card) => card.value).sort((a, b) => a - b);
}

/**
 * Gets the suits of all cards in the hand
 * @param {Array} hand - Array of card objects
 * @returns {Array} Array of card suits
 */
function getCardSuits(hand) {
  return hand.map((card) => card.suit);
}

/**
 * Checks if all cards in the hand are of the same suit
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if all cards are the same suit
 */
function isFlush(hand) {
  const suits = getCardSuits(hand);
  return suits.every((suit) => suit === suits[0]);
}

/**
 * Checks if the card values form a straight (consecutive values)
 * A straight is 5 cards in sequence, like 2,3,4,5,6 or 10,J,Q,K,A
 * Special case: A,2,3,4,5 is also a straight (called a "wheel" or "bicycle")
 *
 * @param {Array} cardValues - Array of card values sorted in ascending order
 * @returns {boolean} True if the cards form a straight
 */
function isStraight(cardValues) {
  // First, check for the special case of Ace-low straight (A,2,3,4,5)
  const isAceLowStraight =
    JSON.stringify(cardValues) === JSON.stringify([2, 3, 4, 5, 14]);
  if (isAceLowStraight) {
    return true;
  }

  // For a straight, the difference between highest and lowest card must be 4
  // and all cards must be unique (which is guaranteed by the card deck)
  return cardValues[4] - cardValues[0] === 4;
}

/**
 * Counts how many cards of each value are in the hand
 * For example, if you have [2,2,2,7,7], it will return [3,2]
 * This helps us identify pairs, three of a kind, etc.
 *
 * @param {Array} hand - Array of card objects with value property
 * @returns {Array} Array of counts sorted in descending order
 *
 * Example:
 * Input: [{value: 2}, {value: 2}, {value: 2}, {value: 7}, {value: 7}]
 * Output: [3, 2] (three 2's and two 7's)
 */
function getValueCounts(hand) {
  // Create an object to store the count of each card value
  const valueCounts = {};

  // Step 1: Count how many of each value we have
  for (const card of hand) {
    // If we haven't seen this value before, start counting at 1
    // If we have seen it, add 1 to the existing count
    if (valueCounts[card.value] === undefined) {
      valueCounts[card.value] = 1;
    } else {
      valueCounts[card.value] += 1;
    }
  }

  // Step 2: Get just the counts and sort them in descending order
  // This makes it easy to check for pairs, three of a kind, etc.
  // The card with the most occurrences is the first element in the array
  const counts = Object.values(valueCounts);
  counts.sort((a, b) => b - a);

  return counts;
}

/**
 * Counts how many face cards (Jacks, Queens, Kings, Aces) are in the hand
 * This is used to check for "Jacks or Better" pairs
 *
 * @param {Array} hand - Array of card objects with face property
 * @returns {Object} Object containing counts for each face card
 *
 * Example:
 * Input: [
 *   {face: "jack", value: 11},
 *   {face: "jack", value: 11},
 *   {face: "queen", value: 12},
 *   {face: "king", value: 13},
 *   {face: "ace", value: 14}
 * ]
 * Output: {
 *   jack: 2,    // Two jacks
 *   queen: 1,   // One queen
 *   king: 1,    // One king
 *   ace: 1      // One ace
 * }
 */
function getFaceCardCounts(hand) {
  // Create an object to store the count of each face card
  const faceCounts = {
    jack: 0,
    queen: 0,
    king: 0,
    ace: 0,
  };

  // Count how many of each face card we have
  for (const card of hand) {
    // Only count if it's a face card (jack, queen, king, or ace)
    if (card.face in faceCounts) {
      faceCounts[card.face] += 1;
    }
  }

  return faceCounts;
}

/**
 * Checks if the hand is a Royal Flush (10,J,Q,K,A of same suit)
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if the hand is a Royal Flush
 */
function isRoyalFlush(hand) {
  const cardValues = getCardValues(hand);
  return (
    isFlush(hand) &&
    JSON.stringify(cardValues) === JSON.stringify([10, 11, 12, 13, 14])
  );
}

/**
 * Checks if the hand is a Straight Flush (straight of same suit)
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if the hand is a Straight Flush
 */
function isStraightFlush(hand) {
  return isFlush(hand) && isStraight(getCardValues(hand));
}

/**
 * Checks if the hand is Four of a Kind
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if the hand is Four of a Kind
 */

/**
 * Checks if the hand is Two Pair
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if the hand is Two Pair
 */
function isTwoPair(hand) {
  const counts = getValueCounts(hand);
  return counts[0] === 2 && counts[1] === 2;
}

/**
 * Checks if the hand is Jacks or Better (pair of jacks, queens, kings, or aces)
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if the hand is Jacks or Better
 */
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
 * @param {Array} hand - Array of card objects
 * @returns {Array} Array of objects containing hand name and payout
 */
export function evaluateHand(hand) {
  const winningHands = [];
  const valueCounts = getValueCounts(hand);

  // First check for pairs and related hands
  if (valueCounts[0] === 4) {
    // Four of a Kind
    winningHands.push({
      hand: "Four of a Kind",
      payout: payTable["Four of a Kind"],
    });
  } else if (valueCounts[0] === 3 && valueCounts[1] === 2) {
    // Full House
    winningHands.push({ hand: "Full House", payout: payTable["Full House"] });
  } else if (valueCounts[0] === 3) {
    // Three of a Kind
    winningHands.push({
      hand: "Three of a Kind",
      payout: payTable["Three of a Kind"],
    });
  } else if (valueCounts[0] === 2 && valueCounts[1] === 2) {
    // Two Pair
    winningHands.push({ hand: "Two Pair", payout: payTable["Two Pair"] });
  } else if (valueCounts[0] === 2) {
    // Check for Jacks or Better
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

  // Sort winning hands by payout in descending order
  winningHands.sort((a, b) => b.payout - a.payout);
  return winningHands;
}
