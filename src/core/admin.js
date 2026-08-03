const ROOM_TYPE_INFO = {
  standard: { label: "Estándar", price: 90 },
  double: { label: "Doble", price: 140 },
  suite: { label: "Suite", price: 190 },
  family: { label: "Familiar", price: 240 },
};

const MONTH_ABBR = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function getRoomTypeLabel(roomType) {
  const info = ROOM_TYPE_INFO[roomType];
  return info ? info.label : roomType;
}

function getRoomTypePrice(roomType) {
  const info = ROOM_TYPE_INFO[roomType];
  return info ? info.price : 0;
}

function loadReservations() {
  return JSON.parse(localStorage.getItem("bookingRequests") || "[]");
}

function saveReservations(reservations) {
  localStorage.setItem("bookingRequests", JSON.stringify(reservations));
}

function calculateNights(checkIn, checkOut) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.round((new Date(checkOut) - new Date(checkIn)) / msPerDay);
  return Math.max(nights, 0);
}

function calculateTotalPrice(roomType, checkIn, checkOut) {
  return calculateNights(checkIn, checkOut) * getRoomTypePrice(roomType);
}

function formatDateBadgeDay(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "--";
  return String(date.getUTCDate()).padStart(2, "0");
}

function formatDateBadgeMonth(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "---";
  return MONTH_ABBR[date.getUTCMonth()];
}

function formatWeekRange(reservations) {
  if (reservations.length === 0) return "Sin solicitudes registradas";

  let minDate = new Date(reservations[0].checkIn);
  let maxDate = new Date(reservations[0].checkIn);

  for (const reservation of reservations) {
    const checkInDate = new Date(reservation.checkIn);
    if (checkInDate < minDate) minDate = checkInDate;
    if (checkInDate > maxDate) maxDate = checkInDate;
  }

  const minDay = minDate.getUTCDate();
  const maxDay = maxDate.getUTCDate();
  const maxMonthName = MONTH_NAMES[maxDate.getUTCMonth()];

  if (minDate.getUTCMonth() === maxDate.getUTCMonth() && minDate.getUTCFullYear() === maxDate.getUTCFullYear()) {
    return "Semana del " + minDay + " al " + maxDay + " de " + maxMonthName;
  }

  const minMonthName = MONTH_NAMES[minDate.getUTCMonth()];
  return "Semana del " + minDay + " de " + minMonthName + " al " + maxDay + " de " + maxMonthName;
}

function countByStatus(reservations, status) {
  let count = 0;

  for (const reservation of reservations) {
    if (reservation.status === status) count++;
  }

  return count;
}

function filterReservations(reservations, searchText, fromDate, toDate) {
  const text = searchText.trim().toLowerCase();
  const filtered = [];

  for (const reservation of reservations) {
    if (text) {
      const roomLabel = getRoomTypeLabel(reservation.roomType).toLowerCase();
      const haystack = (reservation.firstName + " " + reservation.lastName + " " + roomLabel).toLowerCase();
      if (!haystack.includes(text)) continue;
    }

    if (fromDate && reservation.checkIn < fromDate) continue;
    if (toDate && reservation.checkIn > toDate) continue;

    filtered.push(reservation);
  }

  return filtered;
}

function updateReservationStatus(id, newStatus) {
  const reservations = loadReservations();

  for (const reservation of reservations) {
    if (reservation.id === id) {
      reservation.status = newStatus;
      break;
    }
  }

  saveReservations(reservations);
}

if (typeof module !== "undefined") {
  module.exports = {
    ROOM_TYPE_INFO,
    getRoomTypeLabel,
    getRoomTypePrice,
    loadReservations,
    saveReservations,
    calculateNights,
    calculateTotalPrice,
    formatDateBadgeDay,
    formatDateBadgeMonth,
    formatWeekRange,
    countByStatus,
    filterReservations,
    updateReservationStatus,
  };
}
