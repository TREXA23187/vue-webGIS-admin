const {pool} = require('../utils/db')

const {sign, verify} = require('../utils/tools')


const search = (req, res, next) => {

    if (req.query.state_name) {
        const state_name = req.query.state_name
        const SQLString_Geom = `
        with properties as(
            select row_to_json(t)
        from(
            select "STATE_NAME", "PERSONS","SUB_REGION","STATE_ABBR","LAND_KM","WATER_KM","MALE","FEMALE","DRVALONE","CARPOOL","PUBTRANS","EMPLOYED"-"DRVALONE"-"CARPOOL"-"PUBTRANS" as "OTHERS" from public.states
    )t
        where "STATE_NAME" = '${state_name}'
    ),
        feature as (
            select
        'Feature' as "type",
            ST_AsGeoJSON(geom)::json as "geometry",
            row_to_json(properties.*) as "properties"
        from
        public.states as st,
            properties
        where
        st."STATE_NAME" = '${state_name}'
    )

        select row_to_json(feature.*) from feature
        `
        pool.connect(function (isErr, client, done) {
            if (isErr) {
                console.log('connect query:' + isErr.message);
                return;
            }
            client.query(SQLString_Geom, [], function (isErr, rst) {
                done()
                if (isErr) {
                    console.log('query error:' + isErr.message);
                } else {
                    console.log('query success, data is: ');
                    // console.log(rst.rows[0].row_to_json)

                    res.send(rst.rows[0].row_to_json)
                }
            })
        })
    } else {
        // console.log(req.query)
        res.send('<h1>welcome to usa</h1>')
    }
}

const signin = (req, res, next) => {
    const {username, password} = req.query
    const token = sign(username)
    console.log(token)
    res.set('X-Access-Token', token)
    res.send('success')

}

const api = (req, res, next) => {
    const {username, password} = req.query
    const token = sign(username)
    // console.log(token)
    res.set('X-Access-Token', token)
    res.send({
        username: 'admin',
        password: '123'
    })
}

const isAuth = async (req, res, next) => {
    let token = req.get('X-Access-Token')
    try {
        let result = verify(token)
        res.send({
            username: result.username,
            message: 'success'
        })
    } catch (e) {
        res.send({
            message: 'please login'
        })
    }
}


module.exports = {search, signin, api, isAuth}
