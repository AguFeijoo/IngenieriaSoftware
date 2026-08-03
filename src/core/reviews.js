function addReview(name, rating, comment){
    if(name.trim() == "" || rating == "0"){
        return null;
    }

    let review = {
        name: name.trim(),
        rating: rating,
        comment: comment
    };

    return review;
}

const reviews = [
    {
        nombre: "María Gómez",
        estrellas: 5,
        comentario: "Excelente atención y muy buena ubicación.",
        fecha: "28/07/2026"
    },
    {
        nombre: "Juan Pérez",
        estrellas: 4,
        comentario: "Muy cómodo. El desayuno fue excelente.",
        fecha: "21/07/2026"
    }
];

const container = document.getElementById("reviews-container");

reviews.forEach(review => {

    container.innerHTML += `
        <div>
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5>${review.nombre}</h5>

                    <div class="text-warning mb-2">
                        ${"★".repeat(review.estrellas)}
                    </div>

                    <p>${review.comentario}</p>

                    <small class="text-muted">${review.fecha}</small>
                </div>
            </div>
        </div>
    `;

});

if (typeof module !== "undefined") { module.exports = { addReview }; }