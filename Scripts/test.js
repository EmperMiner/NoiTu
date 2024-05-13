import data from './test.json' with { type: 'json' };
console.log(data);
console.log(data.a[0]);

let word1 = "a", word2, correct = false, result, score = 0;

document.getElementById("mySubmit").onclick = function() {
    word2 = document.getElementById("myText").value;
    for (var i = 0; i < Object.keys(data[word1]).length; i++) {
        if (data[word1][i] === word2) { correct = true; }
    }
    if (correct){
        nextWord()
    }
    else {
        document.getElementById("myH2").textContent = 'Từ không tồn tại.';
    }
}

function nextWord() {
    
    document.getElementById("myH2").textContent = `Từ trước là: ${word1} ${word2}`
    word1 = word2;
    document.getElementById("myH1").textContent = `Nối thành công! Từ tiếp theo là: ${word1} _`
    score++;
    document.getElementById("score").textContent = `Số từ nối được: ${score}`
}
