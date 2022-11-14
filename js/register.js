function test() {

    // let element = document.createElement("p");
    
    const element = document.getElementById('heading');
    element.innerText = "test";
    const nameinput = document.getElementById('Name');
    var input = nameinput.value;
    if (input.length < 3) {
    nameinput.classList.add("redborder");
    } else {
        nameinput.classList.remove("redborder");
    }
}