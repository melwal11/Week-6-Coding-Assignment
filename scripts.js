/* Create an automated version of the classic card game WAR.
-Deal 26 cards to two players from a deck.
Iterate through the turns where each player plays a card.
The player who played the higher card is awarded a point.
Ties result in zero points for either player.
After all cards have been played, display the score.
*/

class Card {
    constructor(rank, suit, value) {
      this.rank = rank;
      this.suit = suit;
      this.value = value;
    }
  }
  
  class Deck {
    constructor() {
      this.cards = [];
      this.buildDeck();
      this.shuffle();
    }
  
    buildDeck() {
      const suits = ["♠", "♣", "♥", "♦"];
      const ranks = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
      ];
      const values = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
      ];
  
      for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
          const card = new Card(ranks[j], suits[i], values[j]);
          this.cards.push(card);
        }
      }
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  }
  
  class Player {
    constructor(name) {
      this.name = name;
      this.hand = [];
      this.score = 0;
    }
  
    playCard() {
      return this.hand.shift();
    }
  
    addCards(cards) {
      this.hand.push(...cards);
    }
  }
  
  class Game {
    constructor(player1Name, player2Name) {
      this.deck = new Deck();
      this.player1 = new Player(player1Name);
      this.player2 = new Player(player2Name);
      this.turns = 0;
    }
  
    play() {
      const cards = this.deck.cards;
      this.player1.addCards(cards.slice(0, 26));
      this.player2.addCards(cards.slice(26, 52));
  
      while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();
        this.turns++;
  
        if (card1.value > card2.value) {
          this.player1.score++;
        } else if (card2.value > card1.value) {
          this.player2.score++;
        }
      }
  
      this.declareWinner();
    }
  
    declareWinner() {
      console.log(`Number of turns: ${this.turns}`);
      console.log(`${this.player1.name} score: ${this.player1.score}`);
      console.log(`${this.player2.name} score: ${this.player2.score}`);
  
      if (this.player1.score > this.player2.score) {
        console.log(`${this.player1.name} wins!`);
      } else if (this.player2.score > this.player1.score) {
        console.log(`${this.player2.name} wins!`);
      } else {
        console.log("It's a tie!");
      }
    }
  }
  
  const game = new Game("Player 1", "Player 2");
  game.play();
  