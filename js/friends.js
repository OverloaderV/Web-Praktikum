var data= 0;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseText)
        data = JSON.parse(xmlhttp.responseText);
        console.log(data);
        let element = document.createElement("ul");
        document.body.appendChild(element);
        let div = document.createElement("div");
        div.id="ul"
        element.appendChild(div);
    }
    
};
xmlhttp.open("GET", window.chatServer + "/bcb23ef8-e376-4277-93ee-8c1d6829d6be/user", true);
// Add token, e. g., from Tom
xmlhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjY3NTU1NTMzfQ.XlotPsaGYrPUrppndpaAKo6BF6hoGEZ8NCK5O3UV7-M');
xmlhttp.send();

function keyup(){
    let input = document.getElementById("username").value;
    document.getElementById("ul").innerText = '';
    let li = document.createElement("li");
    li.classList.add("friendsddown");
    if(input != ''){
        let j = 0;
    for(let i = 0; i < data.length;i++){
            if(data[i].startsWith(input)&&j<6){
                li.innerText =data[i];
                li.onclick = function(){document.getElementById("username").value = data[i];document.getElementById("ul").innerText = '';};
                let ul = document.getElementById("ul");
                ul.appendChild(li);
                j++;
            }
        
        }
    }
}

function checkname(){
    let bool = data.includes(document.getElementById("username").value);
    if(!bool){
        alert("User " +document.getElementById("username").value+ " doesn't exist.")
    }
}
