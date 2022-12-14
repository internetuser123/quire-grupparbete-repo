const editButton = document.getElementById("edit-icon");
// document.getElementById('txtHeader').value = localStorage.getItem('txtHeader');
let header = document.getElementById("txtHeader"); 
let noteEditorArea = document.getElementById("txtContent"); 
const noteList = document.querySelector(".noteList"); 

const modal = document.querySelector(".modal"); 
let pageVisited = localStorage.getItem("modalShown"); 
let previousNotes = JSON.parse(localStorage.getItem("savedNotesArray")); 


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

if (previousNotes) {
    window.onload = function() {
        //Foreach note, add it to notelist 
        previousNotes.forEach(note => {
            const noteListItem = document.createElement("li"); 
            noteListItem.classList.add("noteListItem"); 
            noteListItem.innerText = note.title; 
            noteList.appendChild(noteListItem); 
            noteListItem.addEventListener("click", () => {
                showClickedNote(note); 
            });
        });
    };
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
saveBtn.addEventListener("click", () => {
    saveMessage(); 
    createNewNote(false); 
});

const newNoteBtn = document.getElementById("new-note-btn");
newNoteBtn.addEventListener("click", () => {
    createNewNote(true); 
});

//Skapa ny anteckning och spara den gamla till menyn på sidan + localstorage
function createNewNote (clearWorkSpace) {
    
    //Make sure that the user saved their note first 
    saveMessage(); 

    //Skapa anteckningen som ett objekt
    const noteTitle = localStorage.getItem("txtHeader");
    const noteContent = localStorage.getItem("txtContent");  
    

    const note = {
        id: Math.floor(Math.random() * 10000),
        type: "note",
        title: noteTitle,
        content: noteContent
    };
    
    
    if (previousNotes) {
        previousNotes.push(note); 
    }
    else {
        previousNotes = [note]; 
    }
    //Save the note object in an array 
    localStorage.setItem("savedNotesArray", JSON.stringify(previousNotes)); 
    
    if (clearWorkSpace) {
        localStorage.setItem("txtHeader", "");
        localStorage.setItem("txtContent", "");
        header.value = ""; 
        noteEditorArea.innerHTML = ""; 
    }
    
    //Add note to list 
    const noteListItem = document.createElement("li"); 
    noteListItem.classList.add("noteListItem"); 
    noteListItem.setAttribute("id", note.id); 
    noteListItem.innerText = note.title; 
    noteList.appendChild(noteListItem); 

    //Create eventlistener to be able to navigate old notes
    noteListItem.addEventListener("click", () => {
        showClickedNote(note, noteListItem); 
    });
}

function showClickedNote(noteObject, noteLi) {
    header.value = noteObject.title;
    noteEditorArea.innerText = noteObject.content;
    highlightActiveNote(noteLi); 
}

function highlightActiveNote(activeNote) {
    if(previousNotes) {
        previousNotes.forEach(note => {
            const noteElement = document.getElementById(note.id); 
            noteElement.style.background = "#9188a6"; 
        });
    }
    activeNote.style.background = "white";     
}

//Load saved notes on refresh from local storage



const buttons = document.querySelectorAll(".btn"); 
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let command = button.dataset["element"];
        document.execCommand(command, false, null); 
    }); 
}); 

function addNote() {
    const notes = getNotes();
    const noteObject = {
      id: Math.floor(Math.random() * 100000),
      content: ""
      
    }
    console.log("addnote ran")
};

const toggleButton = document.getElementById("folder-icon");

function noteListToggle() {
let x = document.getElementById("note-list")
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
console.log("toggle ran");
  toggleButton.addEventListener('click', noteListToggle);