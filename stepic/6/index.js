// fetch("http://localhost:3000")
// .then(res=>res.json())
// .then(data=>fetch(`http://localhost:3000/test`,{method:"POST"}))
var test
let xhr = new XMLHttpRequest();
xhr.open('GET', "http://localhost:3000");
xhr.send();
xhr.onload = function() {
    test=xhr.response
};
xhr.open('POST', "http://localhost:3000/test");
xhr.send(test);
