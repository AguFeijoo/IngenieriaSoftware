// Expected HTML contract (pages/views/bookingForm.html):
// form#booking-form containing fields: #first-name, #last-name, #email,
// #room-type (select: standard|double|suite|family), #guest-count,
// #check-in (date), #check-out (date), #phone (optional),
// #special-requests (optional), and a message container #booking-message.

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

  const errors = validateForm(data);
  if (errors.length > 0) {
    showMessage(errors.join("<br>"), "error");
    return;
  }

  saveBookingRequest(data);
  showMessage("Su reserva se ha realizado correctamente.", "success");
  form.reset();
}

function showMessage(text, type) {
  const messageBox = document.querySelector("#booking-message");
  messageBox.innerHTML = text;
  messageBox.classList.remove("error", "success");
  messageBox.classList.add(type);
}

function saveBookingRequest(data) {
  const bookingRequests = JSON.parse(
    localStorage.getItem("bookingRequests") || "[]"
  );

  bookingRequests.push({
    ...data,
    id: Date.now(),
    guestCount: Number(data.guestCount),
    status: "pending",
    createdAt: Date.now(),
  });

  localStorage.setItem("bookingRequests", JSON.stringify(bookingRequests));
}

function validateForm(data) {
  const errors = [];

  if (!data.firstName) errors.push("Nombre es obligatorio.");
  if (!data.lastName) errors.push("Apellido es obligatorio.");

  if (!data.email) {
    errors.push("Email es obligatorio.");
  } else if (!isValidEmail(data.email)) {
    errors.push("Email no es válido.");
  }

  if (!data.roomType) errors.push("Tipo de habitación es obligatorio.");

  if (!data.guestCount) {
    errors.push("Cantidad de huéspedes es obligatorio.");
  } else {
    const guestCount = Number(data.guestCount);
    if (!Number.isInteger(guestCount) || guestCount <= 0) {
      errors.push("Cantidad de huéspedes no es válido.");
    }
  }

  if (!data.checkIn) errors.push("Fecha de ingreso es obligatorio.");

  if (!data.checkOut) {
    errors.push("Fecha de salida es obligatorio.");
  } else if (data.checkIn && new Date(data.checkOut) <= new Date(data.checkIn)) {
    errors.push("Fecha de salida no es válido.");
  }

  if (data.phone && !isValidPhone(data.phone)) errors.push("Teléfono no es válido.");

  return errors;
}

function isValidEmail(email) {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0 || email.includes(" ")) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domainPart = email.slice(atIndex + 1);
  const dotIndex = domainPart.indexOf(".");

  return (
    localPart.length > 0 &&
    dotIndex > 0 &&
    dotIndex < domainPart.length - 1
  );
}

function isValidPhone(phone) {
  const phoneString = String(phone);
  const startsWithZero = phoneString.startsWith("0");

  let allDigits = true;
  for (const char of phoneString) {
    if (char < "0" || char > "9") {
      allDigits = false;
    }
  }

  const hasNineDigits = phoneString.length === 9 && allDigits;

  return startsWithZero && hasNineDigits;
}
