const createGraph = () => {

    var ctx = document.getElementById('myChart').getContext('2d');
    var results = document.getElementById('results').innerHTML
    const data = formatData(results)
    if (results) {
        const finalData = createData(data)
        make(ctx, finalData)

    }
}

const createData = (data) => {
    return data.map((each, index) => ({ x: each, y: data.length - index }))

}



const make = (ctx, finalData) => {
    var scatterChart = new Chart(ctx, {

        type: 'line',
        data: {
            datasets: [{
                label: 'Graph',
                data: finalData,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                stepped: true
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom', gridLines: {
                        display: false,
                    }
                }], yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            },
            tooltips: {
                bodyFontSize: 0
            },
            maintainAspectRatio: false, responsive: true
        }
    });
}
