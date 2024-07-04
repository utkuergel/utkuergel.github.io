document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChart1');
    var myChart;

    function renderChart(data) {
        if (myChart) {
            myChart.destroy();
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
                            precision: 0
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
            days.push(`${year}-${monthStr}-${day}`);
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    function loadData() {
        let storedData = JSON.parse(localStorage.getItem('studyData1')) || [];
        if (storedData.length > 0) {
            let firstEntry = new Date(storedData[0].date);
            let year = firstEntry.getFullYear();
            let month = firstEntry.getMonth();
            let labels = generateMonthDays(year, month);

            let correctData = Array(labels.length).fill(0);
            let incorrectData = Array(labels.length).fill(0);
            let successData = Array(labels.length).fill(0);

            storedData.forEach(entry => {
                let date = new Date(entry.date);
                let day = date.getDate();
                let index = labels.indexOf(entry.date); // Tarihlerin index'ini al

                correctData[index] = entry.correct;
                incorrectData[index] = entry.incorrect;
                successData[index] = entry.success;
            });

            var data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Doğru',
                        data: correctData,
                        backgroundColor: 'rgba(102, 187, 108, 0.2)',
                        borderColor: 'rgb(56, 142, 60)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Yanlış',
                        data: incorrectData,
                        backgroundColor: 'rgba(229, 57, 53, 0.2)',
                        borderColor: 'rgb(183, 28, 28)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Başarı',
                        data: successData,
                        backgroundColor: 'rgba(253, 216, 53, 0.2)',
                        borderColor: 'rgb(251, 140, 0)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            };

            renderChart(data);
        } else {
            console.log("No data available.");
        }
    }

    loadData();
});
