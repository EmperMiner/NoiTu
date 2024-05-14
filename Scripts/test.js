import data from './test.json' with { type: 'json' };
import data from './word-start.json' with { type: 'json' };
console.log(data);
console.log(data.a[0]);

let word1 = "a", word2, correct, result, score = 0;
const resetBtn = document.querySelector(".reset-btn");

document.getElementById("mySubmit").onclick = function() {
    word2 = document.getElementById("myText").value;
    correct = false;
    if (data[word1].includes(word2)) { nextWord(); }
    else { document.getElementById("myH2").textContent = 'Từ không tồn tại.'; }
}

function nextWord() {
    document.getElementById("myH2").textContent = `Từ trước là: ${word1} ${word2}`
    word1 = word2;
    document.getElementById("myH1").textContent = `Nối thành công! Từ tiếp theo là: ${word1} _`
    score++;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`
}

resetBtn.addEventListener("click", randomWord)