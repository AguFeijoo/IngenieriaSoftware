document.addEventListener("DOMContentLoaded", mostrarMapa);

function mostrarMapa() {

    const map = L.map("mapDiv").setView([-34.913570, -54.980793], 16);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    L.marker([-34.913570, -54.980793])
        .addTo(map)
        .bindPopup("Hotel Las Gaviotas")
        .openPopup();
}