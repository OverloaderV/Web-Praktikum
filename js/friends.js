var data= 0;
var added= false;
var stuff = "";
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


getUsers();


//window.setInterval(refresh,2000);
refresh();
function refresh(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);
            stuff = data;
            console.log(data);

            let fr = document.getElementById("ul");
            fr.innerHTML = "";
            if(stuff.length === 0){
                fr.innerHTML = "You have no friends, that's sad! Start sending out friend requests.";
            }
            for(i=0;i<stuff.length;i++){
                if(stuff[i].status == "accepted"){
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.href = "chat.php?username="+stuff[i].username;
                    a.innerHTML= stuff[i].username;
                    li.id = stuff[i].username;
                    li.appendChild(a);
                    fr.appendChild(li);
                }
            }

            let req = document.getElementById("requests");
            req.innerHTML="";
            for(i=0;i<stuff.length;i++){
                if(stuff[i].status == "requested"){
                    let li = document.createElement("li");
                    let forma = document.createElement("form");
                    let formb = document.createElement("form");
                    let inpname = document.createElement("input");
                    let inpname2 = document.createElement("input");
                    let inpacc = document.createElement("input");
                    let inpdis = document.createElement("input");
                    let buttona = document.createElement("button");
                    let buttonb = document.createElement("button");
                    buttona.type = "submit";
                    buttona.className = "button_grey";
                    buttona.innerHTML = "Accept";
                    buttonb.type = "submit";
                    buttonb.className = "button_grey";
                    buttonb.innerHTML= "Dismiss";
                    inpname.type = "hidden";
                    inpname2.type = "hidden";
                    inpacc.type = "hidden";
                    inpdis.type = "hidden";
                    inpname.value = stuff[i].username;
                    inpname2.value = stuff[i].username;
                    inpacc.value = "true";
                    inpdis.value = "false";
                    inpname.name = "name";
                    inpname2.name = "name";
                    inpacc.name = "decide";
                    inpdis.name = "decide";
                    forma.action = "friends.php";
                    forma.method = "post";
                    formb.action = "friends.php";
                    formb.method = "post";
                    forma.appendChild(inpname2);
                    forma.appendChild(inpacc);
                    forma.appendChild(buttona);
                    formb.appendChild(inpname);
                    formb.appendChild(inpdis);
                    formb.appendChild(buttonb);
                    li.innerHTML = stuff[i].username;
                    li.appendChild(forma);
                    li.appendChild(formb);
                    req.appendChild(li);
                }
            }
        }
    };
    xmlhttp.open("GET", window.chatServer + "/"+ window.chatCollectionID +"/friend", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer '+window.chatToken);
    xmlhttp.send();


    let xmlhttps = new XMLHttpRequest();
    xmlhttps.onreadystatechange = function () {
    if (xmlhttps.readyState == 4 && xmlhttps.status == 200) {
        let data = JSON.parse(xmlhttps.responseText);
        console.log(data);

        for(j=0;j<data.length;j++){

        }
    }
};
xmlhttps.open("GET", window.chatServer + "/"+ window.chatCollectionID +"/unread", true);
xmlhttps.setRequestHeader('Content-type', 'application/json');
xmlhttps.setRequestHeader('Authorization', 'Bearer '+window.chatToken);
xmlhttps.send();

    

}
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

