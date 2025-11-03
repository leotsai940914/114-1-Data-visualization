let trace1 = {
    type: "histogram",
    x: set1
};

let data = [trace1];
let layout = {
    margin: {
        // l: 10,
        // r: 10,
        t: 0,
        // b: 10,
    }
};

Plotly.newPlot("myGraph", data, layout);
