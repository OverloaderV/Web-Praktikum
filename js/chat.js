// TODO auslagern
let url = "https://online-lectures-cs.thi.de/chat/"
let access_token = "29f771a4-c121-4fd5-ab46-f7862f0d05fc"
let user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjY3ODk5MTIwfQ.5LkCDmMjcCGEkC9aLWjut7IlF_OCqcSpK6OmX5gxwmU"
let other_user = "Jerry"

let lastlength = 0;

function getMessages() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        let chatbox = document.getElementById("chatbox");
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);
            if (data.length > lastlength) {
                for (let i = lastlength; i < data.length; i++) {
                    let message = document.createElement("p");

                    let content = document.createElement("span");
                    content.classList.add("cmsg");
                    let content_text = document.createTextNode(data[i].from.concat(": ").concat(data[i].msg))
                    content.appendChild(content_text);
                    message.appendChild(content);
                    
                    let received_date = new Date(data[i].time);
                    let time = document.createElement("span");
                    time.classList.add("ctime");
                    let time_text = document.createTextNode(received_date.getHours() + ":" + received_date.getMinutes() + ":" + received_date.getSeconds() + " " + received_date.getDay() + "." + received_date.getMonth() + "." + received_date.getFullYear());
                    time.appendChild(time_text);
                    message.appendChild(time);
                    
                    let br = document.createElement("br");
                    message.appendChild(br);

                    chatbox.appendChild(message);
                }
                lastlength = data.length;
            }
        }
    };"/29f771a4-c121-4fd5-ab46-f7862f0d05fc/message/Jerry"
    xmlhttp.open("GET", window.chatServer.concat("/").concat(window.chatCollectionID).concat("/message/").concat(other_user), true);
    // Add token, e. g., from Tom
    xmlhttp.setRequestHeader('Authorization', 'Bearer '.concat(window.chatToken));
    xmlhttp.send();
}

getMessages();
window.setInterval(getMessages, 1000);