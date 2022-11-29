let noteArea = document.getElementById("txtContent");
let editButton = document.getElementById("edit-icon");
let navlinks = document.querySelectorAll(".navlinks");

editButton.addEventListener('click', edit);



 for (let i = 0; i < navlinks.length; i++) {
     navlinks[i].addEventListener("click", readonly);
 }

function edit() {
    document.getElementById("txtContent").removeAttribute("readonly");
    /* console.log("Edit ran"); */
}

function readonly () {
    document.getElementById("txtContent").setAttribute("readonly", "readonly");
    /* console.log("RO ran") */
}


// localStorage.setItem("test", true, 0); 
// const testing = localStorage.getItem("test");

// console.log(testing); 

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

