const form = document.getElementById("login");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const USERS_JSON = "../json/users.json";

let users = [];
fetch(USERS_JSON)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return res.json();
  })
  .then(json => {
    users = json.data || [];
    console.log("Users loaded:", users.map(u => u.username));
  })
  .catch(err => {
    console.error("Error loading users.json:", err);
  });


function resetErrors() {
  usernameError.textContent = "";
  passwordError.textContent = "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resetErrors();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    if (!username) usernameError.textContent = "Please enter your username!";
    if (!password) passwordError.textContent = "Please enter your password!";
    return;
  }

  // find user
  const user = users.find(u => u.username === username);
  if (!user) {
    usernameError.textContent = "User not found!";
    return;
  }

  try {
    // hash entered password the same way your users.json was hashed
    const hashedPass = CryptoJS.MD5(password).toString(); 
    if (hashedPass === user.password) {
      // login success - set localStorage 
      localStorage.setItem("logged_in", "true");
   
      window.location.href = "../pages/home.html";
    } else {
      passwordError.textContent = "Incorrect password!";
    }
  } catch (err) {
    console.error("Login error:", err);
    passwordError.textContent = "An error occurred while logging in.";
  }
});
