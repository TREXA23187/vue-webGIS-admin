const {pool} = require('../utils/db')

exports.add = (req,res,next)=>{
    res.send('states')
}

exports.getInfo = (req,res,next)=>{
    const search = `select "STATE_NAME","SUB_REGION","STATE_ABBR","LAND_KM","WATER_KM","PERSONS" from states`

    pool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('connect query:' + isErr.message);
            return;
        }
        client.query(search, [], function (isErr, rst) {
            done()
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ');
                // console.log(rst.rows[0].row_to_json)
                // console.log(rst)
                res.send(rst.rows)
            }
        })
    })
}
