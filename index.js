const goToLogInBtn = document.getElementById('log-btn');
const goToSignUpBtn = document.getElementById('reg-btn');


goToLogInBtn.addEventListener("click", function(){
    window.location.href = "logIn_form.html";
});

goToSignUpBtn.addEventListener("click", function(){
    window.location.href = "signUp_form.html";
});