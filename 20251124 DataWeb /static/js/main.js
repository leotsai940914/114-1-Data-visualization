$(function(){
    if ($("#return_result").text() != ""){
        let describe_data = $("#describe_data").text();
        let describe_column = $("#describe_column").text();
        console.log(JSON.parse(describe_column.replace(/'/g, '"')));
        console.log(describe_data);
        let row_names = JSON.parse(describe_column.replace(/'/g, '"'));
        let all_datas = JSON.parse(describe_data);
        draw_chart(row_names, all_datas);
    }else{
        console.log("No data");
    }
    $("#submit").click(chatWithData);
    $("#message").keypress(function (e) {
        if (e.which == 13) {
            chatWithData();
        }
    });
});

function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
}

function draw_chart(row_names, all_datas){
    console.log(row_names);
    console.log(all_datas);

    let columns = [];
    columns.push("Column Name");
    columns = columns.concat(Object.keys(all_datas[0]));
    console.log(columns);
    
    let values = [];
    values.push(row_names);
    console.log(Object.keys(all_datas[0]));
    for (let i = 0; i < Object.keys(all_datas[0]).length; i++) {
        values.push(unpack(all_datas, Object.keys(all_datas[0])[i]));
    }

    console.log("values:", values);
    let trace1 = {
        type: 'table',
        header: {
            values: columns,
            align: ["left", "center"],
            line: { width: 1, color: 'black' },
            fill: { color: "grey" },
            font: { family: "Arial", size: 12, color: "white" }
        },
        cells: {
            values: values,
            align: ["left", "center"],
            line: { color: "black", width: 1 },
            font: { family: "Arial", size: 11, color: ["black"] }
        }
    };

    let data = [trace1];
    let layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };

    Plotly.newPlot("myGraph", data, layout);
} 

function chatWithData() {
    var message = $("#message").val();
    $("#dialog").append("我 : " + message + "\n");
    var data = {
        message: message
    };
    $.post("/call_data", data, function (data) {
        $("#dialog").append("資料小幫手 : " + data.replaceAll(",",",\n") + "\n");
        $("#dialog").scrollTop($("#dialog")[0].scrollHeight);
    });
    $("#message").val("");
    $("#dialog").scrollTop($("#dialog")[0].scrollHeight);
}