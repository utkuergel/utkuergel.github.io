document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChart').getContext('2d');
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
                beginAtZero: true
              }
            }
          }
        }
      });
    }
  
    // Örnek veri setleri
    var sampleData1 = {
      labels: ['1/05/2024', '2/05/2024', '3/05/2024', '4/05/2024', '5/05/2024'],
      datasets: [{
        label: 'Çözülen  Soru Sayısı',
        data: [45, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false
      }]
    };
  
    var sampleData2 = {
      labels: ['Z', 'X', 'C', 'V', 'B'],
      datasets: [{
        label: 'Doğru sayısı',
        data: [37, 40],
        backgroundColor: 'rgba(102, 187, 108, 0.2)',
        borderColor: 'rgb(56, 142, 60)',
        borderWidth: 1,
        fill: false
      }]
    };

    var sampleData3 = {
        labels: ['1. Gün', '2.Gün', 'C', 'D', 'E'],
        datasets: [{
          label: 'Yanlış Soru Sayısı',
          data: [7, 15],
          backgroundColor: 'rgba(229, 57, 53, 0.2)',
          borderColor: 'rgb(183, 28, 28)',
          borderWidth: 1,
          fill: false
        }]
      };

      var sampleData4 = {
        labels: ['1. Gün', '2.Gün', 'C', 'D', 'E'],
        datasets: [{
          label: 'Performans',
          data: [36, 37.75],
          backgroundColor: 'rgba(253, 216, 53, 0.2)',
          borderColor: 'rgb(251, 140, 0)',
          borderWidth: 1,
          fill: false
        }]
      };


    // Başlangıçta her iki veri setini de göster
    renderChart({labels: sampleData1.labels, datasets: [sampleData1.datasets[0], sampleData2.datasets[0], sampleData3.datasets[0], sampleData4.datasets[0]]});
 
  });


  
        // Grafik oluşturulduktan sonra, grafik öğesinin boyutunu ayarla
        var chartContainer = document.querySelector('.chart-container');
        var chartChart = document.querySelector('#myChart');

        var chartCanvas = chartContainer.querySelector('canvas');
        chartCanvas.style.height = chartContainer.clientHeight + 'px';
        chartCanvas.style.width = chartContainer.clientWidth + 'px';

        chartChart.style.height = chartContainer.clientHeight + 'px';
        chartChart.style.width = chartContainer.clientWidth + 'px';
