import data from './test.json' with { type: 'json' };
console.log(data);
console.log(data.a[0]);

let username;

document.getElementById("mySubmit").onclick = function(){
    username = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `Hello ${username}`
    document.getElementById("myH2").textContent = `First value of key is ${data.username[0]}`
}
