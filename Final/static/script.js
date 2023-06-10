// Fetch circuits data
fetch('/circuits')
    .then(response => response.json())
    .then(data => {
        // Create the map
        const mymap = L.map('mapid').setView([41.3851, 2.1734], 2);

        // Add the tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mymap);

        // Iterate through the data and add markers to the map
        for(let i = 0; i < data.length; i++) {
            const row = data[i];
            const marker = L.marker([row['Latitude'], row['Longitude']]).addTo(mymap);

            // Create the popup data
            const popupData = `<b>${row['Circuit']}</b><br>${row['City']}, ${row['Country']}`;

            // Bind popup to marker
            marker.bindPopup(popupData);
        }
    })
    .catch(error => console.error(error));

// Fetch drivers data
fetch('/drivers')
    .then(response => response.json())
    .then(data => {
        // Find the driver table
        const driverTable = document.getElementById('driver-table');

        // Iterate through the data and add rows to the table
        for(let i = 0; i < data.length; i++) {
            const row = data[i];

            // Create a new table row
            const tr = document.createElement('tr');

            // Order the columns
            const orderedData = [row['Driver'], row['Nationality'], row['Team'], row['Age'], row['Salary']];

            // Create table cells for each property and append them to the row
            orderedData.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                tr.appendChild(td);
            });

            // Append the row to the table
            driverTable.appendChild(tr);
        }
    })
    .catch(error => console.error(error));

// Fetch races data
fetch('/races')
    .then(response => response.json())
    .then(data => {
        // Find the race table
        const raceTable = document.getElementById('race-table');

        // Iterate through the data and add rows to the table
        for(let i = 0; i < data.length; i++) {
            const row = data[i];

            // Create a new table row
            const tr = document.createElement('tr');

            // Order the columns
            const orderedData = [row['Race'], row['Date']];

            // Create table cells for each property and append them to the row
            orderedData.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                tr.appendChild(td);
            });

            // Append the row to the table
            raceTable.appendChild(tr);
        }
    })
    .catch(error => console.error(error));
