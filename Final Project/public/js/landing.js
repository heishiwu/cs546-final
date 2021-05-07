(function ($) {
    let chartLabels = $("#chart_labels").val();
    let chartData = $("#chart_data").val();
    const labels = chartLabels;
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            data: chartData[0]
        }, {
            label: 'My Second dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            data: chartData[1],
        }]
    };
    // </block:setup>

    // <block:config:0>
    const config = {
        type: 'line',
        data,
        options: {
            plugins: {
                title: {
                    text: 'Chart.js Time Scale',
                    display: true
                }
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    // Luxon format string
                    tooltipFormat: 'DD T'
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'value'
                }
            }
        }
    };
    // </block:config>

    // module.exports = {
    //     actions: [],
    //     config: config,
    // };
    // === include 'setup' then 'config' above ===

    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
})(window.jQeury)