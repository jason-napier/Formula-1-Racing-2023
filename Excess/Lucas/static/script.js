// Fetch circuit data from the Flask API
fetch('/api/circuits')
  .then(response => response.json())
  .then(data => {
    const circuitMarkers = [];
    const circuitIcon = L.icon({
      iconUrl: 'static/images/circuit-marker.png',
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5],
    });

    data.forEach(circuit => {
      const marker = L.marker([circuit.Location.lat, circuit.Location.long], { icon: circuitIcon })
        .bindPopup(`<b>${circuit.circuitName}</b><br>${circuit.Location.locality}, ${circuit.Location.country}`)
        .addTo(map);
      circuitMarkers.push(marker);
    });
  })
  .catch(error => console.log(error));

// Fetch driver data from the Flask API
fetch('/api/drivers')
  .then(response => response.json())
  .then(data => {
    const driverMarkers = [];
    const driverIcon = L.icon({
      iconUrl: 'static/images/driver-marker.png',
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
    });

    data.forEach(driver => {
      const marker = L.marker([driver.lat, driver.long], { icon: driverIcon })
        .bindPopup(`<b>${driver.givenName} ${driver.familyName}</b><br>${driver.nationality}`)
        .addTo(map);
      driverMarkers.push(marker);
    });
  })
  .catch(error => console.log(error));
