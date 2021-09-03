let fetch = require('node-fetch');
module.exports = async function(app, conn){

    app.get('/get_data', sendValue);

    async function sendValue(req, res, next){
    
        let data = await fetchData();
        await pushData(conn, data);
        res.render('index', {data: data});
    }
}


async function pushData(conn, data){

    let sql = 'DELETE FROM `top10`';
    let deletes = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err) throw(err)
            resolve(result);
        })
    })

    sql = 'INSERT INTO `top10` (`index`, `name`, `last`, `buy`, `sell`, `volume`, `base_unit`) VALUES ?';
    let values = [];
    for(let i=0; i<data.length; i++){
        let row = [];
        row.push(i+1);
        row.push(data[i].name);
        row.push(data[i].last);
        row.push(data[i].buy);
        row.push(data[i].sell);
        row.push(data[i].volume);
        row.push(data[i].base_unit);

        values.push(row);
    }

    let inserts = await new Promise((resolve, reject) => {
        conn.query(sql, [values], (err, result) => {
            if(err) throw(err);
            resolve(result);
        })
    })
}


async function fetchData(){
    let api = `https://api.wazirx.com/api/v2/tickers`;
    let response = await fetch(api);
    let data = await response.json();
    
    data = Object.values(data);

    data = data.slice(0, 10);
    return data;
}