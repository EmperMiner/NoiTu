import data from './test.json' with { type: 'json' };
console.log(JSON.parse(data)[0].thiên);

let test = JSON.parse(data)[0].tài;

let username;

document.getElementById("mySubmit").onclick = function(){
    username = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `Hello ${username} and ${test}`
}
