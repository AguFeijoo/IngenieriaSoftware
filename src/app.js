// ---------- BOTONES ---------- //
let btnLogin = document.querySelector("#btnLogin");
let btnSendReview = document.querySelector("#btnSend");
// ---------- BOTONES ---------- //

// ---------- LOGIN ---------- //
if (btnLogin != null) {
    btnLogin.addEventListener("click", preLogin);
}

function preLogin(){
    let user = document.querySelector("#txtUser").value;
    let password = document.querySelector("#txtPassword").value;

    let result = login(user, password);

    if(!result){
        document.querySelector("#msgAlert").innerHTML = "Usuario o contraseña incorrectos";
    } else {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "adminDashboard.html";
    }
}
// ---------- LOGIN ---------- //

// ---------- REVIEW ---------- //
if (btnSendReview != null) {
    btnSendReview.addEventListener("click", preReview);
}

function preReview() {
    let name = document.querySelector("#txtName").value;
    let rating = document.querySelector("#slcRating").value;
    let comment = document.querySelector("#txtComment").value;

    let review = addReview(name, rating, comment);

    if (review == null) {
        document.querySelector("#msgReviewAlert").innerHTML = "Complete los campos obligatorios";
    } else {
        let reviews = JSON.parse(localStorage.getItem("reviews"));

        if (reviews == null) {
            reviews = [];
        }

        reviews.push(review);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        document.querySelector("#msgReviewAlert").innerHTML = "Opinión enviada correctamente";
    }
}

function showReviews() {
    let reviewsContainer = document.getElementById("reviews-container");
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length == 0) {
        reviewsContainer.innerHTML = `<p>¡Sé el primero en dejar una opinión!</p>`;
    } else {
        for (let r of reviews) {
            let stars = "";

            for (let i = 0; i < r.rating; i++) {
                stars += "&#11088";
            }

            reviewsContainer.innerHTML += `
                <div class="card">
                    <p>${r.name}</p>
                    <p>${stars}</p>
                    <p>${r.comment}</p>
                </div>
            `;
        }
    }
}

showReviews();
// ---------- REVIEW ---------- //

// ---------- BOOKING ---------- //
let bookingForm = document.querySelector("#booking-form");

if (bookingForm != null) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
}

function handleBookingSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
        firstName: form.querySelector("#first-name").value.trim(),
        lastName: form.querySelector("#last-name").value.trim(),
        email: form.querySelector("#email").value.trim(),
        roomType: form.querySelector("#room-type").value.trim(),
        guestCount: form.querySelector("#guest-count").value.trim(),
        checkIn: form.querySelector("#check-in").value.trim(),
        checkOut: form.querySelector("#check-out").value.trim(),
        phone: form.querySelector("#phone").value.trim(),
        specialRequests: form.querySelector("#special-requests").value.trim(),
    };

    const errors = validateForm(data);
    if (errors.length > 0) {
        showBookingMessage(errors.join("<br>"), "error");
        return;
    }

    saveBookingRequest(data);
    showBookingMessage("Su reserva se ha realizado correctamente.", "success");
    form.reset();
}

function showBookingMessage(text, type) {
    const messageBox = document.querySelector("#booking-message");
    messageBox.innerHTML = text;
    messageBox.classList.remove("error", "success");
    messageBox.classList.add(type);
}
// ---------- BOOKING ---------- //