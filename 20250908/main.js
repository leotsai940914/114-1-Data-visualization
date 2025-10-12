d3.csv('https://raw.githubusercontent.com/ryanchung403/dataset/refs/heads/main/harry_potter.csv').then(
    res =>{
        console.log(res);
        console.log(unpack(res, 'release_year'));
        console.log(unpack(res, 'revenue'));
        drawLineChart(res);
    }
);

function drawLineChart(res) {
    let trace1 = {
        type: 'scatter',
        mode: 'lines+markers+text',
        name: '第一條線',
        x: unpack(res, 'release_year'),
        y: unpack(res, 'revenue'),
        text: [],
        textposition: 'top center',
        marker: {
            size: 10,
            color: 'purple',
        }
    };

    // for (thisPoint in set1) {
    //     trace1.x.push(set1[thisPoint][0]);
    //     trace1.y.push(set1[thisPoint][1]);
    //     trace1.text.push(set1[thisPoint][2]);
    // }

    // let trace2 = {
    //     type: 'scatter',
    //     mode: 'markers',
    //     name: '第二條線',
    //     x: [],
    //     y: [],
    // };

    // for (thisPoint in set2) {
    //     trace2.x.push(set2[thisPoint][0]);
    //     trace2.y.push(set2[thisPoint][1]);
    // }

    // let trace3 = {
    //     type: 'scatter',
    //     mode: 'lines',
    //     name: '第三條線',
    //     x: [],
    //     y: [],
    // };

    // for (thisPoint in set3) {
    //     trace3.x.push(set3[thisPoint][0]);
    //     trace3.y.push(set3[thisPoint][1]);
    // }


    // let data = [trace1, trace2, trace3];
    let data = [trace1];
    console.log(trace1.x);
    let layout = {
        margin: { t: 50 },
        xaxis: {
            range: ['2000', '2012'],
            title: { text: 'Release Year' }
        },
        // xaxis: { range:['2001', '2011'] },
        // xaxis: { range: [0, 6] },
        // yaxis: { range: [0, 20] },
        title: { text: "Hello Plotly" },
    };

    Plotly.newPlot('myGraph', data, layout);
}


function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}
