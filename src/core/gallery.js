const modalImage = document.getElementById("modalImage");

document.querySelectorAll(".gallery-img").forEach(img => {

    img.addEventListener("click", function(){

        modalImage.src = this.src;
        modalImage.alt = this.alt;

    });

});