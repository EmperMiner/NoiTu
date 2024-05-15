import vnDictionary from './test.json' with { type: 'json' };
import word_start from './words_start.json' with { type: 'json' };
let word1 = randomWord(), word2, score;
var previous_value = {}
gameStart();
function gameStart() {
    word1 = randomWord();
    document.getElementById("myH1").textContent = `Nối đi! Từ tiếp theo là: ${word1} _`;
    score = 0;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`;
    document.getElementById("myH2").textContent = 'Bạn chưa nối từ nào!';
}
document.getElementById("reset-btn").onclick = function() { gameStart(); }
//Ấn enter cũng submit
document.getElementById("mySubmit").onclick = function() { submitWord(); }
document.getElementById("myText").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { submitWord(); }
});
function submitWord() {word2 = sort_input(document.getElementById("myText").value);
gameLogic();
}

function nextWord() {
    console.log(previous_value)
    document.getElementById("myText").value = "" //Empty the input text box
    document.getElementById("myH2").textContent = `Từ trước là: ${word1} ${word2}`
    score++;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`;
    if (!vnDictionary.hasOwnProperty(word2)) { 
        gameOver();
        return;
    }
    word1 = word2;
    document.getElementById("myH1").textContent = `Nối thành công! Từ tiếp theo là: ${word1} _`;
}
function randomWord() {
let currentWord = word_start[Math.floor(Math.random() * word_start.length)];
return currentWord;
}
function sort_input(word) {
    word = word.toLowerCase().trim();
    return word
}
//New function
function gameLogic() {  
    if(!vnDictionary[word1].includes(word2)) {   
        document.getElementById("myH2").textContent = 'Từ không tồn tại.'; 
        return;
    }
    
    if (word1 in previous_value)
    {
        if (previous_value[word1].includes(word2)) {
            document.getElementById("myH2").textContent = 'Lỗi vì từ đã được input :Đ'
        }
        else {                
            previous_value[word1].push(word2);
            nextWord();
        }
    }
    else {
        previous_value[word1] = [word2];
        nextWord();
    }
}
      
document.getElementById("myH2").textContent = 'Bạn chưa nối từ nào!';