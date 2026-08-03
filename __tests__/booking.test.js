const { validateForm, isValidEmail, isValidPhone } = require('../src/core/booking');

function buildValidBooking(overrides = {}) {
    return {
        firstName: "Juan",
        lastName: "Perez",
        email: "juan@test.com",
        roomType: "doble",
        guestCount: "2",
        checkIn: "2026-09-01",
        checkOut: "2026-09-05",
        phone: "091234567",
        ...overrides
    };
}

test("reserva completa y válida", () => {
    expect(validateForm(buildValidBooking())).toHaveLength(0);
});

test("reserva sin nombre", () => {
    expect(validateForm(buildValidBooking({ firstName: "" }))).toContain("Nombre es obligatorio.");
});

test("reserva sin apellido", () => {
    expect(validateForm(buildValidBooking({ lastName: "" }))).toContain("Apellido es obligatorio.");
});

test("reserva sin email", () => {
    expect(validateForm(buildValidBooking({ email: "" }))).toContain("Email es obligatorio.");
});

test("reserva con email inválido", () => {
    expect(validateForm(buildValidBooking({ email: "juantest.com" }))).toContain("Email no es válido.");
});

test("reserva sin tipo de habitación", () => {
    expect(validateForm(buildValidBooking({ roomType: "" }))).toContain("Tipo de habitación es obligatorio.");
});

test("reserva sin cantidad de huéspedes", () => {
    expect(validateForm(buildValidBooking({ guestCount: "" }))).toContain("Cantidad de huéspedes es obligatorio.");
});

test("reserva con cantidad de huéspedes inválida", () => {
    expect(validateForm(buildValidBooking({ guestCount: "abc" }))).toContain("Cantidad de huéspedes no es válido.");
});

test("reserva sin fecha de ingreso", () => {
    expect(validateForm(buildValidBooking({ checkIn: "" }))).toContain("Fecha de ingreso es obligatorio.");
});

test("reserva sin fecha de salida", () => {
    expect(validateForm(buildValidBooking({ checkOut: "" }))).toContain("Fecha de salida es obligatorio.");
});

test("reserva con fecha de salida anterior a la de ingreso", () => {
    expect(validateForm(buildValidBooking({ checkIn: "2026-09-05", checkOut: "2026-09-01" }))).toContain("Fecha de salida no es válido.");
});

test("reserva con teléfono inválido", () => {
    expect(validateForm(buildValidBooking({ phone: "123456789" }))).toContain("Teléfono no es válido.");
});

test("reserva sin teléfono es válida", () => {
    expect(validateForm(buildValidBooking({ phone: "" }))).toHaveLength(0);
});

test("email válido", () => {
    expect(isValidEmail("juan@test.com")).toBeTruthy();
});

test("email sin arroba", () => {
    expect(isValidEmail("juantest.com")).toBeFalsy();
});

test("email sin dominio con punto", () => {
    expect(isValidEmail("juan@testcom")).toBeFalsy();
});

test("email con espacios", () => {
    expect(isValidEmail("juan @test.com")).toBeFalsy();
});

test("teléfono válido", () => {
    expect(isValidPhone("091234567")).toBeTruthy();
});

test("teléfono que no empieza en 0", () => {
    expect(isValidPhone("191234567")).toBeFalsy();
});

test("teléfono con largo incorrecto", () => {
    expect(isValidPhone("0123")).toBeFalsy();
});

test("teléfono con letras", () => {
    expect(isValidPhone("09123abc7")).toBeFalsy();
});
