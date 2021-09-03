module.exports = async function(app, conn){
    app.get('/', sendValue);
    app.get('/index', sendValue);

    async function sendValue(req, res, next){
        let data = await fetchDatabase(conn);
        res.render('index', {data: data});
    }
}


async function fetchDatabase(conn){
    let sql = 'SELECT * FROM `top10`';
    let data = await new Promise((resolve, reject) => [
        conn.query(sql, (err, result) => {
            if(err) throw(err)
            resolve(result);
        })
    ])

    return data;
}