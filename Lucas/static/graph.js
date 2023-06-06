let driverData = {};
let winData = {};
let chart = null;
let pieChart = null;
let ctx = document.getElementById('myChart').getContext('2d');
let pieCtx = document.getElementById('pieChart').getContext('2d');

fetch('https://ergast.com/api/f1/2023/results.json?limit=1000')
    .then(response => response.json())
    .then(data => {
        const races = data.MRData.RaceTable.Races;

        races.forEach(race => {
            race.Results.forEach(result => {
                const fullName = result.Driver.givenName + " " + result.Driver.familyName;
                const position = result.position;
                const circuitName = race.raceName;

                if(!driverData[fullName]) {
                    driverData[fullName] = {};
                }

                driverData[fullName][circuitName] = position;

                // count the wins for each driver
                if(position === "1") {
                    if(!winData[fullName]) {
                        winData[fullName] = 0;
                    }

                    winData[fullName]++;
                }
            });
        });

        const select1 = document.getElementById('driver1');
        const select2 = document.getElementById('driver2');

        for(let fullName in driverData) {
            const option1 = document.createElement('option');
            option1.text = fullName;
            option1.value = fullName;
            select1.add(option1);

            const option2 = document.createElement('option');
            option2.text = fullName;
            option2.value = fullName;
            select2.add(option2);
        }

        // line chart
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
                    },
                    x: {
                        ticks: {
                            autoSkip: false
                        }
                    }
                }
            }
        });

        // pie chart
        pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(winData),
                datasets: [
                    {
                        label: 'Wins',
                        data: Object.values(winData),
                        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#9ccc65', '#ffa726', '#29b6f6', '#ab47bc', '#78909c', '#8d6e63', '#ec407a', '#7e57c2', '#26a69a', '#9e9d24', '#ff7043', '#8c9eff', '#66bb6a', '#d4e157', '#ffca28', '#26c6da']
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });

        select1.addEventListener('change', () => {
            updateChart();
        });

        select2.addEventListener('change', () => {
            updateChart();
        });

        // Initialize chart with the first two drivers
        const firstDriverName = select1.options[0].value;
        const secondDriverName = select2.options[1].value;

        select1.value = firstDriverName;
        select2.value = secondDriverName;

        updateChart();

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
