document.querySelectorAll('.show-btn').forEach(button => {
    button.addEventListener('click', function() {
        const exerciseId = this.getAttribute('data-exercise');
        
       
        const url = `10 challenges/challenge${exerciseId}.html`; 

        
        window.location.href = `../10 challenges/challenge${exerciseId}.html`;  
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.getElementById("profile-pic");
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close");

    modal.style.display = "none";

    profilePic.addEventListener("click", function () {
        modal.style.display = "flex"; 
        modalImg.src = profilePic.src;
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";  
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";  
        }
    });
});