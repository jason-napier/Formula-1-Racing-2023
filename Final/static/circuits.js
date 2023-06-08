var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

circuits.forEach(circuit => {
    L.marker([circuit.lat, circuit.long]).addTo(map)
        .bindPopup(`<b>${circuit.circuitName}</b><br>${circuit.locality}, ${circuit.country}`)
        .openPopup();
});
