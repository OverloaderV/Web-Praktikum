// TODO auslagern
let other_user = document.getElementById("cPartner").innerHTML;
console.log(document.getElementById("cPartner").innerHTML);
/**
 * How many messages are already displayed in the chatbox
 */
let lastlength = 0;

/**
 * Gets the messages from the server and updates the chatbox
 */
function getMessages() {
    var xmlhttp = new XMLHttpRequest();
    console.log("test2");
    // Function that updates the chatbox
    xmlhttp.onreadystatechange = function () {
        let chatbox = document.getElementById("chatbox");
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);

            // only display new messages
            if (data.length > lastlength) {
                for (let i = lastlength; i < data.length; i++) {
                    // create all elements needed
                    let message = document.createElement("p");

                    let content = document.createElement("span");
                    content.classList.add("cmsg");
                    console.log("test");
                    let content_text = document.createTextNode(data[i].from.concat(": ").concat(data[i].msg))
                    console.log(data[i].from);

                    content.appendChild(content_text);
                    message.appendChild(content);

                    let received_date = new Date(data[i].time);
                    let time = document.createElement("span");
                    time.classList.add("ctime");
                    let time_text = document.createTextNode(received_date.getHours() + ":" + received_date.getMinutes() + ":" +
                      received_date.getSeconds());
                    time.appendChild(time_text);
                    message.appendChild(time);

                    let br = document.createElement("br");
                    message.appendChild(br);

                    chatbox.appendChild(message);
                }
                // Now there are more messages displayed
                lastlength = data.length;
            }
        }
    };
    // Send the request
    xmlhttp.open("GET", window.chatServer.concat("/").concat(window.chatCollectionID).concat("/message/").concat(other_user), true);
    xmlhttp.setRequestHeader('Authorization', 'Bearer '.concat(window.chatToken));
    xmlhttp.send();
}

// Get messages once at the start
getMessages();
// Get messages once every second
window.setInterval(getMessages, 1000);

/**
 * Send a message
 */
function sendMessage(e) {
    // Disable default functionality of a form
    if (e.preventDefault) {
        e.preventDefault();
    }

    // Get the typed message
    var msg = document.getElementById("msg").value;

    // create html request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
            console.log("done...");
        }
    };
    // Initialize receiver
    xmlhttp.open("POST", window.chatServer + "/" + window.chatCollectionID + "/message", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + window.chatToken);
    // The data to be sent
    let data = {
        message: msg,
        to: other_user
    };
    let jsonString = JSON.stringify(data);
    // send the data
    xmlhttp.send(jsonString);

    // Empty the message field
    document.getElementById("msg").value = "";
}

// Attach the send function to the form
var form = document.getElementById("send");
if (form.attachEvent) {
    form.attachEvent("submit", sendMessage);
} else {
    form.addEventListener("submit", sendMessage);
}
