window.chatServer="https://online-lectures-cs.thi.de/chat";
window.chatToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjY3ODk5MTIwfQ.5LkCDmMjcCGEkC9aLWjut7IlF_OCqcSpK6OmX5gxwmU";
window.chatCollectionID="29f771a4-c121-4fd5-ab46-f7862f0d05fc";

var data= 0;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseText)
        data = JSON.parse(xmlhttp.responseText);
        console.log(data);
  
        let div = document.createElement("div");
        div.id="ul"
        document.body.appendChild(div);
    }

};
xmlhttp.open("GET", window.chatServer + "/"+ window.chatCollectionID +"/user", true);
// Add token, e. g., from Tom
xmlhttp.setRequestHeader('Authorization', 'Bearer '+window.chatToken);
xmlhttp.send();

function keyup(){
    let input = document.getElementById("username").value;
    document.getElementById("ul").innerText = '';
    let p = document.createElement("p");
    p.classList.add("friendsddown");
    p.style.marginLeft="10px";
    if(input != ''){
        let j = 0;
    for(let i = 0; i < data.length;i++){
            if(data[i].startsWith(input)&&j<6){
                p.innerText =data[i];
                p.onclick = function(){document.getElementById("username").value = data[i];document.getElementById("ul").innerText = '';};
                let ul = document.getElementById("ul");
                ul.appendChild(p);
                j++;
            }
        
        }
    }
}

function checkname(){
    let bool = data.includes(document.getElementById("username").value);
    if(!bool){
        alert("User " +document.getElementById("username").value+ " doesn't exist.")
        return false;
    }
}
