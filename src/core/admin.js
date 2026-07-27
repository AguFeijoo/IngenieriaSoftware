function getAllReservations() {
  return JSON.parse(localStorage.getItem("bookingRequests") || "[]");
}

function isPending(reservation) {
  return reservation.status === "pending";
}

function getPendingReservations() {
  return getAllReservations().filter(isPending);
}
