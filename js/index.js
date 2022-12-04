
//Denna variabel används aldrig
//let noteArea = document.getElementById("txtContent");
let editButton = document.getElementById("edit-icon");
//Denna variabel används aldrig
//let navlinks = document.querySelectorAll(".navlinks");

editButton.addEventListener('click', edit);
function edit() {
    document.getElementById("txtContent").setAttribute("contenteditable", "true");
}


const modal = document.querySelector(".modal"); 
let pageVisited = localStorage.getItem("modalShown"); 

if (pageVisited) {
    modal.remove(); 
}
else {
    const modalCloseBtn = document.getElementById("close-btn"); 
    modalCloseBtn.addEventListener("click", closeModal); 

    function closeModal (e) {
        localStorage.setItem("modalShown", true); 
        pageVisited = localStorage.getItem("modalShown"); 
        modal.remove(); 
    }
}

// Funktioner för att spara titel/text

function saveTitle() {
//Make sure local storage is supported by the browser.
    if (typeof(Storage) !== 'undefined') {
        //Get title value
        const input = document.getElementById('txtHeader').value;
        //Save title to local Storage
        localStorage.setItem('txtHeader', input);
        document.getElementById('txtHeader').value = localStorage.getItem('txtHeader');
        console.log(input)
        //Test
        console.log('Title saved.');
    }
}
document.getElementById('txtHeader').value = localStorage.getItem('txtHeader')

//Save note message
function saveMessage() {
    if (typeof(Storage) != 'undefined') {
    //Get value of the message
    const messageInput = document.getElementById('txtContent').innerHTML;
    //Save the value in local storage.
    localStorage.setItem('txtContent', messageInput);
    document.getElementById('txtContent').innerHTML = localStorage.getItem('txtContent');
    }
    //Test
    console.log("saveMessage ran"); 
}
//Get the value of the message from local storage
document.getElementById('txtContent').innerHTML = localStorage.getItem('txtContent')

const placeholderButton = document.getElementById("placeholder-button");
placeholderButton.addEventListener("click", () => {    
    //Skapa ny anteckning och spara den gamla till menyn på sidan 
});

const buttons = document.querySelectorAll(".btn"); 
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let command = button.dataset["element"];
        document.execCommand(command, false, null); 
    }); 
}); 

