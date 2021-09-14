const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const button = document.querySelector(".submitbtn");
const errorMSG = document.querySelector(".formError");

// form errors
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const subjectError = document.querySelector("#subjectError");

const success = document.querySelector(".success");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    // Check name
    if (validateLength(name.value, 1) === false) {
        nameError.style.display = "block";
    } else {
        nameError.style.display = "none";
    }

    // Check email
    if (validateEmail(email.value) === false) {
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }

    // Check subject
    if (validateLength(subject.value, 10) === false) {
        subjectError.style.display = "block";
    } else {
        subjectError.style.display = "none";
    }

    // When all fields pass the check, send form
    if (validateLength(name.value, 1) && validateEmail(email.value) && validateLength(subject.value, 10)) {
        success.innerHTML = '<div class="success">Success, Your message has been sent</div>';
        setTimeout(() => {
            success.innerHTML = "";
        }, 5000);
        form.reset();
    }
}

function validateLength(value, length) {
    if (value.trim().length >= length) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}