document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('data-select');
    select.addEventListener('change', fetchData);
});

function fetchData() {
    var select = document.getElementById('data-select');
    var selectedData = select.options[select.selectedIndex].value;

    if (selectedData !== "") {
        fetch(`/api/formula1/${selectedData}`)
            .then(response => response.json())
            .then(data => {
                visualizeData(data, selectedData);
            });
    }
}

function visualizeData(data, selectedData) {
    var visualizationDiv = document.getElementById('visualization');
    visualizationDiv.innerHTML = '';

    if (selectedData === 'drivers') {
        visualizeDrivers(data);
    } else if (selectedData === 'teams') {
        visualizeTeams(data);
    } else if (selectedData === 'manufacturers') {
        visualizeManufacturers(data);
    } else if (selectedData === 'races') {
        visualizeRaces(data);
    }
}

function visualizeDrivers(data) {
    var drivers = data.map(driver => driver.name);
    var points = data.map(driver => driver.points);

    var ctx = document.createElement('canvas');
    visualizationDiv.appendChild(ctx);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: drivers,
            datasets: [{
                label: 'Points',
                data: points,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function visualizeTeams(data) {
    var teams = data.map(team => team.name);
    var wins = data.map(team => team.wins);

    var ctx = document.createElement('canvas');
    visualizationDiv.appendChild(ctx);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teams,
            datasets: [{
                label: 'Wins',
                data: wins,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function visualizeManufacturers(data) {
    var manufacturers = data.map(manufacturer => ({
        name: manufacturer.name,
        country: manufacturer.country
    }));

    var ctx = document.createElement('canvas');
    visualizationDiv.appendChild(ctx);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: manufacturers.map(manufacturer => manufacturer.name),
            datasets: [{
                label: 'Manufacturers',
                data: manufacturers.map(manufacturer => 1),
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        },
        options: {}
    });
}

function visualizeRaces(data) {
    var raceList = document.createElement('ul');

    data.forEach(race => {
        var raceItem = document.createElement('li');
        raceItem.textContent = race.name;
        raceList.appendChild(raceItem);
    });

    visualizationDiv.appendChild(raceList);
}
