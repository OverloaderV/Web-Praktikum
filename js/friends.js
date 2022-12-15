var data= 0;
var added= false;
function getUsers(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText)
            data = JSON.parse(xmlhttp.responseText);
            console.log(data);

        }

    };
xmlhttp.open("GET", window.chatServer + "/"+ window.chatCollectionID +"/user", true);
// Add token, e. g., from Tom
xmlhttp.setRequestHeader('Authorization', 'Bearer '+window.chatToken);
xmlhttp.send();
}


getUsers()
/*
function keyup(){
    if (added){
        getUsers()
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
    else{
        let div = document.createElement("div");
        div.id="ul"
        document.body.append(div);
        added=true;
    }
}
*/
function checkname(event){
    let bool = data.includes(document.getElementById("username").value);
    if(!bool){
        alert("User " +document.getElementById("username").value+ " doesn't exist.")
        event.preventDefault();
    }
}

function initNames(prefix){
    getUsers();
    const datalist = document.getElementById("names");
    datalist.innerHTML='';
    for(let name of data){
        if(prefix === ''||name.startsWith(prefix)){
            const option = document.createElement('OPTION');
            option.setAttribute('value',name);
            datalist.appendChild(option)
        }
    }
}
function keyupp(input){
    const text = input.value;
    initNames(text);
}

