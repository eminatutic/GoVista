const form = document.getElementById("contactForm");

const fullNameInput = document.getElementById("fullName");
const packageInput = document.getElementById("packageName");
const phoneInput = document.getElementById("phoneNumber");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const fullNameError = document.getElementById("fullNameError");
const packageError = document.getElementById("packageError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function validateFullName() {
  if (fullNameInput.value.trim() === "") {
    fullNameError.textContent = "Unesite vaše ime i prezime.";
    return false;
  } else {
    fullNameError.textContent = "";
    return true;
  }
}

function validatePackage() {
  if (packageInput.value.trim() === "") {
    packageError.textContent = "Unesite naziv putnog paketa.";
    return false;
  } else {
    packageError.textContent = "";
    return true;
  }
}

function validatePhone() {
  const phoneRegex = /^[0-9\s()+-]{6,}$/;
  if (phoneInput.value.trim() === "") {
    phoneError.textContent = "Unesite vaš broj telefona.";
    return false;
  } else if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneError.textContent = "Unesite važeći broj telefona.";
    return false;
  } else {
    phoneError.textContent = "";
    return true;
  }
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Unesite vaš email.";
    return false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "Unesite važeću email adresu.";
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}

function validateMessage() {
  if (messageInput.value.trim() === "") {
    messageError.textContent = "Napišite vašu poruku.";
    return false;
  } else if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Poruka mora imati najmanje 10 karaktera.";
    return false;
  } else {
    messageError.textContent = "";
    return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullNameValid = validateFullName();
  const packageValid = validatePackage();
  const phoneValid = validatePhone();
  const emailValid = validateEmail();
  const messageValid = validateMessage();

  if (fullNameValid && packageValid && phoneValid && emailValid && messageValid) {
    window.location.href = "success-sr.html";
  }
});
