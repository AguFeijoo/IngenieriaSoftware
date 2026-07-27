function getAllReservations() {
  return JSON.parse(localStorage.getItem("bookingRequests") || "[]");
}

function isPending(reservation) {
  return reservation.status === "pending";
}

function getPendingReservations() {
  return getAllReservations().filter(isPending);
}

function updateReservationStatus(reservationId, status) {
  const reservations = getAllReservations();
  const reservation = reservations.find((r) => r.id === reservationId);
  if (!reservation) return;

  reservation.status = status;
  localStorage.setItem("bookingRequests", JSON.stringify(reservations));
}

function acceptReservation(reservationId) {
  updateReservationStatus(reservationId, "accepted");
}

function rejectReservation(reservationId) {
  updateReservationStatus(reservationId, "rejected");
}
