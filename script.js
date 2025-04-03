const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// var to store how many times the user has clicked 
// goal is to reset after 2 clicks
let clickCount = 0;
// empty object to store the click number as a key and the card element as a value.
let clickedCards = {}

const matchedPairs = {}

// TODO: Implement this function!
function handleCardClick(event) {
  
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target); // console.log("you just clicked", selectedCard)
  const selectedCard = event.target;
  // if statement that checkes to see if any of the divs have the class that contains flipped. 
  // this makes it so a user cannot click on the same card twice and get a matched pair, which would be a result of next if statment.
  // Object.keys(clickedCards) is to prevent the user from showing the color of more than 2 divs at a time.
  // To get around this the clickedCards obj must be reset to empty. 
  if (selectedCard.classList.contains("flipped") || Object.keys(clickedCards).length >= 2) {
    return;
  }

  // This is setting the event.target to change the background color of a div to its class name when clicked.
  selectedCard.style.backgroundColor = selectedCard.className
  // This is adding the class to the div that was clicked.
  // Goal is to be able to distinguish between cards that have flipped and have not flipped otherwise 
  // the color classes would match.  
  selectedCard.classList.add("flipped")
 
  // This increases the variable clickCount every time a user clicks on a div inside of the game div.
  clickCount++
 
  // this is setting the object to have the keys set as the click and the value set to the DOMElement
  // i.e. the 1st click should be equal to the div.className and 2nd click equal to div.className 
  // setting this equal to the DOMElement allows you to control the direct element 
  // first attempted to set it equal to the selectedCard.className but this didnt work as it is just a string
  // so when trying to compare cards you could not because you were not selecting the actual element.
  // this lead to the first card not flipping back over when there was no match. 
  clickedCards[clickCount] = selectedCard

  // this is setting a var so that the first key value pair clicked on is stored in a var
  // the goal is to use this var as a way to compare the first and second key value pairs.
  firstCard = clickedCards[1]
// setting the var equal to the second key value pair stored in the obj 
  secondCard = clickedCards[2]

  // console.log(clickCount)
  // console.log(clickedCards)
  // console.log(clickedCards[1])
  // console.log(clickedCards[2])
  // console.log(`${firstCard.className}`)
  // console.log(matchedPairs)
  
  // checking to see if secondCard and firstCard have values stored in them.
  // then see if the class names are a match.
  if (secondCard && firstCard && secondCard.className === firstCard.className) {
    // resetting the clickCount to zero otherwise it will stop due to first if statement.
    // this is so that you can cantinue playing after matching a card.
    clickCount = 0
    // resetting the obj so that firstCard and secondCard can be occupied by new player choices. 
    clickedCards = {}
    console.log('success')
    // storing matched pairs in a new empty obj. This is to document if a player wins.
    matchedPairs[firstCard.className] = secondCard.className
  }
  // checking to see if secondCard and firstCard have values stored in them.
  // Then see if the class names do not match.
  if (secondCard && firstCard && secondCard.className !== firstCard.className) {
    console.log('not a match')
    // using setTimeout to reset the two stored divs to their original state.
    // this will run as soon as 2 consecutive cards are clicked.
    setTimeout(function() {
      // restting style for both of the stored divs so that their background color changes. 
      firstCard.style.backgroundColor = ''
      secondCard.style.backgroundColor = ''
      // restting the classList so that it just has the original class names as seen in COLORS array.
      // also restting the classList, clickCount, and cilckedCards  to prevent this first if statement from running and pausing the game.
      firstCard.classList.remove('flipped')
      secondCard.classList.remove('flipped')
      clickCount = 0
      clickedCards = {}
        }, 1000) // 1 second pause before setTimeout runs after the if statement runs. 

  }
  // this is how the game ends as long as each card has only one other match. 
  // the gameContainer.children.length should therefore always be twice the size of the Obj.keys(matchedPairs) obj. 
  if (Object.keys(matchedPairs).length === gameContainer.children.length/2) {
    // console.log('congratulations you matched all cards')
    // creating h2 and adding text to notify user of completed game. 
    winBanner = document.createElement('h2')
    winBanner.textContent = 'Congratulations you matched all the cards'
    // creating a const that has the div with the id of win-banner.
    const winner = document.querySelector('#win-banner')
    // adding message to the page so the user can see that the game is over. 
    winner.append(winBanner)

  }

}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */