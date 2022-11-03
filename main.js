/*I did this project by following a tutorial on youtube
Here is the link to the video https://www.youtube.com/watch?v=nx_k1XCaWWs&list=PLZlA0Gpn_vH8DWL14Wud_m8NeNNbYKOkj&index=99
I did change some of the code so that it meets modern industry standards a bit better.
*/

/*These are all my querySelectors as I am interacting with DOM directly*/
const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector("#pause-button");
const stopButton = document.querySelector("#stop-button");
const textInput = document.querySelector("#text");
const speedInput = document.querySelector("#speed");
let currentCharacter;

/* Listens for when the play button is clicked 
then runs the playText() function if it is clicked*/
playButton.addEventListener('click', () => {
  playText(textInput.value)
});

/* Listens for when the pause button is clicked 
then runs the pauseText() function if it is clicked*/
pauseButton.addEventListener('click', pauseText);

/* Listens for when the stop button is clicked 
then runs the stopText() function if it is clicked*/
stopButton.addEventListener('click', stopText);

/* Listens for what ever the speed is set too.
If the speed is changed in the middle of speaking 
it stops speaking(Using the stopText() function), updates the speed, and then
starts again from the current word it is on(Using the playText() function).*/
speedInput.addEventListener('input', () => {
  stopText()
  playText(utterance.text.substring(currentCharacter))
});

/* creates a variable that starts a new utterance.
Then it uses an eventListener to stop when it get to 
the end of the text*/
const utterance =  new SpeechSynthesisUtterance(text)
utterance.addEventListener('end', () => {
  textInput.disabled = false
});

/* Listens for the current charIndex that the utterance is on.*/
utterance.addEventListener('boundary', e => {
  currentCharacter = e.charIndex
});

/*This function has the controls for resuming the utterance after it is paused,
prevents the two utterances from playing at the same time,
prevents the user from entering text durring the utterance, and checks the reading speed,
*/
function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if (speechSynthesis.speaking) return
  utterance.text = text
  utterance.rate = speedInput.value || 1
  textInput.disabled = true
  speechSynthesis.speak(utterance)  
};

/* This function handles pausing functionality. */
function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
};

/* This function will stop the utterance without saving where it was at. */
function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
};