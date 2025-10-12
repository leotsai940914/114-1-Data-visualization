d3.csv('https://raw.githubusercontent.com/ryanchung403/dataset/refs/heads/main/harry_potter.csv').then(
    res =>{
        function drawChartBar(data) {
            const movies = data.map(d => d.title);
            const runtimes = data.map(d => +d.runtime);

            const trace = {
                x: movies,
                y: runtimes,
                type: 'bar',
                marker: {
                    color: 'mediumpurple'
                },
                text: runtimes.map(String),
                textposition: 'inside', // 讓文字在 bar 內部
                textfont: {
                    color: 'yellow',
                    size: 20
                }
            };

            const layout = {
    title: 'Harry Potter Movies Runtime',
    xaxis: {
        tickangle: -30,
        automargin: true, // 自動留白，避免文字被截斷
    },
    yaxis: {
        title: 'Runtime (minutes)'
    }
};

            Plotly.newPlot('chart', [trace], layout);
        }
        drawChartBar(res);
    }
);