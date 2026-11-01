window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  
  // Check if the user has scrolled down more than 50 pixels
  if (window.scrollY > 200) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.addEventListener("DOMContentLoaded", () => {

    // OUR WORLDS
    const toggle = document.getElementById("worlds-toggle");
    const overlay = document.getElementById("worlds-overlay");
    const close = document.getElementById("worlds-close");

    function openWorlds() {
        overlay.classList.add("active");
        document.body.classList.add("overlay-open");
    }

    function closeWorlds() {
        overlay.classList.remove("active");
        document.body.classList.remove("overlay-open");
    }

    toggle.addEventListener("click", (e) => {
        e.preventDefault();

        if (overlay.classList.contains("active")) {
            closeWorlds();
        } else {
            openWorlds();
        }
    });

    close.addEventListener("click", closeWorlds);


    // ESCAPE
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeWorlds();
            careersJumpscare.classList.remove("active");
        }
    });

});