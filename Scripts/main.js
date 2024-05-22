import vnDictionary from './vnDictionary.json' with { type: 'json' };
import word_start from './words_start.json' with { type: 'json' };
let word1, word2, score, gameEnded, previousValue, listOfWords = "";

gameStart();
function gameStart() {
    gameEnded = false;
    word1 = word_start[Math.floor(Math.random() * word_start.length)]; //Random starting word
    document.getElementById("currentWordDisplay").textContent = `${word1}`;
    score = 0;
    previousValue = {}
}
document.getElementById("resetButton").onclick = function() { location.reload(); } //Refresh page

//Countdown timer
var secondsLeft = 30, secondsDisplayed, minutesDisplayed;
var elem = document.getElementById("timer");
var timerId = setInterval(countdown, 1000);
modifyTimer(0); //Initialize Timer UI
    
function countdown() {
    if (secondsLeft == 0) { gameOver("bomb"); }
    else { modifyTimer(-1); }
}

function modifyTimer(time) {
    secondsLeft += time;
    //Refresh timer UI
    minutesDisplayed = (Math.floor(secondsLeft / 60)).toString();
    secondsDisplayed = (secondsLeft % 60).toString();
    if (secondsDisplayed < 10) { secondsDisplayed = `0${secondsDisplayed}` }
    elem.innerHTML = minutesDisplayed + ":" + secondsDisplayed;
}

//Enter for submitting
document.getElementById("mySubmit").onclick = function() { 
    if (gameEnded == false) { submitWord(); }

}
document.getElementById("myText").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && gameEnded == false) { submitWord(); }
});
//Fixes the error where submitWord() is called once at runtime
document.getElementById("previousWord1").textContent = ''; 

function submitWord() {
    word2 = (document.getElementById("myText").value).toLowerCase().trim(); //Filter user input
    gameLogic();
}

function nextWord() {
    listOfWords += word1 + ' ' + word2 + ' - ';
    modifyTimer(5) //Add 5 seconds every time you get a word right
    document.getElementById("myText").value = "" //Empty the input text box
    document.getElementById("previousWord2").textContent = document.getElementById("previousWord1").textContent
    document.getElementById("previousWord1").textContent = `${word1} ${word2}`;
    score++;
    document.getElementById("scoreDisplay").textContent = `${score}`;

    //Check if word1 doesn't exist in vnDictionary OR if we have ran out of word2s for word1
    let previousValueCopy = [...previousValue[word1]], vnDictionaryCopy = [...vnDictionary[word1]];
    let keyHasUsedUpWords = previousValueCopy.sort().join(',') === vnDictionaryCopy.sort().join(',');
    if (!vnDictionary.hasOwnProperty(word2) || keyHasUsedUpWords) {
        score++ 
        gameOver("noWords");
        return;
    }
    document.getElementById("errorDisplay").style.display = "none";

    word1 = word2;
    document.getElementById("currentWordDisplay").textContent = `${word1}`;
}

function gameLogic() {  
    if(!vnDictionary[word1].includes(word2)) {   
        document.getElementById("errorDisplay").style.display = "block";
        document.getElementById("errorDisplay").textContent = 'Từ không tồn tại XD'; 
        return;
    }
    
    //Check if word1 is a key in previousValue
    if (word1 in previousValue) {
        //Check if word2 is a value of the key word1 in previousValue
        if (previousValue[word1].includes(word2)) {
            document.getElementById("errorDisplay").style.display = "block";
            document.getElementById("errorDisplay").textContent = 'Từ đã được sử dụng :P'
        }
        else {                
            previousValue[word1].push(word2); //Add value word2 to the key word1
            nextWord();
        }
    }
    else {
        previousValue[word1] = [word2]; //Add a new key word1 + value word2
        nextWord();
    }
}

function gameOver(ending) {
    clearTimeout(timerId);
    gameEnded = true;

    //Display death message depending on how you died
    if (ending === "noWords") {
        document.getElementById("currentWordDisplay").textContent = `Trò chơi kết thúc vì đã hết từ nối!`;
    }
    else {
        //Pick a random connecting word
        let word2Index = Math.floor(Math.random() * Object.keys(vnDictionary[word1]).length)
        word2 = vnDictionary[word1][word2Index];
        //WITHOUT REPEATING a previousValue
        while (previousValue.hasOwnProperty(word1) && previousValue[word1].indexOf(word2) != -1) {
            word2Index += (word2Index === 0) ? 1 : -1;
            word2 = vnDictionary[word1][word2Index];
        }
        
        document.getElementById("currentWordDisplay").textContent = `Bom đã nổ! Bạn có biết: ${word1} ${word2}`;
    }
    document.getElementById("myText").style.display = "none";
    document.getElementById("mySubmit").style.display = "none";
    document.getElementById("previousWord2").style.display = "none";
    if (listOfWords === "") { document.getElementById("previousWord1").textContent = "Sao không nối :("}
    else { document.getElementById("previousWord1").textContent = listOfWords; }
    
    document.getElementById("scoreDisplay").textContent = `Tổng số từ nối được: ${score}`;
}
