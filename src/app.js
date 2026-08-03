// ---------- BOTONES ---------- //
let btnLogin = document.querySelector("#btnLogin");
let btnSendReview = document.querySelector("#btnSend");
let btnLogout = document.querySelector("#btnLogout");
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

// ---------- LOGOUT ---------- //
if (btnLogout != null) {
    btnLogout.addEventListener("click", logout);
}

function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
// ---------- LOGOUT ---------- //

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

    if (reviewsContainer == null) return;

    let reviews = JSON.parse(localStorage.getItem("reviews"));

    if (!reviews) {
        reviews = [
            {
                name: "María Gómez",
                rating: 5,
                comment: "Excelente atención y muy buena ubicación."
            },
            {
                name: "Juan Pérez",
                rating: 4,
                comment: "Muy cómodo. El desayuno fue excelente."
            }
        ];

        localStorage.setItem("reviews", JSON.stringify(reviews));
    }

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

// ---------- LOGGED-OUT ADMIN DASHBOARD ---------- //
if (window.location.pathname.includes("adminDashboard.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.replace("adminLogin.html");
    }
}
// ---------- LOGGED-OUT ADMIN DASHBOARD ---------- //

// ---------- ADMIN DASHBOARD ---------- //
let reservationsList = document.querySelector("#reservations-list");
let searchInput = document.querySelector("#reservations-search");
let dateFromInput = document.querySelector("#reservations-date-from");
let dateToInput = document.querySelector("#reservations-date-to");
let subtitleMobile = document.querySelector("#reservations-subtitle-mobile");
let subtitleDesktop = document.querySelector("#reservations-subtitle-desktop");

let expandedId = null;

if (reservationsList != null) {
    reservationsList.addEventListener("click", handleReservationsClick);
    searchInput.addEventListener("input", renderReservations);
    dateFromInput.addEventListener("change", renderReservations);
    dateToInput.addEventListener("change", renderReservations);

    renderReservations();
}

function handleReservationsClick(event) {
    let confirmButton = event.target.closest("[data-confirm]");
    let rejectButton = event.target.closest("[data-reject]");
    let toggleHeader = event.target.closest("[data-toggle]");

    if (confirmButton != null) {
        let id = Number(confirmButton.dataset.confirm);
        updateReservationStatus(id, "confirmed");
        renderReservations();
    } else if (rejectButton != null) {
        let id = Number(rejectButton.dataset.reject);
        updateReservationStatus(id, "rejected");
        renderReservations();
    } else if (toggleHeader != null) {
        let id = Number(toggleHeader.dataset.toggle);
        expandedId = expandedId === id ? null : id;
        renderReservations();
    }
}

function renderReservations() {
    let allReservations = loadReservations();
    let filtered = filterReservations(
        allReservations,
        searchInput.value,
        dateFromInput.value,
        dateToInput.value
    );

    let pending = countByStatus(allReservations, "pending");
    let subtitleText = formatWeekRange(allReservations) + " · " + pending + " pendientes";
    subtitleMobile.textContent = subtitleText;
    subtitleDesktop.textContent = subtitleText;

    if (filtered.length === 0) {
        reservationsList.innerHTML = `<li class="reservations-empty">No hay solicitudes de reserva que coincidan con la búsqueda.</li>`;
        return;
    }

    reservationsList.innerHTML = "";

    for (let reservation of filtered) {
        reservationsList.innerHTML += buildReservationRow(reservation);
    }
}

function buildReservationRow(reservation) {
    let roomLabel = getRoomTypeLabel(reservation.roomType);
    let nights = calculateNights(reservation.checkIn, reservation.checkOut);
    let total = calculateTotalPrice(reservation.roomType, reservation.checkIn, reservation.checkOut);
    let day = formatDateBadgeDay(reservation.checkIn);
    let month = formatDateBadgeMonth(reservation.checkIn);
    let statusLabels = { pending: "Pendiente", confirmed: "Confirmada", rejected: "Rechazada" };
    let statusLabel = statusLabels[reservation.status];
    let isPending = reservation.status === "pending";
    let isExpanded = reservation.id === expandedId;
    let contacto = reservation.email + (reservation.phone ? " · " + reservation.phone : "");
    let notes = reservation.specialRequests
        ? `<p class="reservation-notes">${reservation.specialRequests}</p>`
        : "";

    return `
        <li class="reservation-row${isExpanded ? " expanded" : ""}">
            <div class="reservation-row-header" data-toggle="${reservation.id}">
                <div class="reservation-date-badge">
                    <span class="badge-day">${day}</span>
                    <span class="badge-month">${month}</span>
                </div>
                <div class="reservation-row-main">
                    <h3 class="reservation-guest">${reservation.firstName} ${reservation.lastName}</h3>
                    <p class="reservation-row-summary">${roomLabel} · ${nights} noches · ${reservation.guestCount} huéspedes</p>
                </div>
                <span class="status-badge status-${reservation.status}">${statusLabel}</span>
                <button type="button" class="reservation-toggle" aria-label="Ver detalle">&#9660;</button>
            </div>
            <div class="reservation-row-details">
                <ul class="reservation-details">
                    <li><strong>Check-in / out:</strong> ${reservation.checkIn} → ${reservation.checkOut}</li>
                    <li><strong>Contacto:</strong> ${contacto}</li>
                    <li><strong>Total estimado:</strong> USD ${total}</li>
                </ul>
                ${notes}
                <div class="reservation-actions">
                    <button type="button" class="btn-confirm" data-confirm="${reservation.id}" ${isPending ? "" : "disabled"}>Confirmar</button>
                    <button type="button" class="btn-reject" data-reject="${reservation.id}" ${isPending ? "" : "disabled"}>Rechazar</button>
                </div>
            </div>
        </li>
    `;
}
// ---------- ADMIN DASHBOARD ---------- //