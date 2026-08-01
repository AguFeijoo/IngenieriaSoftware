const { addReview } = require('../src/core/review');

test("opinion completa agregada", () => {
    expect(addReview("Nombre", 4, "Muy lindo")).toBeTruthy();
});

test("opinion sin comentario agregada", () => {
    expect(addReview("Nombre", 2, "")).toBeTruthy();
});

test("opinion vacia", () => {
    expect(addReview("", 0, "")).toBeFalsy();
});

test("opinion sin nombre", () => {
    expect(addReview("", 3, "Deficiente")).toBeFalsy();
});

test("opinion con nombre solo espacios", () => {
    expect(addReview("   ", 1, "Malísimo")).toBeFalsy();
});

test("opinion sin rating", () => {
    expect(addReview("Nombre", 0, "Bueno")).toBeFalsy();
});