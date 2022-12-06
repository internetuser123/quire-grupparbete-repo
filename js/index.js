const editButton = document.getElementById("edit-icon");
// document.getElementById('txtHeader').value = localStorage.getItem('txtHeader');
let header = document.getElementById("txtHeader"); 
let noteEditorArea = document.getElementById("txtContent"); 

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

editButton.addEventListener('click', edit);
function edit() {
    document.getElementById("txtContent").setAttribute("contenteditable", "true");
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



//Save note message
function saveMessage() {
    if (typeof(Storage) != 'undefined') {
    //Get value of the message
    const messageInput = document.getElementById('txtContent').innerHTML;
    //Save the value in local storage.
    localStorage.setItem('txtContent', messageInput);
    document.getElementById('txtContent').innerHTML = localStorage.getItem('txtContent');
    saveTitle(); 
    }
}

//Spara anteckning
const saveBtn = document.getElementById("placeholder-button"); 
saveBtn.addEventListener("click", saveMessage);

const newNoteBtn = document.getElementById("new-note-btn");
newNoteBtn.addEventListener("click", createNewNote);

//Skapa ny anteckning och spara den gamla till menyn på sidan + localstorage
function createNewNote () {
    
    //Make sure that the user saved their note first 
    saveMessage(); 
    saveTitle(); 

    //Skapa anteckningen som ett objekt
    const noteTitle = localStorage.getItem("txtHeader");
    const noteContent = localStorage.getItem("txtContent");  
    const noteList = document.querySelector(".noteList"); 

    const note = {
        id: Math.floor(Math.random() * 10000),
        type: "note",
        title: noteTitle,
        content: noteContent
    };

    //TODO: Save the note object in an array instead

    localStorage.setItem(note.id, JSON.stringify(note)); 
    localStorage.setItem("txtHeader", "");
    localStorage.setItem("txtContent", "");
    header.value = ""; 
    noteEditorArea.innerHTML = ""; 

    //Add note to list 
    const noteListItem = document.createElement("li"); 
    noteListItem.classList.add("noteListItem"); 
    noteListItem.innerText = note.title; 
    noteList.appendChild(noteListItem); 

    //Create eventlistener to be able to navigate old notes
    noteListItem.addEventListener("click", () => {
        showClickedNote(note); 
    });
}

function showClickedNote(noteObject) {
    header.value = noteObject.title; 
    noteEditorArea.innerText = noteObject.content;    
}

//TODO: Load saved notes on refresh from local storage
//TODO: Navigate between saved notes

const buttons = document.querySelectorAll(".btn"); 
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let command = button.dataset["element"];
        document.execCommand(command, false, null); 
    }); 
}); 

