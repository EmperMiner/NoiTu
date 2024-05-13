import data from './test.json' with { type: 'json' };
console.log(data);
console.log(data.a[0]);

let username, correct = false, result;

document.getElementById("mySubmit").onclick = function(){
    username = document.getElementById("myText").value;
    for (var i = 0; i < data[a].length; i++) {
        if (data[a][i] === username) { correct = true; }
    }
    if (correct){
        result = 'Tồn tại!';
    }
    else {
        result = 'Không tồn tại.';
    }
    document.getElementById("myH2").textContent = result
}
