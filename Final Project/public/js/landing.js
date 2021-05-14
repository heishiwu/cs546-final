(function ($) {
    let chartLabels = $("#chart_labels");
    let lable = chartLabels.html();
    let chartData = $("#chart_data");
    let cd = chartData.html().trim();
    const labels = chartLabels;
    let death = [];
    let recover = [];
    chartData.forEach(data => {
        death.push(data.death);
        recover.push(data.recover)
    });
    
    // [{death:1, recover:2},{death:1, recover:2}]
    const data = {
        // "dailyCases ": "151234",
//     "dailyDeath": "6757",
//     "dailyVaccination": "6757",
//     "dailyRecover": "5678",
//     "sum_of_cases": "6666",
//     "sum_of_death": "4573",
//     "sum_of_vaccination": "7592",
//     "sum_of_recover": "7824",
//     "change_date ": "04/03/2021"

        labels: labels,   //x-axis
        datasets: [{
            label: 'dailyCases',   //
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            data: death    //data
        }, {
            label: 'dailyDeath',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            data: recover,
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
})(jQuery)