
function testLength(id, l) {

    const inputElement = document.getElementById(id);
    var input = inputElement.value;
    if (input.length < l) {
    inputElement.classList.add("redborder");
    inputElement.classList.remove("greenborder");
    } else {
        inputElement.classList.remove("redborder");
        inputElement.classList.add("greenborder");
    }

var link = window.chatServer+'/'+window.chatCollectionID+'/user/'+input;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 204) {
            console.log("Exists");
            inputElement.classList.add("redborder");
            inputElement.classList.remove("greenborder");
        }
    }
};
xmlhttp.open("GET", link, true);
xmlhttp.send();
}

function confirm() {

    const password = document.getElementById('Pass').value;
    const passwordRepeat = document.getElementById('cPass').value;


    if(password === passwordRepeat) {

        document.getElementById('cPass').classList.add("greenborder");
        document.getElementById('cPass').classList.remove("redborder");
    } else {
        document.getElementById('cPass').classList.add("redborder");
        document.getElementById('cPass').classList.remove("greenborder");
    }

}

function submitCheck() {

    const name = document.getElementById('Name').className;
    const password = document.getElementById('Pass').className;
    const confirmPassword = document.getElementById('cPass').className;

    if (name === "greenborder" && password === "greenborder" && confirmPassword === "greenborder") {

    } else {
    event.preventDefault();
    }
}

