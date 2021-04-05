const pg = require('pg')
const fs = require('fs')
const path = require('path')

//数据库配置
const conString = "tcp://postgres:123456@localhost/test" //tcp://用户名：密码@localhost/数据库名
const client = new pg.Client(conString)

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

exports.pool = pool
