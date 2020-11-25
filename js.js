var data = {};
var type;
var headPosition = 0
var initialHeadPosition = 0
var trace = []


const show = () => {
    data = {}
    trace = []
    type = document.getElementById("type").value
    headPosition = document.getElementById("head").value
    initialHeadPosition = headPosition


    const table = document.getElementById('timesTable')
    const rows = (table.children[0].rows)
    for (i = 1; i < rows.length; i++) {
        const time = parseInt(rows[i].children[0].innerHTML)
        const value = formatData((rows[i].children[1].innerHTML))
        data[time] = value
    }
    calculate()
    document.getElementById('results').innerHTML = trace
    console.log(sum_adjacent_difference(trace) + trace[0])

}

const formatData = (value) => {
    while (value.includes(' ')) {
        value = value.replace(" ", ",")
    }
    return value.split`,`.map((x) => parseInt(x));

}




const calculate = () => {
    const keys = (Object.keys(data));
    var totalTime = 0
    var tempArray = [];
    var count = 0
    while ((count != keys.length) || tempArray.length != 0) {

        if (data[totalTime]) {
            data[totalTime].forEach(element => {
                tempArray.push(element)
            });
            count++
            totalTime++
        }
        else {
            totalTime++
        }
        if (type !== 'fcfs') {

            tempArray.sort(function (a, b) { return a - b });
        }
        var track
        if (type === 'sl') {
            track = trace.length === 0 ? tempArray.shift() : findNext(tempArray, 'right')
        }

        if (type === 'csl') {
            track = trace.length === 0 ? tempArray.shift() : findNext(tempArray, 'right', 'reset')

        }

        if (type === 'sstf') {
            track = trace.length === 0 ? tempArray.shift() : findNext(tempArray)
        }
        if (type === 'fcfs') {

            track = tempArray.shift()
        }

        headPosition = track
        trace.push(track)
    }

}

const findNext = (tempArray, way, method) => {
    if (tempArray.length === 1) {
        return tempArray.shift();
    }
    var closest;
    if (way === 'right') {
        for (i = 0; i < tempArray.length; i++) {

            if (tempArray[i] > headPosition) {
                closest = tempArray[i]
                i = tempArray.length
            }
        }

        if (!closest) {
            if (method === 'reset') {

                trace.push(parseInt(initialHeadPosition))
                closest = tempArray[0]
            }
            else {
                closest = tempArray[tempArray.length - 1]
            }
        }

    }
    else {
        closest = tempArray.reduce((a, b) => {
            return Math.abs(b - headPosition) < Math.abs(a - headPosition) ? b : a;
        });
    }

    tempArray.splice(tempArray.indexOf(closest), 1);
    return closest
}
function sum_adjacent_difference(arr) {
    var result = 0;
    for (var i = 1; i < arr.length; i++) {
        result += Math.abs(arr[i] - arr[i - 1]);
    }
    return result;
}
