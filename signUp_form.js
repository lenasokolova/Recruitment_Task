const goToLogInBtn = document.getElementById('log-form-btn');

const form = document.getElementById('form');

const nameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const emailInputConfirm = document.getElementById('email-confirm');


const regex = /^[0-9a-zA-Z]{6,20}$/;
const regexPassword = /^[0-9a-zA-Z]{6,}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 

const allInput = document.getElementsByTagName('input');
let allUsers = [];




form.addEventListener('click', function(event){
    event.preventDefault();
})

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', function(){
    

    if (!regex.test(nameInput.value)){
        errorMsg(nameInput, 'Nazwa użytkownika musi mieć między 6 a 20 znaków, dozwolone znaki to litery i cyfry');

    } else if (!regexPassword.test(passwordInput.value)){
        errorMsg(passwordInput, 'Hasło musi mieć co najmniej 6 znaków');

    } else if (!regexEmail.test(emailInput.value)){
        errorMsg(emailInput, 'Niepoprawny format email');

    } else if (emailInput.value !== emailInputConfirm.value) {
        errorMsg(emailInputConfirm, ('Podane adresy e-mail są różne'));

    } else {
        saveUserDataToLocalStorage();

    }
})


function saveUserDataToLocalStorage(){

    let newInput = {
        name: nameInput.value.trim(),
        password: passwordInput.value.trim(),
        email: emailInput.value.trim(),
        status: 'logged in'
    }

    if (localStorage.getItem("newUserData") === null) {
        allUsers.push(newInput);

        localStorage.setItem("newUserData", JSON.stringify(allUsers));
        document.forms[0].reset();
        window.location.href = "logIn_user_page.html";
        
    } else {
        let stored = localStorage.getItem("newUserData");

        let storedArr = JSON.parse(stored);
        

        if ( storedArr.some(obj => obj.name === nameInput.value)) {

            errorMsg(nameInput, 'Użytkownik o tej nazwie już istnieje');

        } else if (storedArr.some(obj => obj.email === emailInput.value)){

            errorMsg(emailInput, 'Podany adres email już został wykorzystany');

        } else {
            
            storedArr.push(newInput);

            localStorage.setItem("newUserData", JSON.stringify(storedArr));
            
            allUsers = [];
            document.forms[0].reset();

            window.location.href = "logIn_user_page.html";
        }
    }
}

function errorMsg(input, message) {
	const formValidation = input.parentElement;
	const smallError = formValidation.querySelector('small');
	formValidation.className = 'form-validation error';
	smallError.innerHTML = message;
}

goToLogInBtn.addEventListener("click", function(){
    window.location.href = "logIn_form.html";
});
