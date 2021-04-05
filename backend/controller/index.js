const pg = require('pg');
const fs = require('fs');
const path = require('path')
// const SQLString = require('../public/javascripts/SQLString')
const {sign, verify} = require('../utils/tools')
//数据库配置
const conString = "tcp://postgres:123456@localhost/test"; //tcp://用户名：密码@localhost/数据库名
const client = new pg.Client(conString);

const list = (req, res, next) => {
    if (req.query.state_name) {
        const state_name = req.query.state_name
        const selectSQLString = `select ST_AsGeoJSON(geom) from public.states where "STATE_NAME" = '${state_name}'`

        // const selectSQLString = `select ST_AsGeoJSON(geom) from public.states limit 1`
        let geojson
        client.connect(function (error, results) {
            if (error) {
                console.log('clientConnectionReady Error:' + error.message);
                client.end();
                return;
            }
            console.log('connection success....\n');

            client.query(SQLString, function (error, result) {
                if (error) {
                    console.log(error)
                }
                console.log(result)
                geojson = result.rows[0].st_asgeojson
                // geojson = result.rows[0].row_to_json
                console.log(typeof geojson)
                // geojson = results.rows[0]
                // const json1 = 'const json1 = ' + geojson
                const json1 = '' + geojson

                res.send(json1)
            })
        });

    } else {
        res.send('welcome to usa.')
    }


}

const search = (req, res, next) => {
    const pgConfig = {
        user: 'postgres',
        database: 'test',
        password: '123456',
        host: 'localhost',
        port: '5432',
        poolSize: 5,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 10000
    }
    const pool = new pg.Pool(pgConfig)

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


module.exports = {list, search, signin, api, isAuth}
