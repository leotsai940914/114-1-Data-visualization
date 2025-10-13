d3.csv(
  "https://raw.githubusercontent.com/ryanchung403/dataset/refs/heads/main/train_data_titanic.csv"
).then((res) => {
  drawPieChart(res);
});

function drawPieChart(rows){
    let survived = 0;
    let notSurvived = 0;
    let male = 0;
    let female = 0;
    let embarkedS = 0;
    let embarkedC = 0;
    let embarkedQ = 0;

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].Survived === '1') {
            survived += 1;
        } else {
            notSurvived += 1;
        }

        if (rows[i].Sex === 'male') {
            male += 1;
        } else if (rows[i].Sex === 'female') {
            female += 1;
        }

        if (rows[i].Embarked === 'S') {
            embarkedS += 1;
        } else if (rows[i].Embarked === 'C') {
            embarkedC += 1;
        } else if (rows[i].Embarked === 'Q') {
            embarkedQ += 1;
        }
    }

    Plotly.newPlot(
        "myGraph",
        [
            {
                type: "pie",
                title: { text: "Survived vs Not survived" },
                labels : ["Survived","Not survived"],
                values: [survived, notSurvived],
                textinfo: "value+percent",
                textposition: "inside",
            },
        ],
        {margin: { t: 15, b: 15, l: 15, r: 15 }}
    );

    Plotly.newPlot(
        "myGraph2",
        [
            {
                type: "pie",
                title: { text: "Male vs Female" },
                labels : ["Male","Female"],
                values: [male, female],
                textinfo: "value+percent",
                textposition: "inside",
            },
        ],
        {margin: { t: 15, b: 15, l: 15, r: 15 }}
    );

    Plotly.newPlot(
        "myGraph3",
        [
            {
                type: "pie",
                title: { text: "Embarked: S / C / Q" },
                labels : ["S","C","Q"],
                values: [embarkedS, embarkedC, embarkedQ],
                textinfo: "value+percent",
                textposition: "inside",
            },
        ],
        {margin: { t: 15, b: 15, l: 15, r: 15 }}
    );
}
