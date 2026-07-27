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

function matchesCheckIn(reservation, checkIn) {
  return !checkIn || reservation.checkIn === checkIn;
}

function matchesGuest(reservation, guestName) {
  if (!guestName) return true;
  const fullName = (reservation.firstName + " " + reservation.lastName).toLowerCase();
  return fullName.includes(guestName.trim().toLowerCase());
}

function filterReservations(reservations, criteria) {
  return reservations.filter(function (reservation) {
    return matchesCheckIn(reservation, criteria.checkIn) && matchesGuest(reservation, criteria.guestName);
  });
}
