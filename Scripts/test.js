import vnDictionary from './test.json' with { type: 'json' };
import word_start from './words_start.json' with { type: 'json' };
let word1 = randomWord(), word2, score;
gameStart();

function gameStart() {
    let word1 = randomWord();
    document.getElementById("myH1").textContent = `Nối đi! Từ tiếp theo là: ${word1} _`;
    score = 0;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`
}

document.getElementById("reset-btn").onclick = function() { gameStart(); }

//Ấn enter cũng submit
document.getElementById("myText").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { submitWord(); }
});
document.getElementById("mySubmit").onclick = submitWord();
function submitWord() {
    word2 = document.getElementById("myText").value;
    if (vnDictionary[word1].includes(word2)) { nextWord(); }
    else { document.getElementById("myH2").textContent = 'Từ không tồn tại.'; }
}

function nextWord() {
    document.getElementById("myText").value = "" //Empty the input text box
    document.getElementById("myH2").textContent = `Từ trước là: ${word1} ${word2}`
    score++;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`
    if (!vnDictionary.hasOwnProperty(word2)) { 
        gameOver();
        return;
    }
}

function randomWord() {
    let currentWord = word_start[Math.floor(Math.random() * word_start.length)];
    return currentWord;
}