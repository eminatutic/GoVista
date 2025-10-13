const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");


if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });


}
