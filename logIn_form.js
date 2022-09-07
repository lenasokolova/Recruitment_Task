const form = document.getElementById('form');

const nameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logInBtn = document.getElementById('logIn-btn');
const goToSignUpBtn = document.getElementById('reg-btn');



form.addEventListener('submit', (e) => {
    e.preventDefault()
})


logInBtn.addEventListener('click', function(){
    letUserLogIn();
})


function errorMsg(input, message) {
	const formValidation = input.parentElement;
	const smallError = formValidation.querySelector('small');
	formValidation.className = 'form-validation error';
	smallError.innerText = message;
}


function letUserLogIn(){
    let stored = localStorage.getItem("newUserData");

    let storedArr = JSON.parse(stored);

    let result = storedArr.filter(obj => {
        return obj.name === nameInput.value;
      })
    let passObj = result[0].password;

    
    if (passObj !== passwordInput.value){
        errorMsg(passwordInput, 'Hasło nieprawidłowe');
    } else {
        result[0].status = 'logged in';

        localStorage.setItem("newUserData", JSON.stringify(storedArr));

        window.location.href = "logIn_user_page.html";
    }
}


goToSignUpBtn.addEventListener("click", function(){
    window.location.href = "signUp_form.html";
});
