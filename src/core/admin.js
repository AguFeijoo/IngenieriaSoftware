// Lógica de negocio del panel de administración. No accede al DOM.
// app.js llama a estas funciones y se encarga de renderizar el resultado.

function getAllReservations() {
  return JSON.parse(localStorage.getItem("bookingRequests") || "[]");
}

function getPendingReservations() {
  return getAllReservations().filter(function (reservation) {
    return reservation.status === "pending";
  });
}
