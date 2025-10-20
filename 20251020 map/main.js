d3.csv(dataURL).then(res => {
    // 數值欄轉為數字
    res.forEach(d => {
        d["2025"] = +d["2025"];
    });

    drawMapChart(res);
});

function unpack(rows, key) {
    return rows.map(row => row[key]);
}

function drawMapChart(res) {
    console.log(res);

    let trace1 = {
        type: "choropleth",
        locationmode: "country names",
        locations: unpack(res, "GDP, current prices (Billions of U.S. dollars)"),
        z: unpack(res, "2025"),
        text: unpack(res, "GDP, current prices (Billions of U.S. dollars)"),
        colorscale: [
            [0, 'white'],
            [0.5, 'yellow'],
            [1, 'red']
        ]
    };

    let data = [ trace1 ];

    let layout = {
        margin: { t: 50, b: 0, l: 0, r: 0 },
        title: {
            text: "2025年各國GDP（十億美元）",
            font: { size: 20 }
        },
        geo: {
            projection: { type: 'robinson' }
        }
    };

    Plotly.newPlot('myGraph', data, layout);
}