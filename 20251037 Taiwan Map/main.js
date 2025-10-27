let data_url = "112edu_B_1_4.json";
let geo_url = "taiwan_geo.json";

//先讓資料進場再處理
Promise.all([
    d3.json(data_url),
    d3.json(geo_url)
]).then(function(data) {
    draw_map(data[0], data[1]);
});

function unpack(rows, key) {
    return rows.map(function(row){ 
        return row[key]; });
}

function draw_map(school_data, geo_data) {

    //先在瀏覽器檢查資料有沒有對到，才能夠在地圖上正確顯示，例如簡體繁體應一致
    console.log(unpack(school_data, "縣市別").sort());
    let all_cities = [];
    for(let i=0; i<geo_data.features.length; i++) {
        all_cities.push(geo_data.features[i].properties.COUNTYNAME);
    }
    console.log(all_cities.sort());

    //確認可取得各縣市國中人數資料，從資料中抓出國中欄位
    console.log(unpack(school_data, "國中"));

    let trace1 = {
        name:"",
        type:"choropleth",
        locationmode: "geojson-id",//上堂課的為country-name
        featureidkey: "properties.COUNTYNAME",
        locations: unpack(school_data, "縣市別"),
        geojson:geo_data,
        z: unpack(school_data, "國中"),
        colorscale: [
            [0, 'lightyellow'],
            [1, 'brown']
        ],
        hovertemplate: "%{location}:"+"%{z:,}人",
        hoverlabel: {
            bgcolor: "white",
            bordercolor: "black",
            font: {
                family: "Arial",
                size: 30,
                color: "black"
            }
        },
        
    };

    let data = [trace1];
    let layout = {
        title: {
            text: "鄉鎮戶數及人口數-114年9月",
            font: {
                size: 40,
                color: "black"
            },
            x: 0.5,
            y: 0.98,
        },
        geo:{
            center: {
                lon: 120.32,
                lat: 23.84
            },
            fitbounds: "locations",
            projection:{
                type: "mercator"
            },
            resolution: 50,
        },
        margin:{
            l:10,
            r:10,
            t:60,
            b:10,
        }
    };

    Plotly.newPlot("myGraph", data, layout);
}