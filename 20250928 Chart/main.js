// let trace1 = {
//     type: 'bar',
//     name:'台北動物園',
//     x: animals_Taipei_Zoo.map(a => a.name),
//     y: animals_Taipei_Zoo.map(a => a.count)
// };

// let trace2 = {
//     type: 'bar',
//     name:'桃園動物園',
//     x: animals_Taoyuan_Zoo.map(a => a.name),
//     y: animals_Taoyuan_Zoo.map(a => a.count)
// };


let trace1 = {
    type: 'bar',
    name:'Lion',
    x: ['Taipei Zoo', 'Taoyuan Zoo'],
    y: [
        animals_Taipei_Zoo[0].count, 
        animals_Taoyuan_Zoo[0].count
    ],
    textfont:{
        size:20,
        color:'white'
    },
    marker:{
        color:'blue'
    }
};

trace1.text = trace1.y;

let trace2 = {
    type: 'bar',
    name:'Tiger',
    x: ['Taipei Zoo', 'Taoyuan Zoo'],
    y: [
        animals_Taipei_Zoo[1].count, 
        animals_Taoyuan_Zoo[1].count
    ],
    textfont:{
        size:20,
        color:'white'
    },
    marker:{
        color:'orange'
    }
};

trace2.text = trace2.y;

let trace3 = {
    type: 'bar',
    name:'Monkey',
    x: ['Taipei Zoo', 'Taoyuan Zoo'],
    y: [
        animals_Taipei_Zoo[2].count, 
        animals_Taoyuan_Zoo[2].count
    ],
    textfont:{
        size:20,
        color:'white'
    },
    marker:{
        color:'green'
    }
};

trace3.text = trace3.y;

let data = [
    trace1, 
    trace2, 
    trace3
];

let layout = {
    barmode:'stack'
};

Plotly.newPlot('myGraph', data, layout);
Comment
