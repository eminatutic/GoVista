const form = document.querySelector(".login-box form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// učitaj users.json
fetch("../data/users.json")
  .then(res => res.json())
  .then(data => {
    const users = data.data;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      const user = users.find(u => u.username === username);

      if (!user) {
        alert("User not found!");
        return;
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        alert("Login successful!");
        window.location.href = "home.html"; // idi na home
      } else {
        alert("Incorrect password!");
      }
    });
  })
  .catch(err => {
    console.error("Error loading users.json:", err);
  });
