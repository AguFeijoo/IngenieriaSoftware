const { login } = require('../src/core/login');

test("login exitoso", () => {
    expect(login("admin", "admin123")).toBeTruthy();
});

test("login fallido", () => {
    expect(login("user", "password")).toBeFalsy();
});

test("login fallido con usuario correcto y contraseña incorrecta", () => {
    expect(login("admin", "wrongpassword")).toBeFalsy();
});

test("login fallido con usuario incorrecto y contraseña correcta", () => {
    expect(login("user", "admin123")).toBeFalsy();
});

test("login fallido con campos vacíos", () => {
    expect(login("", "")).toBeFalsy();
});

test("login fallido con usuario vacío", () => {
    expect(login("", "admin123")).toBeFalsy();
});

test("login fallido con contraseña vacía", () => {
    expect(login("admin", "")).toBeFalsy();
});