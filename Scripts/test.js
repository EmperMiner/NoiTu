import data from './test.json' with { type: 'json' };
import start from './words_start.js';

let word1, word2, score = 0;
gameStart();

document.getElementById("mySubmit").onclick = function() {
    word2 = document.getElementById("myText").value;
    if (data[word1].includes(word2)) { nextWord(); }
    else { document.getElementById("myH2").textContent = 'Từ không tồn tại.'; }
}

function gameStart() {
    let word1 = randomWord();
    document.getElementById("myH1").textContent = `Nối đi! Từ tiếp theo là: ${word1} _`;
}

document.getElementById("reset-btn").onclick = function() {
    gameStart();
    score = 0;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`;
};

function nextWord() {
    document.getElementById("myText").value = "" //Empty the input text box
    document.getElementById("myH2").textContent = `Từ trước là: ${word1} ${word2}`
    score++;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`
    if (!data.hasOwnProperty(word2)) { 
        gameOver();
        return;
    }
    word1 = word2;
    document.getElementById("myH1").textContent = `Nối thành công! Từ tiếp theo là: ${word1} _`
}

function gameOver() {
    document.getElementById("myH1").textContent = `Trò chơi đã kết thúc tại từ ${word2}!`
}

function randomWord() {
    let currentWord = start[Math.floor(Math.random() * start.length)];
    return currentWord;
}