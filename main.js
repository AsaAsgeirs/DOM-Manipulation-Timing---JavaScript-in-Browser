// Text Animation with setInterval
const text = document.querySelector(".grocery");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";
for(let i=0; i < splitText.length; i++){
    text.innerHTML += "<span>"+ splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++
    if(char === splitText.length){
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
}

// Clock
class DigitalClock {
    constructor(element) {
        this.element = element;
    }

    start() {
        this.update();

        setInterval(() => {
            this.update();
        }, 500);
    }

    update() {
        const parts = this.getTimeParts();
        const minuteFormatted = parts.minute.toString().padStart(2, "0");
        const timeFormatted = `${parts.hour}:${minuteFormatted}`;
        const amPm = parts.isAm ? "AM" : "PM";

        this.element.querySelector(".clock-time").textContent = timeFormatted;
        this.element.querySelector(".clock-ampm").textContent = amPm;
    }

    getTimeParts() {
        const now = new Date();

        return {
            hour: now.getHours() % 12 || 12,
            minute: now.getMinutes(),
            isAm: now.getHours() < 12
        };
    }
}

const clockElement = document.querySelector(".clock");
const clockObject = new DigitalClock(clockElement);

clockObject.start();



// Event Bubbling
const list = document.querySelector('#shopping-list ul');

    //delete books
    list.addEventListener('click', function(e){
        if(e.target.className == 'delete'){
            const li = e.target.parentElement;
            list.removeChild(li)
        }
});             //This worked
    
    //add book
const addForm = document.forms['add-list'];

addForm.addEventListener('submit', function(e){
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;
    //console.log(value);

    //Creat elements
    const li = document.createElement('li');
    const bookName = document.createElement('div'); // I had to change the <span> to <div> because it disappeared when I added the Text Animation because that was a <span> aswell 
    const deleteBtn = document.createElement('div'); // I had to change the <span> to <div> because it disappeared when I added the Text Animation because that was a <span> aswell

    //add content
    deleteBtn.textContent = 'delete';
    bookName.textContent = value;

    //add classes
    bookName.classList.add('name');
    deleteBtn.classList.add('delete');

    //append to DOM
    li.appendChild(bookName);
    li.appendChild(deleteBtn);
    list.appendChild(li);

});

//Checkboxes & Change Event
    //hide books
    const hideBox = document.querySelector('#hide');
    hideBox.addEventListener('change',function(e){
        if(hideBox.checked){
            list.style.display = "none";
        } else {
            list.style.display = "block";
        }
    });

    //filter books (Search box)
    const searchbar = document.forms['search-list'].querySelector('input');
    searchbar.addEventListener('keyup', function(e){
        const term = e.target.value.toLowerCase();
        const books = list.getElementsByTagName('li');
        Array.from(books).forEach(function(book){
            const title = book.firstElementChild.textContent;
            if(title.toLowerCase().indexOf(term)!= -1){
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        })
    })

/*
X   1. Use a few animations made with CSS transitions (use of JS to control them encouraged)
2. Display a loading screen for a couple seconds using setTimeout
X   3. Display a clock or timer on the screen (use setInterval)
*/




