// ---------- LOGIN ---------- //
if (document.querySelector("#btnLogin")) {
    document.querySelector("#btnLogin").addEventListener("click", preLogin);
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


// ---------- BOOKING ---------- //

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#booking-form");
  if (!form) {
    return;
  }
  form.addEventListener("submit", handleBookingSubmit);
});

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

  const result = createBooking(data);

  if (!result.success) {
    showMessage(result.errors.join("<br>"), "error");
    return;
  }

  showMessage("Su reserva se ha realizado correctamente.", "success");
  form.reset();
}

function showMessage(text, type) {
  const messageBox = document.querySelector("#booking-message");
  messageBox.innerHTML = text;
  messageBox.classList.remove("error", "success");
  messageBox.classList.add(type);
}
// ---------- BOOKING ---------- //


// ---------- RESERVATIONS VIEW ---------- //

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#reservations-list")) {
    renderReservations();
  }
});

function renderReservations() {
  const list = document.querySelector("#reservations-list");
  const reservations = getPendingReservations();

  if (reservations.length === 0) {
    list.innerHTML = "<p>No hay reservas confirmadas.</p>";
    return;
  }

  list.innerHTML = reservations.map(buildReservationCard).join("");

  reservations.forEach(attachDetailButtonListener);
}

function attachDetailButtonListener(reservation) {
  document
    .querySelector("#detail-btn-" + reservation.id)
    .addEventListener("click", toggleDetail.bind(null, reservation.id));

  document
    .querySelector("#accept-btn-" + reservation.id)
    .addEventListener("click", function () {
      acceptReservation(reservation.id);
      renderReservations();
    });

  document
    .querySelector("#reject-btn-" + reservation.id)
    .addEventListener("click", function () {
      rejectReservation(reservation.id);
      renderReservations();
    });
}

function buildReservationCard(reservation) {
  return `
    <div id="card-${reservation.id}">
      <p>Número de reserva: ${reservation.id}</p>
      <p>Huésped: ${reservation.firstName} ${reservation.lastName}</p>
      <button id="reject-btn-${reservation.id}">Rechazar</button>
      <button id="accept-btn-${reservation.id}">Aceptar</button>
      <button id="detail-btn-${reservation.id}">Detalle</button>
      <div id="detail-${reservation.id}" hidden>
        <p>Email: ${reservation.email}</p>
        <p>Teléfono: ${reservation.phone}</p>
        <p>Tipo de habitación: ${reservation.roomType}</p>
        <p>Cantidad de huéspedes: ${reservation.guestCount}</p>
        <p>Fecha de ingreso: ${reservation.checkIn}</p>
        <p>Fecha de salida: ${reservation.checkOut}</p>
        <p>Solicitudes especiales: ${reservation.specialRequests}</p>
      </div>
    </div>
  `;
}

function toggleDetail(reservationId) {
  const detail = document.querySelector("#detail-" + reservationId);
  detail.hidden = !detail.hidden;
}
// ---------- ADMIN DASHBOARD ---------- //

