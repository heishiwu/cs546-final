(function ($) {
    let dailydataLabels = [];
    let dailyCases = [];
    let dailyVaccination = [];
    let dailyRecover = [];
    let sum_of_cases = [];
    let sum_of_death = [];
    let sum_of_vaccination = [];
    let sum_of_recover = [];

    const COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950'
      ]

    let requestConfig = {
        method: "get",
        url: '/dailyData',
    }
    $.ajax(requestConfig).then(function (result) {
        for (let i = 0; i < result.length; i++) {
            dailydataLabels.push(result[i].change_date);
            dailyCases.push(result[i].dailyCases);
            dailyVaccination.push(result[i].dailyVaccination);
            dailyRecover.push(result[i].dailyRecover);
            sum_of_cases.push(result[i].sum_of_cases);
            sum_of_death.push(result[i].sum_of_death);
            sum_of_vaccination.push(result[i].sum_of_vaccination);
            sum_of_recover.push(result[i].sum_of_recover);
        }

        const data = {
            labels: dailydataLabels,   //x-axis
            datasets: [{
                label: 'dailyCases',   //
                backgroundColor: COLORS[0],
                borderColor: COLORS[0],
                fill: false,
                data: dailyCases    //data
            }, {
                label: 'dailyVaccination',
                backgroundColor: COLORS[1],
                borderColor: COLORS[1],
                fill: false,
                data: dailyVaccination,
            }, {
                label: 'dailyRecover',
                backgroundColor: COLORS[2],
                borderColor: COLORS[2],
                fill: false,
                data: dailyRecover,
            }, {
                label: 'sum_of_cases',
                backgroundColor: COLORS[3],
                borderColor: COLORS[3],
                fill: false,
                data: sum_of_cases,
            }, {
                label: 'sum_of_death',
                backgroundColor: COLORS[4],
                borderColor: COLORS[4],
                fill: false,
                data: sum_of_death,
            }, {
                label: 'sum_of_vaccination',
                backgroundColor: COLORS[5],
                borderColor: COLORS[5],
                fill: false,
                data: sum_of_vaccination,
            }, {
                label: 'sum_of_recover',
                backgroundColor: COLORS[6],
                borderColor: COLORS[6],
                fill: false,
                data: sum_of_recover,
            }]
        };

        const config = {
            type: 'line',
            data,
            options: {
                plugins: {
                    title: {
                        text: 'COVID-19 Daily Data',
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

        var myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    })

})(jQuery)
