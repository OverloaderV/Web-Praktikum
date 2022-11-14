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
}

function confirm() {

    const password = document.getElementById('Pass').value;
    const passwordRepeat = document.getElementById('cPass').value;

    if(password === passwordRepeat) {

        document.getElementById('cPass').classList.add("greenborder");
    } else {
        document.getElementById('cPass').classList.add("redborder");
    }

}