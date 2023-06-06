let driverData = {};
let chart = null;
let ctx = document.getElementById('myChart').getContext('2d');

fetch('https://ergast.com/api/f1/2023/results.json?limit=1000')
    .then(response => response.json())
    .then(data => {
        const races = data.MRData.RaceTable.Races;

        races.forEach(race => {
            race.Results.forEach(result => {
                const driverId = result.Driver.driverId;
                const position = result.position;
                const circuitName = race.raceName;

                if(!driverData[driverId]) {
                    driverData[driverId] = {};
                }

                driverData[driverId][circuitName] = position;
            });
        });

        const select1 = document.getElementById('driver1');
        const select2 = document.getElementById('driver2');

        for(let driverId in driverData) {
            const option1 = document.createElement('option');
            option1.text = driverId;
            option1.value = driverId;
            select1.add(option1);

            const option2 = document.createElement('option');
            option2.text = driverId;
            option2.value = driverId;
            select2.add(option2);
        }

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: `Driver 1: ${select1.value}`,
                        data: [],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: `Driver 2: ${select2.value}`,
                        data: [],
                        fill: false,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 20,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        select1.addEventListener('change', () => {
            updateChart();
        });

        select2.addEventListener('change', () => {
            updateChart();
        });

        function updateChart() {
            const driver1 = driverData[select1.value];
            const driver2 = driverData[select2.value];

            const labels = Array.from(new Set([...Object.keys(driver1), ...Object.keys(driver2)]));

            const dataset1 = labels.map(label => driver1[label] || null);
            const dataset2 = labels.map(label => driver2[label] || null);

            chart.data.labels = labels;
            chart.data.datasets[0].data = dataset1;
            chart.data.datasets[1].data = dataset2;

            chart.data.datasets[0].label = `Driver 1: ${select1.value}`;
            chart.data.datasets[1].label = `Driver 2: ${select2.value}`;

            chart.update();
        }
    });
