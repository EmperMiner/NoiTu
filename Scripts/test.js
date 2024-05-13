import data from './test.json' with { type: 'json' };
console.log(data);
console.log(JSON.parse(data));

let username;

document.getElementById("mySubmit").onclick = function(){
    username = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `Hello ${username}`
}
