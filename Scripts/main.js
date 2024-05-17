import vnDictionary from './vnDictionary.json' with { type: 'json' };
import word_start from './words_start.json' with { type: 'json' };
let word1 = randomWord(), word2, score, gameEnded, previousValue;

gameStart();
function gameStart() {
    gameEnded = false;
    word1 = word_start[Math.floor(Math.random() * word_start.length)]; //Random starting word
    document.getElementById("currentWordDisplay").textContent = `Từ đầu tiên là: ${word1} _`;
    document.getElementById("otherDisplay").textContent = 'Bạn chưa nối từ nào!';
    score = 0;
    document.getElementById("scoreDisplay").textContent = `Số từ nối được: ${score}`;
    previousValue = {}
}
document.getElementById("reset-btn").onclick = function() { location.reload(); } //Refresh page

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
    minutesDisplayed = Math.floor(secondsLeft / 60);
    secondsDisplayed = secondsLeft % 60;
    elem.innerHTML = `Bom nổ trong ${minutesDisplayed}m${secondsDisplayed}s`;
}

//Enter for submitting
document.getElementById("mySubmit").onclick = function() { 
    if (gameEnded == false) { submitWord(); }

}
document.getElementById("myText").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && gameEnded == false) { submitWord(); }
});
//Fixes the error where submitWord() is called once at runtime
document.getElementById("otherDisplay").textContent = 'Bạn chưa nối từ nào!'; 

function submitWord() {
    word2 = (document.getElementById("myText").value).toLowerCase().trim(); //Filter user input
    gameLogic();
}

function nextWord() {
    modifyTimer(5) //Add 5 seconds every time you get a word right
    document.getElementById("myText").value = "" //Empty the input text box
    document.getElementById("otherDisplay").textContent = `Từ trước là: ${word1} ${word2}`
    score++;
    document.getElementById("scoreDisplay").textContent = `Số từ nối được: ${score}`;

    //Check if word1 doesn't exist in vnDictionary OR if we have ran out of word2s for word1
    let previousValueCopy = [...previousValue[word1]], vnDictionaryCopy = [...vnDictionary[word1]];
    let keyHasUsedUpWords = previousValueCopy.sort().join(',') === vnDictionaryCopy.sort().join(',');
    if (!vnDictionary.hasOwnProperty(word2) || keyHasUsedUpWords) {
        score++ 
        gameOver("noWords");
        return;
    }

    word1 = word2;
    document.getElementById("currentWordDisplay").textContent = `Ngon! Từ mới là: ${word1} _`;
}

function gameLogic() {  
    if(!vnDictionary[word1].includes(word2)) {   
        document.getElementById("otherDisplay").textContent = 'Từ không tồn tại XD'; 
        return;
    }
    
    //Check if word1 is a key in previousValue
    if (word1 in previousValue) {
        //Check if word2 is a value of the key word1 in previousValue
        if (previousValue[word1].includes(word2)) {
            document.getElementById("otherDisplay").textContent = 'Từ đã được sử dụng :P'
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
    var listOfWords = '';
    for (var i = 0, keys = Object.keys(previousValue), ii = keys.length; i < ii; i++) {
        listOfWords += keys[i] + ' ' + previousValue[keys[i]] + ' - ';
    }

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
    
    document.getElementById("otherDisplay").textContent = listOfWords;
    document.getElementById("scoreDisplay").textContent = `Tổng số từ nối được: ${score}`;
}