/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

    //  Variables
    var scores, roundScore, activePlayer, gamePlaying, lastDice;

    init();

    document.querySelector('.btn-roll').addEventListener('click', function () {
        if (gamePlaying) {
          //  1. Random Number
          var dice = Math.floor(Math.random() * 6) + 1;
          var dice1 = Math.floor(Math.random() * 6) + 1;

          //  2. Display Result
          var diceDOM = document.querySelector('.dice');
          var diceDOM1 = document.querySelector('.dice-1');
          diceDOM.style.display = 'block';
          diceDOM1.style.display = 'block';
          diceDOM.src = 'dice-' + dice + '.png';
          diceDOM1.src = 'dice-' + dice1 + '.png';


          //  3. Update the round score IF the rolled number was not a 1
          if ( dice !== 1 && dice1 !== 1 ) {
            //Add Score
            roundScore += dice + dice1;
            lastDice = dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
          } else {
            nextPlayer();
          }


          // if (dice === 6 && dice === lastDice) { // if two 6's are rolled in a row remove player score and go to next player
          //   scores[activePlayer] = 0;
          //   document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
          //   nextPlayer();
          // } else if (dice !== 1) { // if the dice is not a one do as normal
          //   //AddScore
          //   roundScore += dice;
          //   document.querySelector('#current-' + activePlayer).textContent = roundScore;
          // } else {
          //   nextPlayer(); // if a 1 is rolled go to the next player
          //   }
          //   lastDice = dice; // update last dice outside of conditional statement
        }
    });

    document.querySelector('.btn-hold').addEventListener('click', function() {
      if (gamePlaying) {
        //  Add CURRENT SCORE to GLOBAL scores
          scores[activePlayer] += roundScore;
        // Update the UI

        var input = document.querySelector('.final-score').value;
        var winningScore;
        if ( input ) {
          winningScore = input;
        } else  {
          winningScore = 100;
        }
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
              //Check if the player won the game!
        if ( scores[activePlayer] >= winningScore ) {
          document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
          document.querySelector('.dice').style.display='none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
        } else {
          nextPlayer();
        }
      }


    });

    document.querySelector('.btn-new').addEventListener('click', init);

    function init() {
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;
        document.querySelector('.dice').style.display='none';
        document.querySelector('.dice-1').style.display='none';
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');




      }

      function nextPlayer() {
        //Next Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //The ternary statement to switch the active Player
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //document.querySelector('.player-0-panel').classList.remove('active');   //remove classes
        //document.querySelector('.player-1-panel').classList.add('active');      // add classes
        document.querySelector('.dice').style.display="none";
        document.querySelector('.dice-1').style.display="none";
      }
