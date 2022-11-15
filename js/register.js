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

var link = 'https://online-lectures-cs.thi.de/chat/c372f16d-94f6-4870-b76d-9be68bcd82f6/user/' + input;

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

    const test = document.getElementById('heading');
    test.innerText = "test";

    if(password === passwordRepeat) {

        document.getElementById('cPass').classList.add("greenborder");
        document.getElementById('cPass').classList.remove("redborder");
    } else {
        document.getElementById('cPass').classList.add("redborder");
        document.getElementById('cPass').classList.remove("greenborder");
    }

}