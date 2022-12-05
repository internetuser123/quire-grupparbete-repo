
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

//Spara anteckning
const saveBtn = document.getElementById("placeholder-button"); 
saveBtn.addEventListener("click", saveMessage);

const newNoteBtn = document.getElementById("new-note-btn");
newNoteBtn.addEventListener("click", () => {
    //Skapa ny anteckning och spara den gamla till menyn på sidan 
    //Give each note a unique identifier - the title? 

    //Make sure that the user saved their note first 
    saveMessage(); 
    const noteTitle = localStorage.getItem("txtHeader");
    const noteContent = localStorage.getItem("txtContent");  
    const noteList = document.querySelector(".noteList"); 
   
    const savedNote = document.createElement("div"); 
    savedNote.classList.add("noteListItem"); 

    const savedNoteTitle = document.createElement("div"); 
    savedNoteTitle.classList.add("noteListTitle"); 
    savedNoteTitle.innerHTML = noteTitle; 

    const savedNoteContent = document.createElement("div"); 
    savedNoteContent.classList.add("noteListDescription"); 
    savedNoteContent.innerHTML = noteContent; 

    savedNote.appendChild(savedNoteTitle); 
    savedNote.appendChild(savedNoteContent); 
    //Later on could add saving the date here

    noteList.appendChild(savedNote); 

    //TODO: Save to local storage
    //TODO: Load saved notes on refresh from local storage
    //TODO: Empty txtTitle and txtContent to use for new note

});

const buttons = document.querySelectorAll(".btn"); 
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let command = button.dataset["element"];
        document.execCommand(command, false, null); 
    }); 
}); 

