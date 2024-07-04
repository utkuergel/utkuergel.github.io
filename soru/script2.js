document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChart2');
    var myChart;

    function renderChart(data) {
        if (myChart) {
            myChart.destroy(); // Eski grafik varsa, onu yok et
        }
        myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                animation: {
                    duration: 1000,
                    easing: 'easeInOutCubic',
                },
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true,
                            precision: 0 // Küsüratlı rakamları tam sayıya yuvarlar
                        }
                    },
                    x: {
                        ticks: {
                            callback: function(value, index, values) {
                                return value.split('-').reverse().join('/'); // GÜN/AY/YIL formatında göster
                            }
                        }
                    }
                }
            }
        });
    }

    function generateMonthDays(year, month) {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            let day = String(date.getDate()).padStart(2, '0');
            let monthStr = String(month + 1).padStart(2, '0');
            days.push(`${day}/${monthStr}/${year}`);
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    function loadData() {
        let storedData = JSON.parse(localStorage.getItem('studyData2')) || [];
        if (storedData.length > 0) {
            let firstEntry = new Date(storedData[0].date);
            let year = firstEntry.getFullYear();
            let month = firstEntry.getMonth();
            let labels = generateMonthDays(year, month);

            let mathData = Array(labels.length).fill(0);
            let chemistryData = Array(labels.length).fill(0);
            let physicsData = Array(labels.length).fill(0);
            let biologyData = Array(labels.length).fill(0);
            let paragraphData = Array(labels.length).fill(0);

            storedData.forEach(entry => {
                let date = new Date(entry.date);
                let day = date.getDate();
                let index = day - 1; // GÜN 1'den başladığı için -1 yapıyoruz

                mathData[index] = Math.round(entry.math);
                chemistryData[index] = Math.round(entry.chemistry);
                physicsData[index] = Math.round(entry.physics);
                biologyData[index] = Math.round(entry.biology);
                paragraphData[index] = Math.round(entry.paragraph);
            });

            var data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Matematik',
                        data: mathData,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Kimya',
                        data: chemistryData,
                        backgroundColor: 'rgba(102, 187, 108, 0.2)',
                        borderColor: 'rgb(56, 142, 60)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Fizik',
                        data: physicsData,
                        backgroundColor: 'rgba(229, 57, 53, 0.2)',
                        borderColor: 'rgb(183, 28, 28)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Biyoloji',
                        data: biologyData,
                        backgroundColor: 'rgba(253, 216, 53, 0.2)',
                        borderColor: 'rgb(251, 140, 0)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Paragraf',
                        data: paragraphData,
                        backgroundColor: 'rgba(96, 125, 139, 0.2)',
                        borderColor: 'rgb(55, 71, 79)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            };
            renderChart(data);
        }
    }

    // Veri yükle ve grafiği göster
    loadData();

    // Grafik oluşturulduktan sonra, grafik öğesinin boyutunu ayarla
    var chartContainer = document.querySelector('.chart-container');
    var chartCanvas = chartContainer.querySelector('canvas');
    chartCanvas.style.height = chartContainer.clientHeight + 'px';
    chartCanvas.style.width = chartContainer.clientWidth + 'px';
});
