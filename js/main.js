//Question array
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create A Password', type: 'password' }
];

//Transition time
const shakeTime = 100; 
const switchTime = 200;  

//init position at first question
let position = 0;

//init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');


//Events

//Get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);

//Next button click
nextBtn.addEventListener('click', validate);

//input field enter click
inputField.addEventListener('keyup', e => {
    if(e.keyCode ==13) {
        validate();
    }
});



//FUNCTIONS

// Get question from array and add to markup
function getQuestion() {
    //Get current Question
    inputLabel.innerHTML = questions[position].question;
    //Get current type
    inputField.type = questions[position].type || 'text';
    //Get current answer
    inputField.value = questions[position].answer || '';
    //focus on element
    inputField.focus();

    //set progress bar width - variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';

    //Add user icon or back arrow depending on question
    prevBtn.className = position ? 'fas fa-arrow-left' : 
    'fas fa-user';

    newFunction();

    function newFunction() {
        showQuestion();
    }
}
//Display question to user
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}
//hide question from user 
function hideQuestion() {
inputGroup.style.opacity = 0;
inputLabel.style.marginLeft = 0;
inputProgress.style.width = 0;
inputProgress.style.transition = 'none';
inputGroup.style.border = null;
}
//Transform to create shake motion
function transform(x, y) {
    formBox.style.transform = 'translate(${x}px, ${y}px)';
}

// validate field
function validate() {
    //Make sure pattern matches if there is one
    if(!inputField.value.match(questions[position].pattern || /.+/)
    ){
    inputFail();
    } else {
        inputPass();
    }
}

//Field input fail
function inputFail() {
   formBox.className = 'error';
   // Repeat shake Motion - set i to number of shakes
   for(let i = 0; i < 6; i++) {
       setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 
       0);
       setTimeout(transform, shakeTime * 6, 0, 0);
       inputField.focus();
       }
   } 
//Field input pass
function inputPass() {
    formBox.className= '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime *1, 0, 0);


    // store Answer in array
    questions[position].answer = inputField.value;
    //increment position
    position++;

    //if New question, Hide current and get next
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        //Remove If No questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        //Form complete
        formComplete();
     }
    } 

    //All field complete - show h1 end
    function formComplete() {
        const h1 = document.createElement('h1');
        h1.classList.add('end');
        h1.appendChild(
            document.createTextNode(
                'Thanks ${questions[0].answer } You are registered and will get an email shortly'
                )
            );
        setTimeout(() => {
            formBox.parentElement.appendChild(h1);
            setTimeout(() => (h1.style.opacity = 1), 50);
            }, timeout); 
        }1000;
    
    
    