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
    console.log(trace)
    console.log(sum_adjacent_difference(trace) + trace[0])

}

const formatData = (value) => {
    while (value.includes(' ')) {
        value = string.replace(" ", ",")
    }
    return value.split`,`.map((x) => parseInt(x));

}

const calculate = () => {
    switch (type) {
        case type = 'fcfs':
            fcfs()
            break;
        case type = 'sstf':
            sstf()
            break;
        case type = 'sl':
            sl()
            break;
        case type = 'csl':

            csl()
            break;

        default:
            break;
    }
}

const fcfs = () => {
    const keys = (Object.keys(data));
    keys.forEach(element => {
        data[element].forEach(track => {
            headPosition = track
            trace.push(track)
        });
    });

}
const sstf = () => {
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
        tempArray.sort(function (a, b) { return a - b });
        const track = trace.length === 0 ? tempArray.shift() : findNext(tempArray)

        headPosition = track
        trace.push(track)
    }

}
const sl = () => {
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
        tempArray.sort(function (a, b) { return a - b });
        const track = trace.length === 0 ? tempArray.shift() : findNext(tempArray, 'right')

        headPosition = track
        trace.push(track)
    }

}

const csl = () => {
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
        tempArray.sort(function (a, b) { return a - b });
        const track = trace.length === 0 ? tempArray.shift() : findNext(tempArray, 'right', 'reset')
        headPosition = track
        trace.push(track)
    }

}

const findNext = (tempArray, type, method) => {
    if (tempArray.length === 1) {
        return tempArray.shift();
    }
    var closest;
    if (type === 'right') {
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
