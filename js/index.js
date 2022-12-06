let noteArea = document.getElementById("txtContent");
let editButton = document.getElementById("edit-icon");
/* let navlinks = document.querySelectorAll(".navlinks"); */
const noteList = document.getElementById("note-list");
const addNoteButton = document.querySelector(".add-note");
const noteUL = document.querySelector(".note-ul");


// Knapp för att redigera
editButton.addEventListener('click', edit);
function edit() {
    document.getElementById("txtContent").setAttribute("contenteditable", "true");

}

// Knappar för att styla texten
const buttons = document.querySelectorAll(".btn"); 

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let command = button.dataset["element"];
        document.execCommand(command, false, null); 
    }); 
}); 


// Modal
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
        document.getElementById('txtContent').innerHTML = localStorage.getItem('txtContent')
        }
        console.log("saveMessage ran")
  }
  
  //Get the value of the message from local storage
  document.getElementById('txtContent').innerHTML = localStorage.getItem('txtContent')

const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", () => {    
    saveMessage();
    saveTitle();  
    addToNoteList();
});




function addToNoteList() {
  const title = document.getElementById('txtHeader').value;
  const content = document.getElementById('txtContent').innerHTML;
  const currentNote = {
    title: title,
    content: content,
    id: Math.floor(Math.random() * 100000)
  }
  addNote(currentNote);
  console.log(currentNote.id);
}


/* function getActiveNote()  {
  let activeNote = document.getElementById(currentNote.id);
  //TODO: Change styling to display which note is active 
}
activeNote.addEventListener("click", getActiveNote); */





// Funktioner för att lägga till/spara notes
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.title);
  noteUL.appendChild(noteElement)
  /* noteList.insertBefore(noteElement, addNoteButton); */
});

/* addNoteButton.addEventListener("click", () => addNote()); */

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}





function createNoteElement(id, content) {
  const element = document.createElement("li");
  /* noteUL.appendChild(element) */
  console.log(noteUL);

  element.classList.add("note");
  element.innerHTML = content;
  element.setAttribute("id", id)

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  return element;

}



function addNote(noteObject) {
  const notes = getNotes();

  const noteElement = createNoteElement(noteObject.id, noteObject.title);
  noteUL.appendChild(noteElement)
  /* noteList.insertBefore(noteElement, addNoteButton);  *///Ändra notelist till ULen

  notes.push(noteObject);
  saveNotes(notes);
  console.log("noteobject", noteObject);
}



function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

